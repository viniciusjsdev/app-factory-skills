# Backend Planning Specs

## Purpose

Backend planning specs turn product/frontend context into an explicit backend implementation plan before code is written.

Do not create Django implementation files before these specs exist, unless the user has explicitly asked to skip planning for a narrow maintenance change.

## Required Files

Create or update:

```txt
docs/architecture/backend-plan.md
docs/architecture/domain-model.md
docs/architecture/api-contract.md
docs/architecture/security-contract.md
docs/architecture/backend-validation-plan.md
```

If equivalent paths already exist, keep the existing convention and document the path mapping in `backend-plan.md`.

## backend-plan.md

Include:

- source documents reviewed
- product assumptions
- implementation scope
- non-goals
- Django apps to create or update
- services/actions to implement
- selectors/read models to implement
- dependencies and environment assumptions
- open decisions

## domain-model.md

Include:

- entities
- relationships
- ownership model
- tenant/account/user boundaries
- lifecycle states
- validation rules
- persistence notes
- migration ownership decision

## api-contract.md

Include for each endpoint:

- path and method
- frontend consumer
- auth and permission requirement
- rate limit expectation
- request body/query params
- response body
- sensitive fields
- masking/encryption/omission rules
- status codes and error shape
- service/selector used

## security-contract.md

Include:

- authentication mode
- authorization model
- object-level permission rules
- CORS origins by environment
- rate limit and IP throttling approach
- sensitive data handling
- logout/session/token invalidation strategy
- logging restrictions
- safe error response rules

## backend-validation-plan.md

Include:

- tests to add
- management commands to run
- migrations checks
- architecture scan expectations
- Docker validation when available
- known risks and manual checks

## User Summary

After writing specs, summarize the decisions to the user before implementing. Include enough detail for the user to catch wrong assumptions.
