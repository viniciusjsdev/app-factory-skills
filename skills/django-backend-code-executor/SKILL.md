---
name: django-backend-code-executor
description: Implement an approved Django backend implementation contract using strict Controller, DTO, Service, Repository, ORM Model, and Configuration boundaries. Use when an App Factory project already has approved backend architecture, API, security, validation, and implementation contracts and Codex or another coding executor must write the backend, generate migrations through Django commands, add tests, validate the result, and return completion evidence. Do not use for backend planning, product decisions, contract approval, frontend work, infrastructure work, or implementation without approved contracts.
---

# Django Backend Code Executor

## Purpose

Implement approved backend contracts without changing product or architecture decisions. This skill is executor-neutral: Codex, OpenCode, or another coding agent may use it.

## Mandatory Preflight

Require:

```txt
docs/architecture/backend-plan.md
docs/architecture/domain-model.md
docs/architecture/api-contract.md
docs/architecture/security-contract.md
docs/architecture/backend-validation-plan.md
docs/architecture/backend-implementation-contract.md
```

Verify `backend-implementation-contract.md` has `status: approved`, a contract version, and no unresolved implementation blocker. Inspect relevant `.codex/references/` and `AGENTS.md`.

If the gate fails, do not create or modify backend code. Return a missing-contract or approval report.

## Non-negotiable Architecture

```txt
HTTP -> Controller -> Request DTO -> Service -> Repository contract
Repository implementation -> Django ORM Model
Service -> Response DTO -> Controller -> HTTP
```

Enforce:

- CamelCase ORM class names;
- models declare entities only;
- `configurations.py` defines model specifications;
- repositories exclusively perform ORM reads and writes;
- controllers contain endpoint transport only;
- DTOs define every payload used by controllers;
- services own business rules without endpoint or direct database access;
- migrations are generated only through Django management commands and never handwritten or patched.

Read `references/architecture-standard.md` before editing code.

## Implementation Workflow

1. Read the approved contracts and project context.
2. Inspect the existing backend, package manager, settings, tests, and migration state.
3. Produce a concise implementation plan mapped to the approved contract.
4. Create or update model configuration objects.
5. Declare CamelCase ORM entities using configuration values.
6. Implement repository contracts and Django ORM repositories.
7. Implement services against repository/Unit of Work contracts.
8. Implement DTOs and thin controllers.
9. Wire dependencies in composition modules.
10. Add tests by layer.
11. Run Django commands to generate and apply migrations.
12. Run project checks, tests, and `scripts/scan-django-boundaries.py`.
13. Produce completion evidence matching `assets/completion.schema.json`.

Do not alter approved contracts during implementation. If the code cannot satisfy them, stop with `contract-review-required` and describe the conflict.

## Layer Rules

Read as needed:

- `references/model-configuration-rules.md` before models or configurations.
- `references/repository-rules.md` before persistence code.
- `references/service-rules.md` before business workflows.
- `references/dto-controller-rules.md` before payloads or endpoints.
- `references/migration-command-rules.md` before schema changes.
- `references/security-implementation-rules.md` before auth, permissions, sensitive data, CORS, throttling, or sessions.
- `references/testing-rules.md` before tests.
- `references/completion-protocol.md` before returning results.
- `references/validation-checklist.md` before finishing.

## Expected App Shape

Create only files required by the contract:

```txt
apps/<app_name>/
  configurations.py
  models.py
  dtos.py
  composition.py
  repositories/
    contracts.py
    django_repository.py
    unit_of_work.py        optional
  services/
  api/
    controllers.py
    permissions.py
    urls.py
  tests/
    test_dtos.py
    test_repositories.py
    test_services.py
    test_api.py
  migrations/
```

Do not introduce `selectors/`. Repository methods own read behavior.

## Migration Workflow

Never use a file-editing tool on a migration Python file.

Use the project-equivalent commands:

```bash
python manage.py makemigrations <app_label>
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py showmigrations
```

If Django generates an incorrect migration, change the entity/configuration and regenerate safely. Do not repair the generated file manually. Do not create handwritten data migrations; use an approved management-command backfill workflow.

## Validation

Run available equivalents of:

```bash
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py test
python scripts/scan-django-boundaries.py
```

Use the repository's pytest, ruff, mypy, Docker, or task-runner commands when defined. Do not hide a failure with `|| true`. Report unavailable dependencies or services exactly.

## Completion

Return one of:

- `completed`;
- `blocked`;
- `failed`;
- `contract-review-required`.

Completion evidence must list contract version, files changed, Django commands, generated migrations, tests, scanner result, deviations, and unresolved items. Never self-approve architectural compliance; the architect/auditor performs final approval.

## Definition of Done

- approved contract gate passed;
- implementation stays inside allowed scope;
- all architecture invariants hold;
- migrations were generated by Django commands only;
- tests cover DTOs, services, repositories, APIs, and security requirements;
- validation commands were attempted and truthfully reported;
- completion evidence conforms to the schema;
- no contract, secret, frontend, infrastructure, or executor configuration was changed outside approved scope.
