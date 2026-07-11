# Factory Handoff Contracts

## Product to frontend

Producer: `product-brief-architect`

Consumer: external `@sites` composed with `app-factory-frontend-builder`

Required output: product source of truth, scope/non-scope, primary journey, routes/screens/states/interactions, numbered business rules, data/DTO contract, visual direction, acceptance criteria, assumptions, and open questions.

Invocation rule: Sites owns preview/private publication; the frontend builder owns stack, architecture, security, code quality, and application validation. Do not install Sites merely to reference the plugin.

## Frontend to backend

Producer: `app-factory-frontend-builder`

Consumer: `django-backend-service-architect`

Required output: implemented frontend, architecture notes, repository/service contracts, mock DTOs, future API contract, environment expectations, validation report, and any variance from product contracts.

## Backend architecture to implementation

Producer: `django-backend-service-architect`

Consumer: `django-backend-code-executor`

Required output: explicitly approved backend implementation contract, domain/API/security/validation contracts, resolved project-root `.codex` backend context, writable scope, migration policy, and test expectations.

## Backend implementation to audit

Producer: `django-backend-code-executor`

Consumer: `django-backend-service-architect`

Required output: Django implementation, Django-generated migrations, tests, command results, architecture scan, changed-file manifest, contract deviations, and unresolved items.

## Backend to infrastructure

Producer: audited output from `django-backend-service-architect`

Consumer: `app-factory-infra-orchestrator`

Required output: backend structure, environment example, database ownership, migrations and server commands, health endpoint, CORS/auth/rate-limit expectations, API contract, container compatibility, and validation status.

## Infrastructure to validation/publication

Producer: `app-factory-infra-orchestrator`

Consumer: user and selected deployment target

Required output: local orchestration, service Docker assets where applicable, environment contracts, deployment instructions/configuration, secrets boundaries, smoke-test commands, and honest validation status.
