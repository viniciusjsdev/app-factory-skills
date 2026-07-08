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
- CRA or CRACO
- JavaScript/JSX when the project is TypeScript
- Redux
- Material UI
- Chakra
- Bootstrap
- Styled Components
- PrimeReact
- SCSS as the primary styling system
- another design system

Make such changes only when the user explicitly requests them or when a concrete issue makes the current choice untenable.

## Stack Migration Is Separate

Treat conversion to another repository's stack as a migration, not normal frontend normalization.

Examples of migrations:

- TanStack Router to React Router DOM
- TanStack Start SSR/file routes to CRA/CRACO SPA
- TypeScript to JavaScript/JSX
- Tailwind/shadcn/Radix to PrimeReact/SCSS
- Lucide icons to PrimeIcons or Bootstrap Icons

Do not perform these changes implicitly. If the user asks for them, first state the tradeoff: UI/UX can be preserved only with deliberate visual comparison because rendering, styling, routing and hydration behavior can change.

## Package Manager Detection

Use the lockfile:

- `pnpm-lock.yaml` -> pnpm
- `yarn.lock` -> yarn
- `bun.lockb` or `bun.lock` -> bun
- `package-lock.json` -> npm
- no lockfile -> npm unless project docs say otherwise

Use the detected package manager for install, format, lint, build and dev-server commands.

If the detected package manager is not available:

- Do not switch to another package manager just to make progress.
- Do not create a second lockfile such as `package-lock.json` or `pnpm-lock.yaml`.
- Do not repeatedly run install commands with different managers.
- Do not patch `node_modules` manually with downloaded packages.
- Report the package manager mismatch and continue only with validations that do not require reinstalling dependencies.

If `node_modules` already exists, use local binaries only when they are complete enough to run. If local binaries or package files are missing, classify validation as blocked by incomplete dependencies.

## Naming

User-facing labels may stay in the product language.

Code identifiers should be consistent and preferably in English unless the project already uses another clear convention.

Adapt names to the actual project domain. Do not force finance-specific, SaaS-specific or app-specific names into unrelated projects.
