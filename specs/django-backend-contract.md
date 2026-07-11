# Django Backend Contract

## Inputs

Consume product contracts, numbered business rules, data/DTO contracts, authorization and sensitive-data expectations, acceptance criteria, frontend architecture, and frontend service/API contracts.

## Architecture stage

Producer: `django-backend-service-architect`

Create:

- `docs/architecture/backend-plan.md`
- `docs/architecture/domain-model.md`
- `docs/architecture/api-contract.md`
- `docs/architecture/security-contract.md`
- `docs/architecture/backend-validation-plan.md`
- `docs/architecture/backend-implementation-contract.md`
- resolved backend context under project-root `.codex/`

Summarize entities, ownership, repositories, services, DTO/controller groups, auth/permissions, sensitive data, migrations, validation, and open assumptions. Implementation requires explicit approval metadata.

## Implementation stage

Producer: `django-backend-code-executor`

Implement:

```txt
Controller -> DTO -> Service -> Repository contract -> Django Repository -> ORM Model
```

Required invariants:

- ORM entity class names use CamelCase.
- Models declare entities and reference specifications from `configurations.py`.
- Repositories exclusively own ORM queries and persistence.
- Controllers contain endpoint transport and use DTO-defined payloads.
- Services own business rules without endpoints, HTTP types, ORM imports, QuerySets, or direct database access.
- Schema migrations are generated only through Django management commands and are never handwritten or patched.

Return code, generated migrations, tests, command results, architecture scan, and structured completion evidence.

## Audit stage

Producer: `django-backend-service-architect`

Compare approved contracts with code, generated migrations, tests, and execution evidence. Return approval or bounded correction findings without changing implementation code.
