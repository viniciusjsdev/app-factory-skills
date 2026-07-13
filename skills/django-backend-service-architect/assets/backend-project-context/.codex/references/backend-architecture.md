# Backend Architecture

Record the resolved backend root, Django apps, dependency direction, composition approach, and deviations from the factory standard.

Required direction:

```txt
Controller -> Request DTO -> Explicit Mapper -> Service -> Repository contract
Repository implementation -> ORM Model
Service Result -> Explicit Mapper -> Response DTO -> Controller
```

Record domain app package boundaries and use-case module names. Keep root-level technical folders from mixing domains.

Every authored Python module must begin with the source summary defined in `.codex/references/module-documentation.md`. Django-generated migration files are exempt and must not be patched.

Use the project-local skills under `.agents/skills/` as focused execution workflows for each architecture layer. They consume this resolved context and the approved contracts; they do not replace or independently change either source of truth.
