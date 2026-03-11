# Prism Development Guide

This guide highlights the workflows we lean on most often while iterating on the marketing site. Use it as the quick reference when shipping copy tweaks, adding new landing sections, or wiring forms.

## Local Development

- Install deps with `pnpm install` (repo assumes pnpm).
- Start the Next.js dev server with `pnpm dev`.
- If you use `pnpm exec next start` for a production-parity preview, always run `pnpm build` immediately beforehand. `next start` serves the last production bundle on disk, so source edits will appear "ignored" until you rebuild.
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
- Run `pnpm exec playwright test __tests__/visual/global-elevenlabs-widget.spec.ts --project=desktop-chromium` when changing the route-aware ElevenLabs launcher outside the homepage hero.
- For blog-post content/frontmatter additions, run `pnpm exec jest __tests__/sitemap.test.ts __tests__/blog-canonical.test.ts --runInBand` as a fast regression check.

### Homepage hero agent checklist

- The homepage hero (`app/client-page.tsx`) now treats the ElevenLabs sales agent as the primary above-the-fold interaction. Keep the page itself server-rendered and isolate the live agent inside `components/home/HomeHeroAgent.tsx`.
- The current hero is intentionally minimal: a solid white stage, the `Prism` wordmark, `impossible is temporary.`, a single subtle `founded 2023 in san francisco` line, and the embedded agent. Avoid reintroducing multi-CTA marketing clutter into this first viewport without a strong reason.
- `HomeHeroAgent` uses the official ElevenLabs widget embed (`https://unpkg.com/@elevenlabs/convai-widget-embed`) and renders the inline `<elevenlabs-convai>` custom element.
- ElevenLabs renders markdown in agent replies, but external links only become clickable when the host is allowlisted on the widget. Keep `markdown-link-allowed-hosts` in sync with whatever calendar or booking destination the agent is instructed to share.
- Mobile spacing is intentionally biased toward the inline agent: the hero aligns from the top on small screens, the copy stack stays tight, and `HomeHeroAgent` now reserves roughly `35rem` of height on narrow viewports so the widget can use its supported compact layout without clipping the orb or crowding the textarea.
- Avoid deep compact-mode geometry overrides inside the widget Shadow DOM. ElevenLabs treats the embed as an opinionated surface; keep homepage customization focused on wrapper sizing, placement, and fullscreen promotion, and move heavier design customization to the official SDK/UI layer if we need a bespoke chat surface later.
- The public agent id resolves via `lib/elevenlabs.ts` and can be overridden with `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`.
- `components/global-elevenlabs-widget.tsx` mounts the same agent as a route-aware launcher on every non-homepage page. On `/get-started`, it automatically steps aside only when the dedicated `SalesChat` launcher is actually present, so the page still has a subtle fallback if the route-specific chat is unavailable.
- The runtime shell no longer mounts the fixed page-markdown copy button; the global widget now owns that corner across inner pages.
- The widget family publishes fullscreen state through `document.documentElement.dataset.prismWidgetExpanded`; navbar and other fixed controls should listen to that signal instead of hard-coding route exceptions.
- If you change hero copy/layout, update the locked-route snapshot test and re-run `pnpm test:visual:locked`.
- If you change the homepage or global widget interaction model, re-run `pnpm exec jest __tests__/components/HomeHeroAgent.test.tsx __tests__/components/GlobalElevenLabsWidget.test.tsx`.

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
    - optional: `buttonId`, `stateToken`, `conversationState`, `conversationHistory` (recent transcript window for AI context)
  - Validates request payloads with `zod`.
  - Uses `stateToken` as the authoritative signed conversation state on follow-up turns. Raw `conversationState` is accepted for compatibility/debugging, but should not drive routing.
  - Runs deterministic state transitions through `runSalesChatSpecV1Engine` (`lib/sales-chat/spec-v1-engine.ts`).
  - Optionally upgrades responses through Vercel AI Gateway orchestration (`lib/sales-chat/ai-orchestrator.ts`) when:
    - `SALES_CHAT_AI_FALLBACK_ENABLED=true`
    - `SALES_CHAT_AI_RESPONSE_MODE!=off`
    - `AI_GATEWAY_BASE_URL`, `AI_GATEWAY_API_KEY`, and `AI_GATEWAY_MODEL` are configured
  - AI response modes:
    - `long_tail` upgrades free-text turns plus generic fallback turns
    - `broad` upgrades all non-terminal turns except `__init__`
    - `off` keeps deterministic-only output even when gateway env exists
    - when mode is unset and `SALES_CHAT_AI_FALLBACK_ENABLED=true`, runtime defaults to `broad` to maximize natural model responses
  - AI orchestration rollout controls:
    - `SALES_CHAT_AI_ORCHESTRATION_ENABLED` toggles orchestrated generation path
    - `SALES_CHAT_AI_ORCHESTRATION_PERCENT` applies session-hash canary rollout (0-100)
    - `SALES_CHAT_AI_ORCHESTRATION_COHORT` tags gateway + server telemetry by rollout cohort
  - AI guardrails:
    - deterministic state transitions and terminal actions remain authoritative
    - generated copy is dropped when pricing drifts from canonical `$0`, `$1,000`, `$2,000`, when node intent mismatches, or when banned fallback language appears
  - Builds typed conversion payloads through `buildLeadPayload` (`lib/sales-chat/lead-payloads.ts`) and dispatches with `dispatchSalesChatLead` (`lib/sales-chat/lead-dispatch.ts`) when terminal actions fire.
  - Includes lead dispatch observability fields in success payloads:
    - `leadDispatchStatus` (`none` | `attempted` | `succeeded` | `failed`)
    - `leadDispatchCode` (sanitized reason code; e.g. `webhook_http_error`, `duplicate_suppressed`)
  - Includes AI observability fields in success payloads:
    - `responseMode` (`deterministic` | `ai_assisted`)
    - `aiDecisionReason` (`broad_mode`, `long_tail_trigger`, `repair_success`, `canary_skip`, `banned_phrase_blocked`, `guardrail_reject`, `gateway_error`, `disabled`)
    - `aiGuardrailCode` (`pricing_drift`, `semantic_mismatch`, `banned_phrase_blocked`)
    - `aiModelUsed` (gateway model id)
    - `aiLatencyMs` (gateway round-trip timing)
    - `aiLatencyBucket` (latency band for SLO dashboards)
    - `aiPromptVersion` (active prompt template/version marker)
    - `aiRepairAttempted` (whether a second guardrail repair generation was attempted)
    - `aiOrchestrationPath` (`orchestrated_primary`, `orchestrated_repair`, `deterministic_fallback`)
    - `aiFallbackReason` (deterministic fallback reason code for rejected/skipped AI paths)
    - `aiConfidence` and `aiIntentHint` (model-provided confidence + intent metadata)
  - Returns JSON only (no streaming path in the deterministic route).
  - Returns tracing headers:
    - `x-sales-chat-route` (`success`, `ai_fallback`, `disabled`, `config_missing`, `invalid_request`)
    - `x-request-id` on success responses
  - Runtime gating:
    - `/get-started` mount gate: `uiAvailable = SALES_CHAT_ENABLED && ctaUrlsConfigured && stateSigningConfigured`
    - `stateSigningConfigured` resolves from `SALES_CHAT_STATE_SECRET` first, then other server-only secrets as fallback
    - route hard-stop: returns `503 config_missing` only when deterministic CTA/state-signing config is incomplete
    - webhook secret rule:
      - Formspree endpoint (`https://formspree.io/f/...`): secret optional
      - custom webhook endpoint: `SALES_CHAT_LEADS_WEBHOOK_SECRET` required
    - lead webhook config should degrade terminal actions only; non-terminal chat flow should still initialize and respond
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
    - `trackSalesChatAiResponseUsed({ sourcePage, sessionId, nodeId, responseMode, aiDecisionReason, aiModelUsed, aiLatencyMs })`
    - `trackSalesChatAiResponseRejected({ sourcePage, sessionId, nodeId, responseMode, aiDecisionReason, aiModelUsed, aiLatencyMs })`
    - `trackSalesChatLeadPayloadAttempted({ sourcePage, sessionId, terminalAction, leadDispatchStatus, leadDispatchCode })`
    - `trackSalesChatLeadPayloadEmitted({ sourcePage, sessionId, terminalAction })`
    - `trackSalesChatLeadPayloadFailed({ sourcePage, sessionId, terminalAction, leadDispatchCode })`
    - `trackSalesChatError({ sourcePage, errorType, sessionId, details })`
    - `trackSalesChatDemoCtaShown`, `trackSalesChatDemoCtaClicked`, `trackSalesChatCalendarOpened`, `trackSalesChatDemoBooked`
    - mirror the same lifecycle to `POST /api/sales-chat/events` for webhook/Supabase fan-out and route tracing.
    - reserve `sales_chat_dead_end_prevented` for server-side policy protection telemetry.
  - GA4 deep funnel setup (required for useful reporting):
    - define custom dimensions for `node_id`, `recommended_offer`, `response_mode`, `ai_decision_reason`, `ai_model_used`, `ai_latency_ms`, `terminal_action`, `lead_dispatch_status`, `lead_dispatch_code`, `reply_id`, `reply_label`, and `action_type`.
    - for deep AI evals also define `ai_guardrail_code`, `ai_prompt_version`, and `ai_repair_attempted`.
    - verify in GA4 DebugView that these parameters are attached to sales-chat events before relying on reports.
- Observability checks before merge:
  - Verify logs never include secrets (lead webhook secret, gateway keys, raw session identifiers where not required).
  - Verify normal deterministic responses include `x-sales-chat-route=success` and AI-upgraded responses include `x-sales-chat-route=ai_fallback`.
  - Verify chat never returns or renders the banned copy `Sales chat is not fully configured yet...`.
  - Verify failed lead dispatch never emits success telemetry (`sales_chat_lead_payload_emitted`).
  - Verify GA4 DebugView receives deep deterministic events in one test conversation:
    - `sales_chat_quick_reply_clicked`
    - `sales_chat_spec_node_entered`
    - `sales_chat_offer_recommended`
    - `sales_chat_ai_response_used` or `sales_chat_ai_response_rejected`
    - `sales_chat_lead_payload_attempted`
    - `sales_chat_lead_payload_emitted` or `sales_chat_lead_payload_failed`
  - Recommended fast checks after implementation:
  - `pnpm test:sales-chat:core`
  - `pnpm test:sales-chat:e2e`
  - Include API-gate assertions from `__tests__/api/chat.test.ts`:
    - missing state-signing secret with no fallback source => `503 config_missing`
    - custom webhook + missing secret => init still returns `200 success`, terminal lead dispatch reports `leadDispatchStatus=failed`
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
  - If AI behavior looks off, inspect `responseMode`, `aiDecisionReason`, `aiModelUsed`, and `aiLatencyMs` in `/api/chat` success payloads.
  - If lead fan-out behavior looks inconsistent, inspect `leadDispatchStatus` + `leadDispatchCode` in `/api/chat` response payloads.
  - If chat is missing on `/get-started`, verify `uiAvailable = SALES_CHAT_ENABLED && ctaUrlsConfigured && stateSigningConfigured` and that CTA keys plus a usable state-signing secret are present.
  - If chat resets to the welcome flow unexpectedly between turns, verify the client is round-tripping `stateToken` from the previous `/api/chat` response.
  - If chat reaches a terminal action but lead delivery fails, verify lead webhook config:
    - Formspree backend: `SALES_CHAT_LEADS_WEBHOOK_URL` set to a valid Formspree endpoint.
    - Custom webhook backend: both `SALES_CHAT_LEADS_WEBHOOK_URL` and `SALES_CHAT_LEADS_WEBHOOK_SECRET` set.
  - If header SVG animation looks too fast on mobile, inspect:
    - `app/globals.css` mobile animation optimization block (`animation-duration: 0.3s !important`),
    - `components/sales-chat/SalesChatShell.tsx` body-class toggle (`sales-chat-open`) that exempts active chat sessions from global mobile animation compression.
  - If messages are never sent from an open chat, verify devtools `Network` shows `/api/chat` POST with `Content-Type: application/json`.
  - If message links render as plain markdown, confirm the content came through `createRenderMessageContent()` in `components/sales-chat/SalesChatShell.tsx` (message parser should convert `#` and `[#](#)` to a booking anchor).

### Natural response analysis playbook

- Goal: maximize natural, model-led responses while preserving deterministic conversion flow and canonical pricing.
- Daily/weekly review loop:
  - sample `sales_chat_ai_response_used` and `sales_chat_ai_response_rejected` events from GA + server fan-out.
  - segment by `node_id`, `ai_decision_reason`, `ai_guardrail_code`, and `ai_model_used`.
  - prioritize nodes with highest rejection rates (`guardrail_reject`, `gateway_error`) and highest drop-off before terminal actions.
- Prompt and model tuning order:
  - tune `AI_GATEWAY_PROVIDER_ORDER` + `AI_GATEWAY_FALLBACK_MODELS` first (stability/latency).
  - tune prompt strategy (`aiPromptVersion`) second (tone quality and conversion clarity).
  - tune temperature last for cadence polish; keep guardrail rejection rate stable after each change.
- KPI guardrails for rollout decisions:
  - lead completion rate remains primary KPI.
  - if lead completion drops >10% against trailing 7-day baseline, switch `SALES_CHAT_AI_RESPONSE_MODE` from `broad` to `long_tail` and redeploy.
  - if `sales_chat_error` exceeds 3% of sessions, roll back to previous stable deployment and investigate via `x-request-id` traces.
- Regression validation before shipping prompt/model changes:
  - `pnpm test:sales-chat:core`
  - `pnpm test:sales-chat:e2e`
  - `pnpm test:sales-chat:stress`
  - one manual `/get-started` run confirming AI-assisted copy on non-terminal turns and deterministic lead dispatch on terminal turns.

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
- Metadata should stay descriptive and concise, not artificially short: shared rules trim page titles to 60 characters max (including `| Prism`) and meta descriptions to 155 characters max across route, blog, and library pages.
- Shared normalization preserves common search terms and product nouns (`SEO`, `AI`, `Google Maps`, `ChatGPT`, `TikTok`, etc.) and keeps useful brand descriptors like `Case Study`, `Podcast`, and `Careers` instead of stripping them out.
- Default metadata workflow for static routes:
  - Set a clear `titleStem` + `description` on the page and let `buildRouteMetadata` generate the final title, canonical, OG, Twitter, and robots fields.
  - Write for search intent first, brand second. Prefer phrases like `Dental website design + local SEO` over internal labels like `Why dental practices love Prism`.
  - If `seo/inventory.csv` shows a clipped or vague result, improve the route’s source copy first; do **not** immediately tighten or loosen the global limits.
- Default metadata workflow for blog and library routes:
  - Let the generator fall back to `title` / `description` by default.
  - Add `seoTitle` / `seoDescription` only when the rendered inventory shows a weak snippet, duplicate title, or low-intent phrasing.
  - Keep blog overrides aligned with the visible article promise; do not write clickbait search titles that diverge from the actual post.
- Use `seo/inventory.csv` as the source of truth for final rendered snippets. Review `final_title` and `meta_description`, not just the source `titleStem` or frontmatter strings.
- `app/sitemap.ts` should emit only canonical, indexable URLs plus verifiable `lastModified` values. Google ignores sitemap `priority` and `changefreq`, so don't spend time tuning or adding them.
- `app/robots.ts` should stay minimal: use it to manage crawl access (for example, keep `/api/og/` crawlable while blocking the rest of `/api/`), and rely on page-level `noindex` for URLs that should stay out of Search.
- `public/llms.txt` is not a Google ranking input, but it should still mirror canonical search surfaces. Keep it limited to canonical, indexable Prism URLs and avoid noindex routes, redirects, or off-site detours unless there is a deliberate reason.
- Use absolute canonicals (`https://www.design-prism.com/...`) for every indexable route.
- Noindex routes should remain crawlable (meta `robots`), but **must be excluded** from the sitemap via `app/sitemap.ts`.
- Keep the indexable set intentionally narrow. Community/source pages (`/ig`, `/youtube`, `/tiktok`), embed-heavy utility pages (`/hottest-content`), product-form utility routes (`/ai`, `/models`), and legacy redirected pricing/offer routes (`/offers*`, `/growth`, `/pricing-dental`, `/ai-website-launch`, `/one-time-fee`) should stay `noindex, nofollow` and out of the sitemap.
- `/blog` filter/search views (`/blog?category=...`, `/blog?q=...`) are set to **noindex, follow** via `X-Robots-Tag` in `proxy.ts` so query-param URLs don’t pollute the index.
- If a blog post `image` frontmatter uses an absolute Prism URL (e.g. `https://www.design-prism.com/...`), we normalize it for Next/Image. Prefer relative paths like `/api/og/...` or `/blog/...` for consistency.
- Blog cards and post hero images now validate frontmatter `image` values at read time. If the file is missing, uses an invalid sentinel (`null`/`undefined`/empty), or points to a raster extension whose asset is actually SVG markup, posts now fall back to the shared default featured image (`https://res.cloudinary.com/dhqpqfw6w/image/upload/v1770786137/Prism_rgeypo.png`) instead of rendering a broken image.
- Blog posts can define `seoTitle` and `seoDescription` in frontmatter for manual snippet control; if omitted, metadata falls back to `title`/`description` with shared normalization.
- Keep `/api/og/` **allowed** in `app/robots.ts` if we use OG endpoints in metadata or structured data.
- Prefer the shared JSON-LD helpers in `components/schema-markup.tsx` (`WebPageSchema`, `CollectionPageSchema`, `ItemListSchema`, `ServiceSchema`, `FAQSchema`, etc.).
- Every indexable page must render a visible `<h1>` that matches the primary search intent.
- Success criteria for SEO-safe routing:
  - Any route that permanently redirects or exists only for channel attribution / utility flow purposes must export `robots: { index: false, follow: false }`.
  - `WebsiteSchema` must not declare a `SearchAction` unless we have a real, crawlable on-site search endpoint.
  - Run `pnpm exec jest __tests__/sitemap.test.ts __tests__/seo-indexability-guards.test.tsx --runInBand` plus `pnpm seo:inventory && pnpm seo:lint` after changing indexability rules.
- Run `pnpm seo:inventory && pnpm seo:lint` before shipping large metadata changes.

### Analytics & Conversion Tracking

- Global Google Analytics + Google Ads tagging happens in `app/layout.tsx`. Both IDs come from `lib/constants.ts` (`GA_MEASUREMENT_ID` and `GOOGLE_ADS_ID`), so set `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you need to override the fallback GA property.
- Global mobile viewport policy also lives in `app/layout.tsx` via Next.js `export const viewport`. We currently lock mobile zoom site-wide (`initialScale = minimumScale = maximumScale = 1`, `userScalable = false`), so treat changes there as a product/accessibility decision, not a route-level tweak.
- Vercel Web Analytics is also mounted globally in `app/layout.tsx` via `components/vercel-analytics.tsx` using `@vercel/analytics/next`. We intentionally strip query strings and hash fragments in `lib/vercel-analytics.ts` before events are sent so ad click IDs / UTMs do not create noisy duplicate page rows in the Vercel dashboard.
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
