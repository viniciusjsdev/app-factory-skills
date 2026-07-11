# Executor Testing Rules

- DTO tests cover structural validation and response serialization.
- Service tests use fake repositories and no database or HTTP client.
- Repository tests use the database and cover actor/scope filtering, query results, persistence, and transaction behavior.
- API tests cover endpoint transport, DTO validation, status codes, errors, auth, permissions, and response shapes.
- Security tests cover denied object access and sensitive-field handling.
- Migration validation runs Django management commands and verifies generated provenance.

Trace tests to business-rule or API-contract identifiers when available. Never add `skip`, `xfail`, weakened assertions, or mocks merely to make the suite green.
