# Backend Planning Specs

## Required files

Create or update:

```txt
docs/architecture/backend-plan.md
docs/architecture/domain-model.md
docs/architecture/api-contract.md
docs/architecture/security-contract.md
docs/architecture/backend-validation-plan.md
docs/architecture/backend-implementation-contract.md
```

Preserve equivalent existing paths and record the mapping in `backend-plan.md`.

## Backend plan

Include source documents, scope, non-goals, apps, dependencies, database ownership, environment assumptions, rollout constraints, and open decisions.

## Domain model

For each entity, include:

- CamelCase ORM class name;
- snake_case `models/<entity>.py` and matching `configurations/<entity>.py` modules;
- app ownership;
- relationships and lifecycle;
- actor/account/tenant ownership;
- invariants;
- repository operations;
- configuration values and constraints;
- expected migration impact.

## API contract

For each endpoint, include controller, request DTO, response DTO, service, repository interaction, permissions, sensitive fields, status codes, and errors.

Name the `dtos/<use_case>.py`, `mappers/<use_case>.py`, and `api/controllers/<use_case>.py` modules. Define request-to-service and result-to-response transformations explicitly.

## Security contract

Include auth mode, object-level authorization, CORS, throttling, sensitive-data handling, session/token invalidation, logging restrictions, and safe errors.

## Validation plan

Include unit, repository, API, permission, module-docstring, migration-generation, architecture-scan, and integration checks. Name the exact commands where the project defines them.

## Implementation contract

Include:

- exact approval frontmatter with `status`, positive integer `contract_version`, and ISO `approved_at` date;
- writable and forbidden paths;
- files/layers expected for each app;
- scalable package/module layout and explicit mapper responsibilities;
- business services and invariants;
- repository contracts and ORM implementations;
- DTO/controller mappings;
- mandatory opening module docstrings and the contract or `BR-###` references expected in behavioral files;
- project-local architecture skills required by each implementation area and any approved product-specific domain-skill candidates;
- Django commands allowed to generate and apply migrations;
- tests and completion evidence;
- unresolved blockers.

Do not embed executor-specific configuration or credentials.
