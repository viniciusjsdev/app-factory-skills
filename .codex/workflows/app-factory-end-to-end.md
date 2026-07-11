# App Factory End-to-End Workflow

1. Inspect the idea, PRD, existing repository, and product documents.
2. Route missing or incomplete product contracts to `product-brief-architect`.
3. Validate `docs/product/` and resolve blocking product questions.
4. Invoke `@sites` together with `$app-factory-frontend-builder`: Sites owns preview/private publication, while the frontend skill is the mandatory stack, architecture, security, and quality contract.
5. Validate frontend behavior, architecture, npm supply chain, tests, and build without installing Sites as an application dependency.
6. Route backend planning and project-context enrichment to `django-backend-service-architect`.
7. Require explicit approval of `docs/architecture/backend-implementation-contract.md`.
8. Route approved backend implementation to `django-backend-code-executor`; executor selection remains a factory concern.
9. Return implementation evidence to `django-backend-service-architect` for contract audit.
10. Route only audited backend output to `app-factory-infra-orchestrator`.
11. Return the Sites preview/publication result when that plugin was invoked and report every validation gap honestly.
