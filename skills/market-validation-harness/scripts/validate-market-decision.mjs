import fs from "node:fs";

const outcomes = new Set(["proceed_to_product_brief", "experiment_first", "revise_search", "revise_hypothesis", "pause", "reject"]);
const confidence = new Set(["low", "medium", "high"]);

function fail(message) {
  throw new Error(message);
}

const path = process.argv[2];
if (!path) fail("Usage: node validate-market-decision.mjs <decision.json>");
const value = JSON.parse(fs.readFileSync(path, "utf8"));

if (value.schema_version !== "1.0") fail("schema_version must be 1.0.");
for (const field of ["decision_id", "research_id", "rationale"]) {
  if (typeof value[field] !== "string" || !value[field].trim()) fail(`${field} is required.`);
}
if (!outcomes.has(value.outcome)) fail("outcome is invalid.");
if (!confidence.has(value.confidence)) fail("confidence is invalid.");
if (!Array.isArray(value.critical_evidence_ids)) fail("critical_evidence_ids must be an array.");
if (!Array.isArray(value.open_questions)) fail("open_questions must be an array.");
if (value.automatic_handoff !== false) fail("automatic_handoff must be false.");
if (value.outcome === "experiment_first") {
  const experiment = value.next_experiment;
  if (!experiment || !experiment.primary_metric || !experiment.pass_threshold || !experiment.fail_threshold || !experiment.stop_rule) {
    fail("experiment_first requires a measurable next_experiment with pass, fail, and stop conditions.");
  }
}

process.stdout.write("market validation decision is valid\n");
