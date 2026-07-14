#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const targetArgument = args.find((argument) => !argument.startsWith("--"));
const targetRoot = path.resolve(targetArgument ?? process.cwd());
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.resolve(scriptDirectory, "../assets/backend-project-context");
const contractSourceRoot = path.resolve(scriptDirectory, "../assets/backend-contracts");
let created = 0;
let preserved = 0;

for (const [label, source] of [
  ["Backend project context starter", sourceRoot],
  ["Backend contract templates", contractSourceRoot],
]) {
  if (!fs.existsSync(source)) {
    throw new Error(`${label} not found: ${source}`);
  }
}

for (const source of [sourceRoot, contractSourceRoot]) {
  const targetInsideSource = path.relative(source, targetRoot);
  if (
    targetInsideSource === "" ||
    (!targetInsideSource.startsWith("..") && !path.isAbsolute(targetInsideSource))
  ) {
    throw new Error("Target root must not be a bundled backend starter or one of its descendants.");
  }
}

if (fs.existsSync(targetRoot) && !fs.statSync(targetRoot).isDirectory()) {
  throw new Error(`Target root is not a directory: ${targetRoot}`);
}

function copyMissing(sourceDirectory, targetDirectory) {
  if (!dryRun) fs.mkdirSync(targetDirectory, { recursive: true });

  for (const entry of fs.readdirSync(sourceDirectory, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDirectory, entry.name);
    const targetPath = path.join(targetDirectory, entry.name);

    if (entry.isDirectory()) {
      copyMissing(sourcePath, targetPath);
      continue;
    }

    const relativePath = path.relative(targetRoot, targetPath);
    if (fs.existsSync(targetPath)) {
      preserved += 1;
      console.log(`preserve: ${relativePath}`);
      continue;
    }

    created += 1;
    console.log(`${dryRun ? "would create" : "create"}: ${relativePath}`);
    if (!dryRun) {
      fs.copyFileSync(sourcePath, targetPath, fs.constants.COPYFILE_EXCL);
    }
  }
}

copyMissing(sourceRoot, targetRoot);
copyMissing(contractSourceRoot, path.join(targetRoot, "docs", "architecture"));
console.log(
  `Backend context ${dryRun ? "previewed" : "initialized"}: ${created} created, ${preserved} preserved.`,
);
