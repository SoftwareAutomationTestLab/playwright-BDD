import { createBdd } from "playwright-bdd";
import { test } from "../../fixtures/test.fixture";

const { Given, When, Then } = createBdd(test);

Given("I open the Sauce Demo login page", async ({ loginPage }) => {
  await loginPage.open();
});

When(
  "I login with username {string} and password {string}",
  async ({ loginPage }, username: string, password: string) => {
    await loginPage.login(username, password);
  }
);

Then("I should see the products page", async ({ loginPage }) => {
  await loginPage.expectProductsPage();
});

Then("I should see a login error", async ({ loginPage }) => {
  await loginPage.expectLoginError();
});