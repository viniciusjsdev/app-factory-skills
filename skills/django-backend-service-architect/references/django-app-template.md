# Django App Template

Plan only the files required by the feature:

```txt
apps/<app_name>/
  configurations.py
  models.py
  dtos.py
  composition.py
  repositories/
    __init__.py
    contracts.py
    django_repository.py
    unit_of_work.py          optional
  services/
    __init__.py
    create_entity.py
    update_entity.py
  api/
    __init__.py
    controllers.py
    permissions.py
    urls.py
  tests/
    test_repositories.py
    test_services.py
    test_api.py
  migrations/
    __init__.py
```

Use CamelCase entity classes and snake_case Python modules. Name apps after domain capabilities, not screens or dashboards.

`configurations.py` owns model specifications. `models.py` declares entities. `repositories/` owns every ORM query and persistence operation. `services/` owns business rules. `dtos.py` owns payload structures. `api/controllers.py` contains endpoint transport only.
