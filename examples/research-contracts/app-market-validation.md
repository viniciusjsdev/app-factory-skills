# Example: iOS App Market Validation

- Contract ID: `MR-20260713-01`
- Depth: standard
- Decision: decide whether to test demand for a Portuguese-language meal-planning app for Brazilian households before defining an MVP
- Automatic handoff: false

## Hypotheses

### HYP-001

- Claim: a defined cohort of consumer meal-planning apps shows sustained iOS demand beyond one breakout winner.
- Support: matched-period cohort has non-trivial median downloads and multiple independent developers with persistence.
- Falsifier: activity and estimated economics are concentrated almost entirely in one app/developer or the relevant cohort cannot be defined reliably.

### HYP-002

- Claim: Portuguese-speaking users express recurring problems not adequately addressed by general recipe apps.
- Support: repeated current problem language across independent sources and relevant platform communities.
- Falsifier: observed demand is primarily for recipes/content rather than recurring planning behavior.

## Tasks

- `TASK-001 app_market`: resolve three seed apps, developer families, and a 20-40 app cohort using AppStoreTracker plus Apple; match Brazil storefront and trailing 12-month periods; report distributions and estimate limitations.
- `TASK-002 targeted_web`: inspect first-party pricing, subscription structures, positioning, and public product changes.
- `TASK-003 platform_native`: with explicit Manus permission, perform read-only Instagram/TikTok discovery for Brazilian meal-planning creators and audience language; maximum 30 results; no contact or engagement.
- `TASK-004 scientific`: use OpenAlex to discover recent work on meal-planning adherence and inspect original papers relevant to behavior, not commercial demand.

## Completion

Complete when critical claims have at least two sufficiently independent evidence classes, AppStoreTracker fields are normalized/labeled as estimates, counterevidence and failures are preserved, and the validation harness can choose a decision plus one cheapest experiment.
