# Local Run Checklist

The normalized project must be tested locally whenever possible.

## Package Manager Detection

Use the lockfile:

- `pnpm-lock.yaml` -> pnpm
- `yarn.lock` -> yarn
- `bun.lockb` or `bun.lock` -> bun
- `package-lock.json` -> npm
- no lockfile -> npm unless project docs say otherwise

## Required Checks

Run the equivalent of:

```bash
npm install
npm run format
npm run lint
npm run build
node .agents/skills/lovable-frontend-normalizer/scripts/scan-lovable-frontend.mjs
npm run dev
```

Adapt commands to the detected package manager and to the installed skill path.

## Dev Server Validation

The agent must:

1. Start the local dev server.
2. Wait for the ready/local URL output.
3. Confirm no immediate runtime startup error.
4. Open or request the local URL if the environment allows it.
5. Stop the server.
6. Report the command and result.

Do not say "it works locally" unless the local dev server actually started.

## Reporting

If local running is impossible, report why:

- missing env vars
- missing dependencies
- unavailable port
- unsupported environment
- package manager issue
- command missing
- tool limitation

Also report the closest completed validation.

