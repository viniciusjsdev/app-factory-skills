# Case Analysis Backend Validation Plan

## Traceability matrix

| Contract | Required evidence |
|---|---|
| `SEC-001` | Zero, one, and multiple active membership repository/service tests |
| `SEC-002` | Foreign actor and foreign organization repository/API tests |
| `SEC-003` | Expired, wrong-purpose, and archived-document signed-reference tests |
| `SEC-004` | Callback replay, scope, transition, and checksum tests |
| `SEC-005` | Missing and weak production service-authentication startup tests |
| `SEC-006` | Current-actor and analysis-response sensitive-field omission tests |
| `INT-001` | Exactly-two-PDF service/API tests and signed-reference dispatch test |
| `API-001` | `test_login_endpoint_contract` plus DTO, Mapper, Service, and Repository coverage |
| `API-002` | `test_list_analyses_endpoint_contract` plus DTO, Mapper, Service, and Repository coverage |
| `API-003` | `test_create_analysis_endpoint_contract` plus DTO, Mapper, Service, and Repository coverage |

## Commands

```bash
python manage.py check --settings=config.settings.test
python manage.py makemigrations --check --dry-run --settings=config.settings.test
python manage.py migrate --settings=config.settings.test
python manage.py test --settings=config.settings.test
python scripts/scan-django-boundaries.py
python scripts/smoke_django_fastapi.py
```

The live smoke test starts Django on `:8001` and FastAPI on `:8000`, creates a case, submits two signed PDF references, receives a callback, and reads the completed result through Django. It is a required local-integration gate; it cannot be reported as passed when deferred.
