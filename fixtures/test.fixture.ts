import { APIRequestContext, expect } from "@playwright/test";
import { test as base } from "playwright-bdd";
import { LoginPage } from "../pages/LoginPage";
import { ApiClient } from "../api/ApiClient";
import { DbClient } from "../db/DbClient";
import { env } from "../config/env";

type Fixtures = {
  loginPage: LoginPage;
  apiClient: ApiClient;
  dbClient: DbClient;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request, env.apiBaseUrl));
  },

  dbClient: async ({}, use) => {
    const client = new DbClient();
    await use(client);
    client.close();
  }
});

export { expect };