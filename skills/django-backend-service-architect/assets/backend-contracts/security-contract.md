# Security Contract

## Authentication and session lifecycle

Define authentication, credential validation, session/token rotation, logout invalidation, CSRF, and safe failure behavior.

## Authorization and tenant scope

Define how actor and tenant scope are derived server-side. Number every cardinality, ownership, and role invariant and copy it into `backend-contract-manifest.json` with exact negative tests.

Never trust owner, user, account, organization, tenant, role, or membership fields supplied by the frontend.

## Object permissions

For each private resource, define read, write, archive/delete, export, and administrative access. Require denied-access tests for foreign actors and tenants.

## Sensitive data

Define classification, persistence, encryption, response allowlists, masking, retention, and logging restrictions. Never expose secrets, password hashes, internal credentials, or private storage references.

## CORS, CSRF, throttling, and headers

Document environment-driven origins, credential policy, trusted proxy behavior, per-actor/IP throttles, cache requirements, and security headers.

## Service-to-service boundaries

For every integration, define authentication, target service, timeout, redirect policy, payload limits, callback verification, replay/idempotency behavior, and production fail-closed rules. Keep ports and URL variables synchronized with `backend-contract-manifest.json`.

## Safe errors and audit logging

Define public error codes and prohibited log content. Record actor, operation, resource, result, and correlation identifiers without sensitive payloads.
