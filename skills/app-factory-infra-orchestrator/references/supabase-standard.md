# Supabase Standard

Use Supabase as managed Postgres/Auth/Storage/Realtime when the product needs those managed services.

## Local Development

Prefer Supabase CLI when using Supabase-specific features:

- `supabase init`
- `supabase start`
- `supabase migration new`
- `supabase db reset`
- `supabase db diff`
- `supabase db push`
- `supabase status`

Keep generated `supabase/config.toml`, migrations and seed files versioned when appropriate. The `supabase` folder created by `supabase init` is safe to commit when it does not contain secrets.

The CLI local stack uses Docker. Do not duplicate it blindly inside the app's own Compose file unless there is a clear reason.

On untrusted public networks, document binding the local Supabase stack to localhost through a dedicated Docker network. Never expose the local Supabase stack publicly.

## Schema Ownership

For Django-backed products:

- Django migrations can own backend domain tables.
- Supabase migrations can own Auth/Storage/RLS-specific SQL.
- Supabase can also be the source of truth for all SQL schema, but document that decision.

Do not mix schema ownership silently.

## Production Readiness

Document a Supabase production checklist:

- Security Advisor reviewed
- RLS enabled with policies on sensitive tables
- SSL enforcement
- database network restrictions
- MFA for Supabase accounts and organization when appropriate
- access roles reviewed
- service role key kept server-side only
- anon key exposed to frontend only with correct RLS/policies
- indexes reviewed for common query patterns
- Performance Advisor/Security Advisor reviewed
- load testing considered for expected launch traffic
- backups/PITR considered for production data
- Auth email/SMTP and rate limits reviewed when using Auth
- Auth CAPTCHA/abuse prevention reviewed for public sign-up/sign-in flows

Supabase is shared responsibility. Document which controls are handled by Supabase and which remain project responsibilities: schema design, RLS policies, API key handling, access management, application architecture, query performance and third-party integrations.
