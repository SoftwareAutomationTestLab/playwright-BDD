import { APIRequestContext, expect } from "@playwright/test";
import { test as base } from "playwright-bdd";
import { LoginPage as App1LoginPage } from "../pages/ui/app1/LoginPage";
import { LoginPage as App2LoginPage } from "../pages/ui/app2/LoginPage";
import { LoginPage as App3LoginPage } from "../pages/ui/app3/LoginPage";
import { ApiClient } from "../api/ApiClient";
import { DbClient } from "../db/DbClient";
import { env } from "../config/env";

type Fixtures = {
  app1LoginPage: App1LoginPage;
  app2LoginPage: App2LoginPage;
  app3LoginPage: App3LoginPage;
  apiClient: ApiClient;
  dbClient: DbClient;
};

export const test = base.extend<Fixtures>({
  app1LoginPage: async ({ page }, use) => {
    await use(new App1LoginPage(page));
  },

  app2LoginPage: async ({ page }, use) => {
    await use(new App2LoginPage(page));
  },

  app3LoginPage: async ({ page }, use) => {
    await use(new App3LoginPage(page));
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