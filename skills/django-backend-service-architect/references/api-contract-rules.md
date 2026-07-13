# API Contract Rules

Document each endpoint before implementation.

Required fields:

- path and method;
- controller name;
- request/query DTO;
- response DTO;
- explicit mapper module and request/service/result/response transformations;
- service operation;
- repository contract operations used by the service;
- authentication and permission rule;
- throttling expectation;
- sensitive fields and masking/omission rule;
- success status and response shape;
- expected domain errors and HTTP mapping;
- frontend consumer.

Controllers must not define payload dictionaries or field-by-field transformations inline as a substitute for DTOs and explicit mappers. Repositories must not return HTTP-shaped dictionaries. Services must not return DRF responses.

Preserve frontend DTO semantics when safe. Document explicit mappings where service results or persisted entity fields differ from API payload fields.
