---
name: django-repository
description: Implement approved persistence-neutral Repository contracts and Django ORM Repository adapters. Use for database reads, writes, ownership filters, QuerySets, transactions, locking, joins, pagination, persistence records, or ORM-to-record mapping. This is the only project-local skill allowed to implement direct database access; do not use it for business policy or HTTP endpoints.
---

# Django Repository

Own every database query and persistence operation while presenting persistence-neutral contracts to Services.

## Required Context

Read `AGENTS.md`, `docs/architecture/domain-model.md`, `docs/architecture/security-contract.md`, `docs/architecture/backend-implementation-contract.md`, `docs/architecture/backend-contract-manifest.json`, `.codex/references/repository-policy.md`, `.codex/references/service-layer.md`, `.codex/references/model-configuration.md`, and `.codex/references/module-documentation.md`.

Require an approved implementation contract. Stop if actor, tenant, ownership, transaction, consistency, or query semantics are unresolved.

## Workflow

1. Define persistence-neutral Protocols or abstract contracts in `repositories/contracts.py`.
2. Define records only when Services must not receive ORM objects.
3. Implement ORM/record conversion in repository-local Mappers without queries or writes.
4. Implement all reads and writes in Django Repository adapters.
5. Apply actor, tenant, ownership, ordering, pagination, locking, and transaction constraints from the contracts.
6. Implement manifest cardinality invariants explicitly; distinguish zero, one, and multiple matches instead of hiding multiple rows with `.first()`.
7. Add meaningful opening module docstrings and every exact database-backed Repository test named by the manifest.

## Boundaries

- Repository contracts must not import Django ORM types.
- Repository adapters must not decide business eligibility, authorization policy, or HTTP behavior.
- Repository-local Mappers may transform ORM objects but never query or persist.
- Do not return lazy QuerySets across the Repository boundary unless the approved contract explicitly requires it.
- Do not create selectors; read behavior belongs here.

Finish only when all ORM access is repository-local, contracts are persistence-neutral, security filters are explicit, and database tests prove query behavior.
