# Frontend Normalization Contract

## Input

A frontend project generated or accelerated by Lovable.

## Output

The normalized frontend should preserve UI/UX while improving:

- route thinness
- feature organization
- mock isolation
- service boundaries
- API readiness
- mobile behavior
- local validation confidence

## Required Artifacts

When appropriate, create or update:

- `docs/architecture/frontend-architecture.md`
- `docs/architecture/api-contract.md`
- `docs/architecture/data-model-notes.md`
- `docs/architecture/validation-report.md`

If the project already uses `docs/frontend-architecture.md` or `docs/api-contract.md`, preserve existing paths or document the path mapping.

## Non-Goals

Do not:

- redesign the product
- replace the stack unless explicitly requested
- build the backend
- deploy infrastructure
- continue without frontend code
