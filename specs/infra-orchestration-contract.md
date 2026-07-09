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
- whether the local Supabase stack is bound to localhost on untrusted networks
- how local development connects to Supabase or local Postgres
- required production checks for Security Advisor, RLS, SSL, network restrictions, MFA, access control, Auth SMTP/rate limits, abuse prevention, indexes, performance, load testing and backups/PITR when needed
- how service role keys are kept server-side only
- whether the frontend uses Supabase directly and, if so, why the anon key is safe with RLS/policies

## Deployment Modes

The skill must support multiple modes without presenting one as mandatory:

- local full-stack Docker
- VPS or compatible host running containers
- Vercel-native frontend from `frontend/`
- backend container deployment
- Render backend web service deployment when chosen
- Supabase-managed Postgres/Auth/Storage

## Vercel Expectations

When Vercel is used, the output should document:

- `frontend` as the Vercel project root directory for monorepos
- build command and output directory, preferably using Vercel auto-detection unless overrides are needed
- Development, Preview and Production environment variables
- which frontend variables are public/browser-exposed
- backend API URL per environment
- CORS requirements for Vercel preview and production domains
- why Django is not deployed as a Vercel frontend project

If Django on Vercel Functions is explicitly chosen, document runtime/function limitations, static files and migration strategy instead of treating it as the default path.

## Render Expectations

When Render is chosen for the backend, the output should document:

- native Python runtime vs Docker web service decision
- backend root directory or Dockerfile path in monorepos
- build command
- start command
- pre-deploy/migration command when used
- required environment variables
- environment groups or secret handling
- `render.yaml` Blueprint if infrastructure-as-code is requested
- `sync: false` or `generateValue: true` for secrets in Blueprints
- health check path
- static file strategy
- CORS/API URL wiring from Vercel frontend to Render backend

Do not create a Render Postgres database when the project already uses Supabase Postgres unless explicitly requested.

## Non-Goals

- Do not rewrite frontend UI.
- Do not implement backend business logic.
- Do not invent missing product requirements.
- Do not commit real secrets.
- Do not claim production readiness unless validation was attempted and remaining gaps are documented.
