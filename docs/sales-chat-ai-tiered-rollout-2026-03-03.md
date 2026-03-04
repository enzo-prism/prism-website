# Sales Chat AI Tiered Rollout Analysis (2026-03-03)

## Scope
This document records the deep analysis, implementation, and production verification for upgrading `/get-started` sales chat to answer broad user prompts with Vercel AI Gateway while preserving Prism pricing/intent guardrails.

## What changed

### 1) Model routing strategy
Implemented tiered model routing inside `lib/sales-chat/ai-gateway-fallback.ts`:
- Short/simple text turns route to `AI_GATEWAY_FAST_MODEL`.
- Complex or long text turns route to `AI_GATEWAY_MODEL`.
- Complexity gate currently uses:
  - input length threshold (`AI_GATEWAY_FAST_MODEL_MAX_CHARS`, default 190)
  - complexity keyword detection
  - conversation depth guard

### 1.1) Random-query handling hardening
To better answer random/off-topic user messages:
- AI fallback response schema minimum was relaxed (`assistantMessage` min length 20) to reduce avoidable generation failures.
- System prompt now explicitly allows brief helpful random-query responses, then a one-line bridge back to business support.
- Semantic-offer mismatch guardrails are relaxed in broad mode for discovery/faq/objection nodes (`welcome`, `intent_a_*`, `intent_e_*`, `intent_f_*`, `intent_g_*`) so random questions are less likely to fall back to deterministic copy.

Production target values:
- `AI_GATEWAY_MODEL=openai/gpt-5.3-chat`
- `AI_GATEWAY_FAST_MODEL=openai/gpt-5.1-instant`
- `AI_GATEWAY_FAST_MODEL_MAX_CHARS=220`
- `SALES_CHAT_AI_FALLBACK_ENABLED=true`
- `SALES_CHAT_AI_RESPONSE_MODE=broad`

### 2) Gateway compatibility hardening
Resolved production gateway failures by:
- setting `AI_GATEWAY_BASE_URL=https://ai-gateway.vercel.sh/v3/ai`
- ensuring `AI_GATEWAY_API_KEY` is non-empty in production env
- adjusting fallback schema to satisfy strict response-format validation on gateway-backed OpenAI models

### 3) Observability improvements
- Added optional debug logging (toggle via `AI_GATEWAY_DEBUG`) for gateway fallback failures with status + model metadata.
- Kept existing response telemetry fields (`aiDecisionReason`, `aiModelUsed`, `aiLatencyMs`, `aiGuardrailCode`, etc.).

### 4) Test coverage additions
Updated `__tests__/api/chat.test.ts` with new cases:
- short turn uses fast model
- complex turn uses primary model

## Deep analysis findings

### Functional quality
- Deterministic engine remains authoritative for state transitions and conversion terminal actions.
- AI fallback now reliably improves free-text quality in broad mode while preserving deterministic quick-reply paths.

### Safety and policy
- Pricing and semantic guardrails remain active.
- Guardrail repair pass still runs at low temperature before any final reject.
- If gateway fails, chat degrades gracefully to deterministic fallback.

### Latency profile (post-fix validation)
Production verification report: `reports/sales-chat-tiered-verification-2026-03-03.json`

20-turn verification summary:
- short prompts (n=10):
  - 100% AI-assisted
  - model routing: 10/10 `openai/gpt-5.1-instant`
  - avg 3236ms, p50 3101ms, p95 3681ms
- complex prompts (n=10):
  - 100% AI-assisted
  - model routing: 10/10 `openai/gpt-5.3-chat`
  - avg 3120ms, p50 2943ms, p95 3382ms

### Reliability profile
- Post-fix probe windows reached 100% AI-assisted responses in sampled runs.
- No recent `fallback_error` entries in post-fix monitoring window used for release sign-off.

## Remaining risks
1. Gateway credit depletion could silently degrade to deterministic mode if not monitored.
2. Prompt/schema drift from future model updates can reintroduce 400-level schema errors.
3. Broad mode increases AI call volume, so conversion telemetry and cost telemetry should be watched together.

## Controls now in place
- Automated guard cron job in OpenClaw:
  - name: `Prism Sales Chat AI Gateway Guard`
  - cadence: every 2 hours (`:20` PT)
  - checks both `openai/gpt-5.1-instant` and `openai/gpt-5.3-chat`
  - threshold: minimum credits 12
  - behavior: silent on healthy checks, Telegram alert on low credits/failure

## Verification checklist for future releases
1. `vercel pull --yes --environment=production`
2. `pnpm verify:sales-chat-config`
3. `pnpm exec jest __tests__/api/chat.test.ts --runInBand`
4. Deploy: `vercel --prod --yes`
5. Probe `/api/chat` with one short + one complex text prompt and verify:
   - `responseMode=ai_assisted`
   - short => `aiModelUsed=openai/gpt-5.1-instant`
   - complex => `aiModelUsed=openai/gpt-5.3-chat`
6. Check logs:
   - `vercel logs --environment production --since 1h --no-follow --no-branch --query "sales-chat" --source serverless --expand`

## Release outcome
Rollout objective achieved: sales chat now answers broad free-text prompts with tiered fast/high-quality model selection, production verified, and guarded by automated health checks.
