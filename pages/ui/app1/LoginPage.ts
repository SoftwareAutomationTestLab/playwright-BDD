import { expect, Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async expectProductsPage() {
    await expect(this.page.getByText("Products")).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.page.locator("[data-test='error']")).toBeVisible();
  }
}