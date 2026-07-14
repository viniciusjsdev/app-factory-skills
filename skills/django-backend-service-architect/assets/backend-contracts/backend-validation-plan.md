# Backend Validation Plan

## Contract traceability

| Contract ID | Implementation boundary | Required test names | Validation command |
|---|---|---|---|
| `BR-001` | Replace with Service and Repository paths. | `test_replace_me_invariant` | `python manage.py test` |
| `API-001` | Replace with Controller/DTO/Mapper paths. | `test_get_replace_me_endpoint_contract` | `python manage.py test` |

Every invariant and endpoint in `backend-contract-manifest.json` must have exact positive or negative `test_*` names. A green suite is insufficient when a contracted ID has no matching test evidence.

## Layer coverage

- DTO: structural validation and serialization.
- Mapper: explicit request/service/result/response transformations and sensitive-field allowlists.
- Service: business invariants with fake Repository contracts and no database or HTTP.
- Repository: ORM behavior, cardinality, tenant scope, persistence, locking, and transactions.
- API: endpoint transport, DTO use, auth, permissions, status, error, and response shape.
- Integration: real local service topology, environment bindings, callback/download targets, timeouts, and failures.

## Required commands

Keep this list identical to `required_validations` in `backend-contract-manifest.json`.

```bash
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py test
python scripts/scan-django-boundaries.py
```

## Approval semantics

- `approved`: every required command and contracted invariant has passing evidence, including required live integrations.
- `approved-with-notes`: only optional validations or non-blocking observations remain.
- `corrections-required`: implementation or evidence violates an approved contract.
- `contract-review-required`: the approved contracts conflict or lack a consequential decision.
- `blocked`: an external prerequisite prevents required validation.

Do not report all gates passed while a required validation is merely planned or deferred.
