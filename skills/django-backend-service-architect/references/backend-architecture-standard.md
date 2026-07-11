# Backend Architecture Standard

## Dependency direction

Use:

```txt
HTTP -> Controller -> Request DTO -> Service -> Repository contract
Repository implementation -> Django ORM Model
Service -> Response DTO -> Controller -> HTTP
```

Dependencies point inward. HTTP and Django ORM are adapters around domain services.

## ORM models

- Name every ORM class in CamelCase, such as `PurchaseOrder` or `BillingProfile`.
- Keep app labels, module names, fields, and database columns in snake_case.
- Limit models to fields, relationships, `Meta` wiring, and `__str__`.
- Do not place business workflows, queries, HTTP behavior, or integration calls in models.
- Define field sizes, choices, defaults, table names, indexes, constraints, and validators in `configurations.py`.
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

DTOs define request, response, and service payload structures. They may perform structural and field-level validation, but not business decisions or database access.

## Controllers

Controllers declare endpoints and translate HTTP:

1. instantiate and validate the request DTO;
2. resolve and invoke the service;
3. map expected domain errors;
4. serialize the response DTO;
5. return the HTTP response.

Controllers must not query repositories, import ORM models, open transactions, or contain business branching.

## Composition

Use a small composition module to bind service dependencies to concrete repositories. Do not perform dependency construction in controllers when it obscures the endpoint.

## Migrations

Generate schema migrations with `python manage.py makemigrations`. Never create, edit, or patch migration code manually. Change models/configurations and regenerate when the migration output is wrong.
