#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? process.cwd());
const productDir = path.join(root, "docs", "product");
const compact = path.join(productDir, "product-brief.md");
const modularFiles = [
  "prd.md",
  "screen-map.md",
  "business-rules.md",
  "data-contract.md",
  "visual-direction.md",
  "acceptance-criteria.md",
];
const errors = [];
const warnings = [];

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function normalized(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function headings(body) {
  return normalized(body)
    .split(/\r?\n/)
    .filter((line) => /^#{1,4}\s+/.test(line));
}

function requireHeadings(file, label, required) {
  const body = read(file);
  const available = headings(body);
  for (const [name, alternatives] of required) {
    if (!alternatives.some((candidate) => available.some((heading) => heading.includes(candidate)))) {
      errors.push(`${label}: missing section: ${name}`);
    }
  }
  if (/\{\{[^}]+\}\}/.test(body)) errors.push(`${label}: unresolved placeholders`);
}

if (!fs.existsSync(productDir)) {
  errors.push("docs/product does not exist");
} else if (fs.existsSync(compact)) {
  requireHeadings(compact, "product-brief.md", [
    ["Resumo", ["resumo"]],
    ["Escopo do MVP", ["escopo do mvp"]],
    ["Fora do escopo", ["fora do escopo"]],
    ["Rotas e telas", ["rotas", "telas"]],
    ["Regras de negocio", ["regras de negocio"]],
    ["Dados", ["dados"]],
    ["Permissoes", ["permissoes", "acesso"]],
    ["Direcao visual", ["direcao visual", "identidade visual"]],
    ["Criterios de aceitacao", ["criterios de aceitacao"]],
    ["Questoes em aberto", ["questoes em aberto"]],
  ]);
  const compactBody = read(compact);
  if (!/^#{2,4}\s+BR-\d{3}\b/m.test(compactBody)) errors.push("product-brief.md: no BR-### rule found");
  if (!/^- \[[ xX]\]\s+\S/m.test(compactBody)) errors.push("product-brief.md: no testable checkbox found");
} else {
  for (const name of modularFiles) {
    if (!fs.existsSync(path.join(productDir, name))) errors.push(`missing modular file: ${name}`);
  }
  requireHeadings(path.join(productDir, "prd.md"), "prd.md", [
    ["Resumo", ["resumo"]],
    ["Problema", ["problema"]],
    ["Objetivo", ["objetivo"]],
    ["Usuarios", ["usuarios"]],
    ["Escopo do MVP", ["escopo do mvp"]],
    ["Fora do escopo", ["fora do escopo"]],
    ["Jornadas", ["jornadas"]],
    ["Questoes em aberto", ["questoes em aberto"]],
  ]);
  const rules = read(path.join(productDir, "business-rules.md"));
  if (!/^#{2,4}\s+BR-\d{3}\b/m.test(rules)) errors.push("business-rules.md: no BR-### rule found");
  const criteria = read(path.join(productDir, "acceptance-criteria.md"));
  if (!/^- \[[ xX]\]\s+\S/m.test(criteria)) errors.push("acceptance-criteria.md: no testable checkbox found");
  const screenText = normalized(read(path.join(productDir, "screen-map.md")));
  for (const state of ["objetivo", "estados", "interacoes", "responsiv"]) {
    if (!screenText.includes(state)) warnings.push(`screen-map.md: missing concept: ${state}`);
  }
}

const combined = fs.existsSync(productDir)
  ? normalized(fs.readdirSync(productDir).filter((name) => name.endsWith(".md")).map((name) => read(path.join(productDir, name))).join("\n"))
  : "";
if (combined && !/(permiss|papel|perfil|publico)/.test(combined)) warnings.push("permissions or public access are not explicit");
if (combined && !/(sensivel|sensiveis|dados pessoais|nao ha dados sensiveis)/.test(combined)) warnings.push("sensitive-data expectations are not explicit");

for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exit(1);
console.log(`OK valid product contract (${warnings.length} warning(s))`);
