# Vercel Standard

Use Vercel for frontend deployment from `/frontend`.

Typical settings:

```txt
Root Directory: frontend
Build Command: npm run build or detected package manager equivalent
Output Directory: dist or framework-specific output
```

Create `frontend/vercel.json` only when the project needs custom rewrites, headers or framework settings.

Do not deploy Django backend as if it were a Vercel frontend project.

For API calls:

- `VITE_API_BASE_URL` or equivalent must point to backend API
- preview/prod env vars must be documented separately
- CORS must allow Vercel preview/prod domains

