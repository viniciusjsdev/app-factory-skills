---
name: django-model-configuration
description: Implement or revise approved Django ORM entities and their external Configuration modules. Use when changing files under models/ or configurations/, exporting Models for Django discovery, or translating an approved domain model into fields, relationships, indexes, constraints, choices, defaults, and table metadata. Do not use for repositories, business Services, Controllers, or manual migration editing.
---

# Django Model Configuration

Implement the approved entity declaration without adding business or persistence behavior.

## Required Context

Read `AGENTS.md`, `docs/architecture/domain-model.md`, `docs/architecture/backend-implementation-contract.md`, `.codex/references/model-configuration.md`, `.codex/references/module-documentation.md`, and `.codex/references/migration-policy.md`.

Require an approved implementation contract before changing code. Stop with `contract-review-required` if fields, ownership, relationships, constraints, or writable scope are unresolved.

## Workflow

1. Inspect the existing app, Models, Configurations, exports, and generated migration state.
2. Create or update `configurations/<entity>.py` before the matching Model.
3. Define one CamelCase ORM Model in `models/<entity>.py` and reference Configuration values.
4. Keep the Model limited to fields, relationships, `Meta` wiring, and `__str__`.
5. Export the concrete Model explicitly from `models/__init__.py`.
6. Add meaningful opening module docstrings to every authored Python file changed.
7. Run focused model checks and hand schema generation to `$django-migration`.

## Boundaries

- Do not place queries, persistence calls, business workflows, HTTP behavior, or integration calls in Models.
- Do not scatter field sizes, choices, defaults, validators, indexes, constraints, or table names outside the matching Configuration.
- Do not create aggregate `models.py` or `configurations.py` files.
- Do not create, edit, or patch migration files.

Finish only when Model/Configuration names match, Django discovery exports are explicit, docstrings explain responsibility, and the implementation remains inside the approved contract.
