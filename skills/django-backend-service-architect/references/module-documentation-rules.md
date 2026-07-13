# Backend Module Documentation Rules

## Mandatory Rule

Every authored Python file in the backend must begin with a meaningful module docstring. The first statement must answer: **What does this file do?**

This applies to Models, Configurations, DTOs, Mappers, Repositories, Services, Controllers, composition modules, settings, management commands, tests, and package `__init__.py` files.

The docstring should record durable context that helps a human or coding agent understand the file without reconstructing its role from implementation details:

- the file's primary responsibility;
- its architectural layer and allowed dependency boundary;
- its important inputs, outputs, or exported types when useful;
- relevant approved contract paths or `BR-###` identifiers when applicable;
- the most important forbidden responsibility when confusion is likely.

Do not write temporary prompts, implementation history, unverifiable claims, or a line-by-line description of the code. Update the docstring when the file's responsibility or contract changes.

## Recommended Form

Use a short one-line docstring for simple package boundaries:

```python
"""Expose the Orders domain ORM Models for Django discovery."""
```

Use a structured docstring when the module owns behavior or a significant boundary:

```python
"""Create orders according to the approved order-creation contract.

Responsibility: enforce BR-012 and coordinate order persistence.
Inputs/outputs: CreateOrderInput -> CreateOrderResult.
Dependencies: OrderRepository contract and transaction boundary.
Must not: import HTTP types, Django ORM Models, or QuerySets.
Contract: docs/architecture/backend-implementation-contract.md.
"""
```

The exact labels are optional; the information is not. Avoid generic text such as "utilities", "module", or "handles logic" without saying which responsibility the file owns.

## Migration Exception

Django-generated files under `migrations/` are the sole exception. Never handwrite or patch a migration to add a docstring. Preserve Django's generated provenance header and validate it with the architecture scanner.

The exception does not apply to authored management commands used for approved backfills; those commands require module docstrings like all other authored source files.
