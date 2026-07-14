# DTO and Controller Rules

## DTOs

Define every payload used by a controller in a use-case module under `dtos/`:

- request body;
- query/filter input;
- service input;
- service result;
- response body.

Use the project's selected typing/validation approach. DRF `Serializer` classes may serve as request/response DTO adapters when kept free of business logic and database access.

## Controllers

Controllers:

1. declare endpoint metadata;
2. validate request/query DTOs;
3. use an explicit mapper to create service input;
4. resolve and invoke a service;
5. map expected domain exceptions;
6. use an explicit mapper to create a response DTO;
7. return the HTTP response.

Prefer one endpoint/use case per Controller module. When Django must serve multiple methods from the same URL pattern, a shared resource Controller may implement only the methods explicitly assigned to that exact class in `backend-contract-manifest.json`. Wire the exact class at the full contracted path, including parent `include()` prefixes, and do not retain unrelated aggregate or duplicate unused Controllers.

Controllers must not import ORM models or concrete repositories, build queries, open transactions, implement business branches, define payload structure inline, or perform field-by-field mapping.

Use `composition.py` to bind services to repository implementations.
