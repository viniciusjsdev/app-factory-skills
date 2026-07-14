# Project Agent Guidance

- Read product and architecture contracts before changing backend behavior.
- Treat `docs/architecture/backend-contract-manifest.json` as the machine-readable contract map; require its approval status/version to match the implementation contract.
- Read relevant `.codex/references/` before changing entities, payloads, persistence, business rules, security, or migrations.
- Follow `.codex/workflows/backend-development.md` and `.codex/checklists/backend-validation.md`.
- Keep durable human documentation in `docs/` and concise operational context in `.codex/`.
- Use the project-local architecture kit under `.agents/skills/` before changing the corresponding backend layer.
- Keep additional project-specific domain skills in `.agents/skills/` only for stable, approved, reusable product behavior.
- Never store secrets or executor-specific credentials in the repository.
- Organize each Django domain app with `models/`, `configurations/`, `dtos/`, `mappers/`, `repositories/`, `services/`, and `api/controllers/` packages.
- Use explicit mapper modules; do not add AutoMapper-style reflection dependencies.
- Start every authored backend Python file, including tests and package `__init__.py` files, with a meaningful module docstring that answers what the file does and records its responsibility and architectural boundary.
- Reference relevant approved contract paths or `BR-###` rules in that docstring when applicable.
- Never edit a Django-generated migration to add a docstring; migrations are the sole exception.
- Keep service ports/active Django `ROOT_URLCONF` and exact environment URL bindings, invariant IDs/tests, endpoint layer paths/tests, exact allowed `makemigrations` commands, and required validations synchronized with the manifest.

## Backend Skill Routing

- Use `$django-model-configuration` for Models, Configurations, and Model exports.
- Use `$django-dto-mapper` for DTOs and explicit representation mapping.
- Use `$django-repository` for every ORM query, persistence operation, transaction, and persistence adapter.
- Use `$django-service` for business rules and application workflows.
- Use `$django-controller` for endpoints, routes, HTTP translation, authentication, and permissions.
- Use `$django-migration` for command-only schema migration generation and verification.
- Use `$django-backend-testing` for layered tests and architecture validation.
- Use `$backend-domain-skill-author` when approved, repeated product behavior deserves a project-specific domain skill.

For changes across multiple layers, compose only the required skills in dependency order and preserve the approved implementation contract and manifest. These local skills do not authorize architecture or product decisions.
