# Product Workflow

## Stage 1: PRD or Rough Idea

Input may be:

- client notes
- a rough app idea
- a PRD
- a list of desired screens
- a market/problem statement
- a prototype concept

The correct skill is `lovable-prompt-architect`.

Output:

- a clarified product brief
- a complete Lovable prompt
- explicit assumptions
- MVP scope boundaries
- suggested screens and flows
- validation notes

Recommended product artifact:

- use `specs/product-brief-template.md` when the user wants a durable product brief before Lovable generation

## Stage 2: Lovable Generation

The user pastes the generated prompt into Lovable.

Codex should not continue to frontend normalization until the generated frontend code exists.

## Stage 3: Frontend Normalization

Input is a Lovable-generated frontend project.

The correct skill is `lovable-frontend-normalizer`.

Output:

- normalized frontend structure
- preserved UI/UX
- isolated mocks
- API boundary
- frontend architecture docs
- validation report

## Stage 4: Django Backend

Input is a normalized frontend plus product/API contracts.

The correct skill is `django-backend-service-architect`.

Output:

- Django backend structure
- domain apps
- models
- services
- selectors
- API views/controllers
- DTOs/serializers
- tests
- environment examples
- updated API contracts

## Stage 5: Infrastructure

Input is a frontend/backend project with enough contracts to know ports, environment variables, database ownership and deployment expectations.

The correct skill is `app-factory-infra-orchestrator`.

Output:

- local Docker Compose orchestration
- frontend and backend Docker files
- backend production container guidance
- Vercel frontend deployment guidance
- Supabase folder, migration expectations and production checklist when Supabase is used
- root and service-level `.env.example` files
- Makefile developer commands
- infrastructure and deployment docs
- validation report

The skill should consume frontend/backend project structure and deployment contracts instead of rediscovering requirements from scratch.
