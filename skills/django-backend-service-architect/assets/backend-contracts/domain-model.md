# Domain Model

## Entity catalog

| App | CamelCase Model | Model module | Configuration module | Ownership | Lifecycle |
|---|---|---|---|---|---|
| `replace_me` | `ReplaceMe` | `models/replace_me.py` | `configurations/replace_me.py` | Replace with actor/tenant ownership. | Replace with states and terminal behavior. |

For every entity, define relationships, configuration values, constraints, indexes, repository operations, and expected generated migration impact.

## Invariants

Use stable IDs and copy every invariant into `backend-contract-manifest.json`.

### BR-001 — Replace with a testable invariant

- Statement: describe the allowed and rejected states without implementation ambiguity.
- Enforcement: name the Service and Repository boundaries responsible for it.
- Required positive tests: list exact `test_*` names.
- Required negative tests: include zero, multiple, unauthorized, stale, duplicate, or invalid-transition cases when relevant.
- Failure behavior: name the domain error and safe API mapping.

## Repository operations

| Contract | Operation | Scope | Result | Invariants supported |
|---|---|---|---|---|
| `ReplaceMeRepository` | `get_owned` | Actor and tenant | Persistence-neutral record or `None` | `BR-001` |

Do not expose QuerySets or ORM Models through repository contracts.
