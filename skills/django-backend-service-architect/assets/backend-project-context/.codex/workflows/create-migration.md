# Create Migration Workflow

1. Change `configurations.py` and `models.py`.
2. Run `python manage.py makemigrations <app_label>`.
3. Inspect generated operations without editing the migration file.
4. If wrong, correct the model/configuration and regenerate safely.
5. Run `python manage.py makemigrations --check --dry-run`.
6. Run `python manage.py migrate` in the intended validation environment.
