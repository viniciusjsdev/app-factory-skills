# Repository Policy

- Repositories exclusively own ORM reads and writes.
- Controllers, DTOs, services, and models do not construct queries.
- Repository methods express domain intent and enforce actor/scope filters required by the contract.

Record concrete repository implementations, Unit of Work decisions, and query-performance requirements here.
