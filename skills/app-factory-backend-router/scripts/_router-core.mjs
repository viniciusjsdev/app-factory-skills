import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { delimiter, extname, isAbsolute, resolve } from "node:path";

export const REQUIRED_CONTRACTS = [
  "docs/architecture/backend-plan.md",
  "docs/architecture/domain-model.md",
  "docs/architecture/api-contract.md",
  "docs/architecture/security-contract.md",
  "docs/architecture/backend-validation-plan.md",
  "docs/architecture/backend-implementation-contract.md",
];

export function commandName(name) {
  if (process.platform !== "win32" || name !== "opencode") return name;
  const candidates = [];
  if (process.env.APPDATA) candidates.push(resolve(process.env.APPDATA, "npm", "node_modules", "opencode-ai", "bin", "opencode.exe"));
  for (const directory of String(process.env.PATH ?? "").split(delimiter)) {
    if (directory) candidates.push(resolve(directory, "opencode.exe"));
  }
  return candidates.find((candidate) => existsSync(candidate)) ?? "opencode.exe";
}

export function resolveExecutable(command) {
  if (process.platform !== "win32") return command;
  if (!command || command === "opencode" || command === "opencode.cmd") return commandName("opencode");
  if (isAbsolute(command) && extname(command).toLowerCase() === ".cmd") {
    const nativeCandidate = resolve(command, "..", "node_modules", "opencode-ai", "bin", "opencode.exe");
    if (existsSync(nativeCandidate)) return nativeCandidate;
  }
  return command;
}

export function stripAnsi(value) {
  return value.replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, "");
}

export function toPortablePath(value) {
  return resolve(value).replaceAll("\\", "/");
}

export function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

export function parseFrontmatter(text) {
  const normalized = text.replace(/^\uFEFF/, "");
  const match = normalized.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  if (!match) return {};
  const result = {};
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*?)\s*$/);
    if (!item) continue;
    result[item[1]] = item[2].replace(/^("|')|("|')$/g, "");
  }
  return result;
}

export function checkContractPreflight(projectRoot) {
  const root = resolve(projectRoot);
  const missing = REQUIRED_CONTRACTS.filter((relativePath) => !existsSync(resolve(root, relativePath)));
  const implementationPath = resolve(root, "docs/architecture/backend-implementation-contract.md");
  const errors = missing.map((path) => `missing required contract: ${path}`);
  let contractVersion = null;

  if (existsSync(implementationPath)) {
    const metadata = parseFrontmatter(readFileSync(implementationPath, "utf8"));
    if (String(metadata.status ?? "").toLowerCase() !== "approved") {
      errors.push("backend implementation contract status is not approved");
    }
    contractVersion = Number(metadata.contract_version);
    if (!Number.isInteger(contractVersion) || contractVersion < 1) {
      errors.push("backend implementation contract has no positive integer contract_version");
      contractVersion = null;
    }
    if (!/^\d{4}-\d{2}-\d{2}/.test(String(metadata.approved_at ?? ""))) {
      errors.push("backend implementation contract has no approved_at date");
    }
  }

  return { ok: errors.length === 0, errors, contractVersion };
}

export function runCapture(command, args, options = {}) {
  const timeoutMs = options.timeoutMs ?? 15_000;
  return new Promise((resolvePromise) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;
    let child;
    try {
      child = spawn(command, args, {
        cwd: options.cwd,
        env: options.env ?? process.env,
        windowsHide: true,
        shell: false,
      });
    } catch (error) {
      resolvePromise({ code: null, stdout, stderr: `${stderr}${error.message}`, timedOut: false });
      return;
    }
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, timeoutMs);
    child.stdout?.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr?.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolvePromise({ code: null, stdout, stderr: `${stderr}${error.message}`, timedOut });
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolvePromise({ code, stdout, stderr, timedOut });
    });
  });
}

export async function inspectOpenCode({ command, model }) {
  const executable = resolveExecutable(command || "opencode");
  const version = await runCapture(executable, ["--version"]);
  if (version.code !== 0) {
    return {
      ready: false,
      installed: false,
      authenticated: false,
      modelAvailable: false,
      version: null,
      command: executable,
      reasons: ["OpenCode CLI is not installed or not executable"],
    };
  }

  const auth = await runCapture(executable, ["auth", "list"]);
  const authText = stripAnsi(`${auth.stdout}\n${auth.stderr}`);
  const authenticated = auth.code === 0 && /opencode(?:[ -]?go)/i.test(authText) && !/0 credentials/i.test(authText);
  const models = await runCapture(executable, ["models", "opencode-go"], { timeoutMs: 30_000 });
  const modelsText = stripAnsi(`${models.stdout}\n${models.stderr}`);
  const modelAvailable = models.code === 0 && modelsText.split(/\r?\n/).some((line) => line.trim() === model);
  const reasons = [];
  if (!authenticated) reasons.push("OpenCode Go is not authenticated in the current operating environment");
  if (!modelAvailable) reasons.push(`configured model is unavailable: ${model}`);

  return {
    ready: authenticated && modelAvailable,
    installed: true,
    authenticated,
    modelAvailable,
    version: stripAnsi(version.stdout).trim(),
    command: executable,
    reasons,
  };
}

export function validateCompletion(value, expectedContractVersion) {
  const errors = [];
  if (!value || typeof value !== "object" || Array.isArray(value)) return ["completion must be a JSON object"];
  const stringFields = ["task_id", "status"];
  for (const field of stringFields) if (typeof value[field] !== "string" || !value[field]) errors.push(`${field} must be a non-empty string`);
  if (!Number.isInteger(value.contract_version) || value.contract_version < 1) errors.push("contract_version must be a positive integer");
  if (expectedContractVersion && value.contract_version !== expectedContractVersion) errors.push("completion contract_version does not match approved contract");
  if (!["completed", "blocked", "failed", "contract-review-required"].includes(value.status)) errors.push("status is invalid");
  for (const field of ["changed_files", "commands", "generated_migrations", "tests", "contract_deviations", "unresolved_items"]) {
    if (!Array.isArray(value[field])) errors.push(`${field} must be an array`);
  }
  if (!value.architecture_scan || typeof value.architecture_scan !== "object" || Array.isArray(value.architecture_scan)) {
    errors.push("architecture_scan must be an object");
  }
  return errors;
}
