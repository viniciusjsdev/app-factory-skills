# Service Layer

- Services own business rules.
- Services depend on repository or Unit of Work contracts.
- Services do not import ORM models, QuerySets, `django.db`, controllers, requests, or DRF responses.

Record project-specific service names, invariants, and domain exceptions here.
