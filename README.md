# App Factory Skills

Codex skills for turning a rough idea or PRD into an executable product contract, a complete React frontend, a planned Django backend, and deploy-ready infrastructure.

The factory keeps every stage explicit. Each skill consumes durable artifacts from the previous stage and reports missing context instead of silently inventing consequential requirements.

## Flow

```txt
Idea, PRD, or client notes
  -> product-brief-architect
  -> @sites + app-factory-frontend-builder
  -> django-backend-service-architect
  -> django-backend-code-executor
  -> django-backend-service-architect audit
  -> app-factory-infra-orchestrator
  -> publication and MVP validation
```

| Stage | Input | Skill | Output |
| --- | --- | --- | --- |
| Product | Idea, PRD, notes, screens | `product-brief-architect` | Executable PRD and implementation contracts |
| Frontend | Product contracts | external `@sites` + `app-factory-frontend-builder` | Visible preview, React frontend, private Sites URL, mocks/adapters, tests, API handoff |
| Backend design | Product and frontend contracts | `django-backend-service-architect` | Approved backend contracts and project context |
| Backend implementation | Approved backend contracts | `django-backend-code-executor` | Django code, generated migrations, tests, and validation evidence |
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

Use $django-backend-code-executor to implement the explicitly approved backend implementation contract.

Use $app-factory-infra-orchestrator to prepare local and deployment infrastructure.
```

## Skills

| Skill | Responsibility |
| --- | --- |
| `product-brief-architect` | Product scope, screens, rules, data, visual direction, acceptance criteria |
| `app-factory-frontend-builder` | Direct React implementation using the factory stack and feature architecture |
| `django-backend-service-architect` | Backend planning, project context, contract approval, and implementation audit |
| `django-backend-code-executor` | Approved Django implementation using DTO, Controller, Service, Repository, Configuration, and Model boundaries |
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
- Backend planning specs, decision summary, and explicit contract approval precede Django implementation.
- ORM access is repository-only, services are persistence-agnostic, controllers use DTO payloads, and migrations are Django-generated.
- Infrastructure never commits secrets or claims readiness without attempted validation.

## Repository layout

```txt
app-factory-skills/
  skills/
    product-brief-architect/
    app-factory-frontend-builder/
    django-backend-service-architect/
    django-backend-code-executor/
    app-factory-infra-orchestrator/
  .codex/
  docs/
  specs/
  templates/
  examples/
```

`skills/` contains installable skills. `.codex/` contains factory-level workflows, references, checklists, goals, and templates. Generated projects use their own `.codex/` context and may add project-specific domain skills under `.agents/skills/`.

## Validation

```powershell
python C:\Users\welli\.codex\skills\.system\skill-creator\scripts\quick_validate.py .\skills\product-brief-architect
node .\skills\product-brief-architect\scripts\validate-product-contract.mjs <project-root>
node .\skills\app-factory-frontend-builder\scripts\scan-app-factory-frontend.mjs <project-root>
python .\skills\django-backend-service-architect\scripts\scan-django-architecture.py
python .\skills\django-backend-code-executor\scripts\scan-django-boundaries.py
node .\skills\app-factory-infra-orchestrator\scripts\scan-infra.mjs
```
