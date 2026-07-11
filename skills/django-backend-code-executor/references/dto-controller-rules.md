# DTO and Controller Rules

## DTOs

Define every payload used by a controller in `dtos.py` or a `dtos/` package:

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
3. resolve and invoke a service;
4. map expected domain exceptions;
5. serialize a response DTO;
6. return the HTTP response.

Controllers must not import ORM models or concrete repositories, build queries, open transactions, implement business branches, or define payload structure inline.

Use `composition.py` to bind services to repository implementations.
