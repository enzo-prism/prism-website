# Build & Deploy Guide

Keep Prism's Next.js builds predictable by following this checklist whenever you touch UI code or ship to Vercel.

## Required toolchain
- **Node.js** 22.x LTS (Vercel discontinued Node 18 builds, so match 22 locally).
- **pnpm 10.x** – Vercel auto-detects `pnpm-lock.yaml` v9 format and pins to pnpm 10 during deploys, so match that locally via `corepack enable`.
- **macOS/Linux shell** – scripts rely on POSIX utilities (grep, sed) and may fail on Windows CMD.

## Local build flow
1. `pnpm install` – keeps `node_modules` in sync with the lockfile Vercel uses.
2. `pnpm lint` – catches Tailwind/ESLint issues before the Next build step fails.
3. `pnpm typecheck` – **required**. Next's production build runs TypeScript after compilation, so missing fields in typed content arrays (for example `pricingCards` in `app/pricing/client-page.tsx`) will break deploys even if dev mode works.
4. `pnpm test` – optional but strongly recommended before touching shared components or hooks.
5. `pnpm test:visual:locked` – required when touching `/`, `/about`, or `/pricing`; enforces the locked-route screenshots used by CI.
6. `pnpm build` – mirrors `vercel build` locally and surfaces experimental warnings (clientTraceMetadata, etc.) so you can address them early.
7. `pnpm test:visual` – optional broad visual sweep when you touched non-locked routes and want wider screenshot coverage.

If any of these steps fail locally, fix them before opening a PR. The CI build logs show only the first failure; running the full chain locally shortens feedback loops considerably.

## GitHub CLI + Vercel CLI playbook

Use this flow when switching between local, preview, and production changes:

### GitHub CLI

- `gh auth login` to initialize CLI auth.
- `gh auth status` before doing sync-sensitive work.
- `gh pr status -R enzo/prism-website` to confirm merge state quickly.
- `gh issue list -R enzo/prism-website --state open` to see active blockers.
- `gh run list -R enzo/prism-website --limit 20` to review CI health.
- `gh run view <run_id> --log` to inspect full failing logs from the exact CI run.

### Vercel CLI

- `pnpm add -g vercel` (or `pnpm dlx vercel`) to install the CLI.
- `vercel login` (single sign-on for deploy and log access).
- `vercel link` (first run in this repo) so the CLI is scoped to `v0-prism-website-design`.
- `vercel pull --yes` to sync deployment env vars locally (`--environment=production` for prod parity).
- `pnpm verify:sales-chat-config` immediately after `vercel pull` to fail fast when chat is enabled without required deterministic config.
- `pnpm verify:pricing-consistency` before build/deploy to block legacy pricing drift on canonical surfaces.
- Set/refresh sales-chat env vars in preview with explicit scope:
  ```bash
  vercel env add SALES_CHAT_ENABLED preview --force
  vercel env add SALES_CHAT_BOOKING_URL preview --force
  vercel env add SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL preview --force
  vercel env add SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL preview --force
  vercel env add SALES_CHAT_LEADS_WEBHOOK_URL preview --force
  vercel env add SALES_CHAT_LEADS_WEBHOOK_SECRET preview --force

  vercel env add SALES_CHAT_AI_FALLBACK_ENABLED preview --force
  vercel env add SALES_CHAT_AI_RESPONSE_MODE preview --force
  vercel env add SALES_CHAT_AI_ORCHESTRATION_ENABLED preview --force
  vercel env add SALES_CHAT_AI_ORCHESTRATION_PERCENT preview --force
  vercel env add SALES_CHAT_AI_ORCHESTRATION_COHORT preview --force
  vercel env add AI_GATEWAY_BASE_URL preview --force
  vercel env add AI_GATEWAY_API_KEY preview --sensitive --force
  vercel env add AI_GATEWAY_MODEL preview --force
  vercel env add AI_GATEWAY_TIMEOUT_MS preview --force
  vercel env add AI_GATEWAY_FAST_MODEL preview --force
  vercel env add AI_GATEWAY_FAST_MODEL_MAX_CHARS preview --force
  vercel env add AI_GATEWAY_FORCE_FAST_MODEL preview --force
  vercel env add AI_GATEWAY_FALLBACK_MODELS preview --force
  vercel env add AI_GATEWAY_PROVIDER_ORDER preview --force
  ```
- Repeat the same commands with `production` in place of `preview` before production rollout.
- Production rollout command sequence:
  ```bash
  vercel pull --yes --environment=production
  pnpm verify:sales-chat-config
  pnpm test:sales-chat:core
  pnpm test:sales-chat:e2e
  npx vercel deploy --prod --yes
  ```
- Post-deploy monitoring + rollback:
  ```bash
  vercel logs --environment production --since 1h --no-follow --no-branch --query "sales-chat" --source serverless --expand
  vercel rollback <previous-stable-deployment-url>
  ```
- `npx vercel deploy --prod --yes` for production deploys (source deploy; matches CI).
- `npx vercel deploy --yes` for a preview deployment while testing branch work.
- `vercel ls` for recent deployment inventory.
- `vercel logs <deployment-url> --follow` for runtime-level troubleshooting.
- `vercel inspect <deployment-url>` when you need build/runtime metadata during rollout checks.
- `vercel rollback <deployment-url>` for fast production rollback.
- `vercel open` to jump directly to the currently selected deployment in the browser.
- `vercel logs --environment production --since 1h --no-follow --no-branch --query "sales-chat" --source serverless --expand` for route-specific troubleshooting.

### Sales chat rollout playbook

- Before a preview deploy:
  - Confirm `SALES_CHAT_ENABLED` is `"true"` for the environment you want chat tested.
  - Confirm `SALES_CHAT_BOOKING_URL`, `SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL`, `SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL`, and `SALES_CHAT_LEADS_WEBHOOK_URL` are present.
  - If lead backend is not Formspree, confirm `SALES_CHAT_LEADS_WEBHOOK_SECRET` is also present.
  - If AI response mode is enabled (`SALES_CHAT_AI_FALLBACK_ENABLED=true` and `SALES_CHAT_AI_RESPONSE_MODE!=off`), also confirm core `AI_GATEWAY_*` vars are present and orchestration gates are configured for the intended rollout cohort.
- Deployment blocker policy:
  - If `SALES_CHAT_ENABLED` resolves true and any required deterministic key is missing, deployment must fail.
  - CI enforces this with `pnpm verify:sales-chat-config` after `vercel pull --environment=production`.
- If AI response mode is enabled, verify gateway model path and secret scope in the Vercel AI Gateway dashboard before each deploy and rotate API keys when moving through staging/production.
- For AI SDK gateway compatibility, set `AI_GATEWAY_BASE_URL=https://ai-gateway.vercel.sh/v3/ai`.
- Recommended orchestration baseline for `/get-started`:
  - `SALES_CHAT_AI_ORCHESTRATION_ENABLED=true`
  - `SALES_CHAT_AI_ORCHESTRATION_PERCENT=100` for full rollout (reduce for canary)
  - `AI_GATEWAY_MODEL` for complex turns
  - `AI_GATEWAY_FAST_MODEL` for short/simple turns
  - `AI_GATEWAY_FAST_MODEL_MAX_CHARS=220`
- Preview smoke checklist:
  1. Open `/get-started`.
  2. Send 3 short messages from different conversation turns.
  3. Confirm deterministic quick replies render and follow spec flow transitions.
  4. If AI response mode is enabled, send one free-text question and confirm response header is `x-sales-chat-route=ai_fallback`.
  5. Send one random/off-topic question (for example a general curiosity question) and confirm the assistant still returns `ai_assisted`, gives a brief useful answer, and bridges back to business help.
  6. Validate booking link anchors resolve to `#book-call`.
  7. Confirm chat motion polish in the live shell:
    - launcher pulse appears when closed,
    - header high-tech glyph glow/orbit renders when online,
    - on mobile viewport, header glyph orbit remains slow/smooth (not compressed to rapid spin),
    - typing waveform appears while awaiting response.
  8. Simulate one config/provider failure path (mock 503 in local) and verify a single handoff message appears plus clear booking path.
  9. Validate lead dispatch telemetry contract:
    - success path emits `sales_chat_lead_payload_attempted` + `sales_chat_lead_payload_emitted`.
    - failed dispatch path emits `sales_chat_lead_payload_attempted` + `sales_chat_lead_payload_failed` and does **not** emit `sales_chat_lead_payload_emitted`.
  10. Validate GA4 DebugView for deep sales-chat events:
    - `sales_chat_quick_reply_clicked`
    - `sales_chat_spec_node_entered`
    - `sales_chat_offer_recommended`
    - `sales_chat_ai_response_used` or `sales_chat_ai_response_rejected`
    - `sales_chat_lead_payload_attempted`
    - `sales_chat_lead_payload_emitted` or `sales_chat_lead_payload_failed`
- Production verification:
  - Keep the same env names in production and preview to avoid route drift.
  - Keep model/API-key rotation in Vercel dashboard and update local docs after rotation; rotate tokens any time you suspect exposure (browser log capture, screenshot tool traces, or CI artifacts).
  - If `/api/chat` starts returning non-200 in production, inspect:
    - `vercel logs --environment production --since 1h --no-follow --no-branch --query "sales-chat" --source serverless --expand`
    - response headers (`x-sales-chat-route`, `x-request-id`) for root-cause mapping.
  - If conversions appear to drop, validate lead fan-out health by posting one known-valid payload to `/api/sales-chat/leads` in preview before production rollout.
  - Immediate rollback guardrails for broad AI mode:
    - roll back if lead completion rate drops >10% vs trailing 7-day baseline
    - roll back if `sales_chat_error` exceeds 3% of chat sessions
    - first mitigation option: set `SALES_CHAT_AI_RESPONSE_MODE=long_tail` and redeploy
  - If GA funnel charts look incomplete, verify GA4 custom dimensions exist for `node_id`, `recommended_offer`, `response_mode`, `ai_decision_reason`, `terminal_action`, and `lead_dispatch_status`.
  - Confirm non-PII structured logs only: `grep` in logs should show redacted session hashes and no `api_key`/raw secret values.
- Add a release note in PR description referencing:
  - `/api/chat` deterministic response behavior,
  - lead webhook dispatch readiness (`SALES_CHAT_LEADS_WEBHOOK_*`),
  - whether AI response behavior (`long_tail` vs `broad`) was smoke-tested.
  - reliability suite status (`pnpm test:sales-chat:core`, `pnpm test:sales-chat:e2e`, `pnpm test:sales-chat:stress`).

### Deployment checklist

- When deploying chat changes, update env in both preview and production:
  - `SALES_CHAT_ENABLED`
  - `SALES_CHAT_BOOKING_URL`
  - `SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL`
  - `SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL`
  - `SALES_CHAT_LEADS_WEBHOOK_URL`
  - `SALES_CHAT_LEADS_WEBHOOK_SECRET` (required for non-Formspree endpoints)
  - Optional AI response vars:
    - `SALES_CHAT_AI_FALLBACK_ENABLED`
    - `SALES_CHAT_AI_RESPONSE_MODE`
    - `SALES_CHAT_AI_ORCHESTRATION_ENABLED`
    - `SALES_CHAT_AI_ORCHESTRATION_PERCENT`
    - `SALES_CHAT_AI_ORCHESTRATION_COHORT`
    - `AI_GATEWAY_BASE_URL`
    - `AI_GATEWAY_API_KEY`
    - `AI_GATEWAY_MODEL`
    - `AI_GATEWAY_TIMEOUT_MS`
    - `AI_GATEWAY_FAST_MODEL`
    - `AI_GATEWAY_FAST_MODEL_MAX_CHARS`
    - `AI_GATEWAY_FORCE_FAST_MODEL`
    - `AI_GATEWAY_FALLBACK_MODELS`
    - `AI_GATEWAY_PROVIDER_ORDER`
- Add a manual sign-off after preview smoke before merging to `main`.
- Add pricing sign-off:
  - `/pricing` shows only `$1,000 one-time`, `$2,000/month`, and `$0` audit.
  - legacy pricing routes (`/pricing-dental`, `/ai-website-launch`, `/one-time-fee`, `/offers/*`, `/growth`, `/checkout/{launch,grow,scale}`) resolve to `/pricing`.
- If you need to rollback only chat changes, use `vercel rollback` after confirming the previous successful deployment URL.

### CI parity notes

- Production workflow order is:
  1. `UI Lock Screenshots` (`pnpm test:visual:locked`)
  2. `Sales Chat E2E` (`pnpm test:sales-chat:e2e`)
  3. `Build and Deploy` (`pnpm typecheck`, `vercel pull --environment=production`, `pnpm verify:sales-chat-config`, `pnpm verify:pricing-consistency`, `npx vercel deploy --prod --yes`)
- Keep local deploy tests aligned with this order when troubleshooting.
- If production deploy fails with serverless output size issues, prefer source deploy path (`vercel deploy --prod --yes`) and avoid switching back to `--prebuilt` as the default project path.

## Common gotchas
- **Const arrays feeding components** – When you export `const foo = [...] as const`, every member must include the same structural properties. TypeScript will yell during `pnpm typecheck`, but dev mode might not. Example: `pricingCards` in `app/pricing/client-page.tsx` needs `featured` on every entry so the card styling guard is type-safe.
- **Dynamic imports & "use client" boundaries** – Any new shared component in `components/` that uses hooks must include a `"use client"` pragma or be imported with `dynamic(..., { ssr: false })`. Lint passes but the Next build will fail during the React Server Components graph evaluation.
- **Third-party build scripts** – Vercel ignores install scripts (`@sentry/cli`, `sharp`, etc.) unless you grant them via `pnpm approve-builds`. If you add dependencies with post-install hooks, run `pnpm approve-builds` once locally, then commit the generated policy file.
- **Environment variables** – Production builds default to `.env.production`. Missing Supabase or Resend keys do not stop the build but disable API routes, so sanity-check `docs/environment-setup.md` before enabling new integrations.
- **Framer Motion version drift** – We’re on `framer-motion@12`, which removed some legacy props (`whileFocusWithin`, etc.). When porting snippets, wrap focus/hover logic in state (see `components/animations/ripple-highlight.tsx`) instead of relying on deprecated props, otherwise `pnpm typecheck` will fail.
- **Style prop collisions** – Hooks like `useParallaxMouse` return `style` objects. Spread them *inside* a single `style={{ ...parallaxStyle, ...localStyles }}` rather than attaching both `style={...}` and `{...hook}` to the same element—TypeScript flags duplicate props during the build (the animated gradient hero recently broke for this reason).
- **Blend-mode glows** – Elements that rely on `mix-blend-screen` (e.g., the “ai launch offer” halo) disappear if the base layer is pure white. When reusing the glow pattern, either keep a slightly tinted background behind the badge or drop the blend mode entirely so the glow remains visible in production screenshots/builds.

## Final pre-merge checklist
1. Rebase on `main` and resolve conflicts.
2. Run the local build flow above.
3. Skim the diff for accidental lowercase overrides (global styles force lowercase typography by default).
4. Push to `main` or open a PR; Vercel will run `pnpm install`, `pnpm run build`, and ship on success.
5. If the Vercel build fails, pull the failing commit locally, rerun `pnpm build`, and compare logs. Most issues are deterministic when reproduced outside Vercel.
6. For `/api/chat` rollout, validate one preview deployment by: loading `/get-started`, posting a sample message to `/api/chat`, and forcing one handled failure path to confirm booking fallback remains visible.
7. Perfect gate before production cutover:
   - 20 consecutive local core runs (`pnpm test:sales-chat:stress` default),
   - clean CI pass on PR,
   - zero flaky failures in nightly reliability runs.

By following this guide, we avoid slow feedback cycles and surprise production outages caused by type errors or unapproved dependencies.
