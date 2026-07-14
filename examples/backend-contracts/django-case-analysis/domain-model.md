# Case Analysis Domain Model

## Entities

| App | Model | Model/Configuration modules | Ownership and lifecycle |
|---|---|---|---|
| `accounts` | `Organization` | `organization.py` / `organization.py` | Active tenant root |
| `accounts` | `OrganizationMembership` | `organization_membership.py` / `organization_membership.py` | User-to-organization role; exactly one active membership per API actor |
| `cases` | `CaseAnalysis` | `case_analysis.py` / `case_analysis.py` | Actor- and organization-owned case; soft archived |
| `cases` | `CaseDocument` | `case_document.py` / `case_document.py` | Private defense or full-case PDF |
| `analysis_jobs` | `AnalysisDispatch` | `analysis_dispatch.py` / `analysis_dispatch.py` | Durable attempt with idempotency and retry state |

## Invariants

### SEC-001 — Exactly one active membership

Login and current-actor resolution reject zero or multiple active memberships. Repositories must not use `.first()` to hide a cardinality violation. Required tests cover zero, one, and multiple memberships.

### SEC-002 — Actor and organization ownership

Every private case query includes both authenticated actor and server-derived organization scope. Foreign actor and foreign organization reads return the safe not-found behavior.

### SEC-003 — Signed document scope

Signed references bind document, case, actor, organization, purpose, expiration, and active-document state. Expired, wrong-purpose, or archived-document references are rejected.

### SEC-004 — Callback integrity

Analysis callbacks are idempotent and scoped to the expected dispatch, case, organization, state transition, and checksum. Replay or mismatched callbacks are rejected.

### SEC-005 — Production service authentication

Production startup fails closed when Django-to-FastAPI service authentication is missing or weak; static local tokens remain limited to local/test settings.

### SEC-006 — Sensitive response allowlists

Response mappers expose only approved DTO fields and omit credentials, storage paths, signed service URLs, password hashes, and callback internals.

### INT-001 — Exactly two private PDFs

Creation accepts one defense PDF and one full-case PDF. Django validates transport limits, stores both privately, and dispatches only short-lived signed references after durable persistence.
