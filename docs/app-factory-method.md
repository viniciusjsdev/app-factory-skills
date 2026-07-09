# App Factory Method

The App Factory method turns a product idea into an MVP-ready technical project through staged Codex skills.

## Method

1. Capture the product idea, PRD or rough notes.
2. Use `lovable-prompt-architect` to create a complete Lovable prompt.
3. Have the user paste the prompt into Lovable and bring back generated frontend code.
4. Use `lovable-frontend-normalizer` to preserve UI/UX while organizing the frontend.
5. Use `django-backend-service-architect` to create or normalize the backend from product and API contracts.
6. Use `app-factory-infra-orchestrator` to create Docker, Supabase and Vercel infrastructure.
7. Validate locally and document what remains before launch.

## Rules

- Do not skip the Lovable handoff when frontend code does not exist.
- Do not ask backend or infra skills to guess missing contracts when the previous stage can produce them.
- Preserve product intent between stages.
- Prefer launch speed and clarity over premature platform complexity.
