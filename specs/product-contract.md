# Executable Product Contract

The product contract is the handoff from product intent to implementation.

Use `docs/product/product-brief.md` for small products. Use the following files for platforms or non-trivial domains:

```txt
docs/product/
  prd.md
  screen-map.md
  business-rules.md
  data-contract.md
  visual-direction.md
  acceptance-criteria.md
```

The PRD is the source of truth for what and why. Companion documents make screens, domain behavior, data, visual boundaries, and completion criteria implementable and testable. Existing PRDs are preserved; missing companion contracts are added.

Rules use stable `BR-###` identifiers. Acceptance criteria use observable checkbox outcomes and reference the affected rule identifiers when applicable.
