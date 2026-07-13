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

Consumer: `app-factory-backend-router`, then OpenCode Go or Codex using `django-backend-code-executor`

Required output: explicitly approved backend implementation contract, domain/API/security/validation contracts, resolved project-root `.codex` backend context, compact `.agents/skills/` architecture kit, scalable per-domain package/module map, explicit mapper responsibilities, authored-module documentation policy, writable scope, migration policy, and layered test expectations.

Routing rule: use OpenCode only when its CLI, OpenCode Go credential, and configured model are ready. Otherwise continue with Codex without changing the approved contract. OpenCode execution waits passively and emits one final completion/error result; no executor configuration enters the generated project's `.codex/`.

## Backend implementation to audit

Producer: `django-backend-code-executor`

Consumer: `django-backend-service-architect`

Required output: Django implementation with meaningful opening docstrings in every authored Python module, untouched Django-generated migrations, layered tests including mapper coverage, command results, architecture scan, changed-file manifest, contract deviations, and unresolved items.

## Backend to infrastructure

Producer: audited output from `django-backend-service-architect`

Consumer: `app-factory-infra-orchestrator`

Required output: backend structure, environment example, database ownership, migrations and server commands, health endpoint, CORS/auth/rate-limit expectations, API contract, container compatibility, and validation status.

## Infrastructure to validation/publication

Producer: `app-factory-infra-orchestrator`

Consumer: user and selected deployment target

Required output: local orchestration, service Docker assets where applicable, environment contracts, deployment instructions/configuration, secrets boundaries, smoke-test commands, and honest validation status.
