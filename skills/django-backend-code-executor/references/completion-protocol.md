# Completion Protocol

Write completion evidence to the factory-provided run directory when one exists. Otherwise return the same structure in the final response.

Required fields:

- task and contract version;
- status;
- changed files;
- Django commands executed;
- generated migration files;
- tests and results;
- architecture scanner result;
- contract deviations;
- unresolved items;
- validation limitations.

Use `assets/completion.schema.json`. A green test suite does not authorize the executor to mark architectural approval; final approval belongs to the architect/auditor.
