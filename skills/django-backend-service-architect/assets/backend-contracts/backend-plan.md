# Backend Plan

## Sources

- Product source of truth: `{{PRODUCT_CONTRACT_PATH}}`
- Frontend/API evidence: `{{FRONTEND_CONTRACT_PATH}}`
- Machine-readable contract: `docs/architecture/backend-contract-manifest.json`

## Scope

Describe the approved backend outcome, primary actors, workflows, and release boundary.

## Non-goals

List behavior and infrastructure deliberately excluded from this implementation contract.

## Domain apps

| App | Responsibility | Owned entities | External integrations |
|---|---|---|---|
| `replace_me` | Replace with one bounded domain responsibility. | `ReplaceMe` | None |

## Runtime topology

| Service ID | Runtime | Local port | Root URLconf | Responsibility |
|---|---|---:|---|---|
| `django` | Django | 8000 | `config.urls` | Public API and persistence owner |

Keep service IDs, ports, and Django `ROOT_URLCONF` identical to `backend-contract-manifest.json`.

## Database and migration ownership

- Schema owner: Django.
- Database: PostgreSQL unless the approved project context says otherwise.
- Generate migrations only through Django management commands.
- Record destructive-change, locking, backfill, ordering, and rollback constraints.

## Environment assumptions

List required environment variables, local origins, service URLs, storage, cache, and scheduler assumptions. Map every service URL variable in `backend-contract-manifest.json`.

## Rollout constraints

Describe compatibility windows, deployment ordering, feature gates, and fail-closed production blockers.

## Open decisions

List consequential unresolved decisions. Do not approve the implementation contract while any item changes permissions, tenant scope, sensitive data, billing, compliance, or migration ownership.
