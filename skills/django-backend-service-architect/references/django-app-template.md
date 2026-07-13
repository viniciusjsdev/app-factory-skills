# Django App Template

Plan each Django app as a domain or bounded context, then organize by layer inside it:

```txt
apps/<app_name>/
  __init__.py
  apps.py
  composition.py
  configurations/
    __init__.py
    <entity>.py
  models/
    __init__.py
    <entity>.py
  dtos/
    __init__.py
    <use_case>.py
  mappers/
    __init__.py
    <use_case>.py
  repositories/
    __init__.py
    contracts.py
    records.py              optional
    mappers.py              when ORM/record mapping is required
    django_repository.py
    unit_of_work.py         optional
  services/
    __init__.py
    <use_case>.py
  api/
    __init__.py
    controllers/
      __init__.py
      <use_case>.py
    permissions.py
    urls.py
  tests/
    __init__.py
    dtos/
    mappers/
    repositories/
    services/
    api/
  migrations/
    __init__.py
```

Use CamelCase entity classes and snake_case Python modules. Keep one entity and its matching configuration in correspondingly named modules. Explicitly export concrete Models from `models/__init__.py` for Django discovery.

Every authored `.py` file shown above, including tests and `__init__.py` files, begins with a meaningful module docstring as defined in `module-documentation-rules.md`. Files generated under `migrations/` are the sole exception and must not be patched.

Name apps after domain capabilities, not screens or technical layers. Do not create global root-level `models/`, `dtos/`, or `services/` folders that mix bounded contexts.

`models/` declares entities. `configurations/` owns model specifications. `dtos/` owns use-case payload structures. `mappers/` owns explicit API/service representation mapping. `repositories/` owns every ORM query, persistence operation, and any ORM/record mapper. `services/` owns business rules. `api/controllers/` contains one thin endpoint/use-case module. Do not use aggregate `models.py`, `configurations.py`, `dtos.py`, or `api/controllers.py` files.
