# Migration Rules

## Command-only generation

Never write, patch, or manually edit migration Python files.

Generate schema migrations only with exact Django management commands approved in `backend-contract-manifest.json#allowed_execution_commands`. Keep validation commands synchronized with the manifest. For example:

```bash
python manage.py makemigrations billing
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py showmigrations
```

If generated operations are wrong:

1. do not edit the migration;
2. correct the relevant module under `models/` or `configurations/`;
3. remove only the uncommitted generated migration when safe and authorized;
4. run `makemigrations` again;
5. inspect the regenerated output.

Do not use `makemigrations --empty` to create a file for handwritten migration logic. Plan data changes as staged schema changes plus an explicit management command or backfill workflow.

## Planning requirements

Document:

- schema owner: Django or another system;
- apps affected;
- expected generated operations;
- destructive-change strategy;
- lock and index risks;
- deployment ordering;
- backward compatibility window;
- rollback or forward-fix strategy;
- backfill command and verification when data transformation is needed.

Do not modify already-applied migration files. Use a new generated migration after changing the model/configuration.
