# API Contract Rules

Document each endpoint before implementation.

Required fields:

- path and method;
- controller name;
- request/query DTO;
- response DTO;
- service operation;
- repository contract operations used by the service;
- authentication and permission rule;
- throttling expectation;
- sensitive fields and masking/omission rule;
- success status and response shape;
- expected domain errors and HTTP mapping;
- frontend consumer.

Controllers must not define payload dictionaries inline as a substitute for DTOs. Repositories must not return HTTP-shaped dictionaries. Services must not return DRF responses.

Preserve frontend DTO semantics when safe. Document mappings where persisted entity fields differ from API payload fields.
