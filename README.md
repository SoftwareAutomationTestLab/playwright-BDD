# Playwright BDD Framework

A maintainable Playwright + TypeScript + playwright-bdd starter with:

- Gherkin feature files
- Native Playwright fixtures
- Page Objects
- API client
- DB repository/client
- Dev/Staging configuration
- UI/API/DB tags
- Playwright HTML + JSON reporting
- Metrics aggregation
- AWS SES email
- GitHub Actions scheduled and manual execution

## Prerequisites

- Node.js 22+
- npm 10+
- AWS credentials with SES permissions if email is required

## Install

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` when running locally.

## Run locally

### Dev

```bash
TEST_ENV=dev npm test
```

### Staging

```bash
TEST_ENV=staging npm test
```

### Smoke

```bash
TEST_ENV=dev npm run test:smoke
```

### UI only

```bash
TEST_ENV=dev npm run test:ui
```

### API only

```bash
TEST_ENV=dev npm run test:api
```

### DB only

```bash
TEST_ENV=dev npm run test:db
```

## Reports

```bash
npm run report:playwright
```

Metrics are written to:

```text
test-results/metrics.json
```

## SES

Configure:

```text
AWS_REGION
SES_FROM_EMAIL
SES_TO_EMAIL
```

For GitHub Actions, store sender/recipient as repository or environment secrets.

Use GitHub OIDC/short-lived AWS credentials according to your organization's AWS setup. Do not commit AWS access keys.

## GitHub Actions

The workflow supports:

- Weekday scheduled execution
- Manual execution
- Dev
- Staging
- Both
- All tests
- Smoke
- UI
- API
- DB

Scheduled execution runs Dev only.

Tests are organized by app group:

- UI and DB: `app1`, `app2`, and `app3`
- API: `API-Group1` and `API-Group2`

For manual runs, UI and DB suites can run all apps or one selected app (`app1`, `app2`, or `app3`). Selecting API runs both API groups; the app choice does not filter API tests. Scheduled runs execute all UI, API, and DB tests on Dev. The app-specific starter tests currently use the shared demo endpoints and database client configured by this project.

## Replacing the demo systems

The included Dev and Staging URLs intentionally point to public demo services so the project can run without your application's credentials.

Replace:

```text
config/environments/dev.json
config/environments/staging.json
```

with your real UI/API endpoints.

Replace the in-memory SQLite implementation in:

```text
db/DbClient.ts
```

with your organization's approved database client.

For production/federal environments, keep credentials in GitHub Secrets, environment secrets, or your organization's approved secret manager.
