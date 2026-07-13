# Repository Map

## Source of Truth

- `skills/`: installable Codex skills.
- `docs/`: factory method and architecture documentation.
- `specs/`: durable handoff contracts between stages.
- `.codex/`: Codex-facing workflows, references, goals, checklists and templates.
- `templates/`: starter material for generated projects.
- `examples/`: sample outputs and project shapes.

Backend planning/audit lives in `skills/django-backend-service-architect/`. Optional OpenCode/Codex selection lives in `skills/app-factory-backend-router/`. Approved backend code execution lives in the independent, executor-neutral `skills/django-backend-code-executor/` skill.

## Do Not Confuse

- `.codex/` is not the install location for skills.
- Generated app projects receive a compact backend architecture kit and product-specific domain capabilities under `.agents/skills/`; this source repository keeps installable factory skills in `skills/` and the generated kit as an architect-skill asset.
- `opencode.json` and `.env.example` configure only this App Factory repository. Do not copy them into generated projects.
