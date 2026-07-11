# Backend Testing Rules

Plan tests by layer:

- DTO tests: structural validation and serialization.
- Service tests: business rules using fake repository contracts without HTTP or database access.
- Repository tests: ORM queries, ownership filters, persistence, joins, and transaction behavior against the database.
- Controller/API tests: DTO usage, status codes, errors, authentication, permissions, and response shape.
- Security tests: denied object access, sensitive-field omission, throttling, and logout/session behavior when relevant.
- Migration checks: `makemigrations --check --dry-run`, generated migration provenance, `migrate`, and `showmigrations`.

Acceptance tests must trace back to product business-rule IDs or API contract entries where available.

Do not mock repositories in repository tests. Do not use the database in service tests. Do not weaken tests to match an incorrect implementation.
