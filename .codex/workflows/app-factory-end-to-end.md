# App Factory End-to-End Workflow

Use this workflow when the user wants to go from idea or PRD to MVP project.

1. Confirm whether frontend code already exists.
2. If not, route to `lovable-prompt-architect`.
3. Stop after producing the Lovable prompt and tell the user to generate the frontend in Lovable.
4. When frontend code exists, route to `lovable-frontend-normalizer`.
5. When API contracts exist, route to `django-backend-service-architect`.
6. When frontend/backend structure exists, route to `app-factory-infra-orchestrator`.
7. Run available validation commands and report failures honestly.
