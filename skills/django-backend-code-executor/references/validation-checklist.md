# Executor Validation Checklist

- [ ] Approved implementation contract and version were verified.
- [ ] Changes stayed inside approved scope.
- [ ] ORM class names use CamelCase.
- [ ] Model specifications live in configurations.
- [ ] ORM reads and writes exist only in repositories.
- [ ] Services contain business logic without ORM, database, or HTTP access.
- [ ] Controllers use DTO-defined payloads and contain endpoint transport only.
- [ ] Migrations were generated with Django commands and not manually edited.
- [ ] DTO, service, repository, API, permission, and security tests were added as required.
- [ ] Django checks, migration check, tests, and architecture scan were attempted.
- [ ] Completion evidence conforms to the schema.
- [ ] Failures and limitations are reported without concealment.
