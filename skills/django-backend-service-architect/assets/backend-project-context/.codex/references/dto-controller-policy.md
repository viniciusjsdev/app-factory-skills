# DTO and Controller Policy

- DTOs define request, query, service-input, service-result, and response payload structures.
- DTOs live in use-case modules under `dtos/`.
- Controllers live in use-case modules under `api/controllers/`, use DTOs and explicit mappers, and contain only endpoint transport.
- Business validation belongs to services; persistence belongs to repositories.

Record project-specific DTO, mapper, Controller naming, and error mapping here.
