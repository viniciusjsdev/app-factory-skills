# API Contract Rules

Document each endpoint before implementation.

Assign a stable `API-###` ID and copy the endpoint into `backend-contract-manifest.json`.

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

Record the full Controller class path, not only a package. Prefer one Controller module per endpoint/use case. When Django must serve multiple methods from the same URL pattern, assign every allowed method to the same thin resource Controller explicitly in the manifest. The contracted class must be imported and wired at the exact effective path, including every parent `include()` prefix; a file or local suffix that exists but resolves under another root path does not satisfy the contract.

Controllers must not define payload dictionaries or field-by-field transformations inline as a substitute for DTOs and explicit mappers. Repositories must not return HTTP-shaped dictionaries. Services must not return DRF responses.

Preserve frontend DTO semantics when safe. Document explicit mappings where service results or persisted entity fields differ from API payload fields.
