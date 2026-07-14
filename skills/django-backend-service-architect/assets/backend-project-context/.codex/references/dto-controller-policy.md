# DTO and Controller Policy

- DTOs define request, query, service-input, service-result, and response payload structures.
- DTOs live in use-case modules under `dtos/`.
- Controllers live in modules under `api/controllers/`, use DTOs and explicit mappers, contain only endpoint transport, and implement exactly their manifest HTTP methods.
- Prefer one use-case Controller. Same-route methods may share one explicitly contracted resource Controller. URL configuration imports the exact class; uncontracted methods and unused duplicates are forbidden.
- Business validation belongs to services; persistence belongs to repositories.

Record project-specific DTO, mapper, Controller naming, and error mapping here.
