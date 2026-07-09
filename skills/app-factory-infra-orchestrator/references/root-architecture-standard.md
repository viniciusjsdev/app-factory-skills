# Root Architecture Standard

Use this target shape for App Factory monorepos:

```txt
/
  frontend/
  backend/
  supabase/
  docs/
  .agents/skills/
  .codex/
  docker-compose.yml
  docker-compose.override.yml
  docker-compose.prod.yml
  Makefile
  .env.example
  AGENTS.md
  README.md
```

Create only what is useful for the current project. Do not invent a backend, Supabase or Vercel setup before the project reaches that stage.

## Modes

- Local/full Docker: run frontend, backend and optional local db together.
- Cloud split: Vercel for frontend, backend container on a compatible host, Supabase as managed services.
- VPS/full-stack: run frontend static server, backend and database/proxy as containers when the user chooses VPS deployment.

Document which mode is active.

