# Repository Guidelines

Use this guide to stay aligned with the Prism website codebase. Keep updates incremental, document notable decisions, and rely on the scripts provided in `package.json`.

## Project Structure & Module Organization
`app/` hosts the Next.js App Router entrypoints and route-level layouts. UI primitives and composites live in `components/`, while reusable business logic sits in `lib/` and lightweight helpers in `utils/`. Content sources such as MDX and CMS exports stay under `content/`, assets under `public/`, and styling tokens in `styles/`. Automated tests belong in `__tests__/`, and operational tooling (MCP, diagnostics, git helpers) is collected in `scripts/` and `supabase/`.

## Build, Test, and Development Commands
Install dependencies with `pnpm install` (or `npm install` if pnpm is unavailable). Run `pnpm dev` to start the local Next.js server, `pnpm build` for a production bundle, and `pnpm start` to smoke-test the build. Quality gates include `pnpm lint`, `pnpm typecheck`, and `pnpm test`; combine them before pushing with `pnpm lint && pnpm typecheck && pnpm test`.

## Coding Style & Naming Conventions
The project relies on ESLint, Prettier, and Tailwind CSS. Preserve the default Prettier formatting (two-space indentation, double quotes in JSON, semicolons in TypeScript) and never hand-format compiled assets. React components use PascalCase filenames (e.g., `components/PricingCard.tsx`), hooks live in `hooks/` and use `use` prefixes, and utility functions prefer camelCase. Keep Tailwind classes ordered logically (layout → spacing → color) to aid diffs.

## Testing Guidelines
Jest with `@testing-library/react` powers the test suite; place files as `ComponentName.test.tsx` inside `__tests__/` or adjacent to the component when co-locating improves clarity. Mock external services via the helpers in `__mocks__/`. Write interaction-focused tests that assert user-visible outcomes, and ensure new code paths are covered before merging.

## Commit & Pull Request Guidelines
Follow the existing history: concise, imperative, sentence-case subject lines without trailing punctuation (e.g., `Tweak models apply form spacing`). Group related changes per commit and avoid bundling refactors with feature work. Pull requests should include a clear summary, screenshots or recordings for UI shifts, linked issue IDs, and explicit rollout considerations (migrations, feature flags, Supabase config).

## Configuration & Security Notes
Environment variables load from `.env.local`; copy `.env.example` as the starting point and never commit secrets. MPC integrations (GitHub, Supabase, Sentry, Figma) require valid tokens before running scripts in `scripts/`. Review `sentry.*.config.ts` and `supabase/` whenever adjusting deployment targets to keep observability and data access intact.
