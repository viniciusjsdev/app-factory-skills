# Backend Audit Rules

## Evidence

Audit:

- approved architecture contracts;
- current code and Git diff;
- Django-generated migration files and command evidence;
- unit, repository, API, and permission test results;
- architecture scanner output;
- executor completion report when present.

## Required checks

- ORM entity classes use CamelCase.
- Each CamelCase Model lives in its own module, is exported by `models/__init__.py`, and receives specifications from the matching `configurations/` module.
- DTOs, mappers, and Controllers are separated into use-case modules, with no AutoMapper dependency or Controller-local field mapping.
- ORM queries and writes exist only in repositories.
- Services contain business rules without ORM, database, endpoint, or HTTP access.
- Controllers contain endpoint transport only and use DTO-defined payloads.
- Explicit mappers contain representation conversion only; repository-local mappers never query or persist.
- Every authored backend Python module starts with a meaningful docstring that explains its responsibility and boundary; relevant behavioral modules cite their contract or `BR-###` rules.
- Django-generated migrations are excluded from the docstring rule and were not patched to add documentation.
- Migration files show Django-generated provenance and were not manually patched.
- Tests assert business invariants rather than implementation trivia.
- API and security behavior matches approved contracts.
- `.codex` records the resolved backend architecture without executor-specific details.

## Findings

Each finding must include ID, severity, violated contract, expected behavior, observed evidence, allowed correction scope, and required regression test.

Do not approve based solely on an executor's completion message. Do not implement findings in audit mode.
