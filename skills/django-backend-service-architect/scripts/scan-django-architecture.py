#!/usr/bin/env python3
from __future__ import annotations

import ast
import os
from pathlib import Path


ROOT = Path.cwd()
BACKEND = ROOT / "backend" if (ROOT / "backend").exists() else ROOT
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
    "migrations",
}

WORKFLOW_TERMS = (
    "send_mail",
    "requests.",
    "httpx.",
    "stripe",
    "openai",
    "transaction.atomic",
    ".save(",
    ".delete(",
)


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def iter_py_files(base: Path) -> list[Path]:
    files: list[Path] = []
    for path, dirs, names in os.walk(base):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        for name in names:
            if name.endswith(".py"):
                files.append(Path(path) / name)
    return files


def line_count(path: Path) -> int:
    return len(path.read_text(encoding="utf-8", errors="ignore").splitlines())


def imports_from(path: Path) -> set[str]:
    try:
        tree = ast.parse(path.read_text(encoding="utf-8", errors="ignore"))
    except SyntaxError:
        WARNINGS.append(f"{rel(path)}: could not parse Python syntax.")
        return set()

    imports: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom) and node.module:
            imports.add(node.module)
        elif isinstance(node, ast.Import):
            for alias in node.names:
                imports.add(alias.name)
    return imports


def check_env_example() -> None:
    if not (BACKEND / ".env.example").exists() and not (ROOT / ".env.example").exists():
        WARNINGS.append("Missing .env.example for backend configuration.")


def check_api_contract() -> None:
    candidates = [
        ROOT / "docs" / "architecture" / "api-contract.md",
        ROOT / "docs" / "api-contract.md",
        BACKEND / "docs" / "api-contract.md",
    ]
    if not any(path.exists() for path in candidates):
        WARNINGS.append("Missing API contract documentation.")


def check_apps(files: list[Path]) -> None:
    app_dirs = sorted({path.parent for path in files if path.name == "models.py" and "apps" in path.parts})
    for app_dir in app_dirs:
        tests_dir = app_dir / "tests"
        if not tests_dir.exists() or not list(tests_dir.glob("test_*.py")):
            WARNINGS.append(f"{rel(app_dir)}: app has models but no test_*.py files under tests/.")
        if not (app_dir / "services").exists():
            WARNINGS.append(f"{rel(app_dir)}: app has no services/ directory.")
        if not (app_dir / "selectors").exists():
            WARNINGS.append(f"{rel(app_dir)}: app has no selectors/ directory.")


def check_file_patterns(files: list[Path]) -> None:
    for path in files:
        text = path.read_text(encoding="utf-8", errors="ignore")
        normalized = rel(path)
        imports = imports_from(path)
        is_view = "/api/views.py" in normalized or normalized.endswith("/views.py")
        is_serializer = normalized.endswith("serializers.py")
        is_service = "/services/" in normalized

        if is_view and line_count(path) > 180:
            WARNINGS.append(f"{normalized}: view file is long; keep controllers thin.")

        if is_view and any(part.endswith(".models") or part == "models" for part in imports):
            if ".save(" in text or ".delete(" in text or ".objects.create(" in text:
                WARNINGS.append(f"{normalized}: view imports models and appears to mutate data directly.")

        if is_service and any("views" in item for item in imports):
            ERRORS.append(f"{normalized}: service imports views/controllers.")

        if is_serializer and any(term in text for term in WORKFLOW_TERMS):
            WARNINGS.append(f"{normalized}: serializer contains possible workflow/business logic.")


def main() -> int:
    print("Django backend architecture scan")
    print("================================")
    if not BACKEND.exists():
        ERRORS.append("Backend directory does not exist.")
    files = iter_py_files(BACKEND) if BACKEND.exists() else []
    check_env_example()
    check_api_contract()
    check_apps(files)
    check_file_patterns(files)

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
    print("ok: no architecture warnings found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

