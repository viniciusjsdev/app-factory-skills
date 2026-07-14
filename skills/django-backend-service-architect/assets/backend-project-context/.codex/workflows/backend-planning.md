# Backend Planning Workflow

1. Read product, frontend, and API contracts.
2. Resolve entities, ownership, repositories, services, DTOs, controllers, security, and migrations.
3. Update the six Markdown contracts and `docs/architecture/backend-contract-manifest.json`; keep version, exact service URL bindings, invariants/tests, endpoint mappings/tests, exact allowed `makemigrations` commands, and validations synchronized.
4. Update backend `.codex` references with resolved decisions.
5. Summarize decisions and obtain matching explicit approval of the implementation contract and manifest before implementation.
