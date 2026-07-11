# Project Agent Guidance

- Read product and architecture contracts before changing backend behavior.
- Read relevant `.codex/references/` before changing entities, payloads, persistence, business rules, security, or migrations.
- Follow `.codex/workflows/backend-development.md` and `.codex/checklists/backend-validation.md`.
- Keep durable human documentation in `docs/` and concise operational context in `.codex/`.
- Keep project-specific invocable domain skills in `.agents/skills/`.
- Never store secrets or executor-specific credentials in the repository.
