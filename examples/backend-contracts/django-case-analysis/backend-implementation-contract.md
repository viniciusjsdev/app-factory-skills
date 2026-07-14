---
status: approved
contract_version: 1
approved_at: 2026-07-13
---

# Case Analysis Backend Implementation Contract

## Sources

Implement the five companion contracts and `backend-contract-manifest.json` in this directory without changing their decisions.

## Writable scope

- `backend/**`
- `docs/validation/backend-audit.md`

Frontend, FastAPI source, approved architecture contracts, project instructions/context under `.agents/` and `.codex/`, real `.env` files, credentials, existing migration Python files, and target `opencode.json` are forbidden writes. New migration files may be created only by the exact approved Django command.

## Required implementation

- Use `accounts`, `cases`, and `analysis_jobs` domain apps.
- Use one CamelCase ORM Model per snake_case module and matching Configuration module.
- Keep ORM access inside Repositories and business rules inside Services.
- Use exact DTO, Mapper, Service, Repository, and Controller paths from the API contract and manifest.
- Route every endpoint through its exact contracted Controller and method set; do not retain uncontracted methods or duplicate unused Controllers.
- Add all exact invariant and endpoint tests named in the manifest.
- Generate migrations only through Django commands.
- Run only the exact manifest-allowed generation command: `python manage.py makemigrations accounts cases analysis_jobs --settings=config.settings.test`.
- Add meaningful opening docstrings to authored Python modules and never patch generated migrations.

## Completion

Return structured completion evidence with `contract_evidence` for `SEC-001..006`, `INT-001`, and `API-001..003`, plus `validation_evidence` for `VAL-001..006`. Only the independent architect audit may approve the implementation.
