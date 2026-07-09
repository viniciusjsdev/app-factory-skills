# Factory Handoff Contracts

## PRD to Lovable Prompt

Producer: `lovable-prompt-architect`

Consumer: user and Lovable

Output should include:

- product brief or product summary
- target user
- core problem
- MVP objective
- screen list
- navigation model
- required UI states
- mock data expectations
- integrations that should be visually represented
- visual style direction
- mobile-first requirements
- copy tone
- constraints and non-goals

## Lovable Prompt to Generated Frontend

Producer: Lovable

Consumer: `lovable-frontend-normalizer`

Required user action:

- paste the prompt into Lovable
- let Lovable generate or update the frontend
- provide the generated code repository to Codex

## Normalized Frontend to Backend Skills

Producer: `lovable-frontend-normalizer`

Consumer: `django-backend-service-architect`

Output should include:

- `docs/frontend-architecture.md`
- `docs/api-contract.md`
- `docs/data-model-notes.md` when useful
- `docs/validation-report.md` when useful

Backend skills should use these artifacts instead of guessing requirements from UI code alone.

## Django Backend to Infrastructure

Producer: `django-backend-service-architect`

Consumer: `app-factory-infra-orchestrator`

Output should include:

- backend directory structure
- `.env.example`
- Dockerfile or Docker compatibility notes
- database ownership decision
- required environment variables
- health endpoint
- API contract
- validation/test status

Infrastructure skills should not invent backend settings that are missing from the backend contract.

## Infrastructure to MVP Validation

Producer: `app-factory-infra-orchestrator`

Consumer: user, deployment host, Vercel and Supabase

Output should include:

- `docker-compose.yml`
- `docker-compose.prod.yml` when a production container path is requested
- frontend Dockerfiles and `.dockerignore` when frontend exists
- backend Dockerfiles, `.dockerignore` and entrypoint when backend exists
- root `.env.example`
- `frontend/.env.example`
- `backend/.env.example`
- Supabase CLI/migration structure when Supabase is used
- Vercel frontend deployment notes
- VPS/container deployment notes when relevant
- infrastructure validation status

Infrastructure work should document local Docker, Vercel frontend, backend container and Supabase managed-service boundaries explicitly.
