# Validation Checklist

Before finishing, check:

- [ ] root architecture documented
- [ ] `docker-compose.yml` exists when Docker orchestration is requested
- [ ] `docker-compose.prod.yml` exists when production/VPS containers are requested
- [ ] frontend Dockerfiles exist when frontend exists
- [ ] backend Dockerfiles exist when backend exists
- [ ] root `.env.example` exists
- [ ] frontend `.env.example` exists when frontend exists
- [ ] backend `.env.example` exists when backend exists
- [ ] no obvious secrets are committed
- [ ] Makefile exists
- [ ] infra docs exist
- [ ] Vercel guidance exists when frontend exists
- [ ] Vercel monorepo root directory and env environments are documented when frontend deploys to Vercel
- [ ] Render guidance exists when Render is chosen or requested for backend hosting
- [ ] Render env vars, build/start commands and migration/pre-deploy command are documented when Render is used
- [ ] Render secrets are not hardcoded in `render.yaml`, Dockerfiles or docs
- [ ] Supabase folder exists when Supabase is part of the stack
- [ ] Supabase production checklist is documented when Supabase is used
- [ ] Supabase service role key is server-side only
- [ ] Supabase local stack is not exposed publicly
- [ ] `docker compose config` attempted
- [ ] build/up/test commands attempted when possible
- [ ] failures are reported honestly

Classify failures as:

- Docker unavailable
- missing frontend/backend stage
- missing environment variables
- missing dependencies
- port conflict
- Supabase CLI unavailable
- production decision pending
