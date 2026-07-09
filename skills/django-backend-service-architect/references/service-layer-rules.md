# Service Layer Rules

Services own business writes and workflows.

## Service Functions

Prefer explicit keyword-only APIs:

```py
def create_project(*, data: CreateProjectDTO, actor: User) -> Project:
    ...
```

Use `transaction.atomic()` for multi-step writes.

## Services May

- validate domain rules
- create/update/delete models
- coordinate multiple models
- call selectors
- call integration clients
- raise domain exceptions
- define transaction boundaries

## Services Must Not

- return DRF `Response`
- import API views
- render serializers
- depend on frontend routes
- silently swallow domain errors

## Exceptions

Use domain exceptions for expected business failures:

```py
class ProjectLimitExceeded(Exception):
    pass
```

Views map domain exceptions to HTTP status codes.

