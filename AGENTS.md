## Lovable frontend normalization

When working on frontend code generated or accelerated by Lovable, use the `lovable-frontend-normalizer` skill.

Rules:

- Preserve the existing UI/UX.
- Do not remove screens, flows, visual identity, copy, mock behavior or interactions unless explicitly requested.
- Preserve the existing React/TypeScript/TanStack/Tailwind stack.
- Treat PrimeReact, JavaScript/JSX, CRA/CRACO, React Router, SCSS or other stack changes as explicit migrations, not default normalization.
- Keep routes thin.
- Organize screens by feature.
- Keep mocks behind service boundaries.
- Keep shared components domain-neutral.
- Prioritize mobile-first behavior.
- Run format, lint, build, architecture scan and local dev server validation before finishing.
- Use the package manager from the lockfile; do not switch managers or manually repair `node_modules` without explicit user approval.
- Do not claim the project works locally unless it was actually started.
