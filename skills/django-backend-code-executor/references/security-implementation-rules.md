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

Implement every manifest security/cardinality invariant exactly. For a rule requiring exactly one persisted match, distinguish zero, one, and multiple rows explicitly; do not use `.first()` to convert an invalid multiple-match state into authorization. Add the exact positive and negative tests named by the manifest.

Keep committed environment examples synchronized with manifest service targets and local ports. A base URL must target the declared dependency service; a callback/public URL must target the declared receiving service.
