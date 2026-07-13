---
name: backend-domain-skill-author
description: Create or update a project-specific backend domain skill from stable, approved product behavior. Use when a bounded capability such as order lifecycle, subscription renewal, credit approval, scheduling, or payment reconciliation has repeated business rules, vocabulary, state transitions, permissions, or failure handling that future agents must reuse. Do not use for generic Django layer guidance or unresolved product decisions.
---

# Backend Domain Skill Author

Turn stable product-specific behavior into a concise local skill without duplicating generic architecture rules.

## Required Context

Read `AGENTS.md`, `.codex/references/domain-skill-policy.md`, relevant `docs/product/` rules, `docs/architecture/domain-model.md`, `docs/architecture/api-contract.md`, and `docs/architecture/backend-implementation-contract.md`.

Create a domain skill only when the behavior is approved, bounded, reusable, and specific to this product. Stop if rules, ownership, permissions, sensitive data, state transitions, or failure behavior remain unresolved.

## Workflow

1. Name one capability with lowercase hyphen-case, preferably verb-led and under 64 characters.
2. Create `.agents/skills/<capability>/SKILL.md` and `agents/openai.yaml`.
3. Put only `name` and a trigger-rich `description` in SKILL.md frontmatter.
4. Document required project context, business vocabulary, `BR-###` rules, workflow, invariants, allowed dependencies, forbidden behavior, tests, and completion evidence.
5. Link directly to project contracts instead of copying them into the skill.
6. Keep generic Model, DTO, Repository, Service, Controller, migration, and testing rules in the existing kit skills.
7. Validate the skill with the available skill validator and add it to the project skill inventory in `AGENTS.md`.

## Boundaries

- Do not invent or approve business behavior.
- Do not store secrets, credentials, executor configuration, temporary prompts, or run artifacts.
- Do not create README, changelog, installation, or duplicated reference files without a direct execution need.
- Do not create one skill per entity or endpoint when a cohesive bounded capability is sufficient.

Finish only when the skill has clear triggers, traceable business rules, narrow scope, valid metadata, and no duplicated generic architecture prose.
