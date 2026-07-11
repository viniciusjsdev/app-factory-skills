---
name: django-backend-service-architect
description: Plan and audit API-first Django backends from executable product, frontend, and API contracts. Use when Codex must define backend domain boundaries, ORM entities, repository interfaces, DTO/controller payloads, service responsibilities, migration policy, security contracts, validation plans, or project-local backend context under .codex, and when it must audit completed backend code against those contracts. Do not use to write Django implementation code, generate migrations, build frontend code, or configure infrastructure.
---

# Django Backend Service Architect

## Purpose

Turn product and frontend contracts into an approved, auditable Django backend design. Materialize concise backend-operational context in the generated project's root `.codex/` and audit completed code without becoming the implementation executor.

## Hard Boundary

This skill plans and audits. It must not create or edit Django implementation files, ORM migrations, tests, deployment files, or OpenCode configuration.

Use `django-backend-code-executor` only after the contracts are explicitly approved. Executor selection is a factory concern; this skill must remain independent of Codex, OpenCode, or any other implementation engine.

## Architecture Contract

Plan and audit this dependency direction:

```txt
HTTP -> Controller -> Request DTO -> Service -> Repository contract
Repository implementation -> Django ORM Model
Service -> Response DTO -> Controller -> HTTP
```

Enforce these invariants:

- name every Django ORM class in CamelCase;
- keep ORM models limited to entity declaration;
- define field sizes, choices, defaults, indexes, constraints, table names, and related specifications in `configurations.py` and reference them from the model;
- keep all ORM queries and persistence operations inside `repositories/`;
- keep controllers limited to endpoint transport, DTO validation, service invocation, exception mapping, and HTTP response construction;
- define controller request and response payload structures in DTOs and use those DTOs in controllers;
- keep services as the owner of business rules without endpoints, HTTP types, ORM imports, QuerySets, or direct database access;
- use repository contracts or a Unit of Work abstraction when a service needs persistence;
- never handwrite or patch migration code; generate schema migrations only through Django management commands.

Read `references/backend-architecture-standard.md` for the complete layer contract.

## Required Context

Inspect, when present:

```txt
docs/product/prd.md
docs/product/product-brief.md
docs/product/screen-map.md
docs/product/business-rules.md
docs/product/data-contract.md
docs/product/acceptance-criteria.md
docs/architecture/frontend-architecture.md
docs/architecture/api-contract.md
frontend/src/services/
frontend/src/mocks/
frontend/src/features/
backend/
```

Minimum context:

- product scope and domain rules;
- entities, ownership, and primary workflows;
- frontend or API payload expectations;
- authentication and authorization expectations;
- sensitive-data expectations;
- database ownership and deployment constraints when known.

If consequential context is missing, stop and return a concise missing-decisions report. Do not silently invent permissions, tenant boundaries, sensitive-data rules, billing behavior, or migration ownership.

## Modes

### Planning mode

Use when contracts do not exist or require revision.

1. Run the context initializer with `--dry-run`.
2. Inspect existing `.codex`, `AGENTS.md`, and architecture documentation.
3. Create or update the required planning documents.
4. Resolve the layer boundaries and migration ownership.
5. Initialize missing backend context files and replace template placeholders with project-specific decisions.
6. Summarize decisions and open questions to the user.
7. Stop before implementation.

### Audit mode

Use when backend code already exists.

1. Read the approved contracts and their approval metadata.
2. Inspect the implementation, generated migrations, tests, and execution evidence.
3. Run `scripts/scan-django-architecture.py` from the target project when available.
4. Compare contract, code, migration evidence, and tests.
5. Write or update `docs/validation/backend-audit.md`.
6. Return `approved`, `approved-with-notes`, `corrections-required`, `contract-review-required`, or `blocked`.
7. Produce bounded correction findings; do not implement them with this skill.

Read `references/audit-rules.md` before auditing.

## Required Planning Documents

Create or update:

```txt
docs/architecture/backend-plan.md
docs/architecture/domain-model.md
docs/architecture/api-contract.md
docs/architecture/security-contract.md
docs/architecture/backend-validation-plan.md
docs/architecture/backend-implementation-contract.md
```

If equivalent paths already exist, preserve them and record the path mapping in `backend-plan.md`.

The implementation contract must identify:

- Django apps to create or change;
- CamelCase ORM entities and their configuration objects;
- repository contracts and implementations;
- services and business invariants;
- request/response DTOs;
- controllers and endpoints;
- expected Django-generated migrations;
- tests and validation commands;
- writable and forbidden scope;
- accepted assumptions and remaining blockers.

Read `references/backend-planning-specs.md`, `references/api-contract-rules.md`, `references/migration-rules.md`, and `references/security-rules.md` before writing contracts.

## Contract Approval Gate

Implementation may begin only when the user has explicitly accepted the backend decisions. Record approval metadata in `backend-implementation-contract.md`:

```yaml
---
status: approved
contract_version: 1
approved_at: YYYY-MM-DD
---
```

Do not mark a contract approved based only on the agent's confidence. If an approved contract changes materially, increment its version and require approval again.

## Project Context

Run:

```bash
node scripts/init-backend-project-context.mjs <project-root> --dry-run
node scripts/init-backend-project-context.mjs <project-root>
```

The initializer creates missing backend-specific `.codex` files and preserves all existing frontend, product, and project context. Populate created templates with resolved project decisions; do not copy generic skill prose into the generated project.

Read `references/project-context-standard.md` before initializing context.

## Decision Summary

Before requesting approval, summarize:

- entities and ownership;
- repository boundaries;
- service responsibilities;
- endpoint and DTO groups;
- authentication and permissions;
- sensitive-data handling;
- migration generation and ownership;
- validation plan;
- assumptions and open decisions.

## References

- `references/backend-architecture-standard.md`: mandatory layer and naming rules.
- `references/backend-planning-specs.md`: required document contents.
- `references/django-app-template.md`: planned app shape.
- `references/service-layer-rules.md`: service/repository interaction.
- `references/dto-serializer-rules.md`: DTO and controller payload rules.
- `references/api-contract-rules.md`: endpoint contract fields.
- `references/migration-rules.md`: command-only migration policy.
- `references/security-rules.md`: security contract requirements.
- `references/testing-rules.md`: validation coverage expectations.
- `references/project-context-standard.md`: generated-project `.codex` rules.
- `references/audit-rules.md`: implementation audit protocol.
- `references/validation-checklist.md`: planning and audit completion gate.

## Definition of Done

Planning is done only when:

- preflight context is sufficient;
- all required planning documents exist;
- the architecture follows Controller/DTO/Service/Repository/Model boundaries;
- migration ownership and command-only generation are explicit;
- backend-specific `.codex` context exists and contains resolved decisions;
- decisions are summarized to the user;
- approval is explicit or the skill clearly reports that approval is pending.

Audit is done only when:

- approved contracts were compared with code and tests;
- architecture and migration scans were attempted;
- deviations have evidence and bounded correction scope;
- the audit status is explicit;
- no implementation code was changed by this skill.
