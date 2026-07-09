# Vercel Standard

Use Vercel for frontend deployment from `/frontend`.

Typical settings:

```txt
Root Directory: frontend
Build Command: npm run build or detected package manager equivalent
Output Directory: dist or framework-specific output
```

## Monorepos

For a monorepo, configure the Vercel project Root Directory as `frontend`.

If using Vercel CLI, run linking/deploy commands from the monorepo root and select the intended project. Do not run the CLI from a subdirectory as the default workflow.

## Build Settings

Vercel can auto-detect install and build settings for supported frontend frameworks. Override the install command, build command or output directory only when the detected settings are wrong.

Create `frontend/vercel.json` only when the project needs custom rewrites, headers, framework settings or other explicit Vercel project configuration.

## Backend Boundary

Do not deploy Django backend as if it were a Vercel frontend project.

Vercel supports Django through Vercel Functions, but this is an explicit alternative path. If chosen, document Vercel Functions limitations, bundle/runtime constraints, static file handling and migration strategy. The App Factory default is a backend container on a container-friendly host.

For API calls:

- `VITE_API_BASE_URL` or equivalent must point to backend API
- Development, Preview and Production env vars must be documented separately
- frontend env vars such as `VITE_*` must not contain secrets
- backend/API secrets must stay server-side
- CORS must allow Vercel preview/prod domains
- avoid wildcard CORS with credentials
