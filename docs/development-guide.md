# Prism Development Guide

This guide highlights the workflows we lean on most often while iterating on the marketing site. Use it as the quick reference when shipping copy tweaks, adding new landing sections, or wiring forms.

## Local Development

- Install deps with `pnpm install` (repo assumes pnpm).
- Start the Next.js dev server with `pnpm dev`.
- Run `pnpm lint` before committing so the shared Tailwind + ESLint rules stay consistent.
- For Sales chat changes, run:
  - `pnpm test:sales-chat:core`
  - `pnpm test:sales-chat:e2e`
  - `pnpm test:sales-chat:stress` (defaults to 20 consecutive core runs; override with `SALES_CHAT_STRESS_RUNS=<n>`)
  - `pnpm smoke:sales-chat:local` (while `pnpm dev` is running) to verify localhost chat mount + deterministic free-audit terminal dispatch.
- For pricing-sensitive changes, run:
  - `pnpm verify:pricing-consistency`
- For non-chat changes touching shared infrastructure, update and run the nearest smoke tests in the relevant package (`pnpm test`, `pnpm test:visual:locked`, etc.) before merging.
- Run `pnpm test:visual:locked` before merging changes that touch the UI of `/`, `/about`, or `/pricing` (screenshot-locked routes).
- Run `pnpm test:visual` when you need broader visual coverage beyond the locked routes.
- Run `pnpm exec playwright test __tests__/visual/blog-copy-markdown.spec.ts --project=desktop-chromium` when changing the blog markdown copy button or `/api/blog/[slug]/markdown`.
- Run `pnpm exec playwright test __tests__/visual/page-copy-markdown-global.spec.ts --project=desktop-chromium` when changing the global page markdown copy button.
- For blog-post content/frontmatter additions, run `pnpm exec jest __tests__/sitemap.test.ts __tests__/blog-canonical.test.ts --runInBand` as a fast regression check.

### Sales chat development checklist

- Canonical pricing copy contract:
  - Website Overhaul must be phrased as `$1,000 one-time`.
  - Growth Partnership must be phrased as `$2,000/month`.
  - Free audit must be phrased as `$0` / free audit.
  - Avoid “starting around”, “from”, or legacy tier pricing language in deterministic copy.
- Canonical copy tone contract (spec-v1 copy module):
  - Keep sales-chat responses conversational and human, not scripty/corporate.
  - Keep quick-reply chip labels in sentence case (no all-caps transforms).
  - Prefer short direct sentences with a clear next step in every response.
  - Avoid em-dash-heavy phrasing in scripted copy constants so tone stays clean and consistent.

- API contract (server):
  - `POST /api/chat`
  - Accepts deterministic v2 payloads:
    - required: `sessionId`, `sourcePage`, `inputType`, `inputValue`
    - optional: `buttonId`, `conversationState`
  - Validates request payloads with `zod`.
  - Runs deterministic state transitions through `runSalesChatSpecV1Engine` (`lib/sales-chat/spec-v1-engine.ts`).
  - Builds typed conversion payloads through `buildLeadPayload` (`lib/sales-chat/lead-payloads.ts`) and dispatches with `dispatchSalesChatLead` (`lib/sales-chat/lead-dispatch.ts`) when terminal actions fire.
  - Includes lead dispatch observability fields in success payloads:
    - `leadDispatchStatus` (`none` | `attempted` | `succeeded` | `failed`)
    - `leadDispatchCode` (sanitized reason code; e.g. `webhook_http_error`, `duplicate_suppressed`)
  - Returns JSON only (no streaming path in the deterministic route).
  - Returns tracing headers:
    - `x-sales-chat-route` (`success`, `disabled`, `config_missing`, `invalid_request`)
    - `x-request-id` on success responses
  - Runtime gating:
    - `/get-started` mount gate: `uiAvailable = SALES_CHAT_ENABLED && ctaUrlsConfigured`
    - route hard-stop: returns `503 config_missing` when deterministic config or lead webhook config is incomplete
    - webhook secret rule:
      - Formspree endpoint (`https://formspree.io/f/...`): secret optional
      - custom webhook endpoint: `SALES_CHAT_LEADS_WEBHOOK_SECRET` required
  - Supporting endpoints:
    - `POST /api/sales-chat/events` for lifecycle/state telemetry
    - `POST /api/sales-chat/leads` for validated manual/system lead payload forwarding
  - UI behavior (client):
    - `components/SalesChat.tsx` now routes through `components/sales-chat/*` and should still support:
    - launcher-first SSR-safe render,
    - desktop popup mode (`>1024px`) and fullscreen mode (`<=1024px`),
    - once-per-session desktop auto-open (`sales-chat-v2-opened`),
    - default dark-minimal styling via `visualStyle="dark-minimal"`,
    - simplified header with assistant title + online status and minimize/close action only,
    - empty-state prompt chips that collapse after the first user message,
    - deterministic spec-v1 state machine (intent groups A–G) with server-driven quick replies,
    - in-chat booking panel support via `BookDemoEmbed` (when enabled) plus `#book-call` fallback,
    - canonical opening message + five starter buttons from server copy constants,
    - streamlined composer with send-only control (no attachment icon),
    - monochrome UI treatment with green reserved for online status accent,
    - SVG micro-interactions (Tailwind keyframes, reduced-motion safe):
      - launcher live ring pulse (`animate-slow-ping`),
      - header high-tech assistant glyph with glow + dual orbital rings (`orbit`, `orbit-reverse` keyframes),
      - header status breathe pulse (`animate-breathe`),
      - typing indicator waveform bars (`animate-waveform-1/2/3`),
      - assistant message reveal + shimmer (`animate-message-reveal`, `animate-shimmer-sweep`) for newly appended assistant messages only,
      - quick-reply directional arrow nudge on actionable chips,
      - CTA strip / inline booking connector line sweep (`animate-draw-line`),
    - keep all chat motion wrapped in `motion-safe:*` utilities and avoid introducing animation libraries for these effects.
    - mobile timing safeguard:
      - global mobile animation compression lives in `app/globals.css` (`@media (max-width: 768px)`).
      - `SalesChatShell` toggles `body.sales-chat-open` while chat is open so chat-specific SVG timings (for example `orbit_9s`, `orbit-reverse_6s`) are not forced down to `0.3s`.
      - if this class toggle is removed, header icon orbit animation will appear unnaturally fast on mobile.
    - message length counters and disabled send when oversize,
    - keyboard send via `Enter` (`Shift+Enter` for newline),
    - deterministic JSON response handling (no primary streaming dependency),
    - markdown-to-anchor rewrite for booking links (e.g., `[#](#)` -> `#book-call`),
    - clear fallback messaging and booking CTA.
  - Keep analytics calls attached to user lifecycle:
    - `trackSalesChatOpen({ sourcePage })`
    - `trackSalesChatLauncherClick({ sourcePage, mode })`
    - `trackSalesChatOpenMode({ sourcePage, mode })`
    - `trackSalesChatWelcomeSeen({ sourcePage })`
    - `trackSalesChatMessageSent({ sourcePage, messageLength, sessionId })`
    - `trackSalesChatQuickReplyClicked({ sourcePage, sessionId, replyId, replyLabel, actionType, nodeId })`
    - `trackSalesChatSpecNodeEntered({ sourcePage, sessionId, nodeId, exchangeCount })`
    - `trackSalesChatOfferRecommended({ sourcePage, sessionId, nodeId, recommendedOffer })`
    - `trackSalesChatLeadPayloadAttempted({ sourcePage, sessionId, terminalAction, leadDispatchStatus, leadDispatchCode })`
    - `trackSalesChatLeadPayloadEmitted({ sourcePage, sessionId, terminalAction })`
    - `trackSalesChatLeadPayloadFailed({ sourcePage, sessionId, terminalAction, leadDispatchCode })`
    - `trackSalesChatError({ sourcePage, errorType, sessionId, details })`
    - `trackSalesChatDemoCtaShown`, `trackSalesChatDemoCtaClicked`, `trackSalesChatCalendarOpened`, `trackSalesChatDemoBooked`
    - mirror the same lifecycle to `POST /api/sales-chat/events` for webhook/Supabase fan-out and route tracing.
    - reserve `sales_chat_dead_end_prevented` for server-side policy protection telemetry.
  - GA4 deep funnel setup (required for useful reporting):
    - define custom dimensions for `node_id`, `recommended_offer`, `terminal_action`, `lead_dispatch_status`, `lead_dispatch_code`, `reply_id`, `reply_label`, and `action_type`.
    - verify in GA4 DebugView that these parameters are attached to sales-chat events before relying on reports.
- Observability checks before merge:
  - Verify logs never include secrets (lead webhook secret, gateway keys, raw session identifiers where not required).
  - Verify deterministic responses include `x-sales-chat-route=success` in production-like traces.
  - Verify chat never returns or renders the banned copy `Sales chat is not fully configured yet...`.
  - Verify failed lead dispatch never emits success telemetry (`sales_chat_lead_payload_emitted`).
  - Verify GA4 DebugView receives deep deterministic events in one test conversation:
    - `sales_chat_quick_reply_clicked`
    - `sales_chat_spec_node_entered`
    - `sales_chat_offer_recommended`
    - `sales_chat_lead_payload_attempted`
    - `sales_chat_lead_payload_emitted` or `sales_chat_lead_payload_failed`
  - Recommended fast checks after implementation:
  - `pnpm test:sales-chat:core`
  - `pnpm test:sales-chat:e2e`
  - Include API-gate assertions from `__tests__/api/chat.test.ts`:
    - custom webhook + missing secret => `503 config_missing`
    - Formspree webhook + missing secret => `200 success`
  - Optional legacy AI-module guard checks (only if touching prompt/policy helpers):
  - `pnpm exec jest __tests__/sales-chat/policy.test.ts __tests__/sales-chat/prompt.test.ts`
  - Verify responsive mode split manually:
    - `>1024px` opens centered popup modal.
    - `<=1024px` opens fullscreen chat.
  - `pnpm exec jest __tests__/api/chat.test.ts -t "returns 503 when chat is disabled"` to verify feature-flag behavior.
  - Manual smoke in browser: open `/get-started`, progress through starter buttons and A/B/C/D routes, then force a mock/handler error and confirm booking CTA remains present.
  - Optional direct route check:
    - `curl -i -X POST http://localhost:3000/api/chat -H "content-type: application/json" -d '{"sessionId":"session-12345678","sourcePage":"/get-started","inputType":"button","inputValue":"","buttonId":"__init__"}'`
- Debugging:
  - If deterministic responses are missing, inspect response headers (`x-sales-chat-route`) and `nodeId` in JSON payloads.
  - If lead fan-out behavior looks inconsistent, inspect `leadDispatchStatus` + `leadDispatchCode` in `/api/chat` response payloads.
  - If chat is missing on `/get-started`, verify `uiAvailable = SALES_CHAT_ENABLED && ctaUrlsConfigured` and required CTA keys are present.
  - If chat renders but returns immediate 503 fallback, verify lead webhook config:
    - Formspree backend: `SALES_CHAT_LEADS_WEBHOOK_URL` set to a valid Formspree endpoint.
    - Custom webhook backend: both `SALES_CHAT_LEADS_WEBHOOK_URL` and `SALES_CHAT_LEADS_WEBHOOK_SECRET` set.
  - If header SVG animation looks too fast on mobile, inspect:
    - `app/globals.css` mobile animation optimization block (`animation-duration: 0.3s !important`),
    - `components/sales-chat/SalesChatShell.tsx` body-class toggle (`sales-chat-open`) that exempts active chat sessions from global mobile animation compression.
  - If messages are never sent from an open chat, verify devtools `Network` shows `/api/chat` POST with `Content-Type: application/json`.
  - If message links render as plain markdown, confirm the content came through `createRenderMessageContent()` in `components/sales-chat/SalesChatShell.tsx` (message parser should convert `#` and `[#](#)` to a booking anchor).

## Styling Pipeline

- Tailwind v4 runs through the `@tailwindcss/postcss` plugin, with `@import "tailwindcss";` and `@config "../tailwind.config.cjs";` in `app/globals.css`.
- To safelist utilities, use `@source inline(...)` in `app/globals.css` (the `safelist` config option is no longer supported).

## Linting

- ESLint uses the flat config in `eslint.config.js` (Next 16 removed `next lint`).

## Formspree Integration

All marketing forms live under `components/forms/` (Contact, Free Analysis, Get Started) and share the `useFormValidation` hook. Legacy AI Website Launch form code remains in `components/ai-website-launch/AiWebsiteLaunchForm.tsx` for archival/reference; active pricing-intent traffic is now routed to `/pricing`.

Key details:

- Forms post to Formspree via `fetch` with `Accept: application/json`. On success we push the user to `/thank-you` or `/analysis-thank-you` so our custom screens always render.
- Use the `_subject` hidden field for inbox filtering and `_gotcha` as the honeypot.
- When adding a new Formspree endpoint, import `useFormValidation({ onValidSubmit })` and only navigate after the request returns `response.ok`.

### AEO assessment landing regression tests

- The AEO funnel adds a dedicated endpoint and dedicated thank-you route:
  - `/aeo` page form submit target: `"/aeo-thank-you"`
  - `AeoAssessmentForm` payload fields: `email`, `website`, `_subject`, `_redirect`, `form_name`, `_gotcha`
- Run this focused command before merging any AEO landing or form edits:
  - `pnpm exec jest __tests__/aeo-form.test.tsx __tests__/aeo-pages.test.tsx __tests__/aeo-discoverability.test.tsx __tests__/sitemap.test.ts`
- If conversion tracking changed (`trackCTAClick`/`trackFormSubmission` args), also verify with any available analytics smoke test you run locally.

## Thank-You Screens

Custom confirmation routes live in `app/thank-you/` and `app/analysis-thank-you/`. Each page is a simple card layout (hero card, CTA card, contact info). If you add new flows, point them to one of these routes for consistency.

## SEO Hygiene

- Route-level metadata should use `buildRouteMetadata` from `lib/seo/metadata.ts` so titles, descriptions, canonical URLs, Open Graph, Twitter, and robots directives stay consistent.
- Titles are normalized to a single `| Prism` suffix (no duplicate suffix chains); descriptions are normalized with shared rules in `lib/seo/rules.ts`.
- Use absolute canonicals (`https://www.design-prism.com/...`) for every indexable route.
- Noindex routes should remain crawlable (meta `robots`), but **must be excluded** from the sitemap via `app/sitemap.ts`.
- `/blog` filter/search views (`/blog?category=...`, `/blog?q=...`) are set to **noindex, follow** via `X-Robots-Tag` in `proxy.ts` so query-param URLs don’t pollute the index.
- If a blog post `image` frontmatter uses an absolute Prism URL (e.g. `https://www.design-prism.com/...`), we normalize it for Next/Image. Prefer relative paths like `/api/og/...` or `/blog/...` for consistency.
- Blog cards and post hero images now validate frontmatter `image` values at read time. If the file is missing, uses an invalid sentinel (`null`/`undefined`/empty), or points to a raster extension whose asset is actually SVG markup, posts now fall back to the shared default featured image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`) instead of rendering a broken image.
- Blog posts can define `seoTitle` and `seoDescription` in frontmatter for manual snippet control; if omitted, metadata falls back to `title`/`description` with shared normalization.
- Keep `/api/og/` **allowed** in `app/robots.ts` if we use OG endpoints in metadata or structured data.
- Prefer the shared JSON-LD helpers in `components/schema-markup.tsx` (`WebPageSchema`, `CollectionPageSchema`, `ItemListSchema`, `ServiceSchema`, `FAQSchema`, etc.).
- Every indexable page must render a visible `<h1>` that matches the primary search intent.
- Run `pnpm seo:inventory && pnpm seo:lint` before shipping large metadata changes.

### Analytics & Conversion Tracking

- Global Google Analytics + Google Ads tagging happens in `app/layout.tsx`. Both IDs come from `lib/constants.ts` (`GA_MEASUREMENT_ID` and `GOOGLE_ADS_ID`), so set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you need to override the fallback GA property.
- Any route-level conversion (e.g., `/thank-you`) should load its own `<Script>` that fires the relevant `gtag('event', 'conversion', { send_to: 'AW-…' })`. See `app/thank-you/page.tsx` for the exact snippet tied to `AW-11373090310/hBMrCMijk70bEIasjq8q`.
- When building a new landing page with a Formspree form, make sure the success handler navigates to `/thank-you` so the Ads conversion snippet runs and the GA pageview records properly.

## Mobile Hero Video Safety

- Decorative autoplaying background videos must not use raw `<video autoPlay ...>` markup directly on touch/coarse devices.
- Use the shared policy in `lib/hero-media-policy.ts` for a single source of truth:
  - `resolveHeroPlaybackPolicy(...)`
  - `HeroPlaybackMode` (`video-autoplay` / `video-fallback-poster` / `poster-only`)
  - optional route override (`playbackPolicy="forcePoster"`)
- Prefer `components/HeroBackgroundLoop.tsx` (for static hero posters + loop background) or `components/HeroLoopingVideo.tsx` (general looping hero card component). Both components now consume policy state and keep `<video>` unmounted unless autoplay is explicitly allowed.
- This prevents the iOS Safari fullscreen/autoplay takeover edge case we observed on routes like `/wall-of-love` and similar hero-heavy pages.
- Keep a poster-first UX for reduced-motion, touch, or media load failure states.
- If a page needs a forced fallback, pass `playbackPolicy="forcePoster"` and let the shared policy pick poster-only behavior.
- Add regression guardrails with:
  - `pnpm exec jest __tests__/hero-loop-gating.test.tsx`
  - `pnpm exec jest __tests__/hero-autoplay-safety.test.ts`
- If you introduce any new decorative autoplay video, update this section and run the above tests before merge.

## Mobile Hero ASCII Resilience

- ASCII animations use preview-first loading plus optional partial-frame batching in `components/ascii/AsciiAnimation.tsx`.
- New props for fault-tolerant loading:
  - `loadStrategy?: "batch" | "all"` (default: `"batch"`)
  - `batchSize?: number` (default: `24`)
  - `maxConcurrentFetches?: number` (default: `6`)
  - `continueOnFrameError?: boolean` (default: `true`)
- Keep the placeholder/preview frame visible while additional chunks stream in so mobile motion starts quickly even when the full set is large.
- Never fail the entire animation because of a single frame request; keep partial sequence playback when at least 2 frames are available.
- If zero frames load, render the deterministic fallback `"No frames loaded"`.

## Pricing Page Content

- Pricing UI is in `app/pricing/client-page.tsx` with the hero modal split into `components/pricing/PricingHero.tsx`.
- Keep canonical pricing copy exact on this page: `$1,000 one-time`, `$2,000/month`, and `$0` free audit.
- Structured data here should only emit canonical offers and point to `https://www.design-prism.com/pricing`.
- When introducing a new section, wrap it with `RevealOnScroll` helpers for consistent motion.

## Free Analysis & Contact Pages

- `/free-analysis` and `/contact` are intentionally minimal (hero, form card, CTA).
- Copy updates happen directly in `app/free-analysis/page.tsx` and `app/contact/page.tsx`.
- Both pages reuse the shared forms mentioned above, so field changes only need to happen once.

## CTA Routing

Any CTA labeled “free analysis” should point to `/free-analysis`. When you add a new CTA, double-check the href so we don’t regress to `/get-started` accidentally.

## Typography & Casing

- Do not enforce global lowercase transforms for site copy; preserve natural capitalization for readability.
- Use Tailwind text-transform utilities only when a specific component intentionally needs stylistic casing.

## UI Components (shadcn/ui)

The site uses shadcn/ui primitives under `components/ui/` (Tailwind + Radix + `cn()` helpers) with the `radix-vega` preset (neutral palette + subtle menu accent, Inter as `--font-sans`). Add new primitives via the CLI so we stay aligned with upstream.

- Add a component: `pnpm dlx shadcn@latest add <component>`
- Common additions: `alert`, `tooltip`, `dropdown-menu`, `popover`, `sheet`, `sonner`
- Toasts: a lazy `<Toaster />` is mounted from `app/layout.tsx` via `components/toaster-lazy.tsx`, so client components can call `toast.success(...)` via `import { toast } from "sonner"`.
- Form submit errors: prefer `<Alert variant="destructive">` for consistent styling, but keep native form controls intact.

Form note: our marketing forms rely on native HTML5 validation via `useFormValidation` (`form.checkValidity()` + real `<input>/<select>/<textarea>`). Avoid swapping native `<select>`/checkbox controls for Radix equivalents unless you also preserve native form semantics and validation.

## Sticky Navigation Offsets

The navbar dynamically sets a CSS variable (`--prism-header-height`) so other sticky UI can position itself below the full header stack (including case study breadcrumbs). Case study chapter menus also set `--prism-case-study-nav-height` via `useCaseStudyStickyNavHeight` (see `hooks/use-case-study-sticky-nav.ts`), and jump targets rely on `scroll-margin-top` for correct offsets when scrolling into view. The case study section nav now uses a scrollable pill row plus a mobile "jump to" sheet so all items stay reachable on small screens.

## Navbar Icon Hover Motion

- Navbar icons animate and tint on hover via the `.nav-link` + `.nav-icon` classes in `components/navbar.tsx` and the motion rules in `app/globals.css`.
- Primary nav labels (including `blog`) are defined in `lib/constants.ts` (`NAV_ITEMS`); when you add/remove an item, update `topIconMap` in `components/navbar.tsx` and add/remove the matching `.nav-icon-*` hover rule in `app/globals.css`.
- Keep hover effects transform-only (plus icon color) and subtle so text layout stays stable and reduced-motion preferences remain respected.

## Deployment

Merges to `main` deploy automatically via Vercel. If you need a preview, open a PR – the CI pipeline will comment with the URL.
