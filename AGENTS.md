# Repository Guidelines

Use this guide to stay aligned with the Prism website codebase. Keep updates incremental, document notable decisions, and rely on the scripts provided in `package.json`.

> **Canonical guidance**  
> AGENTS.md and README.md are the master authority for technical rules (tooling, architecture, docs, and env vars). Any conflicting rule elsewhere—including CLAUDE.md, git-sync docs, or older playbooks—is deprecated until it matches these files.

## Canonical guardrails

- **Runtime** – Node.js 22.x (Vercel requires 22; keep local dev pinned here to avoid deploy failures).
- **Package manager** – pnpm 10.x (sync via `corepack enable`). All commands should use `pnpm`; if you see `npm run …` in legacy docs, treat it as outdated.
- **Architecture snapshot** – Marketing forms rely on Formspree endpoints plus the shared `useFormValidation` hook (HTML5 validation + client-side `fetch` + redirect to `/thank-you` routes). We currently do **not** use React Hook Form, Zod, or server actions on these flows. Update this note if the stack changes.
- **Get-started assistant surface** – `/get-started` no longer mounts the custom `SalesChat` UI. The live page relies on the stock ElevenLabs floating widget from `components/global-elevenlabs-widget.tsx`, so do not reintroduce route-level launcher suppression or sales-chat runtime gating there unless the product direction explicitly changes.
- **Canonical pricing policy** – Core pricing is fixed and must stay consistent across all indexable surfaces: `Website Overhaul = $1,000 one-time`, `Growth Partnership = $2,000/month`, `Free Expert Audit = $0`. `/pricing` is the only canonical pricing URL, and legacy conflicting routes should redirect there.
- **Deploy mode policy** – CI deploys production with source mode (`npx vercel deploy --prod --yes`) after the locked visual gate plus the build/type checks in `.github/workflows/deploy.yml`; `vercel.json` disables Vercel Git auto-deploy on `main` so GitHub Actions remains the only production publisher. Do not rely on `vercel deploy --prebuilt` as the default production path for this repo.
- **Legacy assistant policy** – The old custom sales-chat client/server stack has been retired from the supported codepath. If Prism ever needs a bespoke assistant again, treat it as a fresh implementation rather than reviving deleted routes/helpers from old docs.
- **Documentation policy** – When you add or change behavior, update the relevant existing file under `/docs` (or this AGENTS/README pair for global policies). Do _not_ introduce new top-level docs without approval; prefer editing the canonical guides.
- **Environment variables** – Only the variables listed in `.env.example` / `docs/environment-setup.md` are required (GA overrides, Formspree-compatible endpoints, ElevenLabs public config, optional site URLs). Remove references to unused vars elsewhere.

## Project Structure & Module Organization

`app/` hosts the Next.js App Router entrypoints and route-level layouts. UI primitives and composites live in `components/`, while reusable business logic sits in `lib/` and lightweight helpers in `utils/`. Content sources such as MDX and CMS exports stay under `content/`, assets under `public/`, and styling tokens in `styles/`. Automated tests belong in `__tests__/`, and operational tooling (MCP, diagnostics, git helpers) is collected in `scripts/` and `supabase/`.

## Build, Test, and Development Commands

Install dependencies with `pnpm install`. Run `pnpm dev` to start the local Next.js server, `pnpm build` for a production bundle, and `pnpm start` to smoke-test the build. Quality gates include `pnpm lint`, `pnpm typecheck`, and `pnpm test`; combine them before pushing with `pnpm lint && pnpm typecheck && pnpm test`. For pricing-sensitive changes, run `pnpm verify:pricing-consistency`. For locked UI routes (`/`, `/about`, `/pricing`), run `pnpm test:visual:locked`. For `/get-started` assistant-surface changes, run `pnpm exec jest __tests__/app/get-started.test.tsx __tests__/components/GlobalElevenLabsWidget.test.tsx` and `pnpm exec playwright test __tests__/visual/global-elevenlabs-widget.spec.ts --project=desktop-chromium`.

## Coding Style & Naming Conventions

The project relies on ESLint, Prettier, and Tailwind CSS. Preserve the default Prettier formatting (two-space indentation, double quotes in JSON, semicolons in TypeScript) and never hand-format compiled assets. React components use PascalCase filenames (e.g., `components/PricingCard.tsx`), hooks live in `hooks/` and use `use` prefixes, and utility functions prefer camelCase. Keep Tailwind classes ordered logically (layout → spacing → color) to aid diffs.

## Server/Client Component Defaults (Codex CLI notes)

- Default to Server Components for marketing content; isolate interactivity into small client islands under `components/`.
- Avoid `ssr: false` for content-bearing components—only use it for client-only utilities (e.g., toasts).
- When converting a page to server-rendered, replace inline CTA tracking with `components/tracked-link.tsx` or `components/tracked-anchor.tsx` so analytics still fire without making the whole page a client component.
- Formspree submissions should use `useFormValidation` plus client-side `fetch` and redirect to `/thank-you` routes; document new/changed flows in `docs/forms.md`, `docs/pages-overview.md`, or `docs/development-guide.md`.
- For the homepage ElevenLabs hero (`components/home/HomeHeroAgent.tsx`), prefer wrapper sizing and supported widget attributes over Shadow DOM geometry overrides. The inline widget needs about `35rem` of vertical room on mobile to avoid clipping the orb or crowding the textarea. Keep the live embed aligned with the official stock widget docs: secure markdown links via `markdown-link-allow-http="false"`, rely on `markdown-link-include-www="true"` instead of duplicating `www` hosts, and use `dismissible="false"` for the homepage hero rather than patching widget internals. Keep the homepage host scoped to the hero container so it scrolls away with the section, and keep the floating widget host on inner pages at a top-level z-index so site chrome never renders above it. If we need heavier visual customization later, move to ElevenLabs' official UI/SDK layer instead of styling undocumented internal widget structure.

## Testing Guidelines

Jest with `@testing-library/react` powers the test suite; place files as `ComponentName.test.tsx` inside `__tests__/` or adjacent to the component when co-locating improves clarity. Mock external services via the helpers in `__mocks__/`. Write interaction-focused tests that assert user-visible outcomes, and ensure new code paths are covered before merging.

## Commit & Pull Request Guidelines

Follow the existing history: concise, imperative, sentence-case subject lines without trailing punctuation (e.g., `Tweak models apply form spacing`). Group related changes per commit and avoid bundling refactors with feature work. Pull requests should include a clear summary, screenshots or recordings for UI shifts, linked issue IDs, and explicit rollout considerations (migrations, feature flags, deploy/config notes).

## Configuration & Security Notes

Environment variables load from `.env.local`; copy `.env.example` as the starting point and never commit secrets. MPC integrations (GitHub, Sentry, Figma) require valid tokens before running scripts in `scripts/`. Review `sentry.*.config.ts` whenever adjusting deployment targets to keep observability intact.
