# Skill Sequence

## Standard Sequence

```txt
Idea or PRD
  -> lovable-prompt-architect
  -> Lovable
  -> lovable-frontend-normalizer
  -> django-backend-service-architect
  -> app-factory-infra-orchestrator
  -> MVP validation
```

## Routing

- Use `lovable-prompt-architect` before frontend code exists.
- Use `lovable-frontend-normalizer` only after Lovable-generated frontend code exists.
- Use `django-backend-service-architect` after product/frontend contracts exist.
- Use `app-factory-infra-orchestrator` after frontend/backend structure exists.

## Handoffs

Each stage should leave explicit artifacts for the next one: product brief, Lovable prompt, frontend architecture notes, API contract, backend contract and infra validation notes.
