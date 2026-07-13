# Commercial metric quality

## Required checks

- event and conversion definitions;
- unique versus total counts and deduplication;
- attribution model/window and time zone;
- campaign, creative, and UTM integrity;
- platform account and product environment;
- bots, internal/test traffic, fraud, and invalid clicks;
- missing or delayed events;
- platform-reported versus product/CRM-confirmed conversions;
- spend completeness, fees, and currency;
- sample size, duration, seasonality, and external events.

## Quality status

- `usable`: sufficient for the stated decision;
- `usable_with_caveats`: decision possible with explicit sensitivity;
- `inconclusive`: data is valid but insufficient;
- `invalid`: execution/tracking defect prevents the intended comparison.

Invalid data is not a failed commercial hypothesis.

## Uncertainty

Show counts and avoid false precision. Use intervals or qualitative uncertainty when sample sizes are small. Do not compare rates with different denominators, attribution windows, or funnel definitions.
