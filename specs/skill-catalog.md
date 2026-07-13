# Skill Catalog

## product-brief-architect

Consumes product ideas, PRDs, notes, market problems, feature lists, or screen lists. Produces a compact or modular executable product contract. It does not write application code.

## app-factory-frontend-builder

Consumes executable product contracts and builds a complete React/TypeScript frontend using factory stack, feature architecture, mocks/adapters, responsive behavior, tests, and validation. It does not build Django or full-stack infrastructure.

In the standard visible site workflow, invoke it together with external `@sites`. Sites owns preview/private publication; the frontend skill remains authoritative for implementation and is not replaced by an npm hosting dependency.

## django-backend-service-architect

Consumes product/frontend/API contracts and creates backend planning, security, validation, and implementation contracts. It enriches root `.codex` backend context, materializes the compact project-local backend architecture kit under `.agents/skills/`, and audits completed code. It does not implement code or invent missing product semantics.

## app-factory-backend-router

Consumes an explicitly approved backend implementation contract. It detects OpenCode CLI, OpenCode Go authentication, and exact model availability; delegates one passive heavy-code run when ready; and requests automatic Codex fallback otherwise. It does not define backend architecture, monitor execution with model turns, store secrets, or approve the result.

## django-backend-code-executor

Consumes an explicitly approved backend implementation contract. It writes domain-first Django apps with one CamelCase ORM entity and matching Configuration per module, use-case DTO/explicit Mapper/Controller modules, repository-only database access, persistence-agnostic business Services, mandatory opening docstrings in authored Python modules, Django-command-generated migrations, and layered tests. It does not use AutoMapper reflection, approve, or change contracts.

## app-factory-infra-orchestrator

Consumes frontend/backend structure and deployment contracts to prepare Docker, environments, Supabase, frontend hosting, backend containers, or VPS paths. It does not choose a single production platform for every project.

Later skills run only after the artifacts they need exist. Each skill must report missing or contradictory inputs explicitly.
