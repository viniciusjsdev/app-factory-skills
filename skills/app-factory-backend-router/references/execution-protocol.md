# Backend Routing Protocol

## Inputs

- target project root;
- six backend architecture contracts;
- approved implementation frontmatter;
- App Factory executor instructions;
- optional executor/model/timeout overrides.

## Decision

```txt
approved contract?
  no  -> preflight-blocked
  yes -> executor=codex?
           yes -> codex-fallback-required
           no  -> OpenCode installed + authenticated + model available?
                    no + auto     -> codex-fallback-required
                    no + opencode -> opencode-unavailable
                    yes           -> one passive opencode run
```

## OpenCode Run

Run non-interactively with `opencode --pure run --format json --model <model> --agent app-factory-backend --auto --dir <project>`. Capture raw stdout and stderr to files. Do not stream progress to Codex. The runtime-defined primary agent prevents target or global agents/plugins from weakening the factory execution boundary.

The runtime prompt requires a structured `completion.json`. After process exit, validate that completion and run the executor's deterministic boundary scanner from the target project root.

The router resolves `django-backend-code-executor` as a sibling installed skill and loads its bundled `assets/opencode.backend.json`. It must work both from this source repository and from `~/.codex/skills/` without relying on source-repository paths. Use `APP_FACTORY_ENV_FILE` only when installed execution needs non-default routing preferences.

## Wake-up Contract

One child-process exit produces exactly one route result. Success, reported blockage, timeout, invalid completion, and process failure all wake Codex once. No timer, recurring automation, or model polling is necessary.

## Fallback

Fallback means Codex loads `django-backend-code-executor` and continues from the same approved contract. It does not weaken architecture rules and it does not require new user approval unless the contract itself is incomplete or conflicting.
