# Granularity and Authority

## Select compact mode

Use one `docs/product/product-brief.md` when the product usually has:

- one primary audience
- one main conversion or task flow
- few routes
- minimal authorization differences
- simple data with little domain behavior
- no substantial sensitive-data or integration contract

Examples include landing pages, event pages, small calculators, single-purpose internal forms, and narrow prototypes.

## Select modular mode

Use the six-document contract when any of these materially applies:

- multiple modules or journeys
- multiple roles or object-level permissions
- non-trivial business rules
- related domain entities
- local persistence that will become an API
- sensitive or regulated information
- multiple error and lifecycle states
- frontend and backend will be implemented by separate stages

When uncertain, choose modular mode if separating screens, rules, and data makes contradictions easier to detect.

## Preserve source authority

Classify statements as:

- **Explicit decision:** stated by the user or authoritative PRD; preserve it.
- **Derived requirement:** logically required by an explicit decision; identify it as derived.
- **Working assumption:** fills a reversible MVP gap; record it.
- **Open question:** changes scope, permissions, compliance, money, sensitive data, or core workflow; do not guess silently.

When sources conflict, record both claims, identify their sources, explain the implementation impact, and ask for a decision if the conflict blocks safe implementation.

Do not rewrite a supplied PRD merely to match the factory template. Create companion documents and cross-reference its headings.
