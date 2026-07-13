# Explicit Mapping Rules

Use explicit Python mapping functions or stateless mapper classes. Do not install AutoMapper-style reflection packages.

## API and service mapping

Keep one use-case mapper module under `mappers/` when a Controller request DTO differs from service input or a service result differs from the response DTO:

```py
class CreateOrderMapper:
    @staticmethod
    def to_service_input(payload: CreateOrderRequestDTO, *, actor_id: UUID) -> CreateOrderInput:
        ...

    @staticmethod
    def to_response(result: CreateOrderResult) -> CreateOrderResponseDTO:
        ...
```

Mappers may rename fields, normalize already-validated structural values, and intentionally include or omit response fields. They must not authorize actors, enforce business invariants, query or persist data, call integrations, or catch domain exceptions.

## Persistence mapping

Keep ORM-to-record conversion inside `repositories/mappers.py`. Repository-local mappers may import ORM Models and persistence-neutral records but never call managers, QuerySets, transactions, `save()`, or `delete()`.

Use direct construction only when source and target are genuinely identical and the Controller remains free of field-by-field transformation. Record deliberate mapper omission in the implementation contract. Never rely on reflective copying for sensitive, permission-scoped, or versioned API fields.
