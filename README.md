# App Factory Skills

Codex skills for turning a rough idea into a Lovable-generated MVP, then into a normalized frontend, Django backend and deploy-ready infrastructure.

Build faster. Keep the handoffs explicit. Do not let the agent guess the project into existence.

![Skills](https://img.shields.io/badge/skills-4-blue)
![Stack](https://img.shields.io/badge/stack-Lovable%20%2B%20React%20%2B%20Django%20%2B%20Docker%20%2B%20Supabase-111827)
![Workflow](https://img.shields.io/badge/workflow-PRD%20to%20MVP-16a34a)
![Codex](https://img.shields.io/badge/Codex-skills-0f172a)

[Install](#install) | [Flow](#flow) | [Skills](#skills) | [Usage](#usage) | [Safety](#safety-gates) | [Repository](#repository-layout)

---

App Factory Skills is a small skill catalog for MVP and prototype projects. It is designed for a human + AI workflow:

1. The user brings a PRD, rough idea or product notes.
2. Codex creates a strong Lovable prompt.
3. The user pastes that prompt into Lovable.
4. Lovable generates the frontend.
5. Codex normalizes the frontend, creates the backend, then prepares infrastructure.

The key rule: every stage consumes explicit artifacts from the previous one. If the required context is missing, the skill should stop and tell the user what is missing instead of inventing the project.

## Flow

```txt
Idea or PRD
  -> lovable-prompt-architect
  -> user pastes prompt into Lovable
  -> Lovable generates frontend code
  -> lovable-frontend-normalizer
  -> django-backend-service-architect
  -> app-factory-infra-orchestrator
  -> MVP ready for technical validation
```

| Stage | Input | Skill | Output |
|---|---|---|---|
| 1. Pre-production | PRD, notes or rough idea | `lovable-prompt-architect` | Lovable-ready prompt |
| 2. Front generation | Prompt | Lovable | Generated frontend code |
| 3. Front normalization | Lovable frontend | `lovable-frontend-normalizer` | Clean frontend, mocks behind services, API contract |
| 4. Backend | Product/frontend/API contracts | `django-backend-service-architect` | Django backend with service architecture |
| 5. Infrastructure | Frontend/backend project shape | `app-factory-infra-orchestrator` | Docker, Supabase, Vercel and deploy docs |

## Install

Install all skills into your local Codex skill directory:

```powershell
Get-ChildItem .\skills -Directory | ForEach-Object {
  Copy-Item -Recurse $_.FullName (Join-Path $env:USERPROFILE ".codex\skills\$($_.Name)") -Force
}
```

Install one skill:

```powershell
Copy-Item -Recurse .\skills\lovable-prompt-architect $env:USERPROFILE\.codex\skills\lovable-prompt-architect -Force
```

After installing, open the target MVP project in Codex and call the skill by name:

```txt
Use $lovable-frontend-normalizer to normalize this Lovable frontend. Preserve all UI/UX.
```

## Skills

| Skill | Use when | Does not do |
|---|---|---|
| `lovable-prompt-architect` | You have an app idea, PRD or rough product brief and need a Lovable prompt. | Does not edit code. |
| `lovable-frontend-normalizer` | You have Lovable-generated frontend code. | Does not remove screens, flows, copy, mocks or visual identity unless asked. |
| `django-backend-service-architect` | You have enough product/frontend/API context to build a Django backend. | Does not create backend code when preflight context is missing. |
| `app-factory-infra-orchestrator` | You have frontend/backend structure and need Docker, Supabase, Vercel or VPS support. | Does not pretend there is only one production path. |

## Usage

Start from a rough idea:

```txt
Use $lovable-prompt-architect to turn this product idea into a complete Lovable prompt.
```

After Lovable generates the frontend:

```txt
Use $lovable-frontend-normalizer to normalize this Lovable frontend. Preserve all UI/UX.
```

After frontend normalization creates API contracts:

```txt
Use $django-backend-service-architect to build the Django backend for this App Factory project.
```

After frontend and backend structure exist:

```txt
Use $app-factory-infra-orchestrator to create Docker, Supabase and Vercel infrastructure for this App Factory project.
```

## Safety Gates

These skills are intentionally conservative. They are meant to be used by AI agents, so the instructions include hard stops.

| Area | Guardrail |
|---|---|
| Lovable prompt | Produces prompt only. The user still generates the frontend in Lovable. |
| Frontend | Preserve UI/UX, routes, copy, mocks and interactions unless explicitly requested. |
| Backend | Do not create Django files unless PRD/product context, API/frontend context, entities, flows, auth and sensitive-data expectations are known. |
| Security | Backend API contracts must include auth, permissions, rate limits, sensitive data rules and logout/session invalidation when relevant. |
| Infrastructure | Do not hardcode secrets. Do not claim local or production readiness unless validation was attempted. |
| Supabase | Document schema ownership, RLS, SSL, network restrictions, MFA, indexes/performance and backups/PITR when relevant. |

## What The Backend Skill Enforces

The Django skill uses a service-layer architecture:

```txt
HTTP -> View/Controller -> Serializer/DTO -> Service -> Model
HTTP -> View/Controller -> Selector -> Model
```

It requires:

- PRD/spec/frontend context before code generation
- API contract before endpoints
- environment-driven settings
- CORS by environment
- rate limiting/throttling, considering IP and authenticated user when relevant
- explicit auth and permission rules
- logout/session/token invalidation strategy
- sensitive data masking, omission or encryption rules when data reaches the frontend
- tests for services, selectors, API paths and permission behavior

## Repository Layout

```txt
app-factory-skills/
  skills/
    lovable-prompt-architect/
    lovable-frontend-normalizer/
    django-backend-service-architect/
    app-factory-infra-orchestrator/
  .codex/
    workflows/
    references/
    checklists/
    goals/
    templates/
  docs/
  specs/
  templates/
  examples/
  AGENTS.md
  README.md
```

`skills/` is the source of truth for installable Codex skills. `.codex/` contains factory-level operating material. `templates/` contains starter material for generated projects. `examples/` contains sample prompts, API contracts and project structures.

## Docs

| File | Purpose |
|---|---|
| [`docs/app-factory-method.md`](./docs/app-factory-method.md) | Factory method from idea to MVP. |
| [`docs/skill-sequence.md`](./docs/skill-sequence.md) | Which skill runs at each stage. |
| [`docs/stack-standard.md`](./docs/stack-standard.md) | Preferred frontend, backend and infra stack. |
| [`specs/factory-handoff-contracts.md`](./specs/factory-handoff-contracts.md) | Contracts between each stage. |
| [`specs/django-backend-contract.md`](./specs/django-backend-contract.md) | Backend input/output and security expectations. |
| [`specs/infra-orchestration-contract.md`](./specs/infra-orchestration-contract.md) | Infrastructure input/output expectations. |

## Validation

Validate a skill after editing:

```powershell
python C:\Users\welli\.codex\skills\.system\skill-creator\scripts\quick_validate.py .\skills\django-backend-service-architect
```

Run available scanners from a target project:

```powershell
node .\skills\lovable-frontend-normalizer\scripts\scan-lovable-frontend.mjs
python .\skills\django-backend-service-architect\scripts\scan-django-architecture.py
node .\skills\app-factory-infra-orchestrator\scripts\scan-infra.mjs
```

## Philosophy

Fast MVPs need speed, but not guesswork.

This repository exists to make Codex repeat the same high-quality product path: clarify the idea, generate the frontend prompt, normalize Lovable output, build the backend from contracts, and create infrastructure with honest validation notes.

No hidden production assumptions. No backend from vibes. No infra that only works on paper.
