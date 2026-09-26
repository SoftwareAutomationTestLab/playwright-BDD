import { createBdd } from "playwright-bdd";
import { test, expect } from "../../../fixtures/test.fixture";

const { When, Then } = createBdd(test);

let dbOrder: { order_id: number; status: string } | undefined;

When(
  "I query the app1 test database for order {int}",
  async ({ dbClient }, orderId: number) => {
    dbOrder = dbClient.findOrder(orderId);
  }
);

Then(
  "the app1 database should return order {int}",
  async ({}, expectedOrderId: number) => {
    expect(dbOrder).toBeDefined();
    expect(dbOrder?.order_id).toBe(expectedOrderId);
  }
);