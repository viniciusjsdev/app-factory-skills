# Backend Module Documentation Rules

## Mandatory Rule

Start every authored backend Python file with a meaningful module docstring whose first statement answers: **What does this file do?**

Apply the rule to Models, Configurations, DTOs, Mappers, Repositories, Services, Controllers, composition modules, settings, management commands, tests, and package `__init__.py` files.

Document durable context:

- the module's primary responsibility;
- its architectural layer and allowed dependency boundary;
- important inputs, outputs, or exported types when useful;
- approved contract paths or `BR-###` identifiers when applicable;
- a forbidden responsibility when the layer could otherwise be misread.

Keep the summary concise and update it when responsibility or contracts change. Do not use temporary agent instructions, implementation history, generic filler, or a line-by-line code description.

## Examples

Simple package boundary:

```python
"""Expose the Orders domain ORM Models for Django discovery."""
```

Behavioral module:

```python
"""Create orders according to the approved order-creation contract.

Responsibility: enforce BR-012 and coordinate order persistence.
Inputs/outputs: CreateOrderInput -> CreateOrderResult.
Dependencies: OrderRepository contract and transaction boundary.
Must not: import HTTP types, Django ORM Models, or QuerySets.
Contract: docs/architecture/backend-implementation-contract.md.
"""
```

The exact labels are optional; the information is mandatory. A generic phrase such as "handles logic" does not explain what the file does.

## Sole Exception

Do not add or patch docstrings in Django-generated files under `migrations/`. Migration code must be produced only by Django management commands and retain its generated provenance header.

Authored management commands for approved backfills are not migrations and still require module docstrings.
