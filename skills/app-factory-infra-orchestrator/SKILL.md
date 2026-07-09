---
name: app-factory-infra-orchestrator
description: Use this skill when creating or normalizing App Factory infrastructure for a monorepo with frontend, backend, Docker, Docker Compose, Supabase and Vercel. It creates root Docker orchestration, frontend/backend Dockerfiles, env examples, Supabase migration structure, Vercel configuration guidance and validation commands. Do not use this skill for frontend UI refactors or backend business logic.
---

# App Factory Infra Orchestrator

## Purpose

Create and normalize infrastructure for App Factory projects.

The standard repository has:

```txt
frontend/
backend/
supabase/
docs/
.agents/skills/
.codex/
docker-compose.yml
docker-compose.prod.yml
Makefile
.env.example
AGENTS.md
README.md
```

## Core Principle

Local must be easy. Production must be explicit. Vercel must not be confused with a generic Docker host.

Use Docker for local orchestration and backend deployability. Use Vercel for frontend deployment from `/frontend`. Use Supabase for managed Postgres/Auth/Storage when configured.

Do not promise one production path. Support local/full Docker, VPS/full-stack container deployment, Vercel-native frontend deployment, backend container deployment, and Supabase-managed services.

## Modes

### Local / Full Docker

Use for local development and full-stack smoke testing:

- frontend container
- backend container
- local db container when not using remote Supabase
- shared Docker network
- hot reload when practical

### Cloud Split

Use for common MVP deployment:

- frontend on Vercel from `/frontend`
- backend as container on VPS, Render, Railway, Fly.io or compatible host
- Supabase as managed Postgres/Auth/Storage

## Load References

Read the relevant references before changing files:

- `references/root-architecture-standard.md`
- `references/docker-compose-standard.md`
- `references/frontend-docker-standard.md`
- `references/backend-docker-standard.md`
- `references/supabase-standard.md`
- `references/vercel-standard.md`
- `references/env-standard.md`
- `references/validation-checklist.md`

Run `scripts/scan-infra.mjs` after changes when possible.

## Root Architecture

Expected root:

```txt
/
  frontend/
  backend/
  supabase/
  docs/
  .agents/
    skills/
  .codex/
  docker-compose.yml
  docker-compose.override.yml
  docker-compose.prod.yml
  Makefile
  .env.example
  AGENTS.md
  README.md
```

## Docker Compose Standard

Create `docker-compose.yml` for local development.

Required services when available:

```txt
frontend
backend
db
```

`db` is optional when the project uses remote Supabase only. If included, clearly label it as a local development fallback.

Recommended ports:

```txt
frontend: 5173 or app-specific dev port
backend: 8000
db: 5432
```

Use named volumes for database data, a shared network and healthchecks where practical.

Do not put secrets directly in compose files. Read from root `.env`.

## Frontend Docker Standard

Create:

```txt
frontend/Dockerfile
frontend/Dockerfile.prod
frontend/.dockerignore
```

Development Dockerfile should:

- use Node LTS image
- install dependencies with the detected package manager
- support Vite/TanStack/React dev server
- bind to `0.0.0.0`
- expose the correct dev port
- preserve hot reload when mounted via Compose

Production Dockerfile should:

- build static frontend
- serve using nginx or another lightweight static server when running outside Vercel
- not be required for Vercel native deploy

Important: Vercel deployment should use the `/frontend` root directory and framework build command/output directory, not the frontend Dockerfile, unless the deployment platform explicitly supports custom containers.

## Backend Docker Standard

Create:

```txt
backend/Dockerfile
backend/Dockerfile.prod
backend/.dockerignore
backend/entrypoint.sh
```

Development backend should install Python dependencies, run Django development server, expose port `8000`, and mount source for fast development.

Production backend should use a slim Python image, install only required dependencies, run migrations explicitly or through a controlled entrypoint, collect static files if needed, run gunicorn, expose port `8000`, and use environment variables.

Do not hardcode secrets.

## Environment Standard

Create:

```txt
.env.example
frontend/.env.example
backend/.env.example
```

Root `.env.example` should include:

```env
COMPOSE_PROJECT_NAME=app_factory_project

FRONTEND_PORT=5173
BACKEND_PORT=8000

VITE_API_BASE_URL=http://localhost:8000/api

DJANGO_SETTINGS_MODULE=config.settings.local
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend

DATABASE_URL=postgresql://postgres:postgres@db:5432/app

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Never commit real secrets.

## Supabase Standard

Create when Supabase is part of the stack:

```txt
supabase/
  migrations/
  seed.sql
  config.toml
```

Use Supabase when the product needs managed Postgres, Auth, Storage, Realtime or Edge Functions.

For Django-backed products:

- Django can connect to Supabase Postgres through `DATABASE_URL`.
- Django migrations can remain the source of truth for backend-owned domain tables.
- Supabase migrations can be used for Auth/Storage/RLS-specific resources.
- If Supabase SQL migrations are the source of truth for all schema, document that decision clearly.

Do not create conflicting schema ownership silently.

For local Supabase development, prefer Supabase CLI structure and migrations. Keep `supabase/config.toml`, migrations and seed files versioned when generated.

Production readiness must be documented rather than assumed. Include a Supabase checklist covering RLS, SSL enforcement, network restrictions, MFA, access control, indexes/performance review, backups/PITR when needed, and secret handling.

## Vercel Standard

Frontend deploy target:

```txt
Root Directory: frontend
Build Command: npm run build or detected package manager equivalent
Output Directory: dist or framework-specific output
```

Create `frontend/vercel.json` only when needed.

Do not configure backend Django as a Vercel frontend deployment. If the backend needs deployment, prepare it as a container for a container-friendly host.

## Makefile Standard

Create root `Makefile` with commands:

```makefile
up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

frontend-shell:
	docker compose exec frontend sh

backend-shell:
	docker compose exec backend sh

backend-check:
	docker compose run --rm backend python manage.py check

backend-test:
	docker compose run --rm backend python manage.py test

backend-migrate:
	docker compose run --rm backend python manage.py migrate

build:
	docker compose build

prod-build:
	docker compose -f docker-compose.prod.yml build
```

Adapt to available package manager and backend tooling.

## Documentation

Create or update:

```txt
docs/architecture/root-architecture.md
docs/architecture/infra-architecture.md
docs/architecture/deploy.md
README.md
```

Docs must explain how to run locally, stop containers, run migrations, run tests, connect frontend/backend, connect backend/Supabase/Postgres, configure Vercel, required env vars, and what is local-only vs production.

## Validation Workflow

After creating or changing infra, run when possible:

```bash
docker compose config
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail=100
docker compose run --rm backend python manage.py check
docker compose down
```

If frontend exists:

```bash
docker compose run --rm frontend npm run build
```

If backend exists:

```bash
docker compose run --rm backend python manage.py test
```

If Supabase CLI is configured:

```bash
supabase status
```

Do not claim infra works unless validation was attempted.

## Architecture Scan

Run:

```bash
node scripts/scan-infra.mjs
```

or the installed skill script path from the target project.

The script should check root Compose, frontend/backend Dockerfiles, env examples, obvious secrets, Makefile, docs, Vercel guidance and Supabase structure when applicable.

## Definition of Done

Work is done only when:

- root architecture is present
- frontend Docker files exist when frontend exists
- backend Docker files exist when backend exists
- root Compose exists
- production Compose exists if requested
- env examples exist
- secrets are not committed
- Supabase structure exists when applicable
- Vercel deployment guidance exists when frontend exists
- Makefile exists
- docs are updated
- Docker config/build/up validation was attempted
- failures are reported honestly

