# Infra Orchestration Contract

## Producer

`app-factory-infra-orchestrator`

## Required Inputs

- frontend project path and package manager
- backend project path and runtime
- frontend dev/build commands
- backend run/check/test commands
- expected frontend and backend ports
- database decision: local Postgres, Supabase Postgres or another provider
- Supabase usage decision for Auth, Storage, Realtime or Edge Functions
- deployment preference, if known

## Required Outputs

- `docker-compose.yml` for local development
- `docker-compose.prod.yml` when full-stack container deployment is requested
- `frontend/Dockerfile`
- `frontend/Dockerfile.prod`
- `frontend/.dockerignore`
- `backend/Dockerfile`
- `backend/Dockerfile.prod`
- `backend/.dockerignore`
- `backend/entrypoint.sh`
- root `.env.example`
- service `.env.example` files
- `Makefile`
- `docs/architecture/infra-architecture.md`
- `docs/architecture/deploy.md`
- validation notes

## Supabase Expectations

When Supabase is used, the output should document:

- whether Django migrations or Supabase migrations own domain tables
- how Supabase CLI files are versioned
- where migrations and seed SQL live
- how local development connects to Supabase or local Postgres
- required production checks for RLS, SSL, network restrictions, MFA, access control, indexes, performance and backups/PITR when needed
- how service role keys are kept server-side only

## Deployment Modes

The skill must support multiple modes without presenting one as mandatory:

- local full-stack Docker
- VPS or compatible host running containers
- Vercel-native frontend from `frontend/`
- backend container deployment
- Supabase-managed Postgres/Auth/Storage

## Non-Goals

- Do not rewrite frontend UI.
- Do not implement backend business logic.
- Do not invent missing product requirements.
- Do not commit real secrets.
- Do not claim production readiness unless validation was attempted and remaining gaps are documented.
