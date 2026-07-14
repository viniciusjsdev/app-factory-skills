# Architect Validation Checklist

## Planning

- [ ] Required product/frontend context was inspected.
- [ ] Consequential missing decisions were reported.
- [ ] All six architecture documents exist or have mapped equivalents.
- [ ] `backend-contract-manifest.json` exists, conforms to the bundled schema, and matches the implementation contract version/status.
- [ ] Service ports, Django `ROOT_URLCONF`, and exact environment URL bindings are explicit and internally consistent with actual settings.
- [ ] Every testable security requirement in the human contract has a manifest invariant ID and exact tests.
- [ ] Every invariant and endpoint has a stable ID and exact `test_*` names; invariants also name their enforcement boundaries.
- [ ] Every endpoint has an exact Controller class and DTO/Mapper/Service/Repository mapping; each Controller exposes only its manifest methods.
- [ ] Exact allowed `makemigrations` commands and required validation commands/approval impact are machine-readable; the validation plan and manifest command lists are identical.
- [ ] ORM class names are planned in CamelCase.
- [ ] One Model and matching Configuration module are planned per entity under scalable packages.
- [ ] DTO, Mapper, and Controller modules are planned by use case without an AutoMapper dependency.
- [ ] Repository operations cover all reads and writes.
- [ ] Services own business rules without database or HTTP access.
- [ ] Controllers use DTO-defined request and response payloads.
- [ ] Explicit mapping responsibilities contain no business, authorization, or persistence behavior.
- [ ] The mandatory authored-module docstring standard is defined in contracts and generated project context.
- [ ] The Django-generated migration exception is explicit.
- [ ] Migration ownership and command-only generation are explicit.
- [ ] Backend `.codex` context contains resolved project decisions.
- [ ] The project-local architecture skill kit exists and each skill defers to project contracts and references.
- [ ] Product-specific domain skill candidates are stable and contract-backed, not entity- or endpoint-level noise.
- [ ] User received the decision summary.
- [ ] Approval state is explicit.

## Audit

- [ ] Approved contract version was identified.
- [ ] Code, generated migrations, tests, and execution evidence were inspected.
- [ ] Architecture scan was attempted.
- [ ] Manifest service bindings were compared with committed environment examples.
- [ ] Manifest endpoint Controllers were compared with their full effective URL paths across `include()` prefixes and checked for aggregate/unused duplicates.
- [ ] Manifest invariants and endpoints were traced to exact tests and execution evidence.
- [ ] Every required manifest validation ran successfully or prevented approval.
- [ ] Every authored backend Python module has a meaningful opening docstring; generated migrations were not patched.
- [ ] Required project-local skills were present and their layer boundaries were followed.
- [ ] Contract deviations include evidence and bounded correction scope.
- [ ] Audit status is explicit.
- [ ] No implementation code was changed in audit mode.
