# Case Analysis Backend Plan

## Sources and scope

This sample consumes a product contract for authenticated legal case analysis and a frontend contract that uploads two PDFs, lists previous analyses, and reads a structured report. The Django backend owns identity, tenant scope, case metadata, private documents, dispatch state, and public APIs. An existing FastAPI service owns PDF extraction and AI analysis.

Machine-readable contract: `backend-contract-manifest.json`.

## Domain apps

| App | Responsibility |
|---|---|
| `accounts` | Authentication, active organization membership, profile, and preferences |
| `cases` | Case metadata, exactly two private PDFs, result snapshots, and review state |
| `analysis_jobs` | Durable submission, callback receipt, retry, and reconciliation |

## Runtime topology

```txt
Browser -> Django REST API (:8001)
              -> PostgreSQL/private storage
              -> FastAPI analysis service (:8000)
              <- terminal callback to Django (:8001)
```

`AI_SERVICE_BASE_URL` targets FastAPI on `:8000`. `AI_CALLBACK_PUBLIC_URL` targets Django on `:8001`. The browser never calls FastAPI or receives its credential.

The Django service uses `config.urls` as its only active `ROOT_URLCONF`; all contracted endpoint paths resolve from that root.

## Database and migrations

Django exclusively owns its PostgreSQL schema. FastAPI owns a separate schema. Django migrations are generated only through management commands; no cross-service migration or direct database access is allowed.

## Non-goals and blockers

- Django does not implement PDF extraction, embeddings, RAG, or LLM provider logic.
- Production service authentication requires an approved strong-auth adapter.
- Production object storage, Redis, HTTPS origins, and secrets remain deployment inputs.
