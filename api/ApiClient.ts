import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  async get(path: string) {
    return this.request.get(`${this.baseUrl}${path}`);
  }
}