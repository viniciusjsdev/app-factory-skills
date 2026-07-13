#!/usr/bin/env python3
"""Exercise both Django architecture scanners against valid and invalid fixtures."""

from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
FACTORY_ROOT = SCRIPT_DIR.parents[2]
SCANNERS = (
    SCRIPT_DIR / "scan-django-architecture.py",
    FACTORY_ROOT / "skills" / "django-backend-code-executor" / "scripts" / "scan-django-boundaries.py",
)
LOCAL_SKILLS = (
    "backend-domain-skill-author",
    "django-backend-testing",
    "django-controller",
    "django-dto-mapper",
    "django-migration",
    "django-model-configuration",
    "django-repository",
    "django-service",
)


def write(root: Path, relative: str, content: str = "") -> None:
    path = root / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix == ".py" and "migrations" not in path.parts:
        stripped = content.lstrip()
        if not stripped.startswith(('"""', "'''")):
            purpose = relative.replace("/", " ").replace("_", " ")
            content = f'"""Exercise the {purpose} responsibility in the scanner fixture."""\n\n{content}'
    path.write_text(content, encoding="utf-8")


def write_local_skill(root: Path, name: str) -> None:
    write(
        root,
        f".agents/skills/{name}/SKILL.md",
        "---\n"
        f"name: {name}\n"
        f"description: Exercise the approved {name} capability when its project-local backend workflow is required.\n"
        "---\n\n"
        f"# {name}\n\n"
        "Read docs/architecture/backend-implementation-contract.md and relevant .codex/references/ before work.\n",
    )
    write(
        root,
        f".agents/skills/{name}/agents/openai.yaml",
        "interface:\n"
        f"  display_name: \"{name}\"\n"
        '  short_description: "Exercise a project backend capability"\n'
        f'  default_prompt: "Use ${name} for the approved project workflow."\n',
    )


def build_fixture(root: Path) -> None:
    for name in (
        "backend-plan.md",
        "domain-model.md",
        "api-contract.md",
        "security-contract.md",
        "backend-validation-plan.md",
        "backend-implementation-contract.md",
    ):
        write(root, f"docs/architecture/{name}", f"# {name}\n")

    for relative in (
        ".codex/references/backend-architecture.md",
        ".codex/references/domain-boundaries.md",
        ".codex/references/domain-skill-policy.md",
        ".codex/references/mapping-policy.md",
        ".codex/references/module-documentation.md",
        ".codex/references/migration-policy.md",
        ".codex/references/repository-policy.md",
        ".codex/workflows/backend-validation.md",
        ".codex/checklists/backend-validation.md",
    ):
        write(root, relative, "# Context\n")

    for name in LOCAL_SKILLS:
        write_local_skill(root, name)
    write_local_skill(root, "order-lifecycle")

    app = "backend/apps/orders"
    for package in (
        "configurations",
        "models",
        "dtos",
        "mappers",
        "repositories",
        "services",
        "api",
        "api/controllers",
        "tests",
        "migrations",
    ):
        write(root, f"{app}/{package}/__init__.py")
    for layer in ("dtos", "mappers", "repositories", "services", "api"):
        write(root, f"{app}/tests/{layer}/__init__.py")

    write(
        root,
        f"{app}/configurations/order.py",
        "class OrderConfiguration:\n"
        "    NAME_MAX_LENGTH = 120\n"
        "    TABLE_NAME = 'orders'\n",
    )
    write(
        root,
        f"{app}/models/order.py",
        "from django.db import models\n"
        "from apps.orders.configurations.order import OrderConfiguration\n\n"
        "class Order(models.Model):\n"
        "    name = models.CharField(max_length=OrderConfiguration.NAME_MAX_LENGTH)\n\n"
        "    class Meta:\n"
        "        db_table = OrderConfiguration.TABLE_NAME\n",
    )
    write(root, f"{app}/models/__init__.py", "from .order import Order\n\n__all__ = ['Order']\n")
    write(
        root,
        f"{app}/dtos/create_order.py",
        "from dataclasses import dataclass\n\n"
        "@dataclass(frozen=True)\n"
        "class CreateOrderRequestDTO:\n"
        "    name: str\n\n"
        "@dataclass(frozen=True)\n"
        "class CreateOrderInput:\n"
        "    name: str\n",
    )
    write(
        root,
        f"{app}/mappers/create_order.py",
        "from apps.orders.dtos.create_order import CreateOrderInput, CreateOrderRequestDTO\n\n"
        "def to_service_input(payload: CreateOrderRequestDTO) -> CreateOrderInput:\n"
        "    return CreateOrderInput(name=payload.name)\n",
    )
    write(
        root,
        f"{app}/repositories/contracts.py",
        "from typing import Protocol\n\n"
        "class OrderRepository(Protocol):\n"
        "    def create(self, *, name: str) -> object: ...\n",
    )
    write(
        root,
        f"{app}/repositories/mappers.py",
        "from apps.orders.models.order import Order\n\n"
        "def to_record(instance: Order) -> dict[str, object]:\n"
        "    return {'id': instance.pk, 'name': instance.name}\n",
    )
    write(
        root,
        f"{app}/repositories/django_repository.py",
        "from apps.orders.models.order import Order\n\n"
        "class DjangoOrderRepository:\n"
        "    def create(self, *, name: str) -> Order:\n"
        "        return Order.objects.create(name=name)\n",
    )
    write(
        root,
        f"{app}/services/create_order.py",
        "from apps.orders.dtos.create_order import CreateOrderInput\n"
        "from apps.orders.repositories.contracts import OrderRepository\n\n"
        "class CreateOrderService:\n"
        "    def __init__(self, repository: OrderRepository) -> None:\n"
        "        self._repository = repository\n\n"
        "    def execute(self, payload: CreateOrderInput) -> object:\n"
        "        return self._repository.create(name=payload.name)\n",
    )
    write(
        root,
        f"{app}/api/controllers/create_order.py",
        "from apps.orders.dtos.create_order import CreateOrderRequestDTO\n"
        "from apps.orders.mappers.create_order import to_service_input\n"
        "from apps.orders.services.create_order import CreateOrderService\n\n"
        "def create_order(request, service: CreateOrderService):\n"
        "    payload = CreateOrderRequestDTO(**request.data)\n"
        "    return service.execute(to_service_input(payload))\n",
    )
    write(root, f"{app}/api/permissions.py")
    write(root, f"{app}/api/urls.py")
    write(root, f"{app}/composition.py")
    write(root, f"{app}/migrations/0001_initial.py", "# Generated by Django 5.0 on 2026-07-13\n")


def run(scanner: Path, root: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(scanner)],
        cwd=root,
        check=False,
        capture_output=True,
        text=True,
    )


def main() -> int:
    with tempfile.TemporaryDirectory(prefix="app-factory-django-scan-") as value:
        root = Path(value)
        build_fixture(root)

        for scanner in SCANNERS:
            result = run(scanner, root)
            if result.returncode != 0:
                raise AssertionError(f"valid scalable fixture failed {scanner}:\n{result.stdout}\n{result.stderr}")

        missing_skill = root / ".agents/skills/django-service/SKILL.md"
        missing_skill.unlink()
        result = run(SCANNERS[0], root)
        if result.returncode == 0 or "project-local skill requires SKILL.md" not in result.stdout:
            raise AssertionError(f"incomplete project-local skill kit was not rejected:\n{result.stdout}")
        write_local_skill(root, "django-service")

        write(root, "backend/apps/orders/models.py", "# forbidden aggregate\n")
        result = run(SCANNERS[0], root)
        if result.returncode == 0 or "aggregate layer file is forbidden" not in result.stdout:
            raise AssertionError(f"legacy models.py was not rejected:\n{result.stdout}")
        (root / "backend/apps/orders/models.py").unlink()

        undocumented = root / "backend/apps/orders/composition.py"
        undocumented.write_text("VALUE = 1\n", encoding="utf-8")
        result = run(SCANNERS[0], root)
        if result.returncode == 0 or "missing required opening module docstring" not in result.stdout:
            raise AssertionError(f"undocumented Python module was not rejected:\n{result.stdout}")

        undocumented.write_text('"""Utility."""\n\nVALUE = 1\n', encoding="utf-8")
        result = run(SCANNERS[0], root)
        if result.returncode == 0 or "opening module docstring is too vague" not in result.stdout:
            raise AssertionError(f"vague module documentation was not rejected:\n{result.stdout}")
        write(root, "backend/apps/orders/composition.py")

        mapper = root / "backend/apps/orders/mappers/create_order.py"
        mapper.write_text(
            mapper.read_text(encoding="utf-8") + "\nfrom apps.orders.models.order import Order\n",
            encoding="utf-8",
        )
        result = run(SCANNERS[0], root)
        if result.returncode == 0 or "application mapper must not import or access persistence" not in result.stdout:
            raise AssertionError(f"persistence-coupled mapper was not rejected:\n{result.stdout}")

    print("Django scalable architecture scanner tests passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
