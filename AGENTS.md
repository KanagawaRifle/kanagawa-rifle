# AGENTS.md

## Scope

- This file applies to the entire repository. A nested `AGENTS.md` takes precedence within its scope.
- Use Japanese for progress updates and final reports unless requested otherwise. Keep this file in English and within 100 lines.
- See `README.md`, `packages/website/README.md`, and `DEVELOPMENT.md` for details.
- If documentation differs from implementation, check the current `package.json`, configuration, and tests, and report the discrepancy.

## Project and Structure

- Official website of the Kanagawa Rifle Shooting Association, managed with npm workspaces and Turborepo.
- `packages/website` (`@acme/website`): Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4.
- `packages/*-config`: Shared ESLint, Prettier, Stylelint, TypeScript, and Lighthouse configuration.
- `packages/website/src/app`: Pages, layouts, APIs, metadata, and the sitemap.
- `packages/website/src/features`: News and competition data, validation, and presentation logic.
- `packages/website/src/components/ui`: Shared UI. Reuse the existing Radix UI components.
- `packages/website/src/contents/news`: News Markdown organized by year. `public` contains static assets.
- `packages/website/e2e` contains Playwright tests, `.github/workflows` contains CI, and `docker` contains the development environment.
- Paths beginning with `src/` below are relative to `packages/website/`.

## Development Environment

- Match Node.js and npm to `volta` in the root `package.json` (currently 24.21.0 / 11.19.0).
- Run the commands below from the repository root. Install dependencies with `npm ci`.
- On initial setup, copy `packages/website/.env.example` to `packages/website/.env.local`; do not overwrite existing settings.
- Development: `npm run -w @acme/website dev`, available at `http://localhost:3000`.
- Specify the target workspace when adding dependencies, for example `npm install -w @acme/website <package-name>`.
- Update the root `package-lock.json` when changing dependencies, and do not mix package managers.
- Follow the README for Docker startup and `LOCAL_UID` / `LOCAL_GID`. Do not install or build simultaneously on the host and in containers.

## Implementation Conventions

- Preserve strict TypeScript checks. Validate input with existing Zod schemas; do not bypass errors by disabling type checks.
- `@/` maps to `packages/website/src/`. Follow the surrounding structure, naming, and import conventions.
- Prefer Server Components, limiting `'use client'` to parts that require browser interaction.
- Keep server-only data access out of client code, and do not call the site's own news API from pages.
- Reuse Tailwind, shared UI, and `cn`, preserving semantic HTML, keyboard support, and accessible names.
- Follow `.editorconfig` and shared Prettier settings: two-space indentation, LF, semicolons, and single quotes.
- Follow ESLint import grouping and alphabetical ordering, and remove unused imports.
- Check `src/config/env.ts` and `.env.example` when changing environment variables. Keep secrets out of code, logs, and commits.
- Do not manually edit or add generated artifacts such as `.next`, `coverage`, `playwright-report`, or `*.tsbuildinfo`.

## News and Competition Changes

- Place articles at `packages/website/src/contents/news/<year>/<YYYY-MM-DD-NN>.md`.
- Front matter requires `title` and `published`. Follow `src/features/news/schema.ts` for dates and optional fields.
- Centralize news loading, listing, and pagination in `src/features/news/server/news.ts`.
- Manage articles in Git and publish through deployment. Do not add custom TTLs or client-side news caches.
- Check the website README and tests for public news pages and API behavior, including errors, pagination, date formats, and caching.
- When editing articles, verify the body, publication and update dates, links, and effects on listings, detail pages, and the sitemap.
- Store competition data in `src/features/competitions/data/yearYYYY.ts`, reusing existing types, validation, and presentation logic.
- When adding a year, update `index.ts` in the same directory. The published year is an editorial choice; do not derive it automatically from today's date.

## Validation

- Select checks appropriate to the change. For code changes, run ESLint, type checks, and relevant tests; also build when rendering or configuration is affected.

| Check            | Command from the repository root           |
| ---------------- | ------------------------------------------ |
| ESLint           | `npm run -w @acme/website lint:eslint`     |
| Formatting       | `npm run -w @acme/website lint:prettier`   |
| Types            | `npm run -w @acme/website typecheck`       |
| Unit tests       | `npm run -w @acme/website test`            |
| All news content | `npm run -w @acme/website test:content`    |
| Build            | `npm run -w @acme/website build`           |
| Storybook        | `npm run -w @acme/website build-storybook` |

- Run `test:content` for article changes. Choose relevant tests, Storybook checks, and browser checks for UI changes.
- Initial E2E setup: `npx playwright install chromium`.
- Run E2E: `LHCI=1 npm run -w @acme/website test:e2e -- --project=chromium --project="Mobile Chrome"`.
- `test:e2e` builds the app and starts a production server at `127.0.0.1:3100`. It does not reuse an existing server.
- For local HTTP E2E checks, pass `LHCI=1` to both build and startup. The command above applies it to both.
- Place unit tests in nearby `__tests__` directories. CI requires 80% coverage for lines, functions, branches, and statements.
- Check consumers when changing shared configuration. Use `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` for repository-wide checks.
- For documentation-only changes, verify content, links, diffs, and formatting; run app builds or tests when the change affects them.
- Update test expectations and snapshots only when justified by the intended behavior. Report skipped or failed checks and their reasons.

## Changes and Reporting

- Preserve existing user changes and stay within the requested scope. Avoid unrelated refactoring or bulk formatting.
- Update the relevant README when changing behavior or development procedures, and review the diff before finishing.
- When committing, follow `commitlint.config.mjs`: `[scope] type: summary`, for example `[website] fix: correct article links`.
- Allowed scopes are `website`, `eslint-config`, `prettier-config`, `root`, and `*`. Keep the header within 100 characters.
- Commit, push, or create a PR only when that specific action is explicitly requested or authorized. Follow the existing PR template.
- Final reports should briefly describe changes, checks performed and their results, and anything left unverified.
