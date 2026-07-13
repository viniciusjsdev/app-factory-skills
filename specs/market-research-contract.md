# Market Research Contract

## Purpose

Define the decision, hypotheses, evidence tasks, and stop conditions before research is routed. The contract is provider-neutral and optional relative to MVP/Marketing work.

## Required fields

- `schema_version`, `research_id`, status, decision owner, decision deadline, and depth;
- product/idea reference and market frame;
- audience/buyer, geography, language, platform, business model, period, and exclusions;
- `HYP-###` hypotheses with importance, support threshold, falsifier, and consequence;
- `TASK-###` items with evidence class, question, fields, filters, preferred/fallback source type, provider permission, maximum effort/results/credits, completion, failure, and stop conditions;
- evidence-quality/source-independence policy;
- risk/open-question register;
- expected artifacts and optional handoffs with `automatic_handoff: false`.

## Depth

- `rapid`: narrow directional decision;
- `standard`: multiple evidence classes and comparison;
- `deep`: high-risk decision with methodology review and sensitivity analysis.

Depth controls effort and evidence breadth, not guaranteed certainty.
