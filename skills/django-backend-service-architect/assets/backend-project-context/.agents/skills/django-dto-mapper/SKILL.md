---
name: django-dto-mapper
description: Implement approved Django backend DTOs and explicit representation Mappers. Use when defining Controller request or response payloads, Service inputs or results, structural validation, request-to-Service conversion, result-to-response conversion, or repository-neutral record shapes. Do not use for endpoints, business rules, ORM queries, persistence, or implicit AutoMapper-style mapping.
---

# Django DTO Mapper

Implement explicit, testable representation boundaries from the approved API contract.

## Required Context

Read `AGENTS.md`, `docs/architecture/api-contract.md`, `docs/architecture/security-contract.md`, `docs/architecture/backend-implementation-contract.md`, `.codex/references/dto-controller-policy.md`, `.codex/references/mapping-policy.md`, and `.codex/references/module-documentation.md`.

Require an approved implementation contract. Stop if payload fields, nullability, sensitive-field exposure, or mapping ownership are unresolved.

## Workflow

1. Identify request DTO, Service input, Service result, and response DTO shapes for the use case.
2. Implement structural and field-level validation in `dtos/<use_case>.py`.
3. Implement explicit request-to-input and result-to-response functions in `mappers/<use_case>.py`.
4. Use allowlists for response and sensitive-field mapping.
5. Add meaningful opening module docstrings and trace behavioral mappings to approved contracts or `BR-###` rules.
6. Add focused DTO and mapper tests for valid, invalid, omitted, nullable, and sensitive fields.

## Boundaries

- Do not authorize users or enforce business invariants in DTOs or Mappers.
- Do not import ORM Models, Repositories, QuerySets, HTTP request objects, or Service implementations.
- Do not query, persist, call integrations, or use reflection-based AutoMapper dependencies.
- Keep ORM/record conversion inside `repositories/mappers.py`, owned by `$django-repository`.

Finish only when Controller payloads are DTO-defined, conversions are explicit, sensitive fields are intentional, and tests cover the contract.
