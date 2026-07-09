# API Contract Rules

## Contract First

Before coding endpoints, read and update:

```txt
docs/architecture/api-contract.md
```

If the project uses another contract path, preserve it and document the path.

## Required Endpoint Fields

Document each endpoint with:

- path
- method
- auth requirement
- permission rule
- rate limit expectation
- sensitive data returned, if any
- masking/encryption/omission rule for sensitive fields
- request body
- query params
- response body
- status codes
- error shape
- frontend consumer
- related service/selector

## Security Fields

For every endpoint, explicitly document:

- public, authenticated, role-based or object-level permission
- anonymous and authenticated rate limit expectations when relevant
- whether IP-based throttling is required
- whether logout invalidates sessions, tokens or refresh tokens for this endpoint's auth mode
- fields that must never be returned to the frontend
- sensitive fields that may be returned only masked, encrypted or scoped to the current actor

## Frontend Compatibility

When replacing mock frontend services:

- preserve frontend DTO names when reasonable
- avoid frontend behavior changes unless documented
- map backend model fields to frontend response fields
- include loading and error expectations
- avoid adding sensitive fields to responses only because mocks contained them

## Example

```md
### POST /api/projects/

Creates a project.

Request:
```json
{"name":"New MVP","description":"Prototype"}
```

Response `201`:
```json
{"id":"uuid","name":"New MVP","description":"Prototype"}
```
```
