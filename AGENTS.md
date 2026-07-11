## App Factory Skills Repository

This repository contains independent Codex skills for direct MVP and prototype creation.

Rules:

- Treat each folder under `skills/` as an independent skill.
- Keep installable skills in `skills/`, not `.codex/` or `.agents/skills/`.
- Keep product definition, frontend construction, backend work, and infrastructure work in separate skills.
- Keep root `docs/` and `specs/` focused on workflow, routing, and handoff contracts.
- Keep `.codex/` focused on factory-level workflows, references, checklists, goals, and templates.
- Keep `templates/` focused on reusable generated-project starter material.
- Keep `examples/` focused on sample contracts and project structures.
- Keep executable instructions, scripts, and detailed references inside the relevant skill folder.
- Start from a PRD, product brief, client notes, or rough idea.
- Use `product-brief-architect` to create an executable product contract.
- Use `app-factory-frontend-builder` to implement the React frontend directly from product contracts.
- For the standard visible site flow, invoke external `@sites` together with `$app-factory-frontend-builder`; Sites owns preview/publication and the frontend skill owns implementation standards.
- Do not install Sites as an npm dependency merely to invoke the plugin.
- Use `django-backend-service-architect` only after enough product/frontend/API context exists; it plans, enriches backend project context, and audits but does not implement.
- Use `django-backend-code-executor` only after the backend implementation contract is explicitly approved.
- Use `app-factory-infra-orchestrator` only after a frontend/backend project shape exists.
- Preserve MVP validation speed over premature platform complexity.
- Validate every changed skill with `quick_validate.py`.

## Product Definition

- Preserve an existing PRD as the source of truth.
- Use compact product documentation for small products and modular contracts for platforms.
- Define scope, non-scope, routes, screens, interactions, states, business rules, data, visual direction, and acceptance criteria.
- Number domain rules as `BR-###` and make them testable.
- Do not silently decide permissions, compliance, billing, sensitive-data, or core-scope questions.

## Frontend Construction

- Build directly with the App Factory React/TypeScript stack.
- Enforce `Route -> Feature Page -> Hook/View Model -> Service -> Repository Adapter`.
- Keep mocks, local persistence, API access, and environment variables outside UI components.
- Use secure npm defaults, exact direct dependency versions, and a committed lockfile.
- Validate typecheck, formatting, lint, tests, build, architecture, responsive behavior, and primary flows.
- Keep Sites plugin mechanics outside the application dependency graph.

## Django Backend Creation

- Build API-first Django backends.
- Preserve product and frontend API contracts.
- Use CamelCase ORM Models, external model Configurations, Repositories, Services, DTOs, thin Controllers, and tests.
- Keep every ORM query and persistence operation inside Repositories.
- Keep Services responsible for business rules without endpoints, HTTP types, ORM imports, QuerySets, or direct database access.
- Define Controller request and response payloads in DTOs and use those DTOs in Controllers.
- Keep Controllers limited to endpoint transport.
- Keep ORM Models limited to entity declaration and reference specifications from `configurations.py`.
- Never handwrite or patch migration code; generate migrations only with Django management commands.
- Prefer PostgreSQL and environment-driven settings.
- Create and explicitly approve backend planning, security, validation, and implementation contracts before implementation.
- Enrich the generated project's root `.codex/` with resolved backend context; do not put executor configuration there.

## Infrastructure Orchestration

- Support local full-stack Docker, frontend-native hosting, backend containers, and VPS paths when needed.
- Treat Supabase as managed Postgres/Auth/Storage only when configured.
- Document RLS, SSL, network restrictions, MFA, access control, indexes, performance, backups/PITR, and secrets when relevant.
- Never commit real secrets or hardcode service role keys.
- Run `docker compose config` and the infra scan before claiming readiness.

When adding a new skill, create it under `skills/<skill-name>/` with:

```txt
SKILL.md
agents/openai.yaml
references/
scripts/      optional
assets/       optional
```
