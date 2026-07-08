## Lovable frontend normalization

When working on frontend code generated or accelerated by Lovable, use the `lovable-frontend-normalizer` skill.

Rules:

- Preserve the existing UI/UX.
- Do not remove screens, flows, visual identity, copy, mock behavior or interactions unless explicitly requested.
- Preserve the existing React/TypeScript/TanStack/Tailwind stack.
- Keep routes thin.
- Organize screens by feature.
- Keep mocks behind service boundaries.
- Keep shared components domain-neutral.
- Prioritize mobile-first behavior.
- Run format, lint, build, architecture scan and local dev server validation before finishing.
- Do not claim the project works locally unless it was actually started.

