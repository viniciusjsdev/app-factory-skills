# Lovable Frontend Normalizer

A Codex skill for turning Lovable-generated or Lovable-accelerated React frontends into cleaner, production-oriented codebases without throwing away the UI/UX that Lovable already created.

The skill is generic. It is meant to be copied or installed into real projects whenever Codex needs to normalize a Lovable frontend, regardless of the product domain, brand, app type, page set or business model.

## What It Does

- Preserves existing screens, flows, copy, visual identity, mock behavior and interactions.
- Keeps the current React/TypeScript/TanStack/Tailwind stack unless explicitly told otherwise.
- Treats PrimeReact/JavaScript/CRA-style rewrites as stack migrations, not normal normalization.
- Moves large route/page/component files toward feature-based architecture.
- Keeps routes thin and screen composition inside feature pages.
- Separates UI components, hooks, services, mocks, DTOs and shared primitives.
- Isolates mock data behind service boundaries so a real backend can be added later.
- Checks mobile-first behavior instead of treating desktop as the default.
- Requires format, lint, build, architecture scan and dev-server validation when possible, without changing package managers implicitly.

## Repository Layout

```txt
lovable-frontend-normalizer/
  SKILL.md
  AGENTS.md
  README.md
  agents/
    openai.yaml
  references/
    architecture-standard.md
    component-responsibilities.md
    version-baseline.md
    mock-to-api-boundary.md
    mobile-first-checklist.md
    local-run-checklist.md
    validation-checklist.md
  scripts/
    scan-lovable-frontend.mjs
```

`SKILL.md` contains the always-loaded operating instructions. The files in `references/` hold deeper rules that Codex should read only when relevant. The scanner in `scripts/` gives a quick heuristic pass over a consuming frontend project.

## Installation

Install as a user skill:

```powershell
Copy-Item -Recurse D:\Projetos\Skills\lovable-frontend-normalizer $env:USERPROFILE\.codex\skills\lovable-frontend-normalizer
```

Or install inside a specific project:

```powershell
New-Item -ItemType Directory -Force .agents\skills | Out-Null
Copy-Item -Recurse D:\Projetos\Skills\lovable-frontend-normalizer .agents\skills\lovable-frontend-normalizer
```

After installing in a project, Codex can run:

```bash
node .agents/skills/lovable-frontend-normalizer/scripts/scan-lovable-frontend.mjs
```

If installed as a user skill, run the scanner from the target frontend project with the full skill path.

## Usage

Ask Codex to use the skill in a Lovable project:

```txt
Use $lovable-frontend-normalizer to normalize this Lovable frontend. Preserve all existing UI/UX.
```

Good task examples:

- Normalize the generated Lovable routes and move screen logic into feature folders.
- Preserve the current dashboard UI but isolate mocks behind services.
- Refactor this Lovable MVP so it is ready for a real API.
- Improve mobile-first behavior without redesigning the product.
- Split large generated components while keeping the rendered screen the same.

Avoid using this skill for backend-only work, database-only design, copy-only edits or redesigning screens from scratch unless that is explicitly the goal.

## Validation Expectations

In a consuming frontend project, Codex should attempt the equivalent of:

```bash
npm install
npm run format
npm run lint
npm run build
node .agents/skills/lovable-frontend-normalizer/scripts/scan-lovable-frontend.mjs
npm run dev
```

The package manager should come from the lockfile. Codex must not claim the project runs locally unless the dev server was actually started and checked for immediate startup errors.

If the lockfile package manager is unavailable, Codex should report the mismatch instead of switching package managers, creating new lockfiles or manually repairing `node_modules`.

## Design Principles

Preserve first. Normalize second.

Lovable is allowed to create rich UI quickly. This skill exists to keep that product work intact while improving the code underneath it: thinner routes, clearer feature boundaries, isolated mocks, better hooks/services, documented API contracts and mobile-first behavior.

The output should feel like the same product with a more professional frontend architecture, not a simpler replacement.
