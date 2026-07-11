#!/usr/bin/env python3
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
        for name in names:
            if name.endswith(".py"):
                files.append(Path(current) / name)
    return files


def parse(path: Path) -> ast.Module | None:
    try:
        return ast.parse(path.read_text(encoding="utf-8", errors="ignore"))
    except SyntaxError:
        ERRORS.append(f"{rel(path)}: invalid Python syntax.")
        return None


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
    for node in ast.walk(tree):
        if isinstance(node, ast.Attribute) and node.attr == "objects":
            return True
        if isinstance(node, ast.Name) and node.id == "QuerySet":
            return True
        if isinstance(node, ast.Attribute) and dotted(node).endswith("transaction.atomic"):
            return True
    return False


def path_has(path: Path, part: str) -> bool:
    return part in path.relative_to(BACKEND).parts


def is_repository(path: Path) -> bool:
    return path_has(path, "repositories")


def is_service(path: Path) -> bool:
    return path_has(path, "services")


def is_controller(path: Path) -> bool:
    return path.name in {"controllers.py", "views.py"} and path_has(path, "api")


def is_dto(path: Path) -> bool:
    return path.name == "dtos.py" or path_has(path, "dtos")


def is_test(path: Path) -> bool:
    return path.name.startswith("test_") or path_has(path, "tests")


def check_required_contracts() -> None:
    required = (
        "backend-plan.md",
        "domain-model.md",
        "api-contract.md",
        "security-contract.md",
        "backend-validation-plan.md",
        "backend-implementation-contract.md",
    )
    for name in required:
        path = ROOT / "docs" / "architecture" / name
        if not path.exists():
            ERRORS.append(f"Missing backend contract: {rel(path)}.")


def check_project_context() -> None:
    required = (
        ".codex/references/backend-architecture.md",
        ".codex/references/domain-boundaries.md",
        ".codex/references/migration-policy.md",
        ".codex/references/repository-policy.md",
        ".codex/workflows/backend-validation.md",
        ".codex/checklists/backend-validation.md",
    )
    for value in required:
        if not (ROOT / value).exists():
            WARNINGS.append(f"Missing resolved backend project context: {value}.")


def check_model_file(path: Path, tree: ast.Module, imported: set[str]) -> None:
    model_classes = [
        node
        for node in tree.body
        if isinstance(node, ast.ClassDef)
        and any(dotted(base).endswith("Model") for base in node.bases)
    ]
    if not model_classes:
        return

    configuration_path = path.parent / "configurations.py"
    if not configuration_path.exists():
        ERRORS.append(f"{rel(path.parent)}: models.py requires configurations.py.")
    if not any(name.endswith("configurations") or ".configurations" in name for name in imported):
        ERRORS.append(f"{rel(path)}: models must import model specifications from configurations.py.")

    for node in model_classes:
        if not CAMEL_CASE.fullmatch(node.name):
            ERRORS.append(f"{rel(path)}:{node.lineno}: ORM model '{node.name}' is not CamelCase.")
        for child in node.body:
            if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef)) and child.name != "__str__":
                ERRORS.append(
                    f"{rel(path)}:{child.lineno}: ORM model '{node.name}' contains method "
                    f"'{child.name}'; models must declare entities only."
                )

    for node in ast.walk(tree):
        if not isinstance(node, ast.Call):
            continue
        for keyword in node.keywords:
            if keyword.arg in MODEL_SPEC_KEYWORDS and isinstance(keyword.value, ast.Constant):
                ERRORS.append(
                    f"{rel(path)}:{node.lineno}: literal {keyword.arg} belongs in configurations.py."
                )


def check_layer_file(path: Path, tree: ast.Module, imported: set[str]) -> None:
    orm_access = has_orm_access(tree, imported)
    normalized = rel(path)

    if is_repository(path):
        if "contracts" in path.stem and orm_access:
            ERRORS.append(f"{normalized}: repository contracts must not depend on Django ORM.")
        return

    exempt = path.name in {"models.py", "configurations.py", "admin.py", "apps.py"} or is_test(path)
    if orm_access and not exempt:
        ERRORS.append(f"{normalized}: ORM/database access is exclusive to repositories.")

    if is_service(path):
        if any(name.startswith("rest_framework") or ".api" in name for name in imported):
            ERRORS.append(f"{normalized}: service imports endpoint/HTTP code.")
        if any(name.endswith(".models") or name == "models" for name in imported):
            ERRORS.append(f"{normalized}: service imports ORM models directly.")

    if is_controller(path):
        if path.name == "views.py":
            WARNINGS.append(f"{normalized}: prefer api/controllers.py for the controller layer.")
        if any("repositories" in name or name.endswith(".models") for name in imported):
            ERRORS.append(f"{normalized}: controller must not import repositories or ORM models.")
        text = path.read_text(encoding="utf-8", errors="ignore")
        uses_request_payload = "request.data" in text or "request.query_params" in text
        uses_dto = any(name.endswith("dtos") or ".dtos" in name for name in imported)
        if uses_request_payload and not uses_dto:
            ERRORS.append(f"{normalized}: controller payload must be defined and validated by a DTO.")

    if is_dto(path):
        if any("repositories" in name or name.endswith(".models") for name in imported):
            ERRORS.append(f"{normalized}: DTO must not import repositories or ORM models.")


def check_app_shape(files: list[Path]) -> None:
    app_dirs: list[Path] = []
    for path in files:
        if path.name != "models.py" or "apps" not in path.parts:
            continue
        tree = parse(path)
        if tree and any(
            isinstance(node, ast.ClassDef)
            and any(dotted(base).endswith("Model") for base in node.bases)
            for node in tree.body
        ):
            app_dirs.append(path.parent)
    app_dirs = sorted(set(app_dirs))
    for app_dir in app_dirs:
        required_paths = (
            app_dir / "configurations.py",
            app_dir / "dtos.py",
            app_dir / "repositories",
            app_dir / "services",
            app_dir / "api" / "controllers.py",
            app_dir / "tests",
        )
        for path in required_paths:
            if not path.exists():
                ERRORS.append(f"{rel(app_dir)}: missing required layer {path.relative_to(app_dir).as_posix()}.")
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
    if not BACKEND.exists():
        ERRORS.append("Backend directory does not exist.")
        files: list[Path] = []
    else:
        files = iter_py_files(BACKEND)

    check_required_contracts()
    check_project_context()
    check_app_shape(files)
    check_migration_provenance()

    for path in files:
        tree = parse(path)
        if tree is None:
            continue
        imported = imports(tree)
        if path.name == "models.py":
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
