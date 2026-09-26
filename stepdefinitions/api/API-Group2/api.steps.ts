import { createBdd } from "playwright-bdd";
import { test, expect } from "../../../fixtures/test.fixture";

const { When, Then } = createBdd(test);

let responseBody: any;
let responseStatus: number;

When(
  "I send an API Group 2 GET request for post {int}",
  async ({ apiClient }, id: number) => {
    const response = await apiClient.get(`/posts/${id}`);
    responseStatus = response.status();
    responseBody = await response.json();
  }
);

Then(
  "the API Group 2 response status should be {int}",
  async ({}, expected: number) => {
    expect(responseStatus).toBe(expected);
  }
);

Then(
  "the API Group 2 response should contain title {string}",
  async ({}, expectedTitle: string) => {
    expect(responseBody.title).toBe(expectedTitle);
  }
);