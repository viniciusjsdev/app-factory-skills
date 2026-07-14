# Completion Protocol

Write completion evidence to the factory-provided run directory when one exists. Otherwise return the same structure in the final response.

Required fields:

- task and contract version;
- status;
- changed files;
- exact approved Django commands executed, each with result, exit code, and notes;
- generated migration files;
- tests and results;
- architecture scanner result;
- contract deviations;
- unresolved items;
- validation limitations.
- `contract_evidence` for every manifest invariant and endpoint ID, with implementation files, exact tests, result, and notes.
- `validation_evidence` for every required validation ID, with exact command, result, exit code, and notes.

Every manifest validation marked `required: true` must appear in `commands` with its exact command and a truthful result. `commands` may contain only manifest validation commands and manifest `allowed_execution_commands`; do not include unrelated shell activity. Use `validation_limitations` for unavailable or deferred evidence; a required limitation prevents a clean `completed` claim unless the contract explicitly classifies it as non-blocking.

For `blocked`, `failed`, or `contract-review-required`, evidence maps may be partial or empty when execution stopped before implementation. Never invent implementation paths or tests to satisfy a blocked receipt. For `completed`, every contracted ID must pass with its exact manifest-listed tests and every required validation must pass with its exact command and exit code zero.

Use `assets/completion.schema.json`. A green test suite does not authorize the executor to mark architectural approval; final approval belongs to the architect/auditor.
