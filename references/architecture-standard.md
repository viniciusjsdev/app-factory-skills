# Architecture Standard

## Goal

Normalize Lovable-generated React frontends into a feature-based structure without redesigning the product.

Preserve the current stack and UI. Move responsibilities to the right layer.

## Recommended Structure

Use this shape as a target, not as a required full scaffold:

```txt
src/
  app/
  routes/
  features/
  shared/
  services/
  stores/
  mocks/
```

Create folders only when current code needs them.

## Routes

Route files must stay thin.

Allowed in routes:

- TanStack route declarations
- route metadata
- params/search validation
- rendering one feature page or app shell entry

Not allowed in routes:

- large JSX trees
- business logic
- direct mock imports
- direct API calls
- long lists of cards, sections or forms
- complex calculations
- orchestration of many services or stores

Preferred pattern:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/features/dashboard";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});
```

## Features

Feature folders own product-specific screens and behavior.

Typical feature folder:

```txt
features/feature-name/
  FeaturePage.tsx
  components/
  hooks/
  services/
  schemas/
  types.ts
  index.ts
```

Use project-specific names that match the actual domain. Do not force SaaS, finance, admin or dashboard names into unrelated projects.

## Shared Code

`shared/` must remain domain-neutral.

Good shared code:

- generic layout primitives
- reusable UI wrappers
- generic hooks
- formatting helpers
- base types

Bad shared code:

- feature-specific business rules
- mock data
- API calls tied to one domain
- components that assume one product workflow

## App Layer

Use `src/app/` for providers, router setup, app config and app-wide composition.

Do not put feature business logic in `src/app/`.

## Documentation

When a refactor clarifies boundaries or future backend needs, create or update:

```txt
docs/frontend-architecture.md
docs/api-contract.md
docs/database-schema.md
```

Only create docs that are useful for the current project.

