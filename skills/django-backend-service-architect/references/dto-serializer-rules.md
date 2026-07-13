# DTO and Controller Payload Rules

DTOs are the source of truth for payload structure used by controllers.

Define, when applicable:

- request DTO;
- query/filter DTO;
- service input DTO;
- service result DTO;
- response DTO.

DTOs may use dataclasses, typed structures, Pydantic, or DRF `Serializer` classes according to the project baseline. Keep them in use-case modules under `dtos/`; do not create an aggregate `dtos.py`.

DTOs may perform structural and field-level validation. They must not query the database, call repositories, execute business workflows, or decide actor permissions.

Controllers must instantiate the documented request DTO from `request.data` or query parameters, invoke an explicit mapper for service input, and map the service result into the documented response DTO before returning JSON.

Do not duplicate the same payload definition across a DTO and a controller-local dictionary. Do not perform field-by-field mapping in Controllers.
