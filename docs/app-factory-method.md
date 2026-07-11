# App Factory Method

1. Capture the idea, existing PRD, client notes, or product constraints.
2. Use `product-brief-architect` to create or complete executable product contracts.
3. Invoke external `@sites` together with `$app-factory-frontend-builder`: Sites shows and publishes the result, while the frontend skill governs the React implementation.
4. Validate the primary journey, responsive behavior, mocks/persistence, and API boundary.
5. Use `django-backend-service-architect` to create backend planning specs, enrich backend project context, summarize decisions, and obtain explicit approval.
6. Use `django-backend-code-executor` to implement the approved contract with repository-only persistence, DTO-based controllers, business services, configured CamelCase models, Django-generated migrations, and tests.
7. Use `django-backend-service-architect` in audit mode to compare contracts, code, migrations, and evidence.
8. Use `app-factory-infra-orchestrator` to prepare local and selected deployment paths.
9. Publish when requested and validate the MVP with explicit remaining gaps.

Do not ask a later skill to reconstruct missing decisions that an earlier contract should own. Preserve product intent, keep handoffs traceable, and prefer a complete MVP journey over premature platform complexity.
