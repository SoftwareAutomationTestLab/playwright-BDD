import { createBdd } from "playwright-bdd";
import { test } from "../../../fixtures/test.fixture";

const { Given, When, Then } = createBdd(test);

Given("I open the app1 login page", async ({ app1LoginPage }) => {
  await app1LoginPage.open();
});

When(
  "I login to app1 with username {string} and password {string}",
  async ({ app1LoginPage }, username: string, password: string) => {
    await app1LoginPage.login(username, password);
  }
);

Then("I should see the app1 products page", async ({ app1LoginPage }) => {
  await app1LoginPage.expectProductsPage();
});

Then("I should see an app1 login error", async ({ app1LoginPage }) => {
  await app1LoginPage.expectLoginError();
});