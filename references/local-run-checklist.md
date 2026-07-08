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

## Package Manager Mismatch

When the lockfile points to a package manager that is not installed, stop before changing dependency state.

Rules:

- `bun.lock` or `bun.lockb` means use Bun. If Bun is missing, report that validation is blocked by unavailable Bun.
- `pnpm-lock.yaml` means use pnpm. If pnpm is missing, report that validation is blocked by unavailable pnpm.
- `yarn.lock` means use yarn. If yarn is missing, report that validation is blocked by unavailable yarn.
- Do not fall back to `npm install` for a Bun, pnpm or yarn project unless the user explicitly approves changing package manager behavior.
- Do not create new lockfiles as a side effect of validation.
- Do not repair `node_modules` by manually unpacking packages or editing dependency folders.

If dependencies are already installed, direct local binary execution is acceptable for diagnosis, for example `node node_modules/vite/bin/vite.js build`, but only if the dependency tree is complete enough to run.

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
- incomplete `node_modules`
- command missing
- tool limitation

Also report the closest completed validation.
