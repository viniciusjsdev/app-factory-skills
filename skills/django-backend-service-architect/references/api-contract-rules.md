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
- request body
- query params
- response body
- status codes
- error shape
- frontend consumer
- related service/selector

## Frontend Compatibility

When replacing mock frontend services:

- preserve frontend DTO names when reasonable
- avoid frontend behavior changes unless documented
- map backend model fields to frontend response fields
- include loading and error expectations

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

