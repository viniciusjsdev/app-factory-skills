---
name: commercial-validation-analyst
description: Evaluate a launch or acquisition experiment from an approved commercial contract, execution receipts, funnel metrics, costs, and qualitative feedback. Use to separate observed results from inference, check KPI and data quality, diagnose the funnel, and recommend scale, iterate, pivot, pause, or stop. It does not publish, contact users, or change the product automatically.
---

# Commercial Validation Analyst

## Purpose

Decide what the commercial evidence justifies after a launch or experiment. Reconcile expected actions with execution receipts, validate metrics, and propose the smallest next test.

## Invocation Boundary

- Run on an explicit request with a launch contract or experiment hypothesis plus available results.
- Accept data from platform exports, analytics, CRM, store/listing metrics, interviews, and Manus execution receipts.
- Do not assume missing tracking means zero performance.
- Do not publish, contact users, change budgets, edit the product, or invoke market research automatically.

## Workflow

### 1. Reconstruct the experiment

Record audience, channel, offer, creative/variant, CTA, destination, period, spend, primary metric, thresholds, guardrails, and planned sample/time. Separate planned, executed, and observed state.

### 2. Verify execution

Reconcile operation IDs, receipts, URLs, timestamps, recipients, and artifact versions. Exclude or label traffic/results that cannot be tied to the approved execution.

### 3. Audit metric quality

Read `references/metric-quality.md`. Check event definitions, deduplication, attribution window, time zone, bots/internal traffic, missing events, platform-versus-product discrepancies, sample size, and cost completeness.

### 4. Analyze the funnel

Compute only compatible metrics. Typical stages are reach/impressions, attention, click/visit, signup/lead, activation, purchase, retention, and qualified feedback. Show denominators and uncertainty. Vanity metrics can diagnose creative reach but cannot replace the primary outcome.

### 5. Compare with thresholds

Classify the experiment as pass, fail, inconclusive, or invalid against precommitted thresholds. When no threshold existed, state that the conclusion is exploratory and propose one for the next run.

### 6. Diagnose and decide

Follow `references/validation-method.md` and `references/decision-policy.md`. Identify whether the strongest issue is audience, message, proof, offer, channel, conversion path, onboarding, measurement, or product value.

Choose exactly one:

- `scale`;
- `iterate`;
- `pivot`;
- `pause`;
- `stop`.

### 7. Define the next experiment

Change the smallest meaningful variable, retain a control or baseline where possible, and state primary metric, pass/fail threshold, guardrails, cost/time cap, and stop rule.

## Required Output

Use `assets/commercial-validation-report.template.md` and include:

- planned versus executed reconciliation;
- data-quality status and excluded data;
- funnel with counts, rates, costs, and uncertainty;
- target comparison and experiment classification;
- observed facts, inference, and assumptions;
- outcome, confidence, and rationale;
- next experiment or stopping condition;
- optional requests to Research, MVP, or Marketing factories, explicitly inactive.

## Quality Gate

Do not recommend scaling from reach alone, declare failure from broken tracking, compare mismatched attribution windows, hide spend, overread tiny samples, or treat platform-reported conversions as verified product outcomes without reconciliation.
