# Architecture Standard

## Repository Source Layout

This repository is a skill catalog and factory method repository.

```txt
skills/
.codex/
docs/
specs/
templates/
examples/
AGENTS.md
README.md
```

## Generated Project Layout

Generated app projects should usually move toward:

```txt
frontend/
backend/
supabase/
docs/
docker-compose.yml
docker-compose.prod.yml
Makefile
.env.example
AGENTS.md
README.md
```

## Boundary

The source repo stores reusable skills, references, workflows, templates and examples. Generated app projects receive only the skills, templates and docs that are useful for that project.
