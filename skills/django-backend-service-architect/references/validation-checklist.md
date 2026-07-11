# Architect Validation Checklist

## Planning

- [ ] Required product/frontend context was inspected.
- [ ] Consequential missing decisions were reported.
- [ ] All six architecture documents exist or have mapped equivalents.
- [ ] ORM class names are planned in CamelCase.
- [ ] Model specifications are assigned to `configurations.py`.
- [ ] Repository operations cover all reads and writes.
- [ ] Services own business rules without database or HTTP access.
- [ ] Controllers use DTO-defined request and response payloads.
- [ ] Migration ownership and command-only generation are explicit.
- [ ] Backend `.codex` context contains resolved project decisions.
- [ ] User received the decision summary.
- [ ] Approval state is explicit.

## Audit

- [ ] Approved contract version was identified.
- [ ] Code, generated migrations, tests, and execution evidence were inspected.
- [ ] Architecture scan was attempted.
- [ ] Contract deviations include evidence and bounded correction scope.
- [ ] Audit status is explicit.
- [ ] No implementation code was changed in audit mode.
