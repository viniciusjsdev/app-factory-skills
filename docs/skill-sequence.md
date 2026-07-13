# Skill Sequence

```txt
Idea or PRD
  -> product-brief-architect
  -> @sites + app-factory-frontend-builder
  -> django-backend-service-architect
  -> app-factory-backend-router
  -> OpenCode Go or Codex + django-backend-code-executor
  -> django-backend-service-architect audit
  -> app-factory-infra-orchestrator
  -> publication and MVP validation
```

- Use `product-brief-architect` when product contracts are absent or incomplete.
- After product contracts are implementable, invoke external `@sites` together with `$app-factory-frontend-builder`. Sites owns preview/publication; the frontend skill owns stack and implementation standards.
- Use `django-backend-service-architect` after product and frontend/API contracts exist to plan, materialize backend project context and its local architecture skill kit, and obtain approval.
- Use `app-factory-backend-router` after approval to select OpenCode Go when ready or Codex automatically when unavailable.
- Use `django-backend-code-executor` only for an explicitly approved implementation contract; compose the matching local Model, DTO/Mapper, Repository, Service, Controller, migration, and testing skills.
- Return to `django-backend-service-architect` for contract-to-code audit before infrastructure handoff.
- Use `app-factory-infra-orchestrator` after frontend/backend structure and environment requirements exist.

Every stage leaves durable artifacts for the next one: executable PRD, frontend architecture and API boundary, backend/security contracts, and infrastructure validation notes.
