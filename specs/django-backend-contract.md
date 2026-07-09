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

## Mandatory Preflight

An AI agent must not use `django-backend-service-architect` to create or modify backend code until the minimum context is available.

Minimum context:

- PRD, product brief, domain notes or equivalent product description
- API contract, frontend services/mocks or normalized frontend code that shows required endpoints
- clear entities and user flows
- authentication/authorization expectations
- sensitive data expectations

If these requirements are not met, the agent must stop and tell the user what is missing. It may produce a missing-requirements report, but it must not create Django files, models, migrations, services, serializers or views.

## Planning Specs Before Implementation

Before creating or changing Django implementation files, the backend stage must create or update backend planning specs in the target project.

Required spec files:

- `docs/architecture/backend-plan.md`
- `docs/architecture/domain-model.md`
- `docs/architecture/api-contract.md`
- `docs/architecture/security-contract.md`
- `docs/architecture/backend-validation-plan.md`

The specs must cover:

- product assumptions used
- entities and relationships
- ownership model
- user roles and permissions
- API endpoints and DTOs
- services/actions
- selectors/read models
- auth mode
- rate limits and IP throttling
- CORS requirements
- sensitive data handling
- logout/session/token invalidation
- database migration ownership
- tests and validation commands

After writing specs, the AI agent must summarize backend decisions to the user before proceeding with implementation. If the user only asked for planning, stop after the specs and summary. If the available context is insufficient to create safe specs, stop and report what is missing.

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
- backend planning specs
- validation report

## Security Contract

The backend stage must derive security rules from the PRD, product specs, frontend flows and API contract.

Every API endpoint should document:

- authentication requirement
- permission rule
- rate limit expectation, including whether IP-based limiting is required
- whether sensitive data is returned
- masking, encryption or omission rules for sensitive fields
- logout/session/token invalidation behavior when relevant

Backend implementation should include or explicitly document:

- environment-driven CORS
- local-only permissive origins
- restricted production origins
- rate limiting for anonymous and authenticated requests where relevant
- object-level authorization for private/user/account/tenant data
- server-side validation of actor ownership and access scope
- safe error responses without internal details
- no plaintext secrets or tokens in logs or API responses
- logout invalidation strategy for the selected auth mode

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
- CORS environment variables
- rate limit configuration
- auth/logout invalidation notes
