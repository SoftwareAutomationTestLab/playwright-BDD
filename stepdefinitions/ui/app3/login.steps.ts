import { createBdd } from "playwright-bdd";
import { test } from "../../../fixtures/test.fixture";

const { Given, When, Then } = createBdd(test);

Given("I open the app3 login page", async ({ app3LoginPage }) => {
  await app3LoginPage.open();
});

When(
  "I login to app3 with username {string} and password {string}",
  async ({ app3LoginPage }, username: string, password: string) => {
    await app3LoginPage.login(username, password);
  }
);

Then("I should see the app3 products page", async ({ app3LoginPage }) => {
  await app3LoginPage.expectProductsPage();
});

Then("I should see an app3 login error", async ({ app3LoginPage }) => {
  await app3LoginPage.expectLoginError();
});