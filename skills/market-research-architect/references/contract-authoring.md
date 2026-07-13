# Market research contract authoring

## Identifiers

Use stable identifiers:

- `MR-YYYYMMDD-NN` for the research run;
- `HYP-###` for hypotheses;
- `RQ-###` for research questions;
- `TASK-###` for retrieval or analysis tasks;
- `EXP-###` for validation experiments.

## Required properties

Every task must state:

1. which hypothesis it tests;
2. evidence class and required fields;
3. inclusion and exclusion criteria;
4. geography, platform, period, and freshness;
5. preferred and fallback source type;
6. maximum effort/result count/provider permission;
7. success, failure, and stop conditions;
8. expected artifact and downstream consumer.

## Source wording

Specify sources by evidence need first. Provider names are routing preferences, not the research question. For example, write "estimated iOS cohort revenue with matching periods" and identify AppStoreTracker as the preferred mechanism.

## Open questions

Do not resolve unanswered permissions, compliance, billing, sensitive-data, or core-scope questions by assumption. List the decision owner and when the answer is required.

## Versioning

Set `contract_version: 1.0`. Record material changes in a short change log. A changed hypothesis or decision is a new contract version; a changed provider route is normally a run-level change.
