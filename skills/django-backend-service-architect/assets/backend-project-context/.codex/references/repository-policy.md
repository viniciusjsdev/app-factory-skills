# Repository Policy

- Repositories exclusively own ORM reads and writes.
- Controllers, DTOs, services, and models do not construct queries.
- Repository methods express domain intent and enforce actor/scope filters required by the contract.
- Cardinality invariants distinguish zero, one, and multiple rows explicitly; `.first()` must not hide an invalid multiple-match state.
- Repository-local explicit mappers may convert ORM Models to persistence-neutral records but never query or persist.

Record concrete repository implementations, Unit of Work decisions, manifest invariant IDs/tests, and query-performance requirements here.
