# AppStoreTracker method

Official pages:

- <https://www.appstoretracker.com/methodology>
- <https://www.appstoretracker.com/about>

Last verified: 2026-07-13.

## Role

Use AppStoreTracker as the primary quantitative market-intelligence source for iOS apps, developers/app families, and comparable cohorts. It can provide directional estimates and historical market signals that Apple listing metadata alone does not provide.

The current methodology describes public Apple ranking feeds and the iTunes Search API as underlying sources, daily ranking refreshes, five storefronts (United States, United Kingdom, France, Germany, and Brazil), all published categories, and top free/paid/grossing charts. Coverage and product behavior can change; confirm them at retrieval time.

## Metric treatment

For each extracted field, record:

- metric name and the provider's definition;
- app/developer/cohort identity;
- country or storefront;
- start/end period and aggregation;
- units and currency;
- observed, modeled estimate, or derived status;
- retrieval time and source URL/export reference;
- transformation or formula, if derived.

Downloads and revenue are modeled estimates unless the source explicitly proves otherwise. Use ranges or appropriate rounding. Never present them as publisher-reported financials.

The site's current public pages are not fully consistent: developer/app pages and the methodology may surface directional estimates, while other explanatory wording may say estimates are not published. Record the exact page and field definition observed in the run instead of assuming uniform coverage.

## Suitable uses

- approximate the scale and distribution of a defined iOS cohort;
- compare apps over matched periods and storefronts;
- examine developer portfolios and app-family concentration;
- identify leaders, long tails, momentum, ranking, rating, and review signals;
- anchor conservative/base/upside scenarios.

## Unsuitable uses

- audited valuation or due diligence;
- exact profit, active users, retention, or acquisition cost;
- Android/web/full-market extrapolation without other evidence;
- standalone TAM or proof of willingness to pay;
- mixing incompatible periods, countries, or metric definitions.

## Corroboration

Confirm app identity and listing metadata with Apple. Use original listings, developer pages, price/subscription evidence, and reviews for context. If AppStoreTracker fields derive from Apple, the two observations are dependent rather than independent corroboration.

## Access failures

If login, subscription, export, coverage, or field definitions prevent extraction, record the failure. Do not scrape around access controls or invent a substitute estimate.
