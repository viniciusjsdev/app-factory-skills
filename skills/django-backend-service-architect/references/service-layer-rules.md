# Service and Repository Rules

## Services

Services are the brain of the domain. Plan explicit operations such as `CreateProjectService.execute()` or `approve_invoice()`.

Services may:

- enforce business invariants;
- coordinate repository contracts;
- coordinate integration-client contracts;
- use a Unit of Work contract;
- raise domain exceptions;
- return typed DTOs or domain results.

Services must not:

- expose endpoints or import HTTP/DRF types;
- import ORM models, managers, QuerySets, or `django.db`;
- execute SQL;
- instantiate concrete Django repositories directly;
- return `Response` objects;
- contain frontend route knowledge.

## Repositories

Repositories exclusively own database access:

- lookups and filters;
- joins, annotations, aggregation, and pagination queries;
- create/update/delete persistence;
- `select_related` and `prefetch_related`;
- row locks;
- persistence-specific transaction or Unit of Work implementations.

Expose intent-oriented methods such as `get_owned_project()` or `save_order()`, not raw QuerySets.

Services should consume repository protocols so domain rules can be tested without a database.
