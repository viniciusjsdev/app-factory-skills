# Executor Validation Checklist

- [ ] Approved implementation contract and version were verified.
- [ ] Required project-local architecture skills were selected and followed.
- [ ] Changes stayed inside approved scope.
- [ ] ORM class names use CamelCase.
- [ ] Each ORM Model and Configuration lives in a matching module under scalable packages and is explicitly exported.
- [ ] DTOs, explicit mappers, and Controllers are organized by use case without an AutoMapper dependency.
- [ ] ORM reads and writes exist only in repositories.
- [ ] Services contain business logic without ORM, database, or HTTP access.
- [ ] Controllers use DTO-defined payloads and contain endpoint transport only.
- [ ] Mappers contain representation conversion only; repository-local mappers perform no ORM access.
- [ ] Every authored backend Python module, including tests and package `__init__.py` files, begins with a meaningful docstring describing its responsibility and boundary.
- [ ] Relevant behavioral modules cite approved contract paths or `BR-###` rules.
- [ ] Django-generated migrations were not edited to add docstrings.
- [ ] Migrations were generated with Django commands and not manually edited.
- [ ] DTO, mapper, service, repository, API, permission, and security tests were added as required.
- [ ] Django checks, migration check, tests, and architecture scan were attempted.
- [ ] Completion evidence conforms to the schema.
- [ ] Failures and limitations are reported without concealment.
