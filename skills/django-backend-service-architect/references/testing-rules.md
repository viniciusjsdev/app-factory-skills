# Testing Rules

For each non-trivial feature, add tests for:

- service success
- service validation/domain errors
- selector filtering
- API happy path
- API error path
- permissions when applicable

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
- error shape

## Validation

Run the project test command. If unavailable, report exactly why.

