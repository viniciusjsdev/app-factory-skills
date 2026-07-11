# Project Generation Flow

The process may start from a rough idea, PRD, client notes, screen list, or existing partial project.

1. Create or complete the executable product contract.
2. Invoke external `@sites` together with `$app-factory-frontend-builder` to build from that contract, show the result, and publish it privately without installing Sites in the application.
3. Validate product flows, responsive behavior, data boundaries, tests, and build.
4. Plan Django, enrich root `.codex` backend context, and approve the implementation contract.
5. Implement Django through the executor-neutral backend skill.
6. Audit the backend against contracts, generated migrations, tests, and validation evidence.
7. Prepare infrastructure for local and selected deployment paths.
8. Publish when requested and document validation gaps.

The result is an MVP project that can run locally and evolve from mocks to an API without changing product semantics silently.
