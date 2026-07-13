# Repository Rules

Repositories exclusively own ORM reads and writes.

## Contracts

Define typed protocols or abstract contracts that express domain intent:

```py
class PurchaseOrderRepository(Protocol):
    def get_owned(self, *, order_id: UUID, actor_id: UUID) -> PurchaseOrderRecord: ...
    def save(self, *, record: PurchaseOrderRecord) -> PurchaseOrderRecord: ...
```

Avoid exposing QuerySets through contracts.

## Django implementations

Django repositories may:

- import ORM models;
- call managers and QuerySets;
- filter by actor/account/tenant scope;
- create, update, and delete rows;
- optimize queries;
- implement locks and persistence transactions;
- call repository-local explicit mappers that convert ORM entities to persistence-neutral records.

Keep ORM/record transformations in `repositories/mappers.py` when they are non-trivial or repeated. Those mappers may import ORM Models but must not query, save, delete, or open transactions.

No other application layer may perform these operations.

For multi-repository atomic workflows, implement a Unit of Work contract and its Django adapter. Services use the contract without importing `django.db`.
