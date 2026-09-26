import fs from "node:fs";
import path from "node:path";

const resultsPath = path.resolve("test-results/playwright-results.json");
const outputPath = path.resolve("test-results/metrics.json");

function walk(node: any, tests: any[] = []) {
  if (!node) return tests;
  if (Array.isArray(node)) {
    for (const item of node) walk(item, tests);
  } else if (typeof node === "object") {
    if (Array.isArray(node.tests)) {
      for (const t of node.tests) {
        tests.push({
          title: t.title || "",
          status: t.results?.[0]?.status || "unknown",
          annotations: t.annotations || []
        });
      }
    }
    for (const value of Object.values(node)) walk(value, tests);
  }
  return tests;
}

const data = fs.existsSync(resultsPath)
  ? JSON.parse(fs.readFileSync(resultsPath, "utf8"))
  : {};

const tests = walk(data);

const classify = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("api")) return "api";
  if (lower.includes("database") || lower.includes("database validation")) return "db";
  return "ui";
};

const metrics: any = {
  environment: process.env.TEST_ENV || "dev",
  execution: process.env.GITHUB_EVENT_NAME === "schedule" ? "scheduled" : "manual/local",
  summary: { total: tests.length, passed: 0, failed: 0 },
  byType: {
    ui: { total: 0, passed: 0, failed: 0 },
    api: { total: 0, passed: 0, failed: 0 },
    db: { total: 0, passed: 0, failed: 0 }
  }
};

for (const t of tests) {
  const type = classify(t.title);
  metrics.byType[type].total++;

  if (t.status === "passed") {
    metrics.summary.passed++;
    metrics.byType[type].passed++;
  } else if (t.status === "failed" || t.status === "timedOut") {
    metrics.summary.failed++;
    metrics.byType[type].failed++;
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(metrics, null, 2));

console.log(JSON.stringify(metrics, null, 2));