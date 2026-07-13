---
name: app-market-intelligence-analyst
description: Analyze the iOS market for a specific app, developer portfolio, family of apps, category, or comparable cohort using AppStoreTracker and corroborating Apple evidence. Use for directional downloads, revenue, ranking, review, concentration, momentum, and monetization analysis. Do not use estimates as audited actuals or as standalone proof of market demand.
---

# App Market Intelligence Analyst

## Purpose

Measure the observable iOS app market around a concrete seed app or hypothesis. AppStoreTracker is the primary quantitative source; Apple surfaces confirm identity and first-party store metadata. The output is an evidence bundle for market validation, not a product or launch decision.

## Invocation Boundary

- Run only for an explicit app-market or competitive-intelligence request.
- Support a seed app, developer, app family, keyword-defined cohort, or category.
- Treat iOS findings as iOS findings. Do not silently generalize them to Android, web, or the full market.
- Do not modify the PRD, start an MVP, create marketing content, or contact publishers.

## Analysis Levels

Choose and label at least one level:

1. `app`: one app's positioning, trajectory, monetization signals, rankings, and reviews;
2. `developer_family`: the developer's portfolio, related apps, concentration, and cross-app pattern;
3. `cohort_category`: comparable apps or category segments, distribution, leaders, and whitespace.

For idea validation, prefer a cohort over a single successful app. Read `references/cohort-analysis.md` before defining comparables.

## Source Policy

- Use AppStoreTracker for estimated downloads/revenue and market/cohort intelligence where available.
- Use Apple App Store or Apple's Search API to confirm app identity, developer, category, price, version, rating, and listing metadata.
- Label every field as `observed`, `modeled_estimate`, `derived`, or `unknown`.
- Record source URL or stable identifier, country/storefront, period, retrieval time, currency, and units.
- Do not count AppStoreTracker and Apple as independent evidence when AppStoreTracker derives the field from Apple.
- Never describe modeled revenue or downloads as exact, audited, or guaranteed.

Read `references/appstoretracker-method.md` for metric interpretation and limitations.

## Workflow

### 1. Resolve entities

Confirm the app ID, exact app, developer identity, storefront, and analysis period. Detect similarly named apps and publisher aliases before comparing data.

### 2. Build the cohort

Write explicit inclusion and exclusion rules. Match apps on job-to-be-done, audience, business model, geography, maturity, and platform where relevant. Separate direct competitors, substitutes, and adjacent inspiration.

### 3. Normalize metrics

Normalize periods, storefronts, currencies, and units. Preserve the raw value and transformation. Do not compare lifetime values with monthly values or global values with a single country without a visible warning.

### 4. Analyze the distribution

Where data permits, compute:

- median and quartiles, not only the mean;
- leader share and top-3/top-10 concentration;
- developer portfolio concentration;
- growth or momentum over matched periods;
- estimated revenue per download as a rough monetization signal;
- rating volume, rating level, ranking persistence, and review themes;
- the proportion of apps below, near, and above a chosen viability threshold.

Do not fabricate missing time series or precision.

### 5. Triangulate

Compare quantitative signals with listing changes, price/subscription structure, review evidence, and broader research tasks. State where corroboration is dependent, weak, stale, or unavailable.

### 6. Produce scenarios

Use conservative, base, and upside scenarios anchored to cohort percentiles or clearly stated assumptions. Scenarios are decision aids, not forecasts.

### 7. Return the evidence bundle

Use `assets/app-market-analysis.template.md`. Include raw-source lineage, calculations, limitations, and unresolved questions so `$market-validation-harness` can audit the claims.

## Required Output

- entity and cohort definition;
- normalized comparison table;
- app, developer-family, and/or cohort findings;
- concentration, momentum, and monetization signals;
- observed versus estimated field register;
- conservative/base/upside scenarios;
- counterevidence and missing-data log;
- confidence by finding;
- evidence bundle ready for market validation.

## Hard Stops

Stop and report the limitation when the app cannot be resolved, periods cannot be normalized, the cohort is too heterogeneous, or a critical metric's meaning is unknown. Do not replace missing evidence with intuition.
