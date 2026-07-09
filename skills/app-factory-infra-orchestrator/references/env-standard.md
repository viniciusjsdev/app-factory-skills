# Environment Standard

Create:

```txt
.env.example
frontend/.env.example
backend/.env.example
```

Root `.env.example` should include common orchestration variables:

```env
COMPOSE_PROJECT_NAME=app_factory_project

FRONTEND_PORT=5173
BACKEND_PORT=8000

VITE_API_BASE_URL=http://localhost:8000/api

DJANGO_SETTINGS_MODULE=config.settings.local
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend

DATABASE_URL=postgresql://postgres:postgres@db:5432/app

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Never commit real secrets.

Examples must use placeholders such as `change-me`, `example`, or empty values.

Secrets that must stay server-side:

- `DJANGO_SECRET_KEY`
- `DATABASE_URL` with production credentials
- `SUPABASE_SERVICE_ROLE_KEY`
- provider API keys

