# Architect Validation Checklist

## Planning

- [ ] Required product/frontend context was inspected.
- [ ] Consequential missing decisions were reported.
- [ ] All six architecture documents exist or have mapped equivalents.
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
- [ ] Every authored backend Python module has a meaningful opening docstring; generated migrations were not patched.
- [ ] Required project-local skills were present and their layer boundaries were followed.
- [ ] Contract deviations include evidence and bounded correction scope.
- [ ] Audit status is explicit.
- [ ] No implementation code was changed in audit mode.
