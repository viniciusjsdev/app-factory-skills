# Backend Validation Workflow

1. Run Django system checks.
2. Verify no pending model changes.
3. Run DTO and service tests.
4. Run repository/database tests.
5. Run API, permission, and security tests.
6. Run the architecture scanner and confirm every authored Python module has a meaningful opening docstring.
7. Confirm Django-generated migrations retain generated provenance and were not patched for documentation.
8. Record commands, results, failures, and limitations in the validation report.
