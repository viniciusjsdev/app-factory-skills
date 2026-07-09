## App Factory Skills Repository

This repository contains multiple Codex skills for MVP and prototype creation.

Rules:

- Treat each folder under `skills/` as an independent skill.
- Keep installable skills in `skills/`, not `.codex/` or `.agents/skills/`.
- Do not mix PRD-to-Lovable prompt generation, Lovable frontend normalization, backend planning, backend scaffolding and infrastructure work in the same skill.
- Keep root `docs/` and `specs/` focused on product workflow, skill routing and handoff contracts.
- Keep `.codex/` focused on factory-level workflows, references, checklists, goals and templates.
- Keep `templates/` focused on reusable generated-project starter material.
- Keep `examples/` focused on sample prompts, API contracts and project structures.
- Keep executable instructions, scripts and detailed references inside the relevant skill folder.
- The factory starts from a PRD, product brief or rough idea.
- `lovable-prompt-architect` produces the prompt the user will paste into Lovable.
- `lovable-frontend-normalizer` requires generated frontend code before continuing.
- `django-backend-service-architect` requires product/frontend contracts or enough project documentation before continuing.
- `app-factory-infra-orchestrator` requires a frontend/backend project shape before continuing.
- Preserve speed of MVP validation over premature platform complexity.
- Validate every skill with `quick_validate.py` after changes.

## Lovable Prompt Creation

When the user wants to create a new app, site, dashboard, landing page, SaaS, MVP or prototype in Lovable, use the `lovable-prompt-architect` skill.

Rules:

- Generate a complete Lovable prompt, not code.
- Use frontend-first MVP assumptions.
- Prefer mocked data, localStorage and services prepared for future integration.
- Include negative scope clearly.
- Include routes, screens, mock data, interactions and responsiveness.
- Make the prompt specific enough to avoid generic Lovable output.
- Highlight the most important screen.
- Preserve the user's product idea while filling missing details with reasonable assumptions.

## Django Backend Creation

When the user wants to build, expand or normalize the backend after the Lovable frontend exists, use the `django-backend-service-architect` skill.

Rules:

- Build API-first Django backends.
- Preserve product and frontend API contracts.
- Use Models, Services, Selectors, API Views, DTOs/Serializers and tests.
- Keep business rules out of views and serializers.
- Prefer PostgreSQL and environment-driven settings.
- Create or update API contract documentation before implementing endpoints.

## Infrastructure Orchestration

When the user wants Docker, Supabase, Vercel, VPS deployment support, environment contracts or production-readiness docs after frontend/backend structure exists, use the `app-factory-infra-orchestrator` skill.

Rules:

- Do not promise a single production path.
- Support local full-stack Docker for development and smoke testing.
- Support full-stack container deployment on a VPS when needed.
- Prepare frontend deployment for native Vercel from `frontend/`.
- Prepare Django backend deployment as a container.
- Treat Supabase as managed Postgres/Auth/Storage when configured.
- Prefer Supabase CLI structure, migrations and versioned schema files when Supabase owns SQL resources.
- Document Supabase production checks: RLS, SSL, network restrictions, MFA, access control, indexes, performance review, backups/PITR where needed and secret handling.
- Never commit real secrets or hardcode service role keys.
- Run `docker compose config` and the infra scan before claiming the infra is ready.

When adding a new skill, create it under `skills/<skill-name>/` with:

```txt
SKILL.md
agents/openai.yaml
references/
scripts/      optional
assets/       optional
```
