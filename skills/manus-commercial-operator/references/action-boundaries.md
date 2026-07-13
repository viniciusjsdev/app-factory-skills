# Manus commercial action boundaries

## Supported modes

- `publish`: create one exact approved public item;
- `schedule`: schedule one exact approved item at the specified time zone;
- `approved_contact`: send the approved message to the exact recipient list;
- `metrics_read`: retrieve the specified bounded platform metrics;
- `crm_update`: apply the exact approved field changes to identified records.

## Not supported

- strategy, research, creative rewriting, recipient discovery, account creation, credential or verification handling;
- mass engagement, scraping around controls, deceptive interaction, or simulated organic activity;
- autonomous targeting, budget optimization, audience expansion, or paid activation;
- deleting or correcting unrelated items;
- chaining another action after completion.

## Scope mismatch

Return `precondition_failed` when the connected account, live preview, recipient count, content version, schedule, or required permission differs from the manifest. Do not repair scope by inference.
