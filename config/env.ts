import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

const testEnv = process.env.TEST_ENV || "dev";
const configPath = path.resolve(process.cwd(), "config", "environments", `${testEnv}.json`);

if (!fs.existsSync(configPath)) {
  throw new Error(`Environment configuration not found: ${configPath}`);
}

export interface EnvironmentConfig {
  name: string;
  uiBaseUrl: string;
  apiBaseUrl: string;
}

export const env: EnvironmentConfig = JSON.parse(
  fs.readFileSync(configPath, "utf8")
);
