# Django App Template

Use this structure for domain apps:

```txt
apps/<app_name>/
  models.py
  admin.py
  urls.py
  api/
    views.py
    serializers.py
    permissions.py
  services/
    __init__.py
    create_entity.py
    update_entity.py
    delete_entity.py
  selectors/
    __init__.py
    entity_selectors.py
  dtos.py
  exceptions.py
  tests/
    test_api.py
    test_services.py
    test_selectors.py
  migrations/
```

Only create files that the current app needs.

## Naming

Use app names that match product domain concepts, not frontend page names.

Good:

- `transactions`
- `goals`
- `projects`
- `documents`
- `appointments`

Avoid:

- `dashboard`
- `screen_one`
- `lovable_pages`

Dashboards are usually API aggregations over domain apps, not a primary domain model.

