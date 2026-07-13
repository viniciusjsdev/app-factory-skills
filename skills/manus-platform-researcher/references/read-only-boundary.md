# Read-only platform boundary

## Allowed

- search and filter within an authorized signed-in platform;
- inspect public or account-authorized profiles, posts, communities, directories, and visible metrics;
- record stable handles, URLs, timestamps, and structured observations;
- capture evidence screenshots when permitted;
- report authentication, access, coverage, and sampling limitations.

## Prohibited

- create an account, username, password, token, recovery flow, or profile;
- pass CAPTCHA, SMS/email verification, identity verification, or 2FA on the user's behalf;
- publish, schedule, edit, delete, message, comment, follow, like, save, join, invite, purchase, or change settings;
- extract private data beyond the authorized research purpose;
- infer protected attributes or collect unnecessary personal data;
- bypass rate limits, access controls, platform restrictions, or terms.

## Ambiguous requests

Return `scope_clarification_required` for verbs such as "engage", "activate", "set up", "approach", or "work with" unless the brief explicitly reduces them to read-only research.

External actions belong to a separate approved commercial-operation contract and `$manus-commercial-operator`.
