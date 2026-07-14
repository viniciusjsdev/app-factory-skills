# Backend Testing Rules

Plan tests by layer:

- DTO tests: structural validation and serialization.
- Mapper tests: explicit request/service/result/response transformations and sensitive-field allowlists.
- Service tests: business rules using fake repository contracts without HTTP or database access.
- Repository tests: ORM queries, ownership filters, persistence, joins, and transaction behavior against the database.
- Controller/API tests: DTO usage, status codes, errors, authentication, permissions, and response shape.
- Security tests: denied object access, sensitive-field omission, throttling, and logout/session behavior when relevant.
- Migration checks: `makemigrations --check --dry-run`, generated migration provenance, `migrate`, and `showmigrations`.
- Documentation check: the architecture scanner rejects every authored Python module without a meaningful opening docstring and excludes Django-generated migrations from manual documentation edits.

Organize tests into layer packages under `tests/`. Acceptance tests must trace back to product business-rule IDs or API contract entries where available.

For every invariant and endpoint in `backend-contract-manifest.json`, require the exact listed `test_*` functions and record their execution evidence. Require zero/one/multiple cases for cardinality invariants, foreign-actor and foreign-tenant cases for private resources, and replay/duplicate/stale cases for idempotency or optimistic-concurrency rules.

Run every manifest validation marked `required: true`. A deferred live integration, service-topology smoke test, or browser flow cannot be reported as passed. Use `approved-with-notes` only for optional evidence; use `corrections-required` or `blocked` when required evidence fails or cannot run.

Do not mock repositories in repository tests. Do not use the database in service tests. Do not weaken tests to match an incorrect implementation.
