# Service Rules

Services own business decisions and orchestration.

Prefer explicit operations with injected contracts:

```py
class ApprovePurchaseOrderService:
    def __init__(self, repository: PurchaseOrderRepository) -> None:
        self._repository = repository

    def execute(self, payload: ApprovePurchaseOrderInput) -> PurchaseOrderResult:
        ...
```

Services may validate invariants, coordinate repositories/integration contracts, raise domain exceptions, and return typed results.

Services must not import ORM models, QuerySets, managers, `django.db`, DRF, requests, responses, controllers, or URLs. They must not expose endpoints or construct HTTP payload dictionaries.

Test services with fake repository contracts and no database.
