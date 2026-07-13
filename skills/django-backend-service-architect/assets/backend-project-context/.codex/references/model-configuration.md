# Model Configuration

- ORM entity classes use CamelCase.
- Each entity lives in `models/<entity>.py` and is explicitly exported from `models/__init__.py`.
- Models declare entities only.
- The matching `configurations/<entity>.py` defines field sizes, choices, defaults, validators, table names, indexes, and constraints.
- Django-required `Meta` wiring references configuration values.

Record project-specific Model/Configuration module pairs and naming rules here.
