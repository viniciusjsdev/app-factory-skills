---
name: django-backend-testing
description: Add, organize, run, and assess Django backend tests and architecture validation for an approved implementation. Use for DTO, Mapper, Service, Repository, Controller/API, permission, security, migration, integration, and boundary-scanner coverage. Do not use to weaken assertions, conceal failures, or change approved behavior merely to make tests pass.
---

# Django Backend Testing

Validate behavior and architectural boundaries against approved contracts.

## Required Context

Read `AGENTS.md`, `docs/architecture/backend-validation-plan.md`, `docs/architecture/api-contract.md`, `docs/architecture/security-contract.md`, `docs/architecture/backend-implementation-contract.md`, `.codex/references/backend-testing.md`, `.codex/references/module-documentation.md`, and `.codex/checklists/backend-validation.md`.

## Workflow

1. Map each approved behavior and `BR-###` rule to the correct test layer.
2. Test DTO structure and explicit Mappers without persistence.
3. Test Services with fake Repository contracts and no database or HTTP client.
4. Test Repositories against the database, including ownership, queries, transactions, and persistence.
5. Test Controllers through the API boundary, including authentication, permissions, statuses, errors, and response shape.
6. Run Django checks, pending-migration checks, the full test suite, and the architecture scanner.
7. Verify every authored test module has a meaningful opening docstring.
8. Record exact commands, failures, skipped surfaces, unavailable dependencies, and limitations.

## Integrity Rules

- Do not add `skip`, `xfail`, mocks, retries, or weakened assertions solely to obtain green output.
- Do not use the database in Service tests or mock the database in Repository tests.
- Do not treat passing tests as architectural approval; the architect/auditor owns final approval.
- Do not conceal unavailable services, flaky behavior, or validation gaps.

Finish only when coverage traces to contracts, boundaries are exercised, and evidence distinguishes passing, failing, and untested behavior.
