# Backend Domain Skill Policy

The project includes generic local skills for Django architecture layers. Create an additional domain skill only when behavior is:

- specific to this product rather than generic Django guidance;
- approved in product and backend contracts;
- bounded by a cohesive business capability;
- stable and reusable across future implementation, review, or maintenance tasks;
- expressible through named business rules, vocabulary, states, permissions, failures, and acceptance evidence.

Good capabilities include order lifecycle, subscription renewal, credit approval, appointment scheduling, or payment reconciliation. Avoid one skill per Model, endpoint, CRUD operation, or temporary implementation task.

Create domain skills under `.agents/skills/<capability>/` with:

```txt
SKILL.md
agents/openai.yaml
references/     only when product-specific detail cannot remain in existing contracts
scripts/        only for deterministic repeated operations
assets/         only for reusable output material
```

Use lowercase hyphen-case names, preferably verb-led and under 64 characters. SKILL.md frontmatter contains only `name` and a description that explains both capability and triggers.

The skill must link to, not duplicate, relevant `docs/product/`, `docs/architecture/`, and `.codex/references/` files. Include workflow, invariants, allowed and forbidden dependencies, `BR-###` traceability, tests, and completion evidence.

Never store secrets, executor configuration, approval claims, temporary prompts, or run artifacts in a skill. Generic Model, DTO, Repository, Service, Controller, migration, and testing standards remain in the architecture kit.
