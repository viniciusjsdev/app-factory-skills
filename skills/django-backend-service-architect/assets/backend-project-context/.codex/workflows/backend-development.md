# Backend Development Workflow

1. Verify the backend implementation contract is approved.
2. Select the smallest matching skill set from `.agents/skills/` and read its SKILL.md.
3. Read `.codex/references/module-documentation.md` and add the required opening docstring while creating or changing each authored Python module.
4. Use `$django-model-configuration` for matching Configuration and CamelCase ORM Model modules; export Models explicitly.
5. Use `$django-dto-mapper` for DTOs and explicit Mappers by use case.
6. Use `$django-repository` for contracts and every Django ORM read or write.
7. Use `$django-service` for business rules without ORM or HTTP access.
8. Use `$django-controller` for thin DTO-driven endpoints and route wiring.
9. Use `$django-migration` to generate migrations through Django commands only; never edit generated files.
10. Use `$django-backend-testing` for layered tests and architecture validation.
11. Use `$backend-domain-skill-author` only when stable approved product behavior warrants a reusable domain skill.
12. Run the backend validation workflow and return structured evidence.
