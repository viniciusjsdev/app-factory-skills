# Skill Catalog

## lovable-prompt-architect

Use when the input is a PRD, product brief, raw idea, client notes or MVP concept and the user needs a complete prompt to paste into Lovable.

Do not use when frontend code already exists and the user wants code refactoring.

Required input:

- idea, PRD or product notes

Expected output:

- Lovable-ready prompt
- product assumptions
- MVP scope
- screens and flows
- design/UX instructions
- mock data guidance
- post-Lovable handoff instructions

## lovable-frontend-normalizer

Use when the input is an actual Lovable-generated frontend project and the user wants it normalized, refactored, tested or prepared for backend integration.

Do not use when the user only has an idea or PRD and no generated frontend code yet.

Required input:

- frontend source code generated or accelerated by Lovable

Expected output:

- thin routes
- feature-based frontend structure
- mock isolation
- API boundary docs
- mobile-first validation
- local validation report

## django-backend-service-architect

Use when the input is a normalized frontend, product documentation or API contract and the user wants to create, expand or normalize a Django backend.

Do not use when the user only needs a Lovable prompt or frontend refactor.

Required input:

- product docs and/or normalized frontend API contract
- enough domain context to model backend entities

Expected output:

- Django backend structure
- Models, Services, Selectors, API Views and DTOs/Serializers
- health and baseline endpoints
- API contract updates
- environment examples
- tests and validation report

## app-factory-infra-orchestrator

Use after frontend and backend structure exist and the user wants Docker, Supabase, Vercel, VPS support, environment contracts or deployment documentation.

Do not use when the user only has a PRD, a Lovable prompt, or frontend-only code with no backend/deployment decision yet.

Required input:

- frontend/backend project structure
- ports and framework commands when non-standard
- database ownership decision or enough context to document one
- deployment preference when the user has one

Expected output:

- local Docker Compose setup
- frontend and backend Dockerfiles
- backend production container setup
- environment examples
- Supabase CLI/migration structure when Supabase is used
- Vercel/frontend deployment guidance from `frontend/`
- VPS/full-stack container guidance when requested
- production readiness checklist

## Future Skills

Backend and infrastructure skills should only run after they receive the contracts they need. `django-backend-service-architect` usually consumes outputs from `lovable-prompt-architect` and `lovable-frontend-normalizer`; `app-factory-infra-orchestrator` usually consumes the normalized frontend and Django backend outputs.
