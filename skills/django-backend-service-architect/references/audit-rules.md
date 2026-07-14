# Backend Audit Rules

## Evidence

Audit:

- approved architecture contracts;
- current code and Git diff;
- Django-generated migration files and command evidence;
- unit, repository, API, and permission test results;
- architecture scanner output;
- executor completion report when present.
- `docs/architecture/backend-contract-manifest.json`, committed environment examples, and URL routing modules.

## Required checks

- ORM entity classes use CamelCase.
- Each CamelCase Model lives in its own module, is exported by `models/__init__.py`, and receives specifications from the matching `configurations/` module.
- DTOs and mappers are separated into use-case modules; Controllers match exact manifest method assignments, with no AutoMapper dependency or Controller-local field mapping.
- ORM queries and writes exist only in repositories.
- Services contain business rules without ORM, database, endpoint, or HTTP access.
- Controllers contain endpoint transport only and use DTO-defined payloads.
- Explicit mappers contain representation conversion only; repository-local mappers never query or persist.
- Every authored backend Python module starts with a meaningful docstring that explains its responsibility and boundary; relevant behavioral modules cite their contract or `BR-###` rules.
- Django-generated migrations are excluded from the docstring rule and were not patched to add documentation.
- Migration files show Django-generated provenance and were not manually patched.
- Tests assert business invariants rather than implementation trivia.
- API and security behavior matches approved contracts.
- manifest contract version and approval status match the implementation contract;
- every environment URL binding matches the exact approved URL, target service, and local port declared in the manifest;
- every manifest endpoint is wired at its exact path through its exact Controller class, whose HTTP methods exactly match the manifest rather than an unrelated aggregate or unused duplicate;
- every manifest invariant and endpoint has its exact required tests and completion evidence;
- every manifest validation marked required was actually executed successfully or prevents approval;
- `.codex` records the resolved backend architecture without executor-specific details.

Build a traceability matrix of `contract ID -> implementation -> test -> command result`. A passing aggregate suite or executor-authored audit is not evidence for an invariant missing from that matrix.

## Findings

Each finding must include ID, severity, violated contract, expected behavior, observed evidence, allowed correction scope, and required regression test.

Do not approve based solely on an executor's completion message. Do not implement findings in audit mode.
