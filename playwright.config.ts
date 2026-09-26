import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { env } from "./config/env";

const testDir = defineBddConfig({
  features: "features/**/*.feature",
  steps: ["steps/**/*.ts", "fixtures/**/*.ts"],
  outputDir: "features-gen"
});

export default defineConfig({
  testDir,
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "test-results/playwright-results.json" }]
  ],
  use: {
    baseURL: env.uiBaseUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [
    {
      name: env.name,
      use: {
        baseURL: env.uiBaseUrl
      }
    }
  ]
});