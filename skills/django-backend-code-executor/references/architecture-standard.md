# Executor Architecture Standard

Use:

```txt
Controller -> Request DTO -> Explicit Mapper -> Service -> Repository contract
Django Repository -> ORM Model
Service Result -> Explicit Mapper -> Response DTO -> Controller
```

- Controllers depend on DTOs, services, permissions, and composition only.
- Controllers use explicit mappers and contain no field-by-field transformation logic.
- DTOs depend on validation/typing libraries only.
- API/service mappers depend on DTO types only and contain no business rules or persistence access.
- Services depend on DTOs, domain exceptions, integration contracts, repository contracts, and Unit of Work contracts.
- Django repositories are the only application code that imports ORM models or builds queries.
- Repository-local mappers may import ORM models solely to convert them to or from persistence-neutral records; they never query or persist.
- Models reference configuration values and contain no workflow/query behavior.
- Composition modules bind concrete repositories to services.

Use scalable packages under each domain app: `models/`, `configurations/`, `dtos/`, `mappers/`, `services/`, `repositories/`, and `api/controllers/`. Do not add selectors, AutoMapper dependencies, active-record business methods, controller-local payload schemas, or service-local ORM access.

Start every authored backend Python module with the meaningful opening docstring defined in `module-documentation-rules.md`. This includes tests and package `__init__.py` files. Do not edit Django-generated migrations to add docstrings; they are the sole exception.
