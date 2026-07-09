# Backend Architecture Standard

## Goal

Build Django backends with strict boundaries:

```txt
HTTP -> View/Controller -> Serializer/DTO -> Service -> Model
HTTP -> View/Controller -> Selector -> Model
```

Views translate HTTP. Serializers validate and shape API payloads. Services own business writes. Selectors own reads. Models persist data.

## Project Shape

Prefer:

```txt
backend/
  manage.py
  pyproject.toml
  .env.example
  config/
    settings/
      base.py
      local.py
      production.py
    urls.py
  apps/
    core/
    accounts/
    <domain_app>/
```

Preserve an existing compatible backend layout when present. Normalize incrementally instead of rewriting a working backend.

## Required Baseline

Most MVP backends should provide:

- `GET /api/health/`
- `GET /api/me/`
- CORS configuration for local frontend development
- `.env.example`
- PostgreSQL configuration through environment variables
- API contract documentation

## Do Not

- put business workflows in views
- put complex mutations in serializers
- call external services directly from views
- let frontend route names dictate backend model names blindly
- hide missing API contracts

