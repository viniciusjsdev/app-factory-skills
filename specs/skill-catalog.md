# Skill Catalog

## Invocation model

The catalog is divided into three independent factories. Install or invoke only the skills needed for the current objective. Research and Marketing are never implicit prerequisites of MVP construction.

## MVP Factory

### product-brief-architect

Creates or completes an executable product contract from ideas, PRDs, notes, problems, features, or screens. It does not write application code.

### app-factory-frontend-builder

Builds the complete React/TypeScript frontend from product contracts. In the visible-site workflow it is composed with external `@sites`, which owns preview/publication without becoming an npm dependency.

### django-backend-service-architect

Creates backend planning, security, validation, and implementation contracts, materializes project context/architecture skills, and audits completed code. It does not implement.

### app-factory-backend-router

Routes an approved backend contract to OpenCode Go when ready or Codex as fallback. It does not define or approve backend architecture.

### django-backend-code-executor

Implements an approved Django contract with explicit Model/Configuration, DTO/Mapper, Controller, Service, Repository, migrations, and tests.

### app-factory-infra-orchestrator

Prepares Docker, environment, Supabase, frontend hosting, backend container, and VPS paths after a project shape exists.

## Research Factory

### market-research-architect

Creates the research decision frame, hypotheses, falsifiers, source/evidence tasks, depth, budget, and completion criteria. It plans but does not retrieve or decide.

### app-factory-research-router

Routes evidence tasks across Codex, AppStoreTracker/Apple, OpenAlex, optional Perplexity, and Manus. It preserves source lineage and does not validate the idea.

### app-market-intelligence-analyst

Analyzes iOS apps, developers/families, and comparable cohorts using AppStoreTracker estimates plus Apple confirmation. It distinguishes observed, estimated, derived, and missing data.

### manus-platform-researcher

Runs bounded read-only research inside native/authenticated platforms. It can find creators, communities, competitors, and live signals but never contacts, follows, likes, publishes, or changes state.

### market-validation-harness

Applies adversarial methodology, devil/angel, arbitration, evidence audit, and experiment design to produce a traceable market decision. It does not start another factory.

## Marketing Factory

### commercial-launch-architect

Creates positioning, offer, channels, account setup kits, campaign phases, KPIs, attribution, experiments, and human gates for any existing product.

### marketing-creative-builder

Creates channel-ready copy, creative/video briefs and assets, variants, accessibility fields, UTM metadata, and a production manifest. It never publishes.

### app-factory-commercial-router

Routes commercial work to Codex, Manus, or human gates while minimizing Manus credits and requiring exact approval for external actions.

### manus-commercial-operator

Executes only an approved publish, schedule, one-to-one contact, metrics read, or CRM update through a connected platform and returns a verification receipt.

### commercial-validation-analyst

Reconciles launch contract, receipts, funnel metrics, costs, and feedback to recommend scale, iterate, pivot, pause, or stop.

## General rule

Every skill reports missing/contradictory inputs. No skill silently invokes another factory, creates an account, handles credentials, authorizes spend, or changes a product contract outside its responsibility.
