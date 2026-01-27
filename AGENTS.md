# Repository Guidelines

Use this guide to stay aligned with the Prism website codebase. Keep updates incremental, document notable decisions, and rely on the scripts provided in `package.json`.

> **Canonical guidance**  
> AGENTS.md and README.md are the master authority for technical rules (tooling, architecture, docs, and env vars). Any conflicting rule elsewhere—including CLAUDE.md, git-sync docs, or older playbooks—is deprecated until it matches these files.

## Canonical guardrails
- **Runtime** – Node.js 22.x (Vercel requires 22; keep local dev pinned here to avoid deploy failures).
- **Package manager** – pnpm 10.x (sync via `corepack enable`). All commands should use `pnpm`; if you see `npm run …` in legacy docs, treat it as outdated.
- **Architecture snapshot** – Marketing forms rely on Formspree endpoints plus the shared `useFormValidation` hook (HTML5 validation + client-side `fetch` + redirect to `/thank-you` routes). We currently do **not** use React Hook Form, Zod, or server actions on these flows. Update this note if the stack changes.
- **Documentation policy** – When you add or change behavior, update the relevant existing file under `/docs` (or this AGENTS/README pair for global policies). Do *not* introduce new top-level docs without approval; prefer editing the canonical guides.
- **Environment variables** – Only the variables listed in `.env.example` / `docs/environment-setup.md` are required (GA overrides, Supabase credentials, Resend key, optional site URLs). Remove references to unused vars elsewhere.

## Project Structure & Module Organization
`app/` hosts the Next.js App Router entrypoints and route-level layouts. UI primitives and composites live in `components/`, while reusable business logic sits in `lib/` and lightweight helpers in `utils/`. Content sources such as MDX and CMS exports stay under `content/`, assets under `public/`, and styling tokens in `styles/`. Automated tests belong in `__tests__/`, and operational tooling (MCP, diagnostics, git helpers) is collected in `scripts/` and `supabase/`.

## Build, Test, and Development Commands
Install dependencies with `pnpm install`. Run `pnpm dev` to start the local Next.js server, `pnpm build` for a production bundle, and `pnpm start` to smoke-test the build. Quality gates include `pnpm lint`, `pnpm typecheck`, and `pnpm test`; combine them before pushing with `pnpm lint && pnpm typecheck && pnpm test`.

## Coding Style & Naming Conventions
The project relies on ESLint, Prettier, and Tailwind CSS. Preserve the default Prettier formatting (two-space indentation, double quotes in JSON, semicolons in TypeScript) and never hand-format compiled assets. React components use PascalCase filenames (e.g., `components/PricingCard.tsx`), hooks live in `hooks/` and use `use` prefixes, and utility functions prefer camelCase. Keep Tailwind classes ordered logically (layout → spacing → color) to aid diffs.

## Server/Client Component Defaults (Codex CLI notes)
- Default to Server Components for marketing content; isolate interactivity into small client islands under `components/`.
- Avoid `ssr: false` for content-bearing components—only use it for client-only utilities (e.g., toasts).
- When converting a page to server-rendered, replace inline CTA tracking with `components/tracked-link.tsx` or `components/tracked-anchor.tsx` so analytics still fire without making the whole page a client component.
- Formspree submissions should use `useFormValidation` plus client-side `fetch` and redirect to `/thank-you` routes; document new/changed flows in `docs/forms.md`, `docs/pages-overview.md`, or `docs/development-guide.md`.

## Testing Guidelines
Jest with `@testing-library/react` powers the test suite; place files as `ComponentName.test.tsx` inside `__tests__/` or adjacent to the component when co-locating improves clarity. Mock external services via the helpers in `__mocks__/`. Write interaction-focused tests that assert user-visible outcomes, and ensure new code paths are covered before merging.

## Commit & Pull Request Guidelines
Follow the existing history: concise, imperative, sentence-case subject lines without trailing punctuation (e.g., `Tweak models apply form spacing`). Group related changes per commit and avoid bundling refactors with feature work. Pull requests should include a clear summary, screenshots or recordings for UI shifts, linked issue IDs, and explicit rollout considerations (migrations, feature flags, Supabase config).

## Configuration & Security Notes
Environment variables load from `.env.local`; copy `.env.example` as the starting point and never commit secrets. MPC integrations (GitHub, Supabase, Sentry, Figma) require valid tokens before running scripts in `scripts/`. Review `sentry.*.config.ts` and `supabase/` whenever adjusting deployment targets to keep observability and data access intact.
