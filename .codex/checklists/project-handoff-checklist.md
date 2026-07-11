# Project Handoff Checklist

- Executable product contract exists and passes its validator.
- Scope, non-scope, primary journey, permissions, and open questions are explicit.
- Frontend code, architecture, API boundary, and validation report exist before backend work.
- Standard site creation invokes external `@sites` together with `$app-factory-frontend-builder` without adding Sites to npm dependencies.
- Backend preflight context, six architecture contracts, and resolved project-root `.codex` backend context exist before implementation.
- Backend implementation contract is explicitly approved before `django-backend-code-executor` runs.
- ORM Models are CamelCase, specifications live in configurations, database access is repository-only, Services are persistence-agnostic, Controllers use DTO payloads, and migrations are Django-generated.
- Backend audit is approved before infrastructure work.
- Infrastructure validation was attempted before claiming readiness.
- Remaining gaps and contract variances are listed explicitly.
