# Mapping Policy

- Use explicit mapper functions or stateless classes; do not use AutoMapper-style reflection dependencies.
- Keep request DTO to service-input and service-result to response-DTO mapping under `mappers/`.
- Keep ORM Model to persistence-neutral record mapping in `repositories/mappers.py`.
- Mappers do not authorize, enforce business invariants, query, persist, call integrations, or decide exception policy.
- Explicitly allowlist sensitive and permission-scoped response fields.

Record required mapper modules and deliberate identity mappings here.
