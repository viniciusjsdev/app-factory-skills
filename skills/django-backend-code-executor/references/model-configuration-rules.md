# Model and Configuration Rules

## Naming

Use CamelCase ORM class names:

```py
class PurchaseOrder(models.Model):
    ...
```

Use snake_case for app labels, modules, fields, related names, and database columns.

## Configuration

Define specifications outside the model:

```py
class PurchaseOrderConfiguration:
    TABLE_NAME = "purchase_orders"
    REFERENCE_MAX_LENGTH = 64
    DEFAULT_STATUS = "draft"
    STATUS_CHOICES = (("draft", "Draft"), ("approved", "Approved"))
    INDEXES = ()
    CONSTRAINTS = ()
```

Reference them from the model:

```py
class PurchaseOrder(models.Model):
    reference = models.CharField(
        max_length=PurchaseOrderConfiguration.REFERENCE_MAX_LENGTH,
    )

    class Meta:
        db_table = PurchaseOrderConfiguration.TABLE_NAME
        indexes = list(PurchaseOrderConfiguration.INDEXES)
        constraints = list(PurchaseOrderConfiguration.CONSTRAINTS)
```

Models may declare fields, relationships, Django-required `Meta` wiring, and `__str__`. Do not add queries, service calls, HTTP behavior, integration calls, or business workflows.
