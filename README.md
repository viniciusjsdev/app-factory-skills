# App Factory Skills

Codex skills for turning a rough app idea or PRD into a Lovable-generated MVP, then normalizing that frontend into a cleaner project foundation for validation.

This repository is a skill factory, not an application. Each folder under `skills/` is an independent Codex skill with its own `SKILL.md`, references, scripts and UI metadata.

## Factory Flow

```txt
PRD or rough idea
  -> lovable-prompt-architect
  -> user pastes prompt into Lovable
  -> Lovable generates frontend code
  -> lovable-frontend-normalizer
  -> normalized frontend, docs and API contract
  -> django-backend-service-architect
  -> app-factory-infra-orchestrator
  -> MVP technical project ready for validation
```

The handoff to Lovable is intentionally human-driven. Codex prepares the best possible prompt, but the user still pastes it into Lovable and brings the generated frontend code back before later skills continue.

## Repository Layout

```txt
app-factory/
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

`skills/` is the source of truth for installable Codex skills. `.codex/` contains factory-level operating material for Codex, not installable skill folders.

## Skills

```txt
skills/
  lovable-prompt-architect/
    Generate a Lovable-ready prompt from a PRD, brief or rough MVP idea.

  lovable-frontend-normalizer/
    Normalize Lovable-generated frontend code while preserving UI/UX.

  django-backend-service-architect/
    Build or normalize a Django backend using Models, Services, Selectors, API Views, DTOs/Serializers and tests.

  app-factory-infra-orchestrator/
    Create Docker, Supabase and Vercel infrastructure without forcing one production path.
```

Future skills should be added as separate folders under `skills/`, for example:

```txt
skills/mvp-launch-checklist/
```

## Root Documentation

```txt
docs/
  app-factory-method.md
  stack-standard.md
  architecture-standard.md
  skill-sequence.md
  project-generation-flow.md
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

Use root docs/specs to understand the factory as a system. Keep executable skill behavior inside each skill folder.

## Supporting Folders

```txt
.codex/
  workflows/     Codex execution playbooks for this factory.
  references/    Internal routing and repository references.
  checklists/    Repeatable quality gates.
  goals/         Durable factory objectives.
  templates/     Codex-facing prompt and artifact templates.

templates/
  root/          Project root starter files.
  frontend/      Frontend starter conventions.
  backend/       Backend starter conventions.
  docker/        Docker and deploy starter conventions.
  docs/          Documentation starter conventions.

examples/
  lovable-prompts/
  api-contracts/
  project-structures/
```

## Installation

Install one skill:

```powershell
Copy-Item -Recurse .\skills\lovable-prompt-architect $env:USERPROFILE\.codex\skills\lovable-prompt-architect
```

Install all current skills:

```powershell
Get-ChildItem .\skills -Directory | ForEach-Object {
  Copy-Item -Recurse $_.FullName (Join-Path $env:USERPROFILE ".codex\skills\$($_.Name)") -Force
}
```

## Usage

Start from a PRD or rough idea:

```txt
Use $lovable-prompt-architect to turn this PRD into a complete Lovable prompt.
```

After Lovable generates code and the user provides the project:

```txt
Use $lovable-frontend-normalizer to normalize this Lovable frontend. Preserve all UI/UX.
```

After frontend normalization creates API contracts:

```txt
Use $django-backend-service-architect to build the Django backend for this App Factory project.
```

After frontend/backend project structure exists:

```txt
Use $app-factory-infra-orchestrator to create Docker, Supabase and Vercel infrastructure for this App Factory project.
```

## Principles

- Optimize for fast MVP/prototype launch and validation.
- Keep each skill single-purpose.
- Preserve product intent between steps.
- Generate explicit handoff artifacts.
- Do not require downstream skills before their input exists.
- Treat backend and infrastructure as later stages fed by product/frontend contracts.
- Support local Docker, VPS/full-stack containers, Vercel-native frontend deployment and Supabase-managed services as explicit options.
