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
- **Architecture snapshot** – Marketing forms rely on Formspree endpoints plus the shared `useFormValidation` hook or equivalent step validation (HTML5 validation + client-side `fetch` + redirect to a thank-you route). The live sales form is the stepped `WaitlistForm`. We currently do **not** use React Hook Form, Zod, or server actions on these flows. Update this note if the stack changes.
- **Assistant surface** – The floating widget from `components/global-elevenlabs-widget.tsx` is limited to non-mobile `/pricing` (`PUBLIC_ELEVENLABS_WIDGET_ALLOWED_PATHS` in `lib/elevenlabs-widget.ts`). The homepage separately renders one consent-gated inline Prism Guide after `HomeFitSection` when `NEXT_PUBLIC_ELEVENLABS_HOMEPAGE_ENABLED=true`; the flag is default-off in code and enabled in production. It must not load the vendor runtime before acceptance and must stay off mobile and unsupported-WebGL browsers (they get a "Join the waitlist" fallback). `/waitlist` and all other routes stay widget-free. Native ElevenLabs Terms/retention changes require authenticated dashboard/API verification; do not remove the first-party homepage gate.
- **Business model: waitlist-only (since 2026-09-14)** – This is the one current funnel. Prism is fully booked; every public sales CTA and every lead form goes to `/waitlist`.
  - `lib/waitlist.ts` owns `WAITLIST_CTA` ("Join the waitlist" → `/waitlist`), `WAITLIST_FOCUS_HREFS` (`/waitlist?focus=website|content|ads` for service pages, homepage offer cards, and the `/ig` `/tiktok` `/youtube` hubs), `CAPACITY_MESSAGE` (rendered by `components/waitlist/CapacityNotice.tsx`; the monthly intake month is computed, never hard-coded), and `WAITLIST_FORM_ENDPOINT` (`NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT`, falling back to the Contact Formspree form `xjkjbpdb` until a dedicated "Prism Waitlist" form is wired).
  - `components/forms/WaitlistForm.tsx` (five steps → `/waitlist/thank-you`, noindex, `LeadSuccessTracker`) is the only live sales form.
  - `/contact`, `/contact-us`, `/hours`, `/hello`, `/get-started`, `/apply`, `/free-analysis`, `/book-a-shoot`, `/aeo`, `/ai`, and the three intake routes 308-redirect to `/waitlist` (`next.config.mjs`); their page and form code is deleted. Do not revive them.
  - `BOOK_A_CALL_CTA` and `WEBSITE_START_CTA` no longer exist (`lib/pricing-consistency.ts` forbids them). `BOOKING_URL` (`lib/booking.ts`) survives only for the invite-gated `/chatgpt-ads` unlock, legacy `/thanks`, and the legacy post-payment `/checkout/{launch,grow,scale}/thank-you` pages.
  - `/refer`, `/scholarship`, `/models`, and design votes are not sales forms and keep working.
- **Public IA** – Header: Home, a Services dropdown (`lib/services.ts`: Website `/websites`, Content `/content`, Ads `/ads`), a Products dropdown (`lib/products.ts`: Midas → `https://midas-ai.dev`, zRead → `https://zread.dev`; added 2026-10-04 in #197), then Case studies and Wall of love. No header CTA. Mobile sheet = 8 links. The footer leads with `WAITLIST_CTA`; Dental OS, Prism Infinity, Pricing, and `/refer` live in its Company column. The homepage has a `#products` section (`HomeProductsSection`). Canonical Content URL is `/content` (`/content-os` 301s). `lib/services.ts` must not import `lib/constants` (constants imports services).
- **Pricing policy** – `lib/pricing-model.ts` is the single source of truth for the four packaged offers on `/pricing`: **Website** (PRO website, `/websites`), **Content OS** (`/content`), **Dental OS** (`/dental-os`), and **Prism Infinity** (`/prism-infinity`). **No offer shows a public price**; primary CTAs are waitlist CTAs (`PRICING_PRIMARY_CTA = WAITLIST_CTA`, `WEBSITE_/CONTENT_/ADS_WAITLIST_CTA`). Do **not** reintroduce public dollar amounts; `lib/pricing-consistency.ts` forbids the retired `$300`, `$100/month`, `$5,000`, `$1,000/month`, and `$2,000/month` tokens on pricing-sensitive surfaces, and all `Offer` structured data stays price-free. Always spell `/month` (never `/mo`). `pnpm verify:pricing-consistency` gates deploys; `pricing-schema-consistency.test.ts` blocks retired pricing schema. `/founder-os` 301s to `/content`; other legacy fixed-plan routes redirect to `/pricing`. `/ads` ships a price-free offer schema pointing at `/ads`; `/seo`, `/local-listings`, `/dental-website`, and `/dental-practice-seo-expert` point at `/pricing`. The flat `$100` per closed referral on `/refer` (`components/forms/ReferralForm.tsx`) is a referral payout, not service pricing.
- **History (superseded, do not follow)** – 2026-07-27 all-call-first pricing (`BOOK_A_CALL_CTA`, 30-minute call, `/website-intake`, `/get-started` free Growth Dashboard on-ramp) replaced the self-serve `$300` website checkout; 2026-08-31 three-service IA; 2026-09-06 Content/Ads intake routes; 2026-09-14 waitlist-only replaced all of the above; 2026-10-04 Products; 2026-10-07 (#198) Next 16.3.8, `/api/og` deleted, security headers, `DESCRIPTION_MAX_LENGTH` 155. See README "History".
- **Search visibility policy** – Prism's indexable footprint is growth-first with dental as a strong specialty proof cluster. `lib/seo/search-visibility.ts` is the shared policy for route and blog indexability; sitemap, RSS/latest posts, `llms.txt`, SEO inventory, and tests should all follow that source instead of inventing local allowlists.
- **Deploy mode policy** – CI deploys production with source mode (`npx vercel deploy --prod --yes`) after the workflow runs the `UI Lock Screenshots` job (locked routes `/`, `/about`, `/pricing`, `/waitlist`, then the mobile navbar spec) and then typecheck, lint, test, production env pull, and pricing verification. The UI Lock job is blocking (with CI-only retries for the intermittent mobile timeout). Navbar, footer, or homepage-offer changes require `pnpm test:visual:locked:update` plus `pnpm test:mobile-navbar` before merging to `main`, or UI Lock aborts production. The locked spec pairs screenshots with rendered-copy guards (required waitlist phrases; forbidden retired pricing tokens and retired CTAs such as "Book a Free Demo" and "Start my website") because the dark theme lets whole-page copy changes pass under the 5% screenshot tolerance — keep both halves when editing `__tests__/visual/locked-routes.spec.ts`. `vercel.json` disables Vercel Git auto-deploy on `main` so GitHub Actions remains the only production publisher. Do not rely on `vercel deploy --prebuilt` as the default production path for this repo.
- **Repository security** – Secret scanning, push protection, and Dependabot alerts + security updates are on. The "Protect main history" ruleset blocks force-pushes to and deletion of `main` (direct pushes still allowed); never force-push `main`. Baseline security headers live in `next.config.mjs` `headers()`; keep `microphone` out of the `Permissions-Policy` deny list (ElevenLabs needs it).
- **Legacy assistant policy** – The old custom sales-chat client/server stack has been retired from the supported codepath. If Prism ever needs a bespoke assistant again, treat it as a fresh implementation rather than reviving deleted routes/helpers from old docs.
- **Documentation policy** – When you add or change behavior, update the relevant existing file under `/docs` (or this AGENTS/README pair for global policies). Do _not_ introduce new top-level docs without approval; prefer editing the canonical guides.
- **Environment variables** – Only the variables listed in `.env.example` / `docs/environment-setup.md` are required (GA overrides, Formspree-compatible endpoints, ElevenLabs public config, optional site URLs). Remove references to unused vars elsewhere.

## Project Structure & Module Organization

`app/` hosts the Next.js App Router entrypoints and route-level layouts. UI primitives and composites live in `components/`, while reusable business logic sits in `lib/` and lightweight helpers in `utils/`. Content sources such as MDX and CMS exports stay under `content/`, assets under `public/`, and styling tokens in `styles/`. Automated tests belong in `__tests__/`, and operational tooling (MCP, diagnostics, git helpers) is collected in `scripts/` and `supabase/`.

## Build, Test, and Development Commands

Install dependencies with `pnpm install`. Run `pnpm dev` to start the local Next.js server, `pnpm build` for a production bundle, and `pnpm start` to smoke-test the build. Quality gates include `pnpm lint`, `pnpm typecheck`, and `pnpm test`; combine them before pushing with `pnpm lint && pnpm typecheck && pnpm test`. For pricing-sensitive changes, run `pnpm verify:pricing-consistency`. For locked UI routes (`/`, `/about`, `/pricing`, `/waitlist`), run `pnpm test:visual:locked`. For header chrome or mobile sheet changes, also run `pnpm test:mobile-navbar`. For hero-loop motion changes on `/`, `/case-studies`, or `/wall-of-love`, run `pnpm test:visual:animations`. For public assistant-surface changes, run `pnpm exec jest __tests__/components/GlobalElevenLabsWidget.test.tsx __tests__/components/ElevenLabsWidget.test.tsx __tests__/lib/elevenlabs.test.ts --runInBand` and `pnpm exec playwright test __tests__/visual/global-elevenlabs-widget.spec.ts --project=desktop-chromium`.

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
- Formspree submissions should use `useFormValidation` (or equivalent step validation) plus client-side `fetch` and redirect to a thank-you route; document new/changed flows in `docs/forms.md`, `docs/pages-overview.md`, or `docs/development-guide.md`.
- For ElevenLabs surfaces, prefer the stock widget with documented attributes and host-level styling only. The embed runtime is deliberately pinned to `@elevenlabs/convai-widget-embed@0.14.10`; upgrade it only after both public surfaces pass focused and browser verification. The global launcher mounts only on non-mobile `/pricing`; it defaults to collapsed when no explicit user preference exists and should keep a top-level z-index. The homepage inline surface is independently feature-flagged and must keep its disclosure/affirmative-consent gate, lazy runtime loading, mobile/WebGL fallback, and single-widget invariant. If we need heavier visual customization later, move to ElevenLabs' official UI/SDK layer instead of styling undocumented internal widget structure.

## Testing Guidelines

Jest with `@testing-library/react` powers the test suite; place files as `ComponentName.test.tsx` inside `__tests__/` or adjacent to the component when co-locating improves clarity. Mock external services via the helpers in `__mocks__/`. Write interaction-focused tests that assert user-visible outcomes, and ensure new code paths are covered before merging.

## Commit & Pull Request Guidelines

Follow the existing history: concise, imperative, sentence-case subject lines without trailing punctuation (e.g., `Tweak models apply form spacing`). Group related changes per commit and avoid bundling refactors with feature work. Pull requests should include a clear summary, screenshots or recordings for UI shifts, linked issue IDs, and explicit rollout considerations (migrations, feature flags, deploy/config notes).

## Configuration & Security Notes

Environment variables load from `.env.local`; copy `.env.example` as the starting point and never commit secrets. MCP integrations (GitHub, Sentry, Figma) require valid tokens before running scripts in `scripts/`. Review `sentry.*.config.ts` whenever adjusting deployment targets to keep observability intact.
