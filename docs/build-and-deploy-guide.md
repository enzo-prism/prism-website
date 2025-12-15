# Build & Deploy Guide

Keep Prism's Next.js builds predictable by following this checklist whenever you touch UI code or ship to Vercel.

## Required toolchain
- **Node.js** 22.x LTS (Vercel discontinued Node 18 builds, so match 22 locally).
- **pnpm 10.x** – Vercel auto-detects `pnpm-lock.yaml` v9 format and pins to pnpm 10 during deploys, so match that locally via `corepack enable`.
- **macOS/Linux shell** – scripts rely on POSIX utilities (grep, sed) and may fail on Windows CMD.

## Local build flow
1. `pnpm install` – keeps `node_modules` in sync with the lockfile Vercel uses.
2. `pnpm lint` – catches Tailwind/ESLint issues before the Next build step fails.
3. `pnpm typecheck` – **required**. Next's production build runs TypeScript after compilation, so missing fields (e.g., forgetting `featured` on every tier in `pricingTiers`) will break deploys even if dev mode works.
4. `pnpm test` – optional but strongly recommended before touching shared components or hooks.
5. `pnpm test:visual` – required when touching `/`, `/about`, or `/pricing`; enforces UI-locked screenshots.
6. `pnpm build` – mirrors `vercel build` locally and surfaces experimental warnings (clientTraceMetadata, etc.) so you can address them early.

If any of these steps fail locally, fix them before opening a PR. The CI build logs show only the first failure; running the full chain locally shortens feedback loops considerably.

## Common gotchas
- **Const arrays feeding components** – When you export `const foo = [...] as const`, every member must include the same structural properties. TypeScript will yell during `pnpm typecheck`, but dev mode might not. Example: `pricingTiers` in `app/pricing/client-page.tsx` needs `featured` on every entry so the card styling guard is type-safe.
- **Dynamic imports & "use client" boundaries** – Any new shared component in `components/` that uses hooks must include a `"use client"` pragma or be imported with `dynamic(..., { ssr: false })`. Lint passes but the Next build will fail during the React Server Components graph evaluation.
- **Third-party build scripts** – Vercel ignores install scripts (`@sentry/cli`, `sharp`, etc.) unless you grant them via `pnpm approve-builds`. If you add dependencies with post-install hooks, run `pnpm approve-builds` once locally, then commit the generated policy file.
- **Environment variables** – Production builds default to `.env.production`. Missing Supabase or Resend keys do not stop the build but disable API routes, so sanity-check `docs/environment-setup.md` before enabling new integrations.
- **Framer Motion version drift** – We’re on `framer-motion@12`, which removed some legacy props (`whileFocusWithin`, etc.). When porting snippets, wrap focus/hover logic in state (see `components/animations/ripple-highlight.tsx`) instead of relying on deprecated props, otherwise `pnpm typecheck` will fail.
- **Style prop collisions** – Hooks like `useParallaxMouse` return `style` objects. Spread them *inside* a single `style={{ ...parallaxStyle, ...localStyles }}` rather than attaching both `style={...}` and `{...hook}` to the same element—TypeScript flags duplicate props during the build (the animated gradient hero recently broke for this reason).
- **Blend-mode glows** – Elements that rely on `mix-blend-screen` (e.g., the “ai launch offer” halo) disappear if the base layer is pure white. When reusing the glow pattern, either keep a slightly tinted background behind the badge or drop the blend mode entirely so the glow remains visible in production screenshots/builds.

## Deployment checklist
1. Rebase on `main` and resolve conflicts.
2. Run the local build flow above.
3. Skim the diff for accidental lowercase overrides (global styles force lowercase typography by default).
4. Push to `main` or open a PR; Vercel will run `pnpm install`, `pnpm run build`, and ship on success.
5. If the Vercel build fails, pull the failing commit locally, rerun `pnpm build`, and compare logs. Most issues are deterministic when reproduced outside Vercel.

By following this guide, we avoid slow feedback cycles and surprise production outages caused by type errors or unapproved dependencies.
