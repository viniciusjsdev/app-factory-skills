# App Factory Architecture

## Purpose

The App Factory is a collection of Codex skills that help move from product idea to MVP quickly.

The factory is intentionally staged:

1. Understand the product idea or PRD.
2. Generate a strong Lovable prompt.
3. Let the user generate the frontend in Lovable.
4. Normalize the generated frontend.
5. Build or normalize the Django backend from product/frontend contracts.
6. Create Docker, Supabase and Vercel infrastructure from the generated contracts.

## Core Boundary

Lovable remains the visual acceleration tool. Codex prepares the prompt and later normalizes the output, but Codex does not assume the frontend code exists until the user provides it.

## Repository Shape

```txt
skills/
  lovable-prompt-architect/
  lovable-frontend-normalizer/
  django-backend-service-architect/
  app-factory-infra-orchestrator/

docs/
  app-factory-architecture.md
  product-workflow.md

specs/
  skill-catalog.md
  factory-handoff-contracts.md
  product-brief-template.md
  prd-to-lovable-prompt.md
  frontend-normalization-contract.md
  django-backend-contract.md
  infra-orchestration-contract.md
```

## Skill Design Rules

- One skill per stage.
- Each skill must be useful on its own.
- Each skill must clearly state required inputs and outputs.
- A skill must not silently perform a later stage.
- Root specs define the factory workflow; skill folders define execution.

## Future Expansion

Backend and infrastructure skills should consume artifacts such as:

- `docs/product/prd.md`
- `docs/product/domain.md`
- `docs/architecture/frontend-architecture.md`
- `docs/architecture/api-contract.md`
- `docs/architecture/data-model-notes.md`
- `docs/architecture/validation-report.md`
- backend service architecture and tests

## Infrastructure Boundary

`app-factory-infra-orchestrator` does not choose one canonical production platform for every MVP. It prepares:

- local development through Docker Compose
- full-stack container deployment for a VPS or compatible host
- frontend-native Vercel deployment from `frontend/`
- backend container deployment
- Supabase-managed Postgres/Auth/Storage when configured
