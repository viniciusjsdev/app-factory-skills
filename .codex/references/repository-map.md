# Repository Map

## Source of Truth

- `skills/`: installable Codex skills.
- `docs/`: factory method and architecture documentation.
- `specs/`: durable handoff contracts between stages.
- `.codex/`: Codex-facing workflows, references, goals, checklists and templates.
- `templates/`: starter material for generated projects.
- `examples/`: sample outputs and project shapes.

Backend planning/audit lives in `skills/django-backend-service-architect/`. Approved backend code execution lives in the independent `skills/django-backend-code-executor/` skill.

## Do Not Confuse

- `.codex/` is not the install location for skills.
- `.agents/skills/` is useful inside generated app projects when embedding skills there, but this source repository keeps skills in `skills/`.
