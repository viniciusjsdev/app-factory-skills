# API Contract

## Conventions

- Base path: `/api/`
- Authentication: replace with the approved mode.
- Errors: define one safe, stable envelope.
- Every endpoint ID and module path must match `backend-contract-manifest.json`.

## Endpoint map

| ID | Method and path | Controller | Request DTO | Response DTO | Mapper | Service | Repositories |
|---|---|---|---|---|---|---|---|
| `API-001` | `GET /api/replace-me/` | `apps.replace_me.api.controllers.get_replace_me.GetReplaceMeController` | None | `apps.replace_me.dtos.get_replace_me.GetReplaceMeResponseDTO` | `apps.replace_me.mappers.get_replace_me.map_result_to_response` | `apps.replace_me.services.get_replace_me.GetReplaceMeService` | `apps.replace_me.repositories.contracts.ReplaceMeRepository` |

## API-001 — Replace with endpoint name

- Permission: define actor, role, tenant, and object scope.
- Throttle: define the approved rate-limit scope.
- Sensitive fields: list allowed, omitted, and masked fields.
- Success: define status and exact response DTO fields.
- Errors: list domain error, status, safe code, and safe message.
- Frontend consumer: name the route, feature, or service adapter.
- Mapping: define request DTO → Service input and Service result → response DTO transformations.

Prefer one Controller module per endpoint/use case. When Django requires one class to serve multiple methods at the same URL pattern, list every allowed method against that exact thin Controller in the manifest. Do not add uncontracted methods or retain unused duplicates.
