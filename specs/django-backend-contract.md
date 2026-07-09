# Django Backend Contract

## Input

The Django backend stage starts after Lovable frontend normalization.

Expected inputs:

- `docs/product/prd.md` when available
- `docs/product/domain.md` when available
- `docs/product/screens.md` when available
- `docs/product/user-flows.md` when available
- `docs/architecture/api-contract.md`
- `docs/architecture/frontend-architecture.md`
- normalized frontend service calls and mock data when docs are incomplete

## Output

The backend stage should produce:

- Django project under `backend/`
- environment-driven settings
- PostgreSQL configuration
- health endpoint
- domain apps
- models
- services
- selectors
- DTOs/serializers
- API views/controllers
- tests
- updated API contract
- validation report

## Architecture

Use this direction:

```txt
HTTP -> View/Controller -> Serializer/DTO -> Service -> Model
HTTP -> View/Controller -> Selector -> Model
```

Business rules belong in services. Read logic belongs in selectors. Views stay thin.

## Handoff to Infrastructure

The backend must expose enough deployment information for `app-factory-infra-orchestrator`:

- required environment variables
- database URL expectation
- Docker commands
- migration command
- health endpoint
- production server command
