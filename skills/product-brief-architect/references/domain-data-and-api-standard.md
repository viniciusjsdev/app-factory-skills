# Domain, Data, and API Standard

## Business rules

Use stable identifiers:

```md
### BR-001 — Associação obrigatória

Todo prazo deve pertencer a um processo existente.
```

A rule must state subject, condition, expected behavior, and relevant exception. Keep presentation preferences outside business rules.

## Data contract

For every entity define:

- purpose and owner
- stable identifier
- fields, types, nullability, defaults, and validation
- relationships and cardinality
- lifecycle/status enums
- derived fields and the rule that derives them
- sensitive-data classification and visibility
- representative mock records
- local persistence behavior and schema version when used
- future API DTO names

Use ISO 8601 strings at JSON boundaries for dates and timestamps unless the product explicitly requires another contract. Define currency units and timezone assumptions rather than leaving numbers ambiguous.

## Future API

Describe behavior without prematurely choosing Django model internals. For each proposed endpoint include:

- method and path
- authentication and permission expectation
- request/query shape
- success response shape
- expected errors and status semantics
- business rules enforced
- frontend screen or service that consumes it

Frontend mocks and local repositories must preserve these shapes. Django may map DTOs to different persistence models while preserving product semantics.
