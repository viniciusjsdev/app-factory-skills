# Backend Architecture Standard

## Dependency direction

Use:

```txt
HTTP -> Controller -> Request DTO -> Explicit Mapper -> Service Input -> Service
Service -> Repository contract -> Django Repository -> ORM Model
Service Result -> Explicit Mapper -> Response DTO -> Controller -> HTTP
```

Dependencies point inward. HTTP and Django ORM are adapters around domain services.

## Module documentation

Every authored backend Python module begins with a meaningful docstring that explains what the file does. It records the module's responsibility, layer boundary, important inputs or exports when useful, and relevant approved contract or `BR-###` references when applicable. Tests and package `__init__.py` files are included.

Django-generated migration files are the sole exception. Never edit a generated migration to add a docstring. See `module-documentation-rules.md` for the required content and examples.

## ORM models

- Name every ORM class in CamelCase, such as `PurchaseOrder` or `BillingProfile`.
- Place one ORM class in each snake_case module under `models/` and export every concrete model explicitly from `models/__init__.py` so Django discovers it.
- Keep app labels, module names, fields, and database columns in snake_case.
- Limit models to fields, relationships, `Meta` wiring, and `__str__`.
- Do not place business workflows, queries, HTTP behavior, or integration calls in models.
- Define field sizes, choices, defaults, table names, indexes, constraints, and validators in the matching `configurations/<entity>.py` module.
- Reference configuration values from model declarations instead of scattering literals.

`Meta` must remain on the Django model when Django requires it, but its values should come from the configuration object.

## Repositories

Repositories are the only application layer allowed to import ORM models, construct QuerySets, call managers, or persist entities.

Split repository contracts from Django implementations when services require dependency inversion:

```txt
repositories/
  contracts.py
  django_repository.py
  unit_of_work.py       optional
```

Do not create selectors. Read and write persistence both belong to repositories.

## Services

Services own business rules and workflows. They may depend on repository or Unit of Work contracts, but must not import ORM models, `django.db`, QuerySets, managers, HTTP types, controllers, or DRF responses.

## DTOs

Keep DTOs in use-case modules under `dtos/`. DTOs define request, response, and service payload structures. They may perform structural and field-level validation, but not business decisions or database access.

## Mappers

Keep explicit API/service transformations in use-case modules under `mappers/`. Keep ORM/record transformations inside `repositories/mappers.py`. Mappers transform representations only; they do not validate business invariants, authorize actors, query databases, persist data, or call integrations. Do not add AutoMapper-style reflection libraries.

## Controllers

Controllers declare endpoints and translate HTTP:

1. instantiate and validate the request DTO;
2. map the request DTO to service input;
3. resolve and invoke the service;
4. map expected domain errors;
5. map the service result to a response DTO;
6. return the HTTP response.

Controllers must not query repositories, import ORM models, open transactions, or contain business branching.

Prefer one use-case Controller module. When multiple HTTP methods share the same Django URL pattern, allow one thin resource Controller only when the manifest assigns every method explicitly and each method delegates to its own DTO, Mapper, and Service workflow. Do not allow uncontracted methods or unused duplicate Controllers.

## Composition

Use a small composition module to bind service dependencies to concrete repositories. Do not perform dependency construction in controllers when it obscures the endpoint.

## Migrations

Generate schema migrations with `python manage.py makemigrations`. Never create, edit, or patch migration code manually. Change the relevant model/configuration modules and regenerate when the migration output is wrong.
