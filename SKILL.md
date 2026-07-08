---
name: lovable-frontend-normalizer
description: Use this skill when a project has frontend code generated or accelerated by Lovable and the user wants to normalize, polish, refactor, standardize architecture, improve component responsibilities, prepare API boundaries, improve mobile-first behavior, preserve UI/UX, or make the frontend more production-ready. This skill is generic and must not depend on any specific product, brand, app name, domain, or business model.
---

# Lovable Frontend Normalizer

## Purpose

Normalize frontend code generated or accelerated by Lovable into a maintainable React/TypeScript architecture while preserving the existing UI/UX.

Lovable may generate screens, layouts, flows, mock data, components, interactions, copy and visual identity quickly. Treat that generated experience as product work to preserve. Improve architecture, file organization, responsibilities, maintainability, mobile behavior and backend readiness without redesigning the product.

Core rule: preserve first, normalize second.

Do not discard, remove, simplify, rewrite or replace UI/UX created by Lovable unless the user explicitly asks for it, the code is broken, the behavior is inaccessible or unusable, the implementation prevents the app from building or running, or duplicated dead code has no user-facing effect.

## Load References

Read the relevant references before making changes:

- `references/version-baseline.md` for stack preservation and package-manager rules.
- `references/architecture-standard.md` before moving files, routes or feature modules.
- `references/component-responsibilities.md` before splitting pages, components, hooks, services or shell/layout files.
- `references/mock-to-api-boundary.md` before touching mock data, services, DTOs or future API contracts.
- `references/mobile-first-checklist.md` before changing layout, navigation, tables, charts, forms, dialogs or responsive classes.
- `references/local-run-checklist.md` before validation or dev-server work.
- `references/validation-checklist.md` before finishing.

Run `scripts/scan-lovable-frontend.mjs` from the consuming project when the script is available in that project.

## Workflow

1. Inspect `package.json`, lockfiles, `src/routes`, `src/components`, `src/pages`, `src/features`, `src/mocks` and shared UI folders.
2. Detect the package manager from the lockfile and preserve the current React/TypeScript/TanStack/Tailwind stack unless the user asks for a change.
3. Identify overloaded route files, large page/component files, direct mock imports, direct API calls in UI, large shell/layout files and scattered generated data.
4. Create a concise refactor plan that states what will be moved and what UI/UX will be preserved.
5. Keep route files thin: route declaration, metadata, params/search validation and rendering a feature page.
6. Move screen composition into feature pages when needed.
7. Move reusable screen sections into feature components.
8. Move state orchestration, derived data and side effects into hooks.
9. Move data access, DTO mapping and mock/real switching into services.
10. Isolate mocks behind services or feature data boundaries.
11. Preserve visual identity, copy, flows, interactions, navigation, cards, forms, charts, dialogs, drawers, animations, toasts, loading states, empty states and existing demo behavior.
12. Keep mobile-first behavior working at 360px width unless the product explicitly targets desktop only.
13. Update architecture/API documentation when the refactor creates or clarifies boundaries.
14. Run format, lint, build, architecture scan and local dev-server validation when possible.
15. Report exactly what was changed, what was preserved and which validations passed or failed.

## Architecture Target

Use feature-based frontend architecture. Create only folders that the current code needs; do not over-engineer small projects.

Preferred shape:

```txt
src/
  app/
    providers.tsx
    router.tsx
    config.ts
  routes/
  features/
    feature-name/
      FeaturePage.tsx
      components/
      hooks/
      services/
      schemas/
      types.ts
      index.ts
  shared/
    components/
    ui/
    hooks/
    lib/
    utils/
    types/
  services/
    api-client.ts
  stores/
  mocks/
    data/
    services/
    factories/
```

Example thin TanStack route:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/home";

export const Route = createFileRoute("/")({
  component: HomePage,
});
```

## Preservation Rules

Preserve:

- visual identity, colors, typography, spacing, icons, layout direction and animations
- user-facing copy, product language, screen flows and navigation structure
- mobile navigation, modals, drawers, cards, forms, charts and data visualizations
- loading, error, empty and success states
- mock/demo behavior, toasts, feedback and interactions

Do not replace rich generated UI with generic placeholders. Do not remove screens because they look duplicated. Do not remove mock data because there is no backend yet. If a component is too large, split it while preserving the rendered output.

## Boundaries

Use this direction:

```txt
Route -> Feature Page -> Hook/View Model -> Service -> Mock or API
```

Avoid:

```txt
Route -> Mock
Component -> Mock
Chart -> Mock
Form -> Fake persistence directly
```

Services are the data boundary. Components render UI. Hooks orchestrate state and side effects. Routes declare routing.

## Validation

Attempt the equivalent commands for the detected package manager:

```bash
npm install
npm run format
npm run lint
npm run build
node .agents/skills/lovable-frontend-normalizer/scripts/scan-lovable-frontend.mjs
npm run dev
```

Adapt the script path if the skill is installed elsewhere, such as `node ~/.codex/skills/lovable-frontend-normalizer/scripts/scan-lovable-frontend.mjs`.

Do not claim the project runs locally unless the dev server was actually started and checked for immediate startup errors. If validation is blocked by missing environment variables, unavailable ports, missing commands or environment limitations, say that clearly and report the closest completed validation.

## Definition of Done

Finish only after these are true or explicitly reported as blocked:

- existing UI/UX and screens are preserved
- routes touched by the change are thin
- touched screens have appropriate feature folders
- components, hooks, services and mocks have clear boundaries
- shared components remain domain-neutral
- shell/layout files are not dumping grounds
- mobile-first behavior is preserved
- docs are updated where architecture or API boundaries changed
- format, lint, build, architecture scan and local dev-server validation were attempted

