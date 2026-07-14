---
status: pending-approval
contract_version: 1
approved_at: null
---

# Backend Implementation Contract

## Source contracts

- `docs/architecture/backend-plan.md`
- `docs/architecture/domain-model.md`
- `docs/architecture/api-contract.md`
- `docs/architecture/security-contract.md`
- `docs/architecture/backend-validation-plan.md`
- `docs/architecture/backend-contract-manifest.json`

The Markdown contracts explain intent. The JSON manifest is the canonical machine-readable map for contract version, services, environment bindings, invariants, endpoints, and required validations. Resolve every placeholder and keep both representations synchronized before approval.

## Writable scope

```txt
backend/**
docs/validation/backend-audit.md
```

## Forbidden scope

```txt
frontend/**
.env
.env.*
.agents/**
.codex/**
AGENTS.md
docs/architecture/**
opencode.json
backend/**/migrations/*.py (pre-existing only)
```

## Required architecture

Use per-domain packages for CamelCase Models, matching Configurations, use-case DTOs, explicit Mappers, Repositories, Services, thin manifest-mapped Controllers, composition, and layered tests. Prefer one use-case Controller; same-path methods may share only one explicitly contracted resource Controller.

- Repositories exclusively own ORM reads and writes.
- Services own business invariants without ORM, QuerySets, HTTP, or endpoints.
- Controllers contain endpoint transport and use DTO-defined payloads.
- Models declare entities; Configurations define specifications.
- Mappers perform explicit representation conversion without AutoMapper reflection.
- Every authored Python module starts with a meaningful responsibility/boundary docstring.
- Django-generated migrations remain untouched and are produced only by management commands.

## App implementation map

For each app, list exact Model/Configuration, DTO, Mapper, Repository, Service, Controller, composition, and test modules. Keep Controller paths identical to `backend-contract-manifest.json`.

## Migration commands

```bash
python manage.py makemigrations replace_me
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py showmigrations
```

Never handwrite, patch, or add documentation to a generated migration.
Keep every permitted generation command identical to `allowed_execution_commands` in `backend-contract-manifest.json`; compound shell commands are forbidden.

## Completion evidence

Return evidence conforming to `django-backend-code-executor/assets/completion.schema.json`, including `contract_evidence` for every invariant/endpoint ID, `validation_evidence` for every required validation ID, and all validation limitations.

## Unresolved blockers

List blockers here. Do not change `status` to `approved` until none prevents implementation or required validation and the user explicitly approves this contract version.
