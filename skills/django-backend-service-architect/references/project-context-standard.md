# Backend Project Context Standard

## Location

Use one project-root context shared by frontend, backend, and infrastructure:

```txt
project/
  AGENTS.md
  .agents/skills/
  .codex/
    references/
    workflows/
    checklists/
    decisions/
    templates/
  docs/
  frontend/
  backend/
```

Never create `backend/.codex` inside a full-stack repository.

## Responsibilities

- `docs/`: durable human-facing product and architecture truth.
- `.codex/references/`: concise resolved operational context.
- `.codex/workflows/`: repeatable project procedures.
- `.codex/checklists/`: verification gates.
- `.codex/decisions/`: accepted architecture decisions.
- `.agents/skills/`: project-specific invocable domain capabilities.

Do not convert generic Django guidance into a project-local skill. Create a domain skill only when the project has stable, repeated, product-specific behavior that benefits from invocation.

## Initialization

Run `scripts/init-backend-project-context.mjs`. The script creates missing files and preserves existing files. After initialization, replace placeholders only in files created by the current operation or deliberately update existing project context after inspection.

Do not place executor configuration, API keys, OpenCode prompts, callback state, or temporary run artifacts in `.codex`.
