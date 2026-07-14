---
name: django-service
description: Implement approved backend business rules and application workflows in persistence-agnostic Django Service modules. Use when coordinating Repository contracts, enforcing numbered business rules, managing domain decisions, or producing Service results. Do not use for HTTP endpoints, DTO parsing, ORM Models, QuerySets, direct database access, or representation mapping.
---

# Django Service

Implement the business brain of an approved use case without coupling it to HTTP or Django persistence.

## Required Context

Read `AGENTS.md`, relevant `docs/product/` business rules, `docs/architecture/domain-model.md`, `docs/architecture/api-contract.md`, `docs/architecture/backend-implementation-contract.md`, `docs/architecture/backend-contract-manifest.json`, `.codex/references/service-layer.md`, `.codex/references/repository-policy.md`, and `.codex/references/module-documentation.md`.

Require an approved implementation contract. Stop if a business invariant, permission decision, transaction expectation, or failure state is missing or contradictory.

## Workflow

1. Identify Service input, result, dependencies, manifest invariant IDs, and expected domain errors.
2. Inject Repository, Unit of Work, clock, identifier, or integration contracts explicitly.
3. Enforce business invariants and coordinate the use case in `services/<use_case>.py`.
4. Return persistence-neutral results and raise approved domain/application errors.
5. Add a meaningful opening docstring naming responsibility, boundaries, and relevant business rules.
6. Add every exact manifest Service test with fakes and no database or HTTP client.

## Boundaries

- Do not accept HTTP request objects or return framework responses.
- Do not import ORM Models, `django.db`, managers, QuerySets, Controllers, or application Mappers.
- Do not query or persist directly; use Repository or Unit of Work contracts.
- Do not invent permissions, billing, sensitive-data, tenant, or lifecycle behavior.

Finish only when business rules are traceable, dependencies are explicit, Service tests are persistence-free, and no HTTP or ORM coupling remains.
