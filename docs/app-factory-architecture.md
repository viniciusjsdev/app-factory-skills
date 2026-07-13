# App Factory Architecture

## Purpose

The repository contains three independent, explicitly invoked factories:

1. **MVP Factory** turns product intent into a hosted, testable MVP.
2. **Research Factory** investigates and challenges a market hypothesis.
3. **Marketing Factory** prepares and operates a commercial launch, then evaluates results.

Research and marketing are optional capabilities. Neither is a prerequisite, hidden stage, or blocking gate for the MVP Factory.

```txt
                       optional explicit handoffs only
       +------------------+       +-------------------+
       | Research Factory | ----> |    MVP Factory    |
       +------------------+       +-------------------+
                  \                    /
                   \                  /
                    v                v
                    +-------------------+
                    | Marketing Factory |
                    +-------------------+
```

An arrow means an artifact may be reused after user approval. It never means automatic invocation.

## MVP Factory

```txt
Idea or PRD
  -> executable product contract
  -> @sites + App Factory React implementation
  -> Django planning and contract approval
  -> optional OpenCode/Codex backend routing
  -> executor-neutral Django implementation
  -> Django contract audit
  -> infrastructure and publication
  -> MVP validation
```

Its existing stages and rules remain unchanged.

## Research Factory

```txt
Idea, PRD, existing product, app, or market question
  -> market-research-architect
  -> app-factory-research-router
       -> Codex / focused web and synthesis
       -> app-market-intelligence-analyst / AppStoreTracker + Apple
       -> OpenAlex / scholarly discovery
       -> Perplexity / optional broad web discovery
       -> manus-platform-researcher / read-only native platform research
  -> market-validation-harness
  -> proceed | experiment | revise | pause | reject
```

The Research Factory produces evidence and a validation decision. It does not change a PRD or start construction/marketing automatically.

## Marketing Factory

```txt
Existing product, app, service, launch brief, or accepted market decision
  -> commercial-launch-architect
  -> marketing-creative-builder
  -> app-factory-commercial-router
       -> Codex / thinking and artifacts
       -> Human / account, identity, security, approval, spend
       -> manus-commercial-operator / exact native execution
  -> commercial-validation-analyst
  -> scale | iterate | pivot | pause | stop
```

Account setup information is produced by Codex. Account creation, credentials, verification, and 2FA remain human-controlled. Manus is reserved for bounded research or execution where platform integration adds value.

## Shared architecture rules

- Each folder under `skills/` is independently installable.
- Root `specs/` define optional cross-skill handoffs; skill folders contain executable instructions, references, scripts, and local schemas/templates.
- Providers are mechanisms, not evidence sources. Preserve original-source lineage.
- External writes require an exact operation and explicit confirmation.
- No factory silently invokes another factory.
- Missing research does not block an MVP; missing marketing does not block publication of a technical preview.
- Secrets and authenticated session material stay outside the repository and generated projects.

## Repository shape

```txt
skills/
  # MVP Factory
  product-brief-architect/
  app-factory-frontend-builder/
  django-backend-service-architect/
  app-factory-backend-router/
  django-backend-code-executor/
  app-factory-infra-orchestrator/

  # Research Factory
  market-research-architect/
  app-factory-research-router/
  app-market-intelligence-analyst/
  manus-platform-researcher/
  market-validation-harness/

  # Marketing Factory
  commercial-launch-architect/
  marketing-creative-builder/
  app-factory-commercial-router/
  manus-commercial-operator/
  commercial-validation-analyst/
```

Generated product projects continue to keep product truth in `docs/product/`, durable architecture in `docs/architecture/`, concise backend-operational context in project-root `.codex/`, and focused backend workflows in `.agents/skills/`. Research/marketing artifacts enter a generated project only when the user deliberately chooses that project as their durable location.
