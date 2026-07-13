# Market decision policy

## Outcomes

### proceed_to_product_brief

Use when the riskiest market assumptions have enough relevant evidence for defining an MVP and no critical falsifier is met. This outcome permits an optional handoff; it does not invoke construction.

### experiment_first

Use when desk evidence is insufficient but a cheap behavioral test can resolve the key uncertainty before an MVP. Prefer this over accumulating weak secondary sources.

### revise_search

Use when a specific, discoverable evidence gap blocks the decision. Name the missing evidence, provider/source class, budget, and stop condition.

### revise_hypothesis

Use when the problem, audience, geography, business model, or comparison frame is too broad or contradicted, but a narrower hypothesis remains plausible.

### pause

Use when evidence is inadequate and no proportionate next action is currently justified. State the condition that would reopen the decision.

### reject

Use when a critical falsifier is met, economics/risk are structurally untenable, or a proportionate experiment has failed its precommitted threshold.

## Confidence

- `high`: critical claims have direct, recent, relevant, and sufficiently independent support with no unresolved decisive contradiction;
- `medium`: decision is usable but depends on modeled data, moderate gaps, or one material assumption;
- `low`: outcome is provisional and should normally be `experiment_first`, `revise_search`, `revise_hypothesis`, or `pause`.

Do not equate confidence with outcome positivity.
