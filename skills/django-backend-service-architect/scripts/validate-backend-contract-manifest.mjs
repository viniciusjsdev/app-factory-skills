#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const requireApproved = args.includes("--require-approved");
const targetArgument = args.find((argument) => !argument.startsWith("--"));
const root = resolve(targetArgument ?? process.cwd());
const architecture = resolve(root, "docs", "architecture");
const manifestPath = resolve(architecture, "backend-contract-manifest.json");
const implementationPath = resolve(architecture, "backend-implementation-contract.md");
const errors = [];
const humanContracts = [
  "backend-plan.md",
  "domain-model.md",
  "api-contract.md",
  "security-contract.md",
  "backend-validation-plan.md",
  "backend-implementation-contract.md",
];

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function checkObjectShape(value, label, required, allowed = required) {
  if (!isPlainObject(value)) {
    errors.push(`${label} must be an object`);
    return false;
  }
  for (const key of required) {
    if (!Object.hasOwn(value, key)) errors.push(`${label} is missing required property ${key}`);
  }
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) errors.push(`${label} has unsupported property ${key}`);
  }
  return true;
}

function parseFrontmatter(text) {
  const match = text.replace(/^\uFEFF/, "").match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  if (!match) return {};
  return Object.fromEntries(match[1].split(/\r?\n/).flatMap((line) => {
    const item = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*?)\s*$/);
    return item ? [[item[1], item[2].replace(/^("|')|("|')$/g, "")]] : [];
  }));
}

function requireArray(manifest, field, { allowEmpty = false } = {}) {
  const value = manifest[field];
  if (!Array.isArray(value)) {
    errors.push(`${field} must be an array`);
    return [];
  }
  if (!allowEmpty && value.length === 0) errors.push(`${field} must not be empty`);
  return value;
}

function fencedCommands(text) {
  return [...text.matchAll(/```(?:bash|powershell)\s*\r?\n([\s\S]*?)```/gi)]
    .flatMap((match) => match[1].split(/\r?\n/))
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

function hasShellControl(value) {
  return /[;&|><`\r\n]|\$\(/.test(value);
}

if (!existsSync(manifestPath)) errors.push("missing docs/architecture/backend-contract-manifest.json");
if (!existsSync(implementationPath)) errors.push("missing docs/architecture/backend-implementation-contract.md");

let manifest = null;
let rawManifest = "";
if (existsSync(manifestPath)) {
  try {
    rawManifest = readFileSync(manifestPath, "utf8");
    manifest = JSON.parse(rawManifest);
  } catch (error) {
    errors.push(`manifest is invalid JSON: ${error.message}`);
  }
}

if (manifest && (typeof manifest !== "object" || Array.isArray(manifest))) {
  errors.push("manifest root must be an object");
  manifest = null;
}

if (manifest) {
  checkObjectShape(
    manifest,
    "manifest",
    ["contract_version", "status", "services", "environment_bindings", "invariants", "endpoints", "allowed_execution_commands", "required_validations"],
    ["$schema", "contract_version", "status", "services", "environment_bindings", "invariants", "endpoints", "allowed_execution_commands", "required_validations"],
  );
  if (Object.hasOwn(manifest, "$schema") && typeof manifest.$schema !== "string") {
    errors.push("manifest.$schema must be a string");
  }
  const implementation = existsSync(implementationPath)
    ? parseFrontmatter(readFileSync(implementationPath, "utf8"))
    : {};
  if (!Number.isInteger(manifest.contract_version) || manifest.contract_version < 1) {
    errors.push("contract_version must be a positive integer");
  }
  if (!["pending-approval", "approved"].includes(manifest.status)) {
    errors.push("status must be pending-approval or approved");
  }
  if (requireApproved && manifest.status !== "approved") errors.push("manifest status is not approved");
  if (manifest.status === "approved" || requireApproved) {
    if (implementation.status !== "approved") errors.push("implementation contract status is not approved");
    if (Number(implementation.contract_version) !== manifest.contract_version) {
      errors.push("manifest and implementation contract versions do not match");
    }
    if (!/^\d{4}-\d{2}-\d{2}/.test(String(implementation.approved_at ?? ""))) {
      errors.push("implementation contract has no approved_at date");
    }
    for (const name of humanContracts) {
      const contractPath = resolve(architecture, name);
      if (!existsSync(contractPath)) {
        errors.push(`missing docs/architecture/${name}`);
        continue;
      }
      if (/\{\{|replace[_-]me/i.test(readFileSync(contractPath, "utf8"))) {
        errors.push(`${name} contains unresolved template values`);
      }
    }
  }
  if (/\{\{|replace[_-]me/i.test(rawManifest)) errors.push("manifest contains unresolved template values");

  const services = requireArray(manifest, "services");
  const serviceIds = new Set();
  for (const service of services) {
    if (!checkObjectShape(service, "service", ["id", "runtime", "local_port", "root_urlconf"])) continue;
    if (typeof service.id !== "string" || !/^[a-z][a-z0-9_-]*$/.test(service.id)) {
      errors.push("every service needs a valid id");
      continue;
    }
    if (serviceIds.has(service.id)) errors.push(`duplicate service id ${service.id}`);
    serviceIds.add(service.id);
    if (typeof service.runtime !== "string" || !service.runtime.trim()) {
      errors.push(`service ${service.id} requires a non-empty runtime`);
    }
    if (typeof service.runtime === "string" && service.runtime.toLowerCase().includes("django")) {
      if (typeof service.root_urlconf !== "string" || !/^[a-zA-Z_][a-zA-Z0-9_.]*\.urls$/.test(service.root_urlconf)) {
        errors.push(`Django service ${service.id} requires a full root_urlconf ending in .urls`);
      }
    } else if (service.root_urlconf !== null) {
      errors.push(`non-Django service ${service.id} must use root_urlconf: null`);
    }
    if (service.local_port !== null && (!Number.isInteger(service.local_port) || service.local_port < 1 || service.local_port > 65535)) {
      errors.push(`service ${service.id} has an invalid local_port`);
    }
  }

  const bindingVariables = new Set();
  for (const binding of requireArray(manifest, "environment_bindings", { allowEmpty: true })) {
    if (!checkObjectShape(binding, "environment binding", ["variable", "target_service", "url_role", "expected_url", "env_files"])) continue;
    if (typeof binding.variable !== "string" || !/^[A-Z][A-Z0-9_]*$/.test(binding.variable)) {
      errors.push("every environment binding needs a valid variable");
    } else if (bindingVariables.has(binding.variable)) {
      errors.push(`duplicate environment binding ${binding.variable}`);
    } else {
      bindingVariables.add(binding.variable);
    }
    if (!serviceIds.has(binding.target_service)) {
      errors.push(`environment binding ${binding.variable ?? "<missing>"} targets an unknown service`);
    }
    if (!["base_url", "callback_url", "public_url", "internal_url"].includes(binding.url_role)) {
      errors.push(`environment binding ${binding.variable ?? "<missing>"} has an invalid url_role`);
    }
    if (typeof binding.expected_url !== "string" || !/^https?:\/\//.test(binding.expected_url)) {
      errors.push(`environment binding ${binding.variable ?? "<missing>"} requires an absolute expected_url`);
    }
    if (!Array.isArray(binding.env_files) || binding.env_files.length === 0 || binding.env_files.some((value) => typeof value !== "string" || !value)) {
      errors.push(`environment binding ${binding.variable ?? "<missing>"} requires env_files`);
    }
  }

  const contractIds = new Set();
  for (const invariant of requireArray(manifest, "invariants")) {
    if (!checkObjectShape(invariant, "invariant", ["id", "statement", "enforcement", "required_tests"])) continue;
    const id = invariant?.id;
    if (typeof id !== "string" || !/^[A-Z][A-Z0-9_-]*-[0-9]{3}$/.test(id)) {
      errors.push("every invariant needs a stable ID");
      continue;
    }
    if (contractIds.has(id)) errors.push(`duplicate contract id ${id}`);
    contractIds.add(id);
    if (typeof invariant.statement !== "string" || invariant.statement.length < 12) {
      errors.push(`invariant ${id} needs a meaningful statement`);
    }
    if (!Array.isArray(invariant.enforcement) || invariant.enforcement.length === 0 || invariant.enforcement.some((value) => typeof value !== "string" || !value)) {
      errors.push(`invariant ${id} requires enforcement paths`);
    }
    if (!Array.isArray(invariant.required_tests) || invariant.required_tests.length === 0 || invariant.required_tests.some((name) => !/^test_[a-z0-9_]+$/.test(name))) {
      errors.push(`invariant ${id} requires exact test_* names`);
    }
  }

  for (const endpoint of requireArray(manifest, "endpoints")) {
    if (!checkObjectShape(
      endpoint,
      "endpoint",
      ["id", "method", "path", "controller", "request_dto", "response_dto", "mapper", "service", "repositories", "required_tests"],
    )) continue;
    const id = endpoint?.id;
    if (typeof id !== "string" || !/^API-[0-9]{3}$/.test(id)) {
      errors.push("every endpoint needs an API-### ID");
      continue;
    }
    if (contractIds.has(id)) errors.push(`duplicate contract id ${id}`);
    contractIds.add(id);
    if (!["GET", "POST", "PUT", "PATCH", "DELETE"].includes(endpoint.method)) {
      errors.push(`endpoint ${id} has an invalid method`);
    }
    if (typeof endpoint.path !== "string" || !endpoint.path.startsWith("/")) {
      errors.push(`endpoint ${id} has an invalid path`);
    }
    for (const field of ["controller", "service"]) {
      if (typeof endpoint[field] !== "string" || !endpoint[field].includes(".")) {
        errors.push(`endpoint ${id}.${field} requires a full dotted path`);
      }
    }
    for (const field of ["request_dto", "response_dto", "mapper"]) {
      if (endpoint[field] !== null && (typeof endpoint[field] !== "string" || !endpoint[field].includes("."))) {
        errors.push(`endpoint ${id}.${field} must be null or a full dotted path`);
      }
    }
    if (!Array.isArray(endpoint.repositories) || endpoint.repositories.some((value) => typeof value !== "string" || !value)) {
      errors.push(`endpoint ${id}.repositories must be an array of dotted paths`);
    }
    if (!Array.isArray(endpoint.required_tests) || endpoint.required_tests.length === 0 || endpoint.required_tests.some((name) => !/^test_[a-z0-9_]+$/.test(name))) {
      errors.push(`endpoint ${id} requires exact test_* names`);
    }
  }

  for (const command of requireArray(manifest, "allowed_execution_commands", { allowEmpty: true })) {
    if (typeof command !== "string" || !/^(?:python3?|py) manage\.py makemigrations(?: [A-Za-z0-9_.=:/-]+)+$/.test(command) || hasShellControl(command)) {
      errors.push("allowed_execution_commands may contain only exact, non-compound Django makemigrations commands");
    }
  }

  const validationIds = new Set();
  const validationCommands = new Set();
  for (const validation of requireArray(manifest, "required_validations")) {
    if (!checkObjectShape(validation, "validation", ["id", "kind", "command", "required"])) continue;
    const id = validation?.id;
    if (typeof id !== "string" || !/^VAL-[0-9]{3}$/.test(id)) {
      errors.push("every validation needs a VAL-### ID");
      continue;
    }
    if (validationIds.has(id)) errors.push(`duplicate validation id ${id}`);
    validationIds.add(id);
    if (!["check", "test", "scan", "migration", "integration", "browser"].includes(validation.kind)) {
      errors.push(`validation ${id}.kind is invalid`);
    }
    if (typeof validation.command !== "string" || !validation.command.trim()) {
      errors.push(`validation ${id} requires a command`);
    } else if (hasShellControl(validation.command)) {
      errors.push(`validation ${id}.command must not contain shell control operators`);
    } else {
      validationCommands.add(validation.command.trim());
    }
    if (typeof validation.required !== "boolean") errors.push(`validation ${id}.required must be boolean`);
  }

  const validationPlanPath = resolve(architecture, "backend-validation-plan.md");
  if (existsSync(validationPlanPath)) {
    const plannedCommands = new Set(fencedCommands(readFileSync(validationPlanPath, "utf8")));
    for (const command of validationCommands) {
      if (!plannedCommands.has(command)) errors.push(`backend-validation-plan.md is missing manifest command: ${command}`);
    }
    for (const command of plannedCommands) {
      if (!validationCommands.has(command)) errors.push(`backend-validation-plan.md has a command absent from the manifest: ${command}`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) process.stderr.write(`error: ${error}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`backend contract manifest valid: ${manifest.status} v${manifest.contract_version}\n`);
}
