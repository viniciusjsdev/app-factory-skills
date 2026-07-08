# Version Baseline

## Preserve the Existing Stack

Preserve the project stack unless the user explicitly asks for upgrades or replacements.

Preferred Lovable-oriented baseline:

- React 19.x
- TypeScript 5.x
- Vite 8.x
- TanStack Router 1.x
- TanStack Start 1.x
- Tailwind CSS 4.x
- Zustand 5.x
- React Hook Form 7.x
- Zod 3.x
- Radix UI or shadcn-style primitives
- Lucide React
- Recharts
- Sonner

If the project uses a slightly different Lovable stack, inspect it first and preserve it unless there is a concrete build or compatibility reason to change.

## Do Not Replace Without Request

Do not replace the current stack with:

- Next.js
- React Router
- Redux
- Material UI
- Chakra
- Bootstrap
- Styled Components
- another design system

Make such changes only when the user explicitly requests them or when a concrete issue makes the current choice untenable.

## Package Manager Detection

Use the lockfile:

- `pnpm-lock.yaml` -> pnpm
- `yarn.lock` -> yarn
- `bun.lockb` or `bun.lock` -> bun
- `package-lock.json` -> npm
- no lockfile -> npm unless project docs say otherwise

Use the detected package manager for install, format, lint, build and dev-server commands.

## Naming

User-facing labels may stay in the product language.

Code identifiers should be consistent and preferably in English unless the project already uses another clear convention.

Adapt names to the actual project domain. Do not force finance-specific, SaaS-specific or app-specific names into unrelated projects.

