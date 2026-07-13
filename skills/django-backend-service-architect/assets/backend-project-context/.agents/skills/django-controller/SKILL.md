---
name: django-controller
description: Implement approved thin Django or DRF API Controllers and route wiring. Use when declaring endpoints, applying authentication or permissions, validating DTO-defined payloads, invoking Services through composition, mapping expected errors, or constructing HTTP responses. Do not use for business rules, ORM access, Repository calls, or Controller-local payload schemas.
---

# Django Controller

Implement endpoint transport around approved DTO, Mapper, Service, security, and API contracts.

## Required Context

Read `AGENTS.md`, `docs/architecture/api-contract.md`, `docs/architecture/security-contract.md`, `docs/architecture/backend-implementation-contract.md`, `.codex/references/dto-controller-policy.md`, `.codex/references/mapping-policy.md`, `.codex/references/backend-security.md`, and `.codex/references/module-documentation.md`.

Require an approved implementation contract. Stop if route, method, actor, permission, payload, status, or error behavior is unresolved.

## Workflow

1. Declare the approved route, method, authentication, permissions, and throttling.
2. Instantiate and validate the request DTO.
3. Invoke the explicit request-to-Service Mapper.
4. Resolve and call the Service through the composition boundary.
5. Map only approved domain/application errors to HTTP responses.
6. Map the Service result to a response DTO and construct the response.
7. Add a meaningful opening module docstring and focused API, permission, and response-shape tests.

## Boundaries

- Do not import ORM Models or call Repositories directly.
- Do not open transactions, build queries, enforce business branching, or call integrations.
- Do not define payload fields or perform field-by-field mapping in the Controller.
- Do not expose sensitive fields outside the approved response DTO.

Finish only when the Controller contains endpoint transport alone and tests prove DTO, permission, status, error, and response contracts.
