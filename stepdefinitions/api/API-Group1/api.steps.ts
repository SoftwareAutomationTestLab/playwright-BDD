import { createBdd } from "playwright-bdd";
import { test, expect } from "../../../fixtures/test.fixture";

const { When, Then } = createBdd(test);

let responseBody: any;
let responseStatus: number;

When("I send a GET request for post {int}", async ({ apiClient }, id: number) => {
  const response = await apiClient.get(`/posts/${id}`);
  responseStatus = response.status();
  responseBody = await response.json();
});

Then("the API response status should be {int}", async ({}, expected: number) => {
  expect(responseStatus).toBe(expected);
});

Then(
  "the API response should contain title {string}",
  async ({}, expectedTitle: string) => {
    expect(responseBody.title).toBe(expectedTitle);
  }
);