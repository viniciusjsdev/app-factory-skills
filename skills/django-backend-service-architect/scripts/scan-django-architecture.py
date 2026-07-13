#!/usr/bin/env python3
"""Audit Django backends against App Factory architecture and documentation rules."""

from __future__ import annotations

import ast
import os
import re
from pathlib import Path


CWD = Path.cwd()
ROOT = CWD.parent if CWD.name == "backend" and (CWD.parent / "docs").exists() else CWD
BACKEND = CWD if CWD.name == "backend" else (ROOT / "backend" if (ROOT / "backend").exists() else ROOT)
WARNINGS: list[str] = []
ERRORS: list[str] = []

IGNORED_DIRS = {
    ".git",
    ".venv",
    "venv",
    "__pycache__",
    ".mypy_cache",
    ".pytest_cache",
    "node_modules",
}
CAMEL_CASE = re.compile(r"^[A-Z][A-Za-z0-9]*$")
MODEL_SPEC_KEYWORDS = {"max_length", "choices", "default", "validators", "db_column"}
PERSISTENCE_METHODS = {"save", "delete", "bulk_create", "bulk_update", "get_or_create", "update_or_create"}
MIN_MODULE_DOCSTRING_CHARS = 24
REQUIRED_LOCAL_SKILLS = (
    "backend-domain-skill-author",
    "django-backend-testing",
    "django-controller",
    "django-dto-mapper",
    "django-migration",
    "django-model-configuration",
    "django-repository",
    "django-service",
)


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def iter_py_files(base: Path, *, include_migrations: bool = False) -> list[Path]:
    files: list[Path] = []
    for current, dirs, names in os.walk(base):
        dirs[:] = [
            name
            for name in dirs
            if name not in IGNORED_DIRS and (include_migrations or name != "migrations")
        ]
        files.extend(Path(current) / name for name in names if name.endswith(".py"))
    return files


def parse(path: Path) -> ast.Module | None:
    try:
        return ast.parse(path.read_text(encoding="utf-8", errors="ignore"))
    except SyntaxError:
        ERRORS.append(f"{rel(path)}: invalid Python syntax.")
        return None


def check_module_docstring(path: Path, tree: ast.Module) -> None:
    value = ast.get_docstring(tree, clean=True)
    if value is None:
        ERRORS.append(
            f"{rel(path)}: missing required opening module docstring explaining what this file does."
        )
    elif len(value.strip()) < MIN_MODULE_DOCSTRING_CHARS:
        ERRORS.append(
            f"{rel(path)}: opening module docstring is too vague; describe the file's responsibility and boundary."
        )


def dotted(node: ast.AST) -> str:
    if isinstance(node, ast.Name):
        return node.id
    if isinstance(node, ast.Attribute):
        prefix = dotted(node.value)
        return f"{prefix}.{node.attr}" if prefix else node.attr
    return ""


def imports(tree: ast.Module) -> set[str]:
    result: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom) and node.module:
            result.add(node.module)
        elif isinstance(node, ast.Import):
            result.update(alias.name for alias in node.names)
    return result


def has_orm_access(tree: ast.Module, imported: set[str]) -> bool:
    if any(name == "django.db" or name.startswith("django.db.") for name in imported):
        return True
    return any(
        (isinstance(node, ast.Attribute) and (node.attr == "objects" or dotted(node).endswith("transaction.atomic")))
        or (isinstance(node, ast.Name) and node.id == "QuerySet")
        for node in ast.walk(tree)
    )


def has_persistence_call(tree: ast.Module) -> bool:
    return any(
        isinstance(node, ast.Call)
        and isinstance(node.func, ast.Attribute)
        and node.func.attr in PERSISTENCE_METHODS
        for node in ast.walk(tree)
    )


def path_has(path: Path, part: str) -> bool:
    return part in path.relative_to(BACKEND).parts


def is_repository(path: Path) -> bool:
    return path_has(path, "repositories") and not path_has(path, "tests")


def is_service(path: Path) -> bool:
    return path_has(path, "services") and not path_has(path, "tests")


def is_model_module(path: Path) -> bool:
    return path.parent.name == "models" and path.name != "__init__.py"


def is_configuration(path: Path) -> bool:
    return path.parent.name == "configurations" and path.name != "__init__.py"


def is_controller(path: Path) -> bool:
    if not path_has(path, "api") or path_has(path, "tests") or path.name == "__init__.py":
        return False
    return path.name in {"controllers.py", "views.py"} or path_has(path, "controllers")


def is_dto(path: Path) -> bool:
    return (path.name == "dtos.py" or path_has(path, "dtos")) and not path_has(path, "tests")


def is_mapper(path: Path) -> bool:
    return path_has(path, "mappers") and not path_has(path, "tests") and not is_repository(path)


def is_test(path: Path) -> bool:
    return path.name.startswith("test_") or path_has(path, "tests")


def imports_models(imported: set[str]) -> bool:
    return any(name == "models" or name.endswith(".models") or ".models." in name for name in imported)


def imports_repositories(imported: set[str]) -> bool:
    return any(name == "repositories" or name.endswith(".repositories") or ".repositories." in name for name in imported)


def check_required_contracts() -> None:
    for name in (
        "backend-plan.md",
        "domain-model.md",
        "api-contract.md",
        "security-contract.md",
        "backend-validation-plan.md",
        "backend-implementation-contract.md",
    ):
        path = ROOT / "docs" / "architecture" / name
        if not path.exists():
            ERRORS.append(f"Missing backend contract: {rel(path)}.")


def check_project_context() -> None:
    required = (
        ".codex/references/backend-architecture.md",
        ".codex/references/domain-boundaries.md",
        ".codex/references/domain-skill-policy.md",
        ".codex/references/mapping-policy.md",
        ".codex/references/module-documentation.md",
        ".codex/references/migration-policy.md",
        ".codex/references/repository-policy.md",
        ".codex/workflows/backend-validation.md",
        ".codex/checklists/backend-validation.md",
    )
    for value in required:
        if not (ROOT / value).exists():
            WARNINGS.append(f"Missing resolved backend project context: {value}.")


def skill_frontmatter(path: Path, text: str) -> dict[str, str] | None:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        ERRORS.append(f"{rel(path)}: skill must start with YAML frontmatter.")
        return None
    try:
        end = next(index for index, line in enumerate(lines[1:], start=1) if line.strip() == "---")
    except StopIteration:
        ERRORS.append(f"{rel(path)}: skill frontmatter is not closed.")
        return None

    values: dict[str, str] = {}
    for line in lines[1:end]:
        match = re.fullmatch(r"([a-z_]+):\s*(.+)", line.strip())
        if not match:
            ERRORS.append(f"{rel(path)}: skill frontmatter must use simple name and description fields.")
            return None
        values[match.group(1)] = match.group(2).strip().strip('"\'')
    return values


def check_project_skills() -> None:
    root = ROOT / ".agents" / "skills"
    if not root.is_dir():
        ERRORS.append("Missing project-local backend architecture skill kit: .agents/skills/.")
        return

    for name in REQUIRED_LOCAL_SKILLS:
        if not (root / name).is_dir():
            ERRORS.append(f"Missing required project-local backend skill: .agents/skills/{name}/.")

    for directory in sorted(path for path in root.iterdir() if path.is_dir()):
        skill_path = directory / "SKILL.md"
        agent_path = directory / "agents" / "openai.yaml"
        if not skill_path.is_file():
            ERRORS.append(f"{rel(directory)}: project-local skill requires SKILL.md.")
            continue

        text = skill_path.read_text(encoding="utf-8", errors="ignore")
        if "TODO" in text:
            ERRORS.append(f"{rel(skill_path)}: project-local skill contains unresolved TODO placeholders.")
        values = skill_frontmatter(skill_path, text)
        if values is not None:
            unexpected = set(values) - {"name", "description"}
            if unexpected or set(values) != {"name", "description"}:
                ERRORS.append(f"{rel(skill_path)}: frontmatter must contain only name and description.")
            if values.get("name") != directory.name:
                ERRORS.append(f"{rel(skill_path)}: skill name must match directory '{directory.name}'.")
            if len(values.get("description", "")) < 40:
                ERRORS.append(f"{rel(skill_path)}: skill description must explain capability and triggers.")
        if "docs/architecture/backend-implementation-contract.md" not in text:
            ERRORS.append(f"{rel(skill_path)}: skill must defer to the approved implementation contract.")
        if ".codex/" not in text:
            ERRORS.append(f"{rel(skill_path)}: skill must read project-local .codex context.")

        if not agent_path.is_file():
            ERRORS.append(f"{rel(directory)}: project-local skill requires agents/openai.yaml.")
        else:
            agent_text = agent_path.read_text(encoding="utf-8", errors="ignore")
            if f"${directory.name}" not in agent_text:
                ERRORS.append(f"{rel(agent_path)}: default_prompt must explicitly invoke ${directory.name}.")


def model_classes(tree: ast.Module) -> list[ast.ClassDef]:
    return [
        node
        for node in tree.body
        if isinstance(node, ast.ClassDef)
        and any(dotted(base).endswith("Model") for base in node.bases)
    ]


def model_app_dir(path: Path) -> Path:
    return path.parent.parent if path.parent.name == "models" else path.parent


def check_model_file(path: Path, tree: ast.Module, imported: set[str]) -> None:
    classes = model_classes(tree)
    if not classes:
        return

    app_dir = model_app_dir(path)
    if not is_model_module(path):
        ERRORS.append(f"{rel(path)}: ORM Models must live one-per-module under models/; aggregate models.py is forbidden.")
    if len(classes) != 1:
        ERRORS.append(f"{rel(path)}: expected exactly one ORM Model per module, found {len(classes)}.")

    configuration_path = app_dir / "configurations" / f"{path.stem}.py"
    if not configuration_path.exists():
        ERRORS.append(
            f"{rel(path)}: missing matching configuration module "
            f"{configuration_path.relative_to(app_dir).as_posix()}."
        )
    if not any("configurations" in name for name in imported):
        ERRORS.append(f"{rel(path)}: Model must import specifications from its matching configurations/ module.")

    for node in classes:
        if not CAMEL_CASE.fullmatch(node.name):
            ERRORS.append(f"{rel(path)}:{node.lineno}: ORM Model '{node.name}' is not CamelCase.")
        for child in node.body:
            if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef)) and child.name != "__str__":
                ERRORS.append(
                    f"{rel(path)}:{child.lineno}: ORM Model '{node.name}' contains non-entity method "
                    f"'{child.name}'."
                )

    for node in ast.walk(tree):
        if not isinstance(node, ast.Call):
            continue
        for keyword in node.keywords:
            if keyword.arg in MODEL_SPEC_KEYWORDS and isinstance(keyword.value, ast.Constant):
                ERRORS.append(
                    f"{rel(path)}:{node.lineno}: literal {keyword.arg} belongs in the matching configurations/ module."
                )


def check_layer_file(path: Path, tree: ast.Module, imported: set[str]) -> None:
    normalized = rel(path)
    orm_access = has_orm_access(tree, imported)

    if is_repository(path):
        if "contracts" in path.stem and orm_access:
            ERRORS.append(f"{normalized}: repository contracts must not depend on Django ORM.")
        if path.stem in {"mapper", "mappers"} and (orm_access or has_persistence_call(tree)):
            ERRORS.append(f"{normalized}: repository mapper may transform ORM objects but must not query or persist.")
        return

    exempt = is_model_module(path) or is_configuration(path) or path.name in {"admin.py", "apps.py"} or is_test(path)
    if orm_access and not exempt:
        ERRORS.append(f"{normalized}: ORM/database access is exclusive to repositories.")

    if is_service(path):
        if any(name.startswith("rest_framework") or ".api" in name for name in imported):
            ERRORS.append(f"{normalized}: Service imports endpoint/HTTP code.")
        if imports_models(imported):
            ERRORS.append(f"{normalized}: Service imports ORM Models directly.")
        if any(name == "mappers" or name.endswith(".mappers") or ".mappers." in name for name in imported):
            ERRORS.append(f"{normalized}: Service must not depend on Controller/application mappers.")

    if is_controller(path):
        if path.name == "views.py":
            WARNINGS.append(f"{normalized}: prefer api/controllers/<use_case>.py for the Controller layer.")
        if imports_repositories(imported) or imports_models(imported):
            ERRORS.append(f"{normalized}: Controller must not import repositories or ORM Models.")
        text = path.read_text(encoding="utf-8", errors="ignore")
        uses_request_payload = "request.data" in text or "request.query_params" in text
        uses_dto = any(name == "dtos" or name.endswith(".dtos") or ".dtos." in name for name in imported)
        uses_mapper = any(name == "mappers" or name.endswith(".mappers") or ".mappers." in name for name in imported)
        if uses_request_payload and not uses_dto:
            ERRORS.append(f"{normalized}: Controller payload must be defined and validated by a DTO.")
        if uses_request_payload and not uses_mapper:
            ERRORS.append(f"{normalized}: Controller must delegate representation mapping to an explicit mapper.")

    if is_dto(path) and (imports_repositories(imported) or imports_models(imported)):
        ERRORS.append(f"{normalized}: DTO must not import repositories or ORM Models.")

    if is_mapper(path):
        if orm_access or imports_repositories(imported) or imports_models(imported):
            ERRORS.append(f"{normalized}: application mapper must not import or access persistence.")
        if any(name.startswith("rest_framework") or ".services" in name for name in imported):
            ERRORS.append(f"{normalized}: application mapper must depend on DTO types, not HTTP or Service implementations.")


def require_package(path: Path, app_dir: Path) -> None:
    if not path.is_dir():
        ERRORS.append(f"{rel(app_dir)}: missing required package {path.relative_to(app_dir).as_posix()}/.")
    elif not (path / "__init__.py").exists():
        ERRORS.append(f"{rel(path)}: Python package requires __init__.py.")


def check_app_shape(files: list[Path]) -> None:
    app_dirs: set[Path] = set()
    model_modules: dict[Path, list[Path]] = {}

    for path in files:
        tree = parse(path)
        if tree is None or not model_classes(tree):
            continue
        app_dir = model_app_dir(path)
        app_dirs.add(app_dir)
        model_modules.setdefault(app_dir, []).append(path)

    for app_dir in sorted(app_dirs):
        for package in (
            app_dir / "configurations",
            app_dir / "models",
            app_dir / "dtos",
            app_dir / "mappers",
            app_dir / "repositories",
            app_dir / "services",
            app_dir / "api",
            app_dir / "api" / "controllers",
            app_dir / "tests",
            app_dir / "migrations",
        ):
            require_package(package, app_dir)

        for test_layer in ("dtos", "mappers", "repositories", "services", "api"):
            layer = app_dir / "tests" / test_layer
            if not layer.is_dir():
                ERRORS.append(f"{rel(app_dir)}: missing layered test directory tests/{test_layer}/.")

        for legacy in (
            app_dir / "models.py",
            app_dir / "configurations.py",
            app_dir / "dtos.py",
            app_dir / "api" / "controllers.py",
        ):
            if legacy.exists():
                ERRORS.append(f"{rel(legacy)}: aggregate layer file is forbidden; use the corresponding package.")

        models_init = app_dir / "models" / "__init__.py"
        init_text = models_init.read_text(encoding="utf-8", errors="ignore") if models_init.exists() else ""
        for module in model_modules.get(app_dir, []):
            if module.parent.name != "models":
                continue
            pattern = rf"from\s+\.{re.escape(module.stem)}\s+import\s+"
            if not re.search(pattern, init_text):
                ERRORS.append(
                    f"{rel(models_init)}: explicitly import ORM Model(s) from .{module.stem} for Django discovery."
                )

        selectors = app_dir / "selectors"
        if selectors.exists():
            ERRORS.append(f"{rel(selectors)}: selectors are not allowed; move reads into repositories.")


def check_migration_provenance() -> None:
    for path in iter_py_files(BACKEND, include_migrations=True):
        if "migrations" not in path.parts or path.name == "__init__.py":
            continue
        header = "\n".join(path.read_text(encoding="utf-8", errors="ignore").splitlines()[:5])
        if "Generated by Django" not in header:
            ERRORS.append(f"{rel(path)}: migration lacks Django-generated provenance; do not handwrite migrations.")


def main() -> int:
    print("Django backend boundary scan")
    print("============================")
    files = iter_py_files(BACKEND) if BACKEND.exists() else []
    if not BACKEND.exists():
        ERRORS.append("Backend directory does not exist.")

    check_required_contracts()
    check_project_context()
    check_project_skills()
    check_app_shape(files)
    check_migration_provenance()

    for path in files:
        tree = parse(path)
        if tree is None:
            continue
        check_module_docstring(path, tree)
        imported = imports(tree)
        if model_classes(tree):
            check_model_file(path, tree, imported)
        check_layer_file(path, tree, imported)

    for warning in WARNINGS:
        print(f"warning: {warning}")
    for error in ERRORS:
        print(f"error: {error}")

    if ERRORS:
        print(f"failed: {len(ERRORS)} error(s), {len(WARNINGS)} warning(s)")
        return 1
    if WARNINGS:
        print(f"ok with warnings: {len(WARNINGS)} warning(s)")
        return 0
    print("ok: no architecture boundary violations found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
