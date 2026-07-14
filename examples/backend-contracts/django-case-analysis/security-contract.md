# Case Analysis Security Contract

## Authentication and tenant boundary

Django session authentication is authoritative for browser APIs. `SEC-001` requires exactly one active organization membership. The server derives organization, owner, uploader, reviewer, and role scope; frontend-supplied ownership fields are ignored.

## Object authorization

Repositories filter private data by both actor and organization under `SEC-002`. APIs return safe not-found behavior for foreign cases. `SEC-003` binds signed document downloads to document, case, actor, organization, purpose, expiration, and active-document state.

## Sensitive data

PDFs remain private. Under `SEC-006`, browser responses never include storage paths, service credentials, signed FastAPI URLs, password hashes, or internal callback details. Response mappers use explicit allowlists.

## Service integration

Django calls FastAPI at the `analysis_ai` service address from the manifest. FastAPI callbacks target the Django service address. `SEC-004` validates callback replay, scope, transition, and checksum integrity. Local static tokens are permitted only in local/test settings; `SEC-005` makes production startup fail closed until strong service authentication is configured.

## Required negative tests

- `SEC-001`: zero and multiple active memberships;
- `SEC-002`: foreign actor and foreign organization access;
- `SEC-003`: expired, wrong-purpose, and archived-document signed URLs;
- `SEC-004`: callback replay, scope mismatch, invalid transition, and checksum mismatch;
- `SEC-005`: missing or weak production service authentication;
- `SEC-006`: sensitive response fields.
