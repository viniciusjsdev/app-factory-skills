#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const srcDir = path.join(root, "src");
const warnings = [];
const info = [];

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".tanstack",
  "coverage",
  ".turbo",
  ".vite",
]);

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function readJson(relativePath) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
  } catch {
    return null;
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }
    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function lineCount(content) {
  return content.split(/\r?\n/).length;
}

function hasDirectMockImport(content) {
  return /from\s+["'][^"']*(?:mock|mocks|fixtures|fake|sample-data)[^"']*["']/.test(content);
}

function hasApiCall(content) {
  return /\b(fetch|axios\.[a-z]+)\s*\(/.test(content);
}

function hasLargeJsx(content) {
  return (content.match(/<([A-Z][A-Za-z0-9]*|[a-z][a-z0-9-]*)[\s>]/g) || []).length >= 40;
}

function hasJsxElement(content) {
  return /<([A-Z][A-Za-z0-9]*|[a-z][a-z0-9-]*)(?:>|\/>|\s+[A-Za-z_:][-A-Za-z0-9_:.]*(?:=|\s|>|\/>))/.test(content);
}

function hasNestedComponentDefinitions(content) {
  const matches = content.match(/(?:function|const)\s+[A-Z][A-Za-z0-9]*\s*(?:=|\()/g) || [];
  return matches.length > 3;
}

function isGeneratedUiPrimitive(relative) {
  return relative.startsWith("src/components/ui/");
}

function analyzePackage() {
  const pkg = readJson("package.json");
  if (!pkg) {
    warnings.push("No package.json found. Run this scanner from a frontend project root.");
    return;
  }

  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  const stack = [
    ["react", "React"],
    ["typescript", "TypeScript"],
    ["vite", "Vite"],
    ["@tanstack/react-router", "TanStack Router"],
    ["@tanstack/react-start", "TanStack Start"],
    ["tailwindcss", "Tailwind CSS"],
    ["zustand", "Zustand"],
    ["react-hook-form", "React Hook Form"],
    ["zod", "Zod"],
    ["lucide-react", "Lucide React"],
    ["recharts", "Recharts"],
    ["sonner", "Sonner"],
  ]
    .filter(([name]) => deps[name])
    .map(([, label]) => label);

  info.push(`Detected stack: ${stack.length ? stack.join(", ") : "no expected frontend dependencies found"}.`);

  const packageManager = exists("pnpm-lock.yaml")
    ? "pnpm"
    : exists("yarn.lock")
      ? "yarn"
      : exists("bun.lockb") || exists("bun.lock")
        ? "bun"
        : exists("package-lock.json")
          ? "npm"
          : "npm (no lockfile)";

  info.push(`Detected package manager: ${packageManager}.`);
}

function analyzeFiles() {
  const files = walk(srcDir);

  if (!files.length) {
    warnings.push("No source files found under src/.");
    return;
  }

  const routeFiles = files.filter((file) => rel(file).startsWith("src/routes/"));
  const featureFiles = files.filter((file) => rel(file).startsWith("src/features/"));
  const mockFiles = files.filter((file) => rel(file).startsWith("src/mocks/"));

  if (!routeFiles.length) warnings.push("No src/routes files found. Confirm the routing structure manually.");
  if (!featureFiles.length) warnings.push("No src/features files found. Lovable screens may still be route/component-heavy.");
  if (!mockFiles.length) warnings.push("No src/mocks folder found. If mock data exists, ensure it is not scattered through UI files.");

  for (const file of files) {
    const relative = rel(file);
    const content = fs.readFileSync(file, "utf8");
    const lines = lineCount(content);
    const isRoute = relative.startsWith("src/routes/");
    const isComponentish = /(?:components|pages|features|routes)\//.test(relative);
    const isService = /\/services?\//.test(relative);
    const isHook = /\/hooks?\//.test(relative) || /use[A-Z].*\.(t|j)sx?$/.test(relative);
    const isMock = relative.startsWith("src/mocks/") || /\/mocks?\//.test(relative);
    const isGeneratedUi = isGeneratedUiPrimitive(relative);

    if (lines > 250 && isComponentish && !isGeneratedUi) {
      warnings.push(`${relative}: ${lines} lines. Consider splitting responsibilities while preserving rendered UI.`);
    }

    if (isRoute && lines > 80) {
      warnings.push(`${relative}: route file is ${lines} lines. Keep routes thin and move screen composition into features.`);
    }

    if (isRoute && hasDirectMockImport(content)) {
      warnings.push(`${relative}: route imports mocks directly. Route -> Feature Page -> Hook -> Service -> Mock/API is preferred.`);
    }

    if (isComponentish && !isService && !isMock && hasDirectMockImport(content)) {
      warnings.push(`${relative}: UI imports mock data directly. Hide mocks behind services or feature hooks.`);
    }

    if (isComponentish && !isService && hasApiCall(content)) {
      warnings.push(`${relative}: UI appears to call an API directly. Move data access into services/hooks.`);
    }

    if (isHook && hasJsxElement(content)) {
      warnings.push(`${relative}: hook-like file contains JSX. Hooks should orchestrate state, not render UI.`);
    }

    if (isComponentish && !isGeneratedUi && hasLargeJsx(content) && hasNestedComponentDefinitions(content)) {
      warnings.push(`${relative}: large JSX with multiple component definitions. Consider extracting focused components.`);
    }
  }
}

function printResults() {
  console.log("Lovable frontend architecture scan");
  console.log("===================================");

  for (const item of info) console.log(`info: ${item}`);

  if (!warnings.length) {
    console.log("ok: no architecture warnings found by the heuristic scan.");
    return;
  }

  console.log("");
  console.log(`warnings: ${warnings.length}`);
  for (const warning of warnings) console.log(`- ${warning}`);
  console.log("");
  console.log("This scan is heuristic. Review warnings against the actual UI/UX before refactoring.");
}

analyzePackage();
analyzeFiles();
printResults();
