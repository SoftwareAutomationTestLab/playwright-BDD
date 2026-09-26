import fs from "node:fs";
import dotenv from "dotenv";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

dotenv.config();

const metrics = JSON.parse(
  fs.readFileSync("test-results/metrics.json", "utf8")
);

const row = (name: string, m: any) =>
  `<tr><td>${name}</td><td>${m.total}</td><td>${m.passed}</td><td>${m.failed}</td></tr>`;

const html = `
<!doctype html>
<html>
<body style="font-family:Arial,sans-serif">
<h2>Playwright BDD Automation Report</h2>
<p><b>Environment:</b> ${metrics.environment}</p>
<p><b>Execution:</b> ${metrics.execution}</p>
<table border="1" cellpadding="8" cellspacing="0">
<tr><th>Metric</th><th>Total</th><th>Passed</th><th>Failed</th></tr>
${row("Overall", metrics.summary)}
${row("UI", metrics.byType.ui)}
${row("API", metrics.byType.api)}
${row("DB", metrics.byType.db)}
</table>
</body>
</html>`;

if (!process.env.SES_FROM_EMAIL || !process.env.SES_TO_EMAIL) {
  console.log("SES_FROM_EMAIL/SES_TO_EMAIL not configured. Skipping email.");
  process.exit(0);
}

const client = new SESClient({
  region: process.env.AWS_REGION || "us-east-1"
});

await client.send(
  new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [process.env.SES_TO_EMAIL]
    },
    Message: {
      Subject: {
        Data: `Playwright BDD Report - ${metrics.environment}`
      },
      Body: {
        Html: { Data: html }
      }
    }
  })
);

console.log("SES report sent.");