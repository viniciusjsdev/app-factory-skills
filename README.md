# App Factory Skills

Codex skills for turning a rough idea or PRD into an executable product contract, a complete React frontend, a planned Django backend, and deploy-ready infrastructure.

The factory keeps every stage explicit. Each skill consumes durable artifacts from the previous stage and reports missing context instead of silently inventing consequential requirements.

## Flow

```txt
Idea, PRD, or client notes
  -> product-brief-architect
  -> @sites + app-factory-frontend-builder
  -> django-backend-service-architect
  -> app-factory-backend-router
  -> OpenCode Go or Codex + django-backend-code-executor
  -> django-backend-service-architect audit
  -> app-factory-infra-orchestrator
  -> publication and MVP validation
```

| Stage | Input | Skill | Output |
| --- | --- | --- | --- |
| Product | Idea, PRD, notes, screens | `product-brief-architect` | Executable PRD and implementation contracts |
| Frontend | Product contracts | external `@sites` + `app-factory-frontend-builder` | Visible preview, React frontend, private Sites URL, mocks/adapters, tests, API handoff |
| Backend design | Product and frontend contracts | `django-backend-service-architect` | Approved backend contracts, project context, and local architecture skill kit |
| Backend routing | Approved backend contracts | `app-factory-backend-router` | OpenCode delegation or automatic Codex fallback |
| Backend implementation | Approved backend contracts | OpenCode Go or Codex using `django-backend-code-executor` | Django code, generated migrations, tests, and validation evidence |
| Backend audit | Contracts and implementation evidence | `django-backend-service-architect` | Approval or bounded correction findings |
| Infrastructure | Frontend/backend shape | `app-factory-infra-orchestrator` | Docker, environments, deployment contracts and validation |

## Product contract

Small products may use one file:

```txt
docs/product/product-brief.md
```

Platforms and products with multiple modules use:

```txt
docs/product/
  prd.md
  screen-map.md
  business-rules.md
  data-contract.md
  visual-direction.md
  acceptance-criteria.md
```

An existing PRD remains the source of truth. The product skill creates only the missing companion contracts.

## Install

```powershell
Get-ChildItem .\skills -Directory | ForEach-Object {
  Copy-Item -Recurse $_.FullName (Join-Path $env:USERPROFILE ".codex\skills\$($_.Name)") -Force
}
```

Install only the product skill:

```powershell
Copy-Item -Recurse .\skills\product-brief-architect $env:USERPROFILE\.codex\skills\product-brief-architect -Force
```

## Usage

```txt
Use $product-brief-architect to transform these notes into an executable product contract.

Use @sites to build, show, and privately publish this product. Follow $app-factory-frontend-builder as the mandatory implementation contract and read docs/product/.

Use $django-backend-service-architect to create the backend planning specs from the product and frontend contracts.

Use $app-factory-backend-router to route the explicitly approved backend implementation contract to OpenCode Go with Codex fallback.

Use $django-backend-code-executor directly when Codex is selected or the router requests fallback.

Use $app-factory-infra-orchestrator to prepare local and deployment infrastructure.
```

## Skills

| Skill | Responsibility |
| --- | --- |
| `product-brief-architect` | Product scope, screens, rules, data, visual direction, acceptance criteria |
| `app-factory-frontend-builder` | Direct React implementation using the factory stack and feature architecture |
| `django-backend-service-architect` | Backend planning, project context, local architecture kit, contract approval, and implementation audit |
| `app-factory-backend-router` | Optional OpenCode Go routing, passive wait, structured wake-up, and Codex fallback |
| `django-backend-code-executor` | Approved Django implementation using scalable domain packages, explicit Mappers, DTO, Controller, Service, Repository, Configuration, and Model boundaries |
| `app-factory-infra-orchestrator` | Docker, environment, Supabase, Vercel, container and VPS paths |

## Frontend baseline

- Node.js 24 LTS and npm
- React 19, TypeScript strict, Vite, React Router
- PrimeReact, PrimeIcons and SCSS Modules
- React Hook Form, Zod, TanStack Query and Axios
- Vitest, Testing Library, Playwright, ESLint and Prettier
- feature architecture with `Route -> Feature Page -> Hook/View Model -> Service -> Repository Adapter`
- exact direct dependency versions and committed npm lockfile
- dependency scripts disabled by default, seven-day minimum package age, and registry/source restrictions

Sites remains an external Codex plugin. It owns preview and publication when explicitly referenced in the creation command; it is not installed in the React dependency graph.

## Safety gates

- Product decisions involving permissions, compliance, billing, sensitive data, or core scope are never guessed silently.
- Frontend components cannot access API, mocks, storage, or environment variables directly.
- Backend planning specs, decision summary, project-local architecture skill kit, and explicit contract approval precede Django implementation.
- Backend execution uses OpenCode only when its CLI, OpenCode Go credential, and configured model are ready; otherwise Codex continues automatically.
- Domain apps use one Model/Configuration module per entity, DTO/Mapper/Controller modules per use case, repository-only ORM access, persistence-agnostic Services, opening module docstrings in every authored Python file, and Django-generated migrations.
- Infrastructure never commits secrets or claims readiness without attempted validation.

## Repository layout

```txt
app-factory-skills/
  skills/
    product-brief-architect/
    app-factory-frontend-builder/
    django-backend-service-architect/
    app-factory-backend-router/
    django-backend-code-executor/
    app-factory-infra-orchestrator/
  .codex/
  docs/
  specs/
  templates/
  examples/
```

`skills/` contains installable factory skills. `.codex/` contains factory-level workflows, references, checklists, goals, and templates. Generated projects receive their own `.codex/` context and a compact `.agents/skills/` backend architecture kit, then may add contract-backed product-specific domain skills.

The generated backend kit includes `django-model-configuration`, `django-dto-mapper`, `django-repository`, `django-service`, `django-controller`, `django-migration`, `django-backend-testing`, and `backend-domain-skill-author`.

## Optional OpenCode backend executor

OpenCode is an optional low-cost writer for approved backend work. Install and configure it using [docs/opencode-backend-execution.md](docs/opencode-backend-execution.md). The API key is stored by OpenCode outside this repository; `.env` contains only non-secret routing preferences.

```powershell
Copy-Item .env.example .env
node .\skills\app-factory-backend-router\scripts\opencode-doctor.mjs
node .\skills\app-factory-backend-router\scripts\route-backend-execution.mjs --project-root D:\caminho\do\projeto
```

## Validation

```powershell
python C:\Users\welli\.codex\skills\.system\skill-creator\scripts\quick_validate.py .\skills\product-brief-architect
node .\skills\app-factory-backend-router\scripts\opencode-doctor.mjs
node .\skills\product-brief-architect\scripts\validate-product-contract.mjs <project-root>
node .\skills\app-factory-frontend-builder\scripts\scan-app-factory-frontend.mjs <project-root>
python .\skills\django-backend-service-architect\scripts\scan-django-architecture.py
python .\skills\django-backend-code-executor\scripts\scan-django-boundaries.py
node .\skills\app-factory-infra-orchestrator\scripts\scan-infra.mjs
```
