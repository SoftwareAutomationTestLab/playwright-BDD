import { createBdd } from "playwright-bdd";
import { test } from "../../../fixtures/test.fixture";

const { Given, When, Then } = createBdd(test);

Given("I open the app2 login page", async ({ app2LoginPage }) => {
  await app2LoginPage.open();
});

When(
  "I login to app2 with username {string} and password {string}",
  async ({ app2LoginPage }, username: string, password: string) => {
    await app2LoginPage.login(username, password);
  }
);

Then("I should see the app2 products page", async ({ app2LoginPage }) => {
  await app2LoginPage.expectProductsPage();
});

Then("I should see an app2 login error", async ({ app2LoginPage }) => {
  await app2LoginPage.expectLoginError();
});