# Repository Guidelines

Use this guide to stay aligned with the Prism website codebase. Keep updates incremental, document notable decisions, and rely on the scripts provided in `package.json`.

> **Canonical guidance**  
> AGENTS.md and README.md are the master authority for technical rules (tooling, architecture, docs, and env vars). Any conflicting rule elsewhere—including CLAUDE.md, git-sync docs, or older playbooks—is deprecated until it matches these files.

## Design contract

- For any task that changes UI, styling, layout, motion, marketing sections, or design tokens, read `/DESIGN.md` before editing.
- Treat `/DESIGN.md` as the visual source of truth for the shipped Prism system. Keep visual rationale there, not in this file.
- Use `.agents/skills/ui-design-system/SKILL.md` for repeatable frontend and design-system work.
- Prefer exported tokens in `/generated/tailwind.theme.json` and `/generated/tokens.json` over ad hoc values when wiring UI into code.
- Do not introduce new raw hex colors, spacing values, radii, or typography levels unless the task genuinely requires it and `/DESIGN.md` is updated in the same change.
- When `/DESIGN.md` changes, run `pnpm design:check`.
- If the repo later gains `.stitch/`, keep `.stitch/DESIGN.md` as concept memory and keep the root `/DESIGN.md` as the code-facing implementation contract.

## Canonical guardrails

- **Runtime** – Node.js 22.x (Vercel requires 22; keep local dev pinned here to avoid deploy failures).
- **Package manager** – pnpm 10.x (sync via `corepack enable`). All commands should use `pnpm`; if you see `npm run …` in legacy docs, treat it as outdated.
- **Architecture snapshot** – Marketing forms rely on Formspree endpoints plus the shared `useFormValidation` hook (HTML5 validation + client-side `fetch` + redirect to `/thank-you` routes). We currently do **not** use React Hook Form, Zod, or server actions on these flows. Update this note if the stack changes.
- **Assistant surface** – `/get-started` no longer mounts the custom `SalesChat` UI or the stock ElevenLabs launcher. The public floating widget from `components/global-elevenlabs-widget.tsx` is intentionally limited to non-mobile `/pricing` and `/contact`. The homepage may separately render one consent-gated inline Prism guide after `HomeFitSection` when `NEXT_PUBLIC_ELEVENLABS_HOMEPAGE_ENABLED=true`; it must not load the vendor runtime before acceptance and must stay off mobile and unsupported-WebGL browsers. All focused flows remain widget-free.
- **Canonical pricing policy** – `lib/pricing-model.ts` is the single source of truth and models Prism's four productized offers: **Website** (`$300` flat, one-time, with an optional `$100/month` care plan) at `/websites`; **Content OS** (`$5,000` to implement over 3 months, then `$1,000/month`) at `/content-os`; **Dental OS** (custom-priced, "book a call") at `/dental-os`; and **Prism Infinity** (`$2,000/month`, unlimited services) at `/prism-infinity`. `/pricing` compares all four. The old five-tier ladder (free Growth Dashboard, Light Audit, `$500` Deep Growth Audit, `$3,500` Growth Sprint, `$1,500/month` Growth Partner) is retired — **except** `/get-started`, which is intentionally kept as a free on-ramp (free Growth Dashboard + request a free deep audit from the team) and is surfaced in nav, footer, and a homepage callout under the offers section. Always spell `/month` (never `/mo`). `pnpm verify:pricing-consistency` (`lib/pricing-consistency.ts`) still gates deploys. Payments use Stripe **Payment Links** wired through `lib/payment-links.ts` (the `$300` Website link is live and wired; care/Content OS/Infinity links still need creating). The retired `/founder-os` route now 301-redirects to `/content-os`; other legacy fixed-plan routes still redirect to `/pricing`. `/ads`, `/seo`, and `/local-listings` no longer carry the retired `$3,500` Growth Sprint schema — they ship price-free offer schemas pointing at `/pricing`, and `pricing-schema-consistency.test.ts` blocks the retired ladder from reappearing. Referrals pay a flat `$100` per referred business that becomes a client (see `/refer` + `components/forms/ReferralForm.tsx`); that figure is a referral payout, not service pricing.
- **Search visibility policy** – Prism's indexable footprint is growth-first with dental as a strong specialty proof cluster. `lib/seo/search-visibility.ts` is the shared policy for route and blog indexability; sitemap, RSS/latest posts, `llms.txt`, SEO inventory, and tests should all follow that source instead of inventing local allowlists.
- **Deploy mode policy** – CI deploys production with source mode (`npx vercel deploy --prod --yes`) after the workflow runs locked-route visual checks, typecheck, production env pull, and pricing verification. The locked visual job is currently non-blocking while baselines stabilize; typecheck, pricing verification, and deploy still block. `vercel.json` disables Vercel Git auto-deploy on `main` so GitHub Actions remains the only production publisher. Do not rely on `vercel deploy --prebuilt` as the default production path for this repo.
- **Legacy assistant policy** – The old custom sales-chat client/server stack has been retired from the supported codepath. If Prism ever needs a bespoke assistant again, treat it as a fresh implementation rather than reviving deleted routes/helpers from old docs.
- **Documentation policy** – When you add or change behavior, update the relevant existing file under `/docs` (or this AGENTS/README pair for global policies). Do _not_ introduce new top-level docs without approval; prefer editing the canonical guides.
- **Environment variables** – Only the variables listed in `.env.example` / `docs/environment-setup.md` are required (GA overrides, Formspree-compatible endpoints, ElevenLabs public config, optional site URLs). Remove references to unused vars elsewhere.

## Project Structure & Module Organization

`app/` hosts the Next.js App Router entrypoints and route-level layouts. UI primitives and composites live in `components/`, while reusable business logic sits in `lib/` and lightweight helpers in `utils/`. Content sources such as MDX and CMS exports stay under `content/`, assets under `public/`, and styling tokens in `styles/`. Automated tests belong in `__tests__/`, and operational tooling (MCP, diagnostics, git helpers) is collected in `scripts/` and `supabase/`.

## Build, Test, and Development Commands

Install dependencies with `pnpm install`. Run `pnpm dev` to start the local Next.js server, `pnpm build` for a production bundle, and `pnpm start` to smoke-test the build. Quality gates include `pnpm lint`, `pnpm typecheck`, and `pnpm test`; combine them before pushing with `pnpm lint && pnpm typecheck && pnpm test`. For pricing-sensitive changes, run `pnpm verify:pricing-consistency`. For locked UI routes (`/`, `/about`, `/pricing`, `/get-started`), run `pnpm test:visual:locked`. For hero-loop motion changes on `/`, `/case-studies`, or `/wall-of-love`, run `pnpm test:visual:animations`. For public assistant-surface changes, run `pnpm exec jest __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx __tests__/lib/elevenlabs.test.ts --runInBand` and `pnpm exec playwright test __tests__/visual/global-elevenlabs-widget.spec.ts --project=desktop-chromium`.

Design-system commands:

- `pnpm design:lint` validates the root `DESIGN.md` contract.
- `pnpm design:sync` refreshes the generated token exports in `/generated`.
- `pnpm design:check` runs both and should be the default verification step when the design contract changes.

## Coding Style & Naming Conventions

The project relies on ESLint, Prettier, and Tailwind CSS. Preserve the default Prettier formatting (two-space indentation, double quotes in JSON, semicolons in TypeScript) and never hand-format compiled assets. React components use PascalCase filenames (e.g., `components/PricingCard.tsx`), hooks live in `hooks/` and use `use` prefixes, and utility functions prefer camelCase. Keep Tailwind classes ordered logically (layout → spacing → color) to aid diffs.

## Server/Client Component Defaults (Codex CLI notes)

- Default to Server Components for marketing content; isolate interactivity into small client islands under `components/`.
- Avoid `ssr: false` for content-bearing components—only use it for client-only utilities (e.g., toasts).
- When converting a page to server-rendered, replace inline CTA tracking with `components/tracked-link.tsx` or `components/tracked-anchor.tsx` so analytics still fire without making the whole page a client component.
- Formspree submissions should use `useFormValidation` plus client-side `fetch` and redirect to `/thank-you` routes; document new/changed flows in `docs/forms.md`, `docs/pages-overview.md`, or `docs/development-guide.md`.
- For ElevenLabs surfaces, prefer the stock widget with documented attributes and host-level styling only. The global launcher mounts only on non-mobile `/pricing` and `/contact`; it defaults to collapsed when no explicit user preference exists and should keep a top-level z-index. The homepage inline surface is independently feature-flagged and must keep its disclosure/affirmative-consent gate, lazy runtime loading, mobile/WebGL fallback, and single-widget invariant. If we need heavier visual customization later, move to ElevenLabs' official UI/SDK layer instead of styling undocumented internal widget structure.

## Testing Guidelines

Jest with `@testing-library/react` powers the test suite; place files as `ComponentName.test.tsx` inside `__tests__/` or adjacent to the component when co-locating improves clarity. Mock external services via the helpers in `__mocks__/`. Write interaction-focused tests that assert user-visible outcomes, and ensure new code paths are covered before merging.

## Commit & Pull Request Guidelines

Follow the existing history: concise, imperative, sentence-case subject lines without trailing punctuation (e.g., `Tweak models apply form spacing`). Group related changes per commit and avoid bundling refactors with feature work. Pull requests should include a clear summary, screenshots or recordings for UI shifts, linked issue IDs, and explicit rollout considerations (migrations, feature flags, deploy/config notes).

## Configuration & Security Notes

Environment variables load from `.env.local`; copy `.env.example` as the starting point and never commit secrets. MCP integrations (GitHub, Sentry, Figma) require valid tokens before running scripts in `scripts/`. Review `sentry.*.config.ts` whenever adjusting deployment targets to keep observability intact.
