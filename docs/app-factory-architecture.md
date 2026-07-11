# App Factory Architecture

## Purpose

The App Factory is a staged collection of Codex skills that moves directly from product intent to a validated MVP implementation.

```txt
Idea or PRD
  -> executable product contract
  -> @sites + App Factory React implementation
  -> Django planning and contract approval
  -> executor-neutral Django implementation
  -> Django contract audit
  -> infrastructure and publication
  -> MVP validation
```

## Boundaries

- `product-brief-architect` owns product meaning and executable contracts, not application code.
- `app-factory-frontend-builder` owns visual and interactive frontend implementation, not Django or infrastructure.
- External `@sites` owns preview and publication when composed in the creation command; it does not replace or become an npm dependency of the frontend skill.
- `django-backend-service-architect` owns backend planning, resolved project context, and implementation audit, not product invention or code execution.
- `django-backend-code-executor` implements approved backend contracts and never changes them silently.
- `app-factory-infra-orchestrator` owns runtime and deployment contracts, not feature design.

## Repository shape

```txt
skills/
  product-brief-architect/
  app-factory-frontend-builder/
  django-backend-service-architect/
  django-backend-code-executor/
  app-factory-infra-orchestrator/

docs/
  app-factory-architecture.md
  product-workflow.md

specs/
  product-contract.md
  frontend-build-contract.md
  django-backend-contract.md
  infra-orchestration-contract.md
  factory-handoff-contracts.md
```

Root specs define cross-skill contracts. Skill folders define execution. Generated projects keep product truth in `docs/product/`, durable architecture in `docs/architecture/`, and concise resolved backend-operational context in the project-root `.codex/`.
