# Case Analysis API Contract

## Endpoint map

| ID | Method/path | Controller | DTOs | Mapper | Service |
|---|---|---|---|---|---|
| `API-001` | `POST /api/auth/login/` | `apps.accounts.api.controllers.login.LoginController` | `apps.accounts.dtos.login.LoginRequestDTO`, `apps.accounts.dtos.me.CurrentActorResponseDTO` | `apps.accounts.mappers.login.map_request_to_input` | `apps.accounts.services.login.LoginService` |
| `API-002` | `GET /api/analyses/` | `apps.cases.api.controllers.analyses.AnalysesController` | `apps.cases.dtos.list_analyses.ListAnalysesQueryDTO`, `apps.cases.dtos.list_analyses.AnalysisListResponseDTO` | `apps.cases.mappers.list_analyses.map_query_to_input` | `apps.cases.services.list_analyses.ListAnalysesService` |
| `API-003` | `POST /api/analyses/` | `apps.cases.api.controllers.analyses.AnalysesController` | `apps.cases.dtos.create_analysis.CreateAnalysisRequestDTO`, `apps.cases.dtos.analysis_detail.AnalysisDetailResponseDTO` | `apps.cases.mappers.create_analysis.map_request_to_input` | `apps.cases.services.create_analysis.CreateAnalysisService` |

GET and POST share one Django URL pattern, so both methods are explicitly assigned to the same thin resource Controller. Each method still delegates to its own DTO, Mapper, and Service. Any additional method or unused duplicate Controller violates the contract.

## API-001 — Login

- Validates email/password through `LoginRequestDTO`.
- Rejects inactive users and zero or multiple active memberships.
- Rotates the session only after credentials and membership pass.
- Returns an explicit current-actor allowlist with no password, credential, or internal membership fields.

## API-002 — List analyses

- Derives actor and organization scope from the authenticated session.
- Accepts allowlisted pagination/filter query fields.
- Returns only non-archived cases owned by the actor in the current organization.

## API-003 — Create analysis

- Accepts multipart metadata plus exactly `defenseFile` and `fullCaseFile` PDFs.
- Stores documents privately and creates a durable pending dispatch atomically.
- Returns `201` with the Django-owned analysis representation.
- A transient FastAPI failure preserves the case for retry rather than deleting it.
