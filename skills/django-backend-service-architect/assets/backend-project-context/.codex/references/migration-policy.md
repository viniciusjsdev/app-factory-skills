# Migration Policy

- Record whether Django owns the schema.
- Generate migrations only with `python manage.py makemigrations`.
- Never handwrite or patch migration Python files.
- Correct models/configurations and regenerate incorrect uncommitted migrations.
- Plan data backfills as explicit management-command workflows.

Record deploy ordering, compatibility, lock risks, and rollback/forward-fix decisions here.
