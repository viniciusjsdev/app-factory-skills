# Executor Architecture Standard

Use:

```txt
Controller -> DTO -> Service -> Repository contract -> Django Repository -> ORM Model
```

- Controllers depend on DTOs, services, permissions, and composition only.
- DTOs depend on validation/typing libraries only.
- Services depend on DTOs, domain exceptions, integration contracts, repository contracts, and Unit of Work contracts.
- Django repositories are the only application code that imports ORM models or builds queries.
- Models reference configuration values and contain no workflow/query behavior.
- Composition modules bind concrete repositories to services.

Do not add selectors, active-record business methods, controller-local payload schemas, or service-local ORM access.
