# Migration Command Rules

Never create, write, patch, or manually edit migration Python code.

Use the exact project-specific generation command listed in `backend-contract-manifest.json#allowed_execution_commands`, then the exact required migration validation commands. For example:

```bash
python manage.py makemigrations billing
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py showmigrations
```

Inspect generated output. If it is wrong, change the relevant `models/<entity>.py` or `configurations/<entity>.py` module and regenerate the uncommitted migration safely. Never repair the migration file.

Do not create handwritten `RunPython`, `RunSQL`, or empty migrations. Implement approved data backfills as idempotent management commands with separate verification and rollout steps.

Do not modify migrations already applied in a shared environment.
