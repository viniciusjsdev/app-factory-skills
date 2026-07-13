# Security Rules

## Source of Truth

Read the PRD, product specs and API contract before deciding security behavior.

Security rules should be derived from:

- user roles and ownership in the PRD
- sensitive data described in product docs
- frontend flows that expose private data
- API contract auth and permission fields
- compliance or business constraints explicitly stated by the user

If a security decision is missing, choose the conservative default and document the assumption.

## Rate Limiting

Every authenticated or write-heavy API should define a throttling strategy.

Consider:

- IP address for anonymous users
- authenticated user id for logged-in users
- endpoint sensitivity
- login, password reset, invite, export and webhook endpoints
- reverse proxy headers only when trusted proxy settings are configured

Prefer Django REST Framework throttling or a project-standard rate-limit package. Do not hand-roll ad hoc in-memory limits for production.

## CORS

CORS must be environment-driven.

Rules:

- allow local frontend origins in local settings
- restrict production origins to approved domains
- do not use wildcard origins with credentials
- document `CORS_ALLOWED_ORIGINS` or equivalent env vars
- keep CSRF/cookie settings aligned with the chosen auth mode

## API Contract

Every endpoint must document:

- auth requirement
- permission rule
- rate limit expectation
- sensitive data returned
- masking, encryption or omission behavior for sensitive fields
- logout/token invalidation impact when applicable

Do not implement endpoints whose security contract is ambiguous without documenting the assumption.

## Sensitive Data

Do not return sensitive fields to the frontend unless the PRD/spec explicitly requires it.

When sensitive information must be returned:

- return only to the authorized actor
- prefer masking or partial values where full data is not required
- encrypt sensitive persisted values at rest when the project requires storing them
- never expose secrets, tokens, private keys, service role keys or password hashes
- require explicit response-mapper allowlists for sensitive or permission-scoped fields; never use reflective AutoMapper copying
- avoid logging sensitive request or response payloads

Examples of sensitive data include tokens, credentials, personal identifiers, financial records, business-private data, invoices, documents and account ownership metadata.

## Logout and Token Invalidation

Logout behavior must be explicit.

Depending on auth mode:

- session auth should invalidate the server session
- JWT auth should document refresh-token invalidation or token denylist strategy
- Supabase/Auth-provider auth should document how frontend logout and backend token validation interact
- cached user/session data should not survive logout in a way that exposes private data

Do not claim logout invalidates tokens unless the backend or auth provider actually enforces it.

## Authorization

Never trust ownership fields from the frontend by themselves.

Validate on the server that:

- the actor owns or can access the resource
- `user_id`, `account_id`, `tenant_id` and organization fields match allowed scope
- repositories expose actor/scope-aware operations for private data
- services enforce permission checks as business rules before requesting mutations
- controllers never trust ownership identifiers from request payloads without the service rule

Add tests for denied access when permissions matter.
