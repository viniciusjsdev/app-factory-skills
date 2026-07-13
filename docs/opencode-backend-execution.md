# OpenCode for Backend Execution

## Responsibility

Codex remains the App Factory orchestrator. It creates or validates the Goal, requires an approved backend contract, invokes the router once, waits passively, and resumes only when OpenCode exits successfully or with an error. OpenCode performs the heavy Django code-writing phase using `django-backend-code-executor`. Codex then sends the result to `django-backend-service-architect` for contract audit.

OpenCode is optional. When it is absent, unauthenticated, or missing the selected model, the default `auto` route returns `codex-fallback-required` and Codex implements the same approved contract directly.

## 1. Install OpenCode

Official documentation: [OpenCode installation](https://opencode.ai/docs/) and [Windows/WSL guidance](https://opencode.ai/docs/windows-wsl/).

Windows PowerShell can use one of:

```powershell
npm install -g opencode-ai
# or
choco install opencode
# or
scoop install opencode
```

OpenCode recommends WSL for the best Windows experience. Inside WSL:

```bash
curl -fsSL https://opencode.ai/install | bash
```

Choose one execution environment and keep installation, authentication, the App Factory router, and target project in that environment. PowerShell and WSL use separate OpenCode credential stores.

Verify:

```powershell
opencode --version
```

This workstation currently uses the npm installation path. Do not add `opencode-ai` as a dependency of generated applications.

## 2. Subscribe and authenticate OpenCode Go

Official documentation: [OpenCode Go](https://opencode.ai/docs/go/) and [providers](https://opencode.ai/docs/providers/).

1. Subscribe to OpenCode Go and copy the API key from the OpenCode account.
2. Start the TUI:

   ```powershell
   opencode
   ```

3. Run `/connect`.
4. Select `OpenCode Go`.
5. Paste the key into the OpenCode prompt.
6. Run `/models` and confirm the intended coding model appears.

The equivalent credential-management entry point is:

```powershell
opencode auth login
```

Verify without revealing the key:

```powershell
opencode auth list
opencode models opencode-go
```

OpenCode stores provider credentials in its user-level credential store. Never place the API key in this repository, `.env`, `opencode.json`, a generated project, shell history, task prompt, or completion evidence.

## 3. Configure App Factory routing

Create the ignored local file:

```powershell
Copy-Item .env.example .env
```

Available settings:

```dotenv
APP_FACTORY_BACKEND_EXECUTOR=auto
APP_FACTORY_OPENCODE_MODEL=opencode-go/kimi-k2.7-code
APP_FACTORY_OPENCODE_TIMEOUT_MINUTES=120
```

When invoking the installed router from outside this repository and using non-default preferences, set `APP_FACTORY_ENV_FILE` to this ignored `.env`. Credentials still remain in OpenCode's native store.

Executor values:

- `auto`: use OpenCode when ready, otherwise request Codex fallback;
- `opencode`: require OpenCode and report a blocking setup error when unavailable;
- `codex`: skip OpenCode explicitly.

The default heavy-code model is `opencode-go/kimi-k2.7-code`. `opencode-go/deepseek-v4-flash` is configured as the small model for cheap auxiliary work. The OpenCode Go catalog changes over time, so use `opencode models opencode-go` and the [current OpenCode Go list](https://opencode.ai/docs/go/) before changing model identifiers.

Run the doctor:

```powershell
node .\skills\app-factory-backend-router\scripts\opencode-doctor.mjs
```

Readiness is true only when the CLI runs, OpenCode Go is authenticated, and the exact configured model is available.

## 4. Route an approved backend

The target project must contain all backend contracts and this frontmatter in `docs/architecture/backend-implementation-contract.md`:

```yaml
---
status: approved
contract_version: 1
approved_at: 2026-07-13
---
```

Dry-run the decision:

```powershell
node .\skills\app-factory-backend-router\scripts\route-backend-execution.mjs `
  --project-root D:\Projetos\MeuApp `
  --dry-run
```

Execute:

```powershell
node .\skills\app-factory-backend-router\scripts\route-backend-execution.mjs `
  --project-root D:\Projetos\MeuApp `
  --task-id implementar-contrato-backend-v1
```

The router calls `opencode --pure run` non-interactively with the configured model, a runtime-defined App Factory agent, the executor skill as mandatory instructions, restricted permissions, and `--auto`. It disables external plugins, redirects all raw events to a file, and performs no polling. The single child-process exit is the completion/error wake-up signal for Codex.

Artifacts are stored under the operating system temporary directory:

```txt
<temp>/app-factory-backend-runs/<task-id>/
  request.json
  opencode-events.ndjson
  opencode-stderr.log
  completion.json
  completion.schema.json
  architecture-scan.log
  route-result.json
```

## 5. Interpret the final route

- `opencode-completed`: Codex audits the code and evidence with `django-backend-service-architect`.
- `opencode-reported-blocked`: Codex reads final evidence and resolves a bounded implementation or contract issue.
- `opencode-error`: Codex reads final logs/evidence and decides on a bounded retry or fallback.
- `codex-fallback-required`: Codex immediately uses `django-backend-code-executor` itself.
- `preflight-blocked`: return to planning or explicit approval; no backend code may be written.
- `opencode-unavailable`: OpenCode was explicitly required, so fix setup rather than silently changing executors.

## Security model

The committed root `opencode.json` and the router's bundled `assets/opencode.backend.json` contain the same non-secret guardrails. At runtime the router applies its bundled configuration through OpenCode's highest-priority inline configuration and pins the selected provider/model. It denies edits to credentials, Git metadata, generated-project instructions/context, approved architecture contracts, and migration Python files. It also denies subagents, questions, web access, destructive Git commands, and broad external-directory access.

The router permits exactly one temporary run directory for completion evidence. OpenCode never writes executor configuration into the generated project's `.codex/`. Django migrations remain command-generated only, and Codex performs the final contract audit.

Playwright/full-stack validation remains Codex-supervised because it benefits from active visual and behavioral inspection; this backend router only owns the heavy backend writing phase.

## Troubleshooting

`OpenCode CLI is not installed`: install it in the same environment running Node and the router.

`OpenCode Go is not authenticated`: run `opencode auth login` or TUI `/connect`, then check `opencode auth list`.

`configured model is unavailable`: run `opencode models opencode-go` and update `APP_FACTORY_OPENCODE_MODEL` to an exact returned identifier.

PowerShell works but WSL does not, or the reverse: authenticate separately in the environment that runs the router.

`preflight-blocked`: do not bypass it. Complete and approve the six backend contracts first.
