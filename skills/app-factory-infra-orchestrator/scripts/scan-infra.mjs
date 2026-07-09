#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const warnings = [];
const errors = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  try {
    return fs.readFileSync(path.join(root, relativePath), "utf8");
  } catch {
    return "";
  }
}

function warnMissing(file, reason) {
  if (!exists(file)) warnings.push(`${file} missing: ${reason}`);
}

function isSkillCatalogRepository() {
  return (
    exists("skills/app-factory-infra-orchestrator/SKILL.md") &&
    !exists("frontend") &&
    !exists("backend")
  );
}

function hasObviousSecret(content) {
  const patterns = [
    /SUPABASE_SERVICE_ROLE_KEY\s*=\s*(?!$|change-me|example|your-|<|REPLACE|xxx)[^\s#]+/i,
    /DJANGO_SECRET_KEY\s*=\s*(?!$|change-me|example|your-|<|REPLACE|xxx)[^\s#]+/i,
    /DATABASE_URL\s*=\s*postgres(?:ql)?:\/\/(?!postgres:postgres@db|user:password|example|<|REPLACE)[^\s#]+/i,
    /(?:API_KEY|TOKEN|SECRET)\s*=\s*(?!$|change-me|example|your-|<|REPLACE|xxx)[^\s#]+/i,
  ];
  return patterns.some((pattern) => pattern.test(content));
}

function checkEnvExamples() {
  warnMissing(".env.example", "root environment contract should be documented");
  if (exists("frontend")) warnMissing("frontend/.env.example", "frontend environment contract should be documented");
  if (exists("backend")) warnMissing("backend/.env.example", "backend environment contract should be documented");

  for (const file of [".env.example", "frontend/.env.example", "backend/.env.example"]) {
    if (exists(file) && hasObviousSecret(read(file))) {
      errors.push(`${file}: contains a value that looks like a real secret.`);
    }
  }

  if (exists("frontend/.env.example") && /SUPABASE_SERVICE_ROLE_KEY/i.test(read("frontend/.env.example"))) {
    errors.push("frontend/.env.example: SUPABASE_SERVICE_ROLE_KEY must stay server-side only.");
  }
}

function checkDocker() {
  warnMissing("docker-compose.yml", "local Docker orchestration is expected");
  if (exists("frontend")) {
    warnMissing("frontend/Dockerfile", "frontend local container is expected");
    warnMissing("frontend/Dockerfile.prod", "frontend production/container fallback is expected");
    warnMissing("frontend/.dockerignore", "frontend Docker context should be trimmed");
  }
  if (exists("backend")) {
    warnMissing("backend/Dockerfile", "backend local container is expected");
    warnMissing("backend/Dockerfile.prod", "backend production container is expected");
    warnMissing("backend/.dockerignore", "backend Docker context should be trimmed");
    warnMissing("backend/entrypoint.sh", "backend container startup should be explicit");
  }
}

function checkDocs() {
  warnMissing("Makefile", "root developer commands should be available");
  warnMissing("docs/architecture/infra-architecture.md", "infra architecture should be documented");
  warnMissing("docs/architecture/deploy.md", "deployment guidance should be documented");
  if (exists("AGENTS.md")) {
    const agents = read("AGENTS.md").toLowerCase();
    if (!agents.includes("docker") && !agents.includes("infra")) {
      warnings.push("AGENTS.md does not mention infra/Docker rules.");
    }
  } else {
    warnings.push("AGENTS.md missing: agent infra rules should be documented.");
  }
}

function checkVercel() {
  if (!exists("frontend")) return;
  const deployDocs = `${read("docs/architecture/deploy.md")}\n${read("README.md")}\n${read("frontend/vercel.json")}`.toLowerCase();
  if (!deployDocs.includes("vercel")) {
    warnings.push("Vercel guidance missing for frontend deployment.");
  }
  if (deployDocs.includes("vercel") && !deployDocs.includes("preview")) {
    warnings.push("Vercel guidance should document Preview environment behavior.");
  }
  if (deployDocs.includes("vercel") && !deployDocs.includes("production")) {
    warnings.push("Vercel guidance should document Production environment behavior.");
  }
  if (deployDocs.includes("vercel") && !deployDocs.includes("root directory") && !deployDocs.includes("frontend")) {
    warnings.push("Vercel monorepo guidance should document the frontend root directory.");
  }
}

function checkRender() {
  const renderText = `${read("render.yaml")}\n${read("docs/architecture/deploy.md")}\n${read("docs/architecture/infra-architecture.md")}\n${read("README.md")}`.toLowerCase();
  const mentionsRender = renderText.includes("render") || exists("render.yaml");
  if (!mentionsRender) return;

  if (!renderText.includes("build")) {
    warnings.push("Render guidance should document the backend build command.");
  }
  if (!renderText.includes("start") && !renderText.includes("gunicorn")) {
    warnings.push("Render guidance should document the backend start command.");
  }
  if (!renderText.includes("database_url")) {
    warnings.push("Render guidance should document DATABASE_URL.");
  }
  if (!renderText.includes("cors")) {
    warnings.push("Render guidance should document CORS from frontend domains to backend.");
  }
  if (exists("render.yaml")) {
    const blueprint = read("render.yaml");
    if (hasObviousSecret(blueprint)) {
      errors.push("render.yaml: contains a value that looks like a real secret.");
    }
    if (/SECRET|TOKEN|API_KEY|DATABASE_URL/i.test(blueprint) && !/sync:\s*false|generateValue:\s*true|fromDatabase:/i.test(blueprint)) {
      warnings.push("render.yaml references secret-like env vars without sync:false, generateValue:true, or fromDatabase.");
    }
  }
}

function checkSupabase() {
  const projectText = `${read("README.md")}\n${read("docs/architecture/infra-architecture.md")}\n${read(".env.example")}`.toLowerCase();
  const mentionsSupabase = projectText.includes("supabase") || exists("supabase");
  if (!mentionsSupabase) return;

  warnMissing("supabase", "Supabase is referenced but folder is missing");
  warnMissing("supabase/migrations", "Supabase migrations should be versioned when Supabase owns SQL resources");
  warnMissing("supabase/config.toml", "Supabase CLI config is expected after supabase init");
  if (!projectText.includes("rls") && !projectText.includes("row level security")) {
    warnings.push("Supabase production checklist should mention RLS.");
  }
  if (!projectText.includes("service role")) {
    warnings.push("Supabase docs should state that the service role key is server-side only.");
  }
  if (!projectText.includes("ssl")) {
    warnings.push("Supabase production checklist should mention SSL enforcement.");
  }
  if (!projectText.includes("network restriction")) {
    warnings.push("Supabase production checklist should mention network restrictions.");
  }
}

function printResults() {
  console.log("App Factory infra scan");
  console.log("======================");

  for (const warning of warnings) console.log(`warning: ${warning}`);
  for (const error of errors) console.log(`error: ${error}`);

  if (errors.length) {
    console.log(`failed: ${errors.length} error(s), ${warnings.length} warning(s)`);
    return 1;
  }
  if (warnings.length) {
    console.log(`ok with warnings: ${warnings.length} warning(s)`);
    return 0;
  }
  console.log("ok: no infra warnings found.");
  return 0;
}

if (isSkillCatalogRepository()) {
  console.log("App Factory infra scan");
  console.log("======================");
  console.log("ok: skill catalog repository detected; run this scanner from a target app project for infra checks.");
  process.exitCode = 0;
} else {
  checkDocker();
  checkEnvExamples();
  checkDocs();
  checkVercel();
  checkRender();
  checkSupabase();
  process.exitCode = printResults();
}
