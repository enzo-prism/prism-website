# Environment & Service Setup

Use this guide to wire the Prism site to the external services it depends on. Copy `.env.example` to `.env.local` (or `.env`) and fill in the values that apply to your environment before running `pnpm dev`.

```bash
cp .env.example .env.local
```

> `.env.local` is git-ignored, so you can keep per-developer overrides without affecting the repo.

## Variable reference

| Variable | Required | Purpose | Default / Fallback | Used in |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_BASE_URL` | ✅ for accurate SEO | Canonical host for metadata, OG images, RSS feeds, and sitemap generation. | Falls back to `https://www.design-prism.com`. | `app/blog/[slug]/page.tsx`, `app/blog/feed.xml/route.ts`, `app/sitemap.ts` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Override the default GA4 property for analytics. | Falls back to `G-P9VY77PRC0`. | `lib/constants.ts` → `app/layout.tsx` |
| `NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT` | Optional | Swap the Formspree endpoint powering the scholarship form without code changes. | Defaults to `https://formspree.io/f/mwpwwjek`. | `app/scholarship/ScholarshipPageClient.tsx` |
| `NEXT_PUBLIC_AEO_FORM_ENDPOINT` | Optional | Swap the Formspree endpoint powering the AEO assessment form without code changes. | Defaults to `https://formspree.io/f/xldarokj`. | `components/forms/AeoAssessmentForm.tsx` |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | ✅ if you store leads | Supabase project URL for the `/api/prism-leads` endpoint; use the server version when available. | None (API logs a warning and skips DB writes). | `lib/supabase.ts`, `app/api/prism-leads/route.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ if you store leads | Service role key that allows server-side inserts into Supabase. | None (API logs a warning and skips DB writes). | `lib/supabase.ts`, `app/api/prism-leads/route.ts` |
| `RESEND_API_KEY` | Optional | Enables transactional emails after “Get Started” submissions. | When absent, the API logs a warning and skips emailing. | `lib/email.ts` |
| `INSTAGRAM_ACCESS_TOKEN` | Optional | Instagram Graph API token for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `INSTAGRAM_USER_ID` | Optional | Instagram Graph API user ID for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `TIKTOK_ACCESS_TOKEN` | Optional | TikTok Display API token for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `NEXT_PUBLIC_SITE_URL` & `NEXT_PUBLIC_VERCEL_URL` | Optional | Provide context to deployment verification scripts. | None. | `scripts/verify-deployment.ts` |
| `AI_GATEWAY_BASE_URL` | Optional | Base URL for optional AI fallback mode. Required only when `SALES_CHAT_AI_FALLBACK_ENABLED=true`. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `AI_GATEWAY_API_KEY` | Optional | Bearer token for optional AI fallback mode. Required only when `SALES_CHAT_AI_FALLBACK_ENABLED=true`. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `AI_GATEWAY_MODEL` | Optional | Provider model selector for optional AI fallback mode. Required only when `SALES_CHAT_AI_FALLBACK_ENABLED=true`. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_ENABLED` | Optional feature flag | Set to `false` to hard-disable `/api/chat` and hide sales chat UI on `/get-started`. | `true` | `app/api/chat/route.ts`, `app/get-started/page.tsx` |
| `SALES_CHAT_BOOKING_URL` | Required when chat enabled | Primary booking CTA used by deterministic sales-chat quick replies. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL` | Required when chat enabled | Direct checkout CTA for website overhaul path. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL` | Required when chat enabled | Direct signup CTA for growth partnership path. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_LEADS_WEBHOOK_URL` | Required when chat enabled | Webhook destination for typed conversion payloads (`free_audit`, `website_overhaul_purchase`, `growth_partnership`). | None. | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/lead-dispatch.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_LEADS_WEBHOOK_SECRET` | Required when chat enabled | HMAC secret used to sign lead payload dispatch (`x-sales-chat-signature`). | None. | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/lead-dispatch.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_AI_FALLBACK_ENABLED` | Optional | Enables optional non-authoritative AI fallback for non-critical clarifications. | `false` | `lib/sales-chat/runtime-config.ts` |
| `SALES_CHAT_INLINE_BOOKING_ENABLED` | Optional feature flag | Enables in-chat calendar mode (using `BookDemoEmbed`) in addition to `#book-call` fallback link. | `true` | `app/get-started/page.tsx`, `components/sales-chat/SalesChatShell.tsx` |
| `SALES_CHAT_EVENTS_WEBHOOK_URL` | Optional | Server webhook destination for structured sales-chat lifecycle/lead events (`/api/sales-chat/events` fan-out). | None. | `app/api/sales-chat/events/route.ts` |
| `SALES_CHAT_EVENTS_WEBHOOK_SECRET` | Optional | Secret for webhook signing (`x-sales-chat-signature` HMAC SHA-256). | None. | `app/api/sales-chat/events/route.ts` |

### Sales chat runtime contract

- Endpoint: `POST /api/chat` in `app/api/chat/route.ts`.
- Runtime availability gate:
  - `uiAvailable = SALES_CHAT_ENABLED && ctaUrlsConfigured`
  - `ctaUrlsConfigured = SALES_CHAT_BOOKING_URL && SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL && SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL`
  - lead dispatch requires `SALES_CHAT_LEADS_WEBHOOK_URL && SALES_CHAT_LEADS_WEBHOOK_SECRET`
  - AI fallback gateway is optional and only validated when `SALES_CHAT_AI_FALLBACK_ENABLED=true`
  - When `uiAvailable` is false, `/get-started` does not render the chat launcher or window.
  - Even when UI is mounted, `/api/chat` returns `503 config_missing` if lead-webhook config is missing.
- Required request body (JSON):
  - `sessionId`, `sourcePage`, `inputType`, `inputValue`
  - optional `buttonId`
  - optional `conversationState` (`nodeId`, `exchangeCount`, `memory`, `convertedAction`)
- Response behavior:
  - `200` + deterministic JSON payload (`assistantMessage`, `quickReplies`, `nodeId`, `conversationState`, optional terminal action).
  - Success payload observability fields:
    - `leadDispatchStatus?: "none" | "attempted" | "succeeded" | "failed"`
    - `leadDispatchCode?: string` (sanitized machine-readable reason, e.g. `webhook_http_error`, `duplicate_suppressed`)
  - `400` for schema violations.
  - `503` for disabled chat route or missing deterministic config.
- Error payload format is JSON and always includes:
  - `error`: human-safe fallback message,
  - `fallbackToHuman: true`,
  - optional `errorType` (`disabled`, `config_missing`, `invalid_request`).
- Response headers used for tracing:
  - `x-sales-chat-route`: event code (`success`, `disabled`, `config_missing`, etc.).
  - `x-request-id`: request correlation ID on successful deterministic responses.
- Local quick probes:
  - 400 path: `curl -i -X POST http://localhost:3000/api/chat -H "content-type: application/json" -d '{"sourcePage":"/get-started"}'`
  - happy path: `curl -i -X POST http://localhost:3000/api/chat -H "content-type: application/json" -d '{"sessionId":"session-12345678","sourcePage":"/get-started","inputType":"button","inputValue":"","buttonId":"__init__"}'`

### Sales chat operations notes

- Deterministic mode is always authoritative for conversion-critical intents (A–G) and pricing copy.
- Current `/api/chat` behavior is deterministic-only. `SALES_CHAT_AI_FALLBACK_ENABLED` currently affects config validation/guardrails, not primary response generation.
- If the chat route returns a JSON error, it always includes `error`, `fallbackToHuman: true`, and `errorType`.
- Never store or log the raw API key in code, logs, or git notes. The `app/api/chat/route.ts` implementation only logs redacted metadata (`requestId`, sanitized hashes, counts).
- For local QA of fallback UX, test with invalid payload (400) and config-missing fallback (503 + handoff message).
- Deployment guardrail:
  - if `SALES_CHAT_ENABLED` resolves true in production, CI requires CTA + lead webhook keys via `pnpm verify:sales-chat-config`.
  - if `SALES_CHAT_AI_FALLBACK_ENABLED` resolves true, CI additionally requires all `AI_GATEWAY_*` keys.

### Sales chat events contract

- Endpoint: `POST /api/sales-chat/events` in `app/api/sales-chat/events/route.ts`.
- Purpose: capture structured funnel + lead-state events from the chat UI and fan out to optional webhook + optional Supabase persistence.
- Required request body fields:
  - `sessionId`
  - `sourcePage`
  - `eventName`
- Optional request body fields:
  - `eventTs`
  - `leadProfilePatch`
  - `stateTransition`
  - `transcriptSnippet`
  - `metadata`
- Reliability events used by deterministic sales chat:
  - `sales_chat_quick_reply_clicked`
  - `sales_chat_spec_node_entered`
  - `sales_chat_offer_recommended`
  - `sales_chat_lead_payload_attempted`
  - `sales_chat_lead_payload_emitted`
  - `sales_chat_lead_payload_failed`
  - `sales_chat_dead_end_prevented`
- Response behavior:
  - `202` on accepted event.
  - `400` on invalid payload.
- Operational notes:
  - Webhook signing header is `x-sales-chat-signature` (if `SALES_CHAT_EVENTS_WEBHOOK_SECRET` is present).
  - Route logs only redacted session hash, never raw API keys.
  - Deep events are also emitted client-side to GA4 via `utils/analytics.ts` for funnel analysis (event fan-out is not GA ingestion by itself).

### GA4 sales chat deep-tracking checklist

- GA4 event names to verify in DebugView:
  - `sales_chat_open`
  - `sales_chat_welcome_seen`
  - `sales_chat_message_sent`
  - `sales_chat_quick_reply_clicked`
  - `sales_chat_spec_node_entered`
  - `sales_chat_offer_recommended`
  - `sales_chat_lead_payload_attempted`
  - `sales_chat_lead_payload_emitted` or `sales_chat_lead_payload_failed`
- Recommended GA4 custom dimensions:
  - `node_id`
  - `recommended_offer`
  - `terminal_action`
  - `lead_dispatch_status`
  - `lead_dispatch_code`
  - `reply_id`
  - `reply_label`
  - `action_type`

### Sales chat leads contract

- Endpoint: `POST /api/sales-chat/leads` in `app/api/sales-chat/leads/route.ts`.
- Purpose: validate and forward typed conversion payloads to the lead webhook (backfill/manual dispatch path).
- Accepted payloads (`lead_type` discriminated union):
  - `free_audit`
  - `website_overhaul_purchase`
  - `growth_partnership`
- Required shared fields:
  - `source_page`
  - `timestamp` (ISO)
  - `routing` (`slackChannel`, `notionCategory`, `priority`, `emailTarget`)
- Response behavior:
  - `202` when accepted and forwarded.
  - `400` for invalid payload shape.
  - `503` if webhook dispatch fails.
- Webhook signing:
  - `dispatchSalesChatLead` signs payloads with HMAC SHA-256 in `x-sales-chat-signature` using `SALES_CHAT_LEADS_WEBHOOK_SECRET`.

### Notes

- If you do not provide Supabase credentials, `app/api/prism-leads` will still return success to the user but will skip persistence. Use this only for local prototypes.
- `GOOGLE_ADS_ID` (`AW-11373090310`) and the Hotjar site ID are currently hard-coded. Update `lib/constants.ts` or `components/hotjar-script.tsx` if you need environment-specific values.
- `NEXT_PUBLIC_BASE_URL` should always match the public domain you expect search engines and OG scrapers to use (e.g., `https://www.your-preview-domain.com` for staging).
- The Prism Library falls back to `content/library/seed.ts` whenever Instagram/TikTok credentials are missing or unavailable.

## Verification workflow

1. `pnpm diag:supabase` &mdash; ensures the Supabase URL and service key are set.
2. `pnpm verify:deploy` &mdash; confirms `.env.local` contains the URLs required for deployment checks and that `next.config.mjs` has the correct image configuration.
3. For analytics overrides, run the site locally with `NEXT_PUBLIC_GA_MEASUREMENT_ID` defined and confirm the ID matches in the rendered `<head>` output.

Keeping this checklist up to date avoids chasing “why didn’t that form save?” bugs the next time someone new spins up the project.
