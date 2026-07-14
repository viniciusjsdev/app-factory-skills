# Backend Validation Workflow

1. Read the approved manifest and build `contract ID -> implementation -> test -> command result` traceability.
2. Validate actual Django `ROOT_URLCONF` settings and committed environment URL variables against the exact manifest root, URL, service target, and port.
3. Verify no pending model changes.
4. Run DTO and service tests.
5. Run repository/database tests, including exact manifest cardinality and tenant tests.
6. Run every exact manifest endpoint test plus API, permission, and security coverage; confirm each exact Controller is wired by `urls.py` at its contracted path.
7. Run every required manifest validation and the architecture scanner.
8. Confirm every authored Python module has a meaningful opening docstring and generated migrations retain provenance without manual documentation.
9. Record commands, per-ID evidence, results, failures, and limitations in the validation report.
