import { createBdd } from "playwright-bdd";
import { test, expect } from "../../fixtures/test.fixture";

const { When, Then } = createBdd(test);

let dbOrder: { order_id: number; status: string } | undefined;

When(
  "I query the test database for order {int}",
  async ({ dbClient }, orderId: number) => {
    dbOrder = dbClient.findOrder(orderId);
  }
);

Then(
  "the database should return order {int}",
  async ({}, expectedOrderId: number) => {
    expect(dbOrder).toBeDefined();
    expect(dbOrder?.order_id).toBe(expectedOrderId);
  }
);