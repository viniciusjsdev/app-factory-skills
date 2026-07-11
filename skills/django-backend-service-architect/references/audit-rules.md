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
- Model specifications come from `configurations.py`.
- ORM queries and writes exist only in repositories.
- Services contain business rules without ORM, database, endpoint, or HTTP access.
- Controllers contain endpoint transport only and use DTO-defined payloads.
- Migration files show Django-generated provenance and were not manually patched.
- Tests assert business invariants rather than implementation trivia.
- API and security behavior matches approved contracts.
- `.codex` records the resolved backend architecture without executor-specific details.

## Findings

Each finding must include ID, severity, violated contract, expected behavior, observed evidence, allowed correction scope, and required regression test.

Do not approve based solely on an executor's completion message. Do not implement findings in audit mode.
