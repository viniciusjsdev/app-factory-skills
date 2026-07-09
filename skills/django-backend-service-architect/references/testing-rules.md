# Testing Rules

For each non-trivial feature, add tests for:

- service success
- service validation/domain errors
- selector filtering
- API happy path
- API error path
- permissions when applicable
- rate limit behavior for sensitive endpoints when implemented
- CORS/settings expectations when changed
- logout/session or token invalidation when auth is implemented
- sensitive data masking/omission/encryption behavior when relevant

## Service Tests

Service tests should assert domain behavior without HTTP.

## Selector Tests

Selector tests should assert filters, permissions and query shape.

## API Tests

API tests should assert:

- status codes
- request validation
- response shape
- auth/permission behavior
- throttling behavior for protected or abuse-prone endpoints
- error shape
- sensitive fields are not leaked

## Validation

Run the project test command. If unavailable, report exactly why.
