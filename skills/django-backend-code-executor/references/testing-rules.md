# Executor Testing Rules

- DTO tests cover structural validation and response serialization.
- Mapper tests cover request-to-service and result-to-response transformations, sensitive-field allowlists, and ORM/record conversion when present.
- Service tests use fake repositories and no database or HTTP client.
- Repository tests use the database and cover actor/scope filtering, query results, persistence, and transaction behavior.
- API tests cover endpoint transport, DTO validation, status codes, errors, auth, permissions, and response shapes.
- Security tests cover denied object access and sensitive-field handling.
- Migration validation runs Django management commands and verifies generated provenance.
- Architecture validation rejects authored Python modules without meaningful opening docstrings while leaving Django-generated migrations untouched.
- Contract validation runs every manifest command marked required and traces every invariant and endpoint ID to exact tests and implementation files.

Organize tests by layer under `tests/dtos/`, `tests/mappers/`, `tests/repositories/`, `tests/services/`, and `tests/api/`. Trace tests to business-rule or API-contract identifiers when available. Never add `skip`, `xfail`, weakened assertions, or mocks merely to make the suite green.

Use the exact `required_tests` names from `backend-contract-manifest.json`. Cover zero/one/multiple results for cardinality, foreign actor/tenant scope for private data, duplicate/replay/stale states for idempotency and concurrency, and real service ports/URL directions for required local integration checks. Do not report a required deferred smoke or browser check as passed.
