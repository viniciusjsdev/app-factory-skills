# Security Implementation Rules

- Enforce permissions in services and actor/scope filtering in repositories.
- Never trust owner/account/tenant identifiers from a payload without service validation.
- Keep authentication and permission mapping thin in controllers.
- Keep CORS and secrets environment-driven.
- Apply throttling defined by the security/API contract.
- Omit or mask sensitive fields in response DTOs.
- Allowlist sensitive and permission-scoped response fields explicitly in mapper tests; never rely on reflective field copying.
- Keep tokens, credentials, personal identifiers, and private payloads out of logs.
- Implement logout/session invalidation exactly as contracted.
- Return safe errors without stack traces or internal persistence details.

Add denied-access and sensitive-data regression tests.
