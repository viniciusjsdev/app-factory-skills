#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkContractPreflight, parseFrontmatter, validateCompletion } from "./_router-core.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const skillRoot = resolve(scriptDir, "..");
const sourceRoot = resolve(skillRoot, "..", "..");
const fixture = mkdtempSync(resolve(tmpdir(), "app-factory-router-test-"));
const architecture = resolve(fixture, "docs", "architecture");
mkdirSync(architecture, { recursive: true });

try {
  const bundledConfig = JSON.parse(readFileSync(resolve(skillRoot, "assets", "opencode.backend.json"), "utf8"));
  assert.equal(bundledConfig.model, "opencode-go/kimi-k2.7-code");
  if (existsSync(resolve(sourceRoot, "opencode.json"))) {
    const sourceConfig = JSON.parse(readFileSync(resolve(sourceRoot, "opencode.json"), "utf8"));
    assert.deepEqual(bundledConfig, sourceConfig, "root and bundled OpenCode configs must stay synchronized");
  }

  const missing = checkContractPreflight(fixture);
  assert.equal(missing.ok, false);

  for (const name of ["backend-plan.md", "domain-model.md", "api-contract.md", "security-contract.md", "backend-validation-plan.md"]) {
    writeFileSync(resolve(architecture, name), `# ${name}\n`, "utf8");
  }
  writeFileSync(resolve(architecture, "backend-implementation-contract.md"), [
    "---",
    "status: approved",
    "contract_version: 2",
    "approved_at: 2026-07-13",
    "---",
    "# Implementation",
    "",
  ].join("\n"), "utf8");

  assert.deepEqual(parseFrontmatter("---\nstatus: approved\ncontract_version: 2\n---\n"), {
    status: "approved",
    contract_version: "2",
  });
  const approved = checkContractPreflight(fixture);
  assert.equal(approved.ok, true);
  assert.equal(approved.contractVersion, 2);

  const completion = {
    task_id: "router-test",
    contract_version: 2,
    status: "completed",
    changed_files: [],
    commands: [],
    generated_migrations: [],
    tests: [],
    architecture_scan: {},
    contract_deviations: [],
    unresolved_items: [],
  };
  assert.deepEqual(validateCompletion(completion, 2), []);

  const route = spawnSync(process.execPath, [
    resolve(scriptDir, "route-backend-execution.mjs"),
    "--project-root", fixture,
    "--task-id", "router-self-test",
    "--dry-run",
  ], { encoding: "utf8", windowsHide: true });
  assert.equal(route.status, 0, route.stderr);
  const result = JSON.parse(route.stdout.trim());
  assert.ok(["codex-fallback-required", "opencode-ready"].includes(result.route));
  assert.equal(result.project_root, fixture);
  if (result.artifacts?.run_dir) rmSync(result.artifacts.run_dir, { recursive: true, force: true });

  process.stdout.write("router tests passed\n");
} finally {
  rmSync(fixture, { recursive: true, force: true });
}
