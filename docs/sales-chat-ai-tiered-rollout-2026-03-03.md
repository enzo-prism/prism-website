# Sales Chat AI Orchestration Rollout Analysis (2026-03-03)

## Scope
This document records the deep analysis, implementation, and production verification for upgrading `/get-started` sales chat from deterministic-first copy to a guarded AI orchestration path while preserving deterministic policy authority for pricing, routing, and conversion actions.

## What changed

### 1) AI orchestration strategy
Implemented primary response orchestration in `lib/sales-chat/ai-orchestrator.ts`:
- Short/simple text turns can route to `AI_GATEWAY_FAST_MODEL`.
- Complex or long text turns route to `AI_GATEWAY_MODEL`.
- Structured output now uses AI SDK best-practice path (`generateText` + `Output.object`) with typed fields for:
  - `assistantMessage`
  - `recommendedOffer`
  - `fallbackToHuman`
  - `intentHint`
  - `nextStepQuestion`
  - `confidence`

Routing complexity currently considers:
- input length threshold (`AI_GATEWAY_FAST_MODEL_MAX_CHARS`)
- complexity keyword detection
- conversation depth guard

### 1.1) Reliability hardening and dead-end prevention
To prevent weak fallback loops and contradictory responses:
- Removed deterministic copy patterns that emitted generic rephrase dead-ends.
- Added policy checks to prevent fallback + confident appended recommendation in the same turn unless confidence/intent alignment is explicit.
- Added normalized banned-phrase blocking in `/api/chat` final response sanitization, with contextual replacement copy when triggered.
- Kept deterministic state machine as policy authority for terminal transitions and conversion safety.

### 2) Gateway compatibility hardening
Resolved production gateway fragility by:
- standardizing AI SDK gateway base URL usage with `AI_GATEWAY_BASE_URL=https://ai-gateway.vercel.sh/v3/ai`
- enforcing complete gateway key checks whenever AI response mode is enabled
- adding timeout + retry controls for generation reliability (`AI_GATEWAY_TIMEOUT_MS`, per-call retry settings)

### 3) Orchestration rollout controls
Added deterministic rollout gates for safer production activation:
- `SALES_CHAT_AI_ORCHESTRATION_ENABLED`
- `SALES_CHAT_AI_ORCHESTRATION_PERCENT` (session hash canary)
- `SALES_CHAT_AI_ORCHESTRATION_COHORT` (telemetry cohort tagging)

The legacy env switch `SALES_CHAT_AI_FALLBACK_ENABLED` remains the master gate for AI response upgrades; orchestration runs only when AI mode is enabled and rollout checks pass.

### 4) Observability improvements
Added richer telemetry across server + client tracking:
- `aiOrchestrationPath`
- `aiFallbackReason`
- `aiLatencyBucket`
- `aiConfidence`
- `aiIntentHint`
- `aiGuardrailCode`
- `x-request-id` continuity and `x-sales-chat-route` route tracing

### 5) Test coverage additions
Updated reliability coverage in:
- `__tests__/api/chat.test.ts`
- `__tests__/sales-chat/spec-v1-copy.test.ts`
- `__tests__/sales-chat/spec-v1-engine.test.ts`
- `__tests__/sales-chat/runtime-config.test.ts`

New checks include:
- banned phrase never returned
- no contradictory fallback+recommendation output
- orchestration rollout defaults/clamps
- AI structured output + fallback handling paths

## Deep analysis findings

### Functional quality
- Deterministic engine still owns node transitions and terminal conversion actions.
- AI now handles response planning on eligible turns, producing more contextual, less brittle free-text responses.
- Off-topic and short-vague inputs are handled with brief useful guidance plus a concrete next step, not dead-end rephrase loops.

### Safety and policy
- Canonical pricing guardrails remain active (`$0`, `$1,000 one-time`, `$2,000/month`).
- Semantic/node guardrails remain active.
- Two-pass generation (primary + repair) runs before deterministic fallback.
- If gateway fails or guardrails reject output, route returns resilient deterministic-safe messaging.

### Latency profile (post-fix validation)
Production verification report: `reports/sales-chat-tiered-verification-2026-03-03.json`

20-turn verification summary:
- short prompts (n=10):
  - 100% AI-assisted
  - model routing: 10/10 fast-model path
  - avg ~3.2s range
- complex prompts (n=10):
  - 100% AI-assisted
  - model routing: 10/10 primary-model path
  - avg ~3.1s range

### Reliability profile
- Post-fix probe windows reached 100% AI-assisted responses in sampled runs.
- Banned phrase incidence target is now explicit: `0`.
- No recent sustained `fallback_error` streaks in post-fix monitoring window used for release sign-off.

## Remaining risks
1. Gateway credit depletion can degrade response quality/coverage if not monitored.
2. Provider behavior drift can still trigger schema/guardrail rejects if prompt contracts are not maintained.
3. Broad mode increases AI request volume; conversion, error, and cost telemetry should be reviewed together.

## Controls now in place
- Automated guard cron job in OpenClaw:
  - name: `Prism Sales Chat AI Gateway Guard`
  - cadence: every 2 hours (`:20` PT)
  - checks both fast and primary model paths
  - threshold: minimum credits 12
  - behavior: silent on healthy checks, Telegram alert on low credits/failure

## Verification checklist for future releases
1. `vercel pull --yes --environment=production`
2. `pnpm verify:sales-chat-config`
3. `pnpm test:sales-chat:core`
4. `pnpm test:sales-chat:e2e`
5. Deploy: `npx vercel deploy --prod --yes`
6. Probe `/api/chat` with one short + one complex text prompt and verify:
   - `responseMode=ai_assisted`
   - short turn uses configured fast-model path
   - complex turn uses configured primary-model path
7. Validate no banned phrase leakage in responses or logs.
8. Check logs:
   - `vercel logs --environment production --since 1h --no-follow --no-branch --query "sales-chat" --source serverless --expand`

## Release outcome
Rollout objective achieved: `/get-started` sales chat now uses guarded AI orchestration for natural, context-aware responses while preserving deterministic conversion safety and canonical pricing guarantees.
