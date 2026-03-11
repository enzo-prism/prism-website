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
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | Optional | Public agent id used by the homepage hero experience and the subtle global launcher on inner pages. | Falls back to Prism Sales (`agent_4701kkcyc4efefkv5x4awhysjyrh`). | `lib/elevenlabs.ts`, `components/home/HomeHeroAgent.tsx`, `components/global-elevenlabs-widget.tsx` |
| `NEXT_PUBLIC_ELEVENLABS_BOOKING_URL` | Optional | Legacy/custom booking destination override for non-stock ElevenLabs integrations. | Falls back to `/get-started#book-call`. | `lib/elevenlabs.ts` |
| `NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS` | Optional | Comma-separated trusted hosts that the stock ElevenLabs widget may render as clickable markdown links. | Falls back to `calendar.notion.so`, `notion.so`, `cal.com`, and Prism domains. | `lib/elevenlabs.ts`, `components/elevenlabs/ElevenLabsWidget.tsx` |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | ✅ if you store leads | Supabase project URL for the `/api/prism-leads` endpoint; use the server version when available. | None (API logs a warning and skips DB writes). | `lib/supabase.ts`, `app/api/prism-leads/route.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ if you store leads | Service role key that allows server-side inserts into Supabase. | None (API logs a warning and skips DB writes). | `lib/supabase.ts`, `app/api/prism-leads/route.ts` |
| `RESEND_API_KEY` | Optional | Enables transactional emails after “Get Started” submissions. | When absent, the API logs a warning and skips emailing. | `lib/email.ts` |
| `INSTAGRAM_ACCESS_TOKEN` | Optional | Instagram Graph API token for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `INSTAGRAM_USER_ID` | Optional | Instagram Graph API user ID for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `TIKTOK_ACCESS_TOKEN` | Optional | TikTok Display API token for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `NEXT_PUBLIC_SITE_URL` & `NEXT_PUBLIC_VERCEL_URL` | Optional | Provide context to deployment verification scripts. | None. | `scripts/verify-deployment.ts` |
| `AI_GATEWAY_BASE_URL` | Optional | Base URL for optional AI response upgrades. Required only when AI response mode is enabled (`SALES_CHAT_AI_FALLBACK_ENABLED=true` and `SALES_CHAT_AI_RESPONSE_MODE!=off`). | Recommended with AI SDK gateway: `https://ai-gateway.vercel.sh/v3/ai`. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `AI_GATEWAY_API_KEY` | Optional | Bearer token for optional AI response upgrades. Required only when AI response mode is enabled (`SALES_CHAT_AI_FALLBACK_ENABLED=true` and `SALES_CHAT_AI_RESPONSE_MODE!=off`). | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `AI_GATEWAY_MODEL` | Optional | Primary provider model selector for optional AI response upgrades. Required only when AI response mode is enabled (`SALES_CHAT_AI_FALLBACK_ENABLED=true` and `SALES_CHAT_AI_RESPONSE_MODE!=off`). | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `AI_GATEWAY_TIMEOUT_MS` | Optional | Per-request timeout (ms) for orchestrated AI generation + repair pass. | `7000` | `lib/sales-chat/ai-orchestrator.ts` |
| `AI_GATEWAY_FALLBACK_MODELS` | Optional | Comma-separated model fallback chain (for example `openai/gpt-5,openai/gpt-4.1-mini`) passed to gateway provider options. | None. | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/ai-orchestrator.ts` |
| `AI_GATEWAY_PROVIDER_ORDER` | Optional | Comma-separated provider preference order (for example `openai,anthropic`) passed to gateway provider options. | None. | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/ai-orchestrator.ts` |
| `AI_GATEWAY_FAST_MODEL` | Optional | Low-latency model id used for short/simple text turns when AI orchestration is enabled (for example `openai/gpt-5.1-instant`). | Falls back to `AI_GATEWAY_MODEL` when unset. | `lib/sales-chat/ai-orchestrator.ts` |
| `AI_GATEWAY_FAST_MODEL_MAX_CHARS` | Optional | Max input length to route to `AI_GATEWAY_FAST_MODEL` for text turns. | `190` | `lib/sales-chat/ai-orchestrator.ts` |
| `AI_GATEWAY_FORCE_FAST_MODEL` | Optional feature flag | Force every eligible AI turn to use `AI_GATEWAY_FAST_MODEL` (testing/speed mode). | `false` | `lib/sales-chat/ai-orchestrator.ts` |
| `SALES_CHAT_ENABLED` | Optional feature flag | Set to `false` to hard-disable `/api/chat` and hide sales chat UI on `/get-started`. | `true` | `app/api/chat/route.ts`, `app/get-started/page.tsx` |
| `SALES_CHAT_BOOKING_URL` | Required when chat enabled | Primary booking CTA used by deterministic sales-chat quick replies. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL` | Required when chat enabled | Direct checkout CTA for website overhaul path. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL` | Required when chat enabled | Direct signup CTA for growth partnership path. | None. | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_STATE_SECRET` | Recommended when chat enabled | Explicit HMAC secret used to sign authoritative sales-chat state tokens between client and server. | Falls back to another non-empty server secret (`SALES_CHAT_LEADS_WEBHOOK_SECRET`, `SALES_CHAT_EVENTS_WEBHOOK_SECRET`, `AI_GATEWAY_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `RESEND_API_KEY`) when unset, but explicit configuration is preferred. | `lib/sales-chat/state-token.ts`, `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_LEADS_WEBHOOK_URL` | Required for terminal lead delivery | Webhook destination for typed conversion payloads (`free_audit`, `website_overhaul_purchase`, `growth_partnership`). Supports Formspree endpoints (for example `https://formspree.io/f/...`). Missing this should not block chat initialization, but terminal conversion dispatch will fail. | None. | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/lead-dispatch.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_LEADS_WEBHOOK_SECRET` | Required for non-Formspree lead delivery | HMAC secret used to sign lead payload dispatch (`x-sales-chat-signature`) for custom webhooks. Optional when `SALES_CHAT_LEADS_WEBHOOK_URL` is a Formspree endpoint. Missing this should not block chat initialization, but terminal conversion dispatch will fail for custom webhooks. | None. | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/lead-dispatch.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_AI_FALLBACK_ENABLED` | Optional | Master switch for AI orchestration on `/api/chat` (deterministic policy engine still authoritative). | `false` | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_AI_RESPONSE_MODE` | Optional | AI response strategy for `/api/chat`: `off`, `long_tail`, or `broad`. `long_tail` upgrades text turns and generic fallback turns, while `broad` upgrades every non-terminal turn except `__init__`. | Defaults to `broad` when `SALES_CHAT_AI_FALLBACK_ENABLED=true`, otherwise `long_tail`. | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/ai-orchestrator.ts` |
| `SALES_CHAT_AI_ORCHESTRATION_ENABLED` | Optional feature flag | Enables the orchestration module path (`generateText` + structured `Output.object`) when AI is enabled. | `true` | `lib/sales-chat/runtime-config.ts`, `app/api/chat/route.ts` |
| `SALES_CHAT_AI_ORCHESTRATION_PERCENT` | Optional | Percent rollout gate (0-100) for canarying orchestration by session hash bucket. | `100` | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/ai-orchestrator.ts` |
| `SALES_CHAT_AI_ORCHESTRATION_COHORT` | Optional | Cohort tag attached to AI gateway telemetry and server events (for rollout/incident tracing). | `default` | `lib/sales-chat/runtime-config.ts`, `lib/sales-chat/ai-orchestrator.ts` |
| `SALES_CHAT_INLINE_BOOKING_ENABLED` | Optional feature flag | Enables in-chat calendar mode (using `BookDemoEmbed`) in addition to `#book-call` fallback link. | `true` | `app/get-started/page.tsx`, `components/sales-chat/SalesChatShell.tsx` |
| `SALES_CHAT_EVENTS_WEBHOOK_URL` | Optional | Server webhook destination for structured sales-chat lifecycle/lead events (`/api/sales-chat/events` fan-out). | None. | `app/api/sales-chat/events/route.ts` |
| `SALES_CHAT_EVENTS_WEBHOOK_SECRET` | Optional | Secret for webhook signing (`x-sales-chat-signature` HMAC SHA-256). | None. | `app/api/sales-chat/events/route.ts` |

### Sales chat runtime contract

- Endpoint: `POST /api/chat` in `app/api/chat/route.ts`.
- Runtime availability gate:
  - `uiAvailable = SALES_CHAT_ENABLED && ctaUrlsConfigured && stateSigningConfigured`
  - `ctaUrlsConfigured = SALES_CHAT_BOOKING_URL && SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL && SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL`
  - `stateSigningConfigured = SALES_CHAT_STATE_SECRET || SALES_CHAT_LEADS_WEBHOOK_SECRET || SALES_CHAT_EVENTS_WEBHOOK_SECRET || AI_GATEWAY_API_KEY || SUPABASE_SERVICE_ROLE_KEY || RESEND_API_KEY`
  - lead dispatch requires:
    - Formspree mode: `SALES_CHAT_LEADS_WEBHOOK_URL` (Formspree endpoint) only
    - custom webhook mode: `SALES_CHAT_LEADS_WEBHOOK_URL && SALES_CHAT_LEADS_WEBHOOK_SECRET`
  - AI gateway keys are only required when AI response mode is enabled (`SALES_CHAT_AI_FALLBACK_ENABLED=true` and `SALES_CHAT_AI_RESPONSE_MODE!=off`)
  - When `uiAvailable` is false, `/get-started` does not render the chat launcher or window.
  - Missing lead-dispatch config should not prevent `/get-started` from mounting or `/api/chat` from serving non-terminal turns. Lead-delivery failures surface only when a terminal conversion action attempts dispatch.
- Required request body (JSON):
  - `sessionId`, `sourcePage`, `inputType`, `inputValue`
  - optional `buttonId`
  - optional `stateToken` (authoritative signed conversation state returned by the previous response; required for follow-up turns in practice)
  - optional `conversationState` (`nodeId`, `exchangeCount`, `memory`, `convertedAction`) for compatibility/debugging only; server routing should trust `stateToken`
  - optional `conversationHistory` (up to 8 recent turns, each `{ role, content }`) for AI context
- Response behavior:
  - `200` + deterministic JSON payload (`assistantMessage`, `quickReplies`, `nodeId`, `conversationState`, `stateToken`, optional terminal action).
  - when AI response upgrades are used, payload shape stays the same and only `assistantMessage` / `recommendedOffer` may be upgraded.
  - AI response observability fields:
    - `responseMode: "deterministic" | "ai_assisted"`
    - `aiDecisionReason?: "broad_mode" | "long_tail_trigger" | "repair_success" | "canary_skip" | "banned_phrase_blocked" | "guardrail_reject" | "gateway_error" | "disabled"`
    - `aiGuardrailCode?: "pricing_drift" | "semantic_mismatch" | "banned_phrase_blocked"`
    - `aiModelUsed?: string`
    - `aiLatencyMs?: number`
    - `aiLatencyBucket?: string`
    - `aiPromptVersion?: string`
    - `aiRepairAttempted?: boolean`
    - `aiOrchestrationPath?: "orchestrated_primary" | "orchestrated_repair" | "deterministic_fallback"`
    - `aiFallbackReason?: string`
    - `aiConfidence?: number`
    - `aiIntentHint?: string`
  - Success payload observability fields:
    - `leadDispatchStatus?: "none" | "attempted" | "succeeded" | "failed"`
    - `leadDispatchCode?: string` (sanitized machine-readable reason, e.g. `webhook_http_error`, `duplicate_suppressed`, `configuration_missing`)
  - `400` for schema violations.
  - `503` for disabled chat route or missing deterministic config.
- Error payload format is JSON and always includes:
  - `error`: human-safe fallback message,
  - `fallbackToHuman: true`,
  - optional `errorType` (`disabled`, `config_missing`, `invalid_request`).
- Response headers used for tracing:
  - `x-sales-chat-route`: event code (`success`, `ai_fallback`, `disabled`, `config_missing`, etc.).
  - `x-request-id`: request correlation ID on successful responses.
- Local quick probes:
  - 400 path: `curl -i -X POST http://localhost:3000/api/chat -H "content-type: application/json" -d '{"sourcePage":"/get-started"}'`
  - happy path: `curl -i -X POST http://localhost:3000/api/chat -H "content-type: application/json" -d '{"sessionId":"session-12345678","sourcePage":"/get-started","inputType":"button","inputValue":"","buttonId":"__init__"}'`

### Localhost sales-chat quickstart (recommended)

Use this minimal local config so `/get-started` chat always mounts and lead dispatch can be tested without external services:

```bash
SALES_CHAT_ENABLED=true
SALES_CHAT_BOOKING_URL=http://localhost:3000/get-started#book-call
SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL=http://localhost:3000/pricing
SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL=http://localhost:3000/get-started#book-call
SALES_CHAT_STATE_SECRET=local-sales-chat-secret
SALES_CHAT_LEADS_WEBHOOK_URL=http://localhost:3000/api/sales-chat/leads
SALES_CHAT_LEADS_WEBHOOK_SECRET=local-sales-chat-secret
SALES_CHAT_AI_FALLBACK_ENABLED=false
SALES_CHAT_AI_RESPONSE_MODE=broad
```

Notes:
- The webhook URL above is an intentional self-loop to `/api/sales-chat/leads` for local smoke testing.
- Restart `pnpm dev` after editing `.env.local`.
- Run `pnpm smoke:sales-chat:local` while dev server is running to validate end-to-end deterministic flow + terminal lead dispatch.

### Sales chat operations notes

- Deterministic mode is always authoritative for conversion-critical intents (A–G) and pricing copy.
- AI response mode supports:
  - `long_tail`: upgrades free-text turns plus generic fallback turns (`fallbackRephrase` or unknown FAQ response)
  - `broad`: upgrades all non-terminal turns except the `__init__` welcome bootstrap
  - `off`: deterministic only
- AI response mode is gated behind `SALES_CHAT_AI_FALLBACK_ENABLED=true` plus complete gateway config (`AI_GATEWAY_BASE_URL`, `AI_GATEWAY_API_KEY`, `AI_GATEWAY_MODEL`) when mode is not `off`.
- AI orchestration canary controls:
  - `SALES_CHAT_AI_ORCHESTRATION_ENABLED=true` enables orchestrated generation path.
  - `SALES_CHAT_AI_ORCHESTRATION_PERCENT` gates by session hash bucket (0-100).
  - `SALES_CHAT_AI_ORCHESTRATION_COHORT` tags telemetry for rollout slices.
- AI upgrades are non-authoritative:
  - deterministic state transitions, quick replies, terminal actions, and lead dispatch remain source of truth.
  - generated responses are rejected when they introduce non-canonical pricing values, semantic mismatches, or banned dead-end fallback phrasing.
- If the chat route returns a JSON error, it always includes `error`, `fallbackToHuman: true`, and `errorType`.
- Never store or log the raw API key in code, logs, or git notes. The `app/api/chat/route.ts` implementation only logs redacted metadata (`requestId`, sanitized hashes, counts).
- For local QA of fallback UX, test with invalid payload (400) and deterministic-config-missing fallback (503 + handoff message).
- Deployment guardrail:
  - if `SALES_CHAT_ENABLED` resolves true in production, CI requires CTA keys + a usable state-signing secret source + lead webhook URL via `pnpm verify:sales-chat-config`.
  - CI requires `SALES_CHAT_LEADS_WEBHOOK_SECRET` only when the lead webhook URL is not a Formspree endpoint.
  - if AI response mode is enabled (`SALES_CHAT_AI_FALLBACK_ENABLED=true` and `SALES_CHAT_AI_RESPONSE_MODE!=off`), CI additionally requires `AI_GATEWAY_BASE_URL`, `AI_GATEWAY_API_KEY`, and `AI_GATEWAY_MODEL`.

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
  - `sales_chat_ai_response_used`
  - `sales_chat_ai_response_rejected`
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
  - `sales_chat_ai_response_used` or `sales_chat_ai_response_rejected`
  - `sales_chat_lead_payload_attempted`
  - `sales_chat_lead_payload_emitted` or `sales_chat_lead_payload_failed`
- Recommended GA4 custom dimensions:
  - `node_id`
  - `recommended_offer`
  - `response_mode`
  - `ai_decision_reason`
  - `ai_guardrail_code`
  - `ai_model_used`
  - `ai_latency_ms`
  - `ai_prompt_version`
  - `ai_repair_attempted`
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
  - Custom webhook mode: `dispatchSalesChatLead` signs payloads with HMAC SHA-256 in `x-sales-chat-signature` using `SALES_CHAT_LEADS_WEBHOOK_SECRET`.
- Formspree mode: payloads are sent as flattened fields (`Accept: application/json`) without custom signature headers.

### Homepage ElevenLabs hero

- The first viewport on `/` mounts the stock ElevenLabs `HomeHeroAgent` experience (`components/home/HomeHeroAgent.tsx`) alongside the hero copy.
- The hero uses the official ElevenLabs widget embed script plus an inline `<elevenlabs-convai variant="expanded">` element, with the public Prism Sales agent id passed through `lib/elevenlabs.ts`.
- The public agent id resolves through `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`, with a hardcoded fallback to Prism Sales (`agent_4701kkcyc4efefkv5x4awhysjyrh`) so the hero still works when the env var is omitted.
- External markdown links only become clickable when their host passes the trusted-host allowlist. Override `NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS` if the agent should link somewhere else.
- The homepage intentionally keeps the widget visually stock. The only non-default behavior is a homepage-only desktop centering override so the expanded card sits in the middle of the hero stage.
- The hero should remain user-initiated. Do not add auto-open or auto-start behavior that could trigger surprise mic prompts, autoplay regressions, or visual-test instability.

### Global ElevenLabs launcher

- `components/global-elevenlabs-widget.tsx` mounts the same public Prism Sales agent on all non-homepage routes.
- The global launcher now uses the stock floating widget, not a custom launcher shell or dialog.
- On `/get-started`, the launcher automatically hides itself when the dedicated Prism sales-chat launcher is present, and acts as a subtle fallback when that route-specific chat is unavailable.

### Notes

- `NEXT_PUBLIC_ELEVENLABS_BOOKING_URL` is only used by the legacy/custom ElevenLabs helper path. It does not make stock-widget responses clickable on its own; the agent still has to return a markdown link and the host still has to be allowlisted.
- In local dev, the stock widget may occasionally log `[ConversationalAI] Cannot fetch config for agent ... signal is aborted without reason` during remount/cleanup. The current widget bundle aborts its own config fetch on unmount, so this is expected noise if the UI still renders and the production build is clean.
- If you do not provide Supabase credentials, `app/api/prism-leads` will still return success to the user but will skip persistence. Use this only for local prototypes.
- `GOOGLE_ADS_ID` (`AW-11373090310`) and the Hotjar site ID are currently hard-coded. Update `lib/constants.ts` or `components/hotjar-script.tsx` if you need environment-specific values.
- Vercel Web Analytics does not require a repo env var. Enable it in the Vercel project dashboard, deploy, and then visit the site to start collecting page views.
- `NEXT_PUBLIC_BASE_URL` should always match the public domain you expect search engines and OG scrapers to use (e.g., `https://www.your-preview-domain.com` for staging).
- The Prism Library falls back to `content/library/seed.ts` whenever Instagram/TikTok credentials are missing or unavailable.

## Verification workflow

1. `pnpm diag:supabase` &mdash; ensures the Supabase URL and service key are set.
2. `pnpm verify:deploy` &mdash; confirms `.env.local` contains the URLs required for deployment checks and that `next.config.mjs` has the correct image configuration.
3. For analytics overrides, run the site locally with `NEXT_PUBLIC_GA_MEASUREMENT_ID` defined and confirm the ID matches in the rendered `<head>` output.

Keeping this checklist up to date avoids chasing “why didn’t that form save?” bugs the next time someone new spins up the project.
