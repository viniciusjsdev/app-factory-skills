# Skill Catalog

## product-brief-architect

Consumes product ideas, PRDs, notes, market problems, feature lists, or screen lists. Produces a compact or modular executable product contract. It does not write application code.

## app-factory-frontend-builder

Consumes executable product contracts and builds a complete React/TypeScript frontend using factory stack, feature architecture, mocks/adapters, responsive behavior, tests, and validation. It does not build Django or full-stack infrastructure.

In the standard visible site workflow, invoke it together with external `@sites`. Sites owns preview/private publication; the frontend skill remains authoritative for implementation and is not replaced by an npm hosting dependency.

## django-backend-service-architect

Consumes product/frontend/API contracts and creates backend planning, security, validation, and implementation contracts. It enriches root `.codex` backend context and audits completed code. It does not implement code or invent missing product semantics.

## django-backend-code-executor

Consumes an explicitly approved backend implementation contract. It writes Django code using CamelCase ORM entities, external model configurations, repository-only database access, persistence-agnostic business services, DTO-defined controller payloads, thin controllers, Django-command-generated migrations, and tests. It does not approve or change contracts.

## app-factory-infra-orchestrator

Consumes frontend/backend structure and deployment contracts to prepare Docker, environments, Supabase, frontend hosting, backend containers, or VPS paths. It does not choose a single production platform for every project.

Later skills run only after the artifacts they need exist. Each skill must report missing or contradictory inputs explicitly.
