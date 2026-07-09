# DTO and Serializer Rules

## DTOs

DTOs represent service-layer input and output.

Use dataclasses where useful:

```py
from dataclasses import dataclass

@dataclass(frozen=True)
class CreateProjectDTO:
    name: str
    description: str | None = None
```

DTOs must not query the database or format HTTP responses.

## Serializers

Serializers are API boundary objects.

Use them for:

- request validation
- response shape
- JSON-safe output
- simple field-level validation

Do not put business workflows in serializers.

For non-trivial writes:

```txt
serializer validates -> DTO is created -> service mutates -> response serializer formats output
```

## Mapping

Document mappings when frontend DTOs differ from backend models.

