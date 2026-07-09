# Validation Checklist

Before finishing, check:

- [ ] mandatory preflight gate passed before backend files were changed
- [ ] product and architecture docs read
- [ ] frontend mock services inspected when relevant
- [ ] backend structure exists
- [ ] `.env.example` exists
- [ ] settings are environment-driven
- [ ] API contract updated
- [ ] every API contract endpoint declares auth and permission requirements
- [ ] rate limit expectations documented for sensitive or write-heavy endpoints
- [ ] CORS is environment-driven and production origins are restricted
- [ ] sensitive response fields are omitted, masked or encrypted according to contract
- [ ] logout/token invalidation behavior is documented or implemented when auth exists
- [ ] health endpoint exists
- [ ] domain apps follow app template
- [ ] services own writes
- [ ] selectors own reads
- [ ] views/controllers are thin
- [ ] serializers are API boundary only
- [ ] DTOs exist where useful
- [ ] tests added or updated
- [ ] `python manage.py check` attempted
- [ ] migrations check attempted
- [ ] test command attempted
- [ ] architecture scan attempted
- [ ] Docker compatibility preserved or limitation reported

Classify failures as:

- pre-existing issue
- introduced issue
- missing dependency
- missing environment variable
- database unavailable
- Docker unavailable
- command unavailable
