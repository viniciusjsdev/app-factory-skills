# Backend Mapping Rules

Plan explicit representation mapping; do not plan an AutoMapper dependency.

## Application boundary

- Put request DTO to service-input and service-result to response-DTO mapping in `mappers/<use_case>.py`.
- Keep mappers stateless and deterministic.
- Require explicit allowlisting of response fields, especially sensitive or permission-scoped fields.
- Keep authorization, business invariants, database access, integrations, and exception policy out of mappers.

## Persistence boundary

- Put ORM Model to persistence-neutral record mapping in `repositories/mappers.py` when Services cannot consume ORM objects.
- Allow ORM imports there, but never ORM queries, writes, transactions, `save()`, or `delete()`.
- Keep every actual read/write operation in the Django Repository implementation.

The implementation contract must name required mapper modules and transformations. It may omit a mapper only for a genuinely identity conversion that does not move field-by-field logic into a Controller or Service.
