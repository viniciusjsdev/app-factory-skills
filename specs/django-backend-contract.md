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
- compact project-local backend architecture kit under `.agents/skills/`

Summarize entities, ownership, repositories, services, DTO/controller groups, auth/permissions, sensitive data, migrations, validation, and open assumptions. Implementation requires explicit approval metadata.

## Implementation stage

Producer: `django-backend-code-executor`

Router: `app-factory-backend-router` selects OpenCode Go when ready or Codex as fallback. Executor selection does not change this contract.

Implement:

```txt
Controller -> Request DTO -> Explicit Mapper -> Service -> Repository contract
Django Repository -> ORM Model
Service Result -> Explicit Mapper -> Response DTO -> Controller
```

Required invariants:

- ORM entity class names use CamelCase.
- Each Model lives in a snake_case module under `models/`, is exported from `models/__init__.py`, and references the matching `configurations/` module.
- DTOs, explicit Mappers, and Controllers use per-use-case modules; AutoMapper-style reflection dependencies are forbidden.
- Application Mappers perform representation conversion only; ORM/record Mappers remain repository-local and never query or persist.
- Repositories exclusively own ORM queries and persistence.
- Controllers contain endpoint transport and use DTO-defined payloads.
- Services own business rules without endpoints, HTTP types, ORM imports, QuerySets, or direct database access.
- Every authored backend Python module, including tests and package `__init__.py` files, starts with a meaningful docstring explaining what it does, its responsibility and boundary, and relevant contract or `BR-###` references when applicable.
- Django-generated migration files are the sole docstring exception and must never be patched to add documentation.
- Project-local layer skills route focused implementation work but never override approved contracts or `.codex` references.
- Schema migrations are generated only through Django management commands and are never handwritten or patched.

Return code, generated migrations, layered DTO/Mapper/Service/Repository/API tests, command results, architecture scan, and structured completion evidence.

## Audit stage

Producer: `django-backend-service-architect`

Compare approved contracts with code, generated migrations, tests, and execution evidence. Return approval or bounded correction findings without changing implementation code.
