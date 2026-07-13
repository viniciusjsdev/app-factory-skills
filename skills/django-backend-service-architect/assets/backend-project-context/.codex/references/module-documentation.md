# Backend Module Documentation

Every authored backend Python file must begin with a meaningful module docstring that answers: **What does this file do?**

This includes Models, Configurations, DTOs, Mappers, Repositories, Services, Controllers, composition and settings modules, management commands, tests, and package `__init__.py` files.

Record concise, durable context:

- the module's primary responsibility;
- its architectural layer and allowed dependency boundary;
- important inputs, outputs, or exports when useful;
- the approved contract path or `BR-###` rules it implements when applicable;
- the most important forbidden responsibility when the boundary could be confused.

Simple package example:

```python
"""Expose the Orders domain ORM Models for Django discovery."""
```

Behavioral module example:

```python
"""Create orders according to the approved order-creation contract.

Responsibility: enforce BR-012 and coordinate order persistence.
Inputs/outputs: CreateOrderInput -> CreateOrderResult.
Dependencies: OrderRepository contract and transaction boundary.
Must not: import HTTP types, Django ORM Models, or QuerySets.
Contract: docs/architecture/backend-implementation-contract.md.
"""
```

Keep docstrings synchronized with responsibility changes. Do not use temporary AI prompts, generic filler, or line-by-line code narration.

Django-generated files under `migrations/` are the sole exception. Never edit generated migration code to add a docstring. Authored management commands for approved backfills still require documentation.
