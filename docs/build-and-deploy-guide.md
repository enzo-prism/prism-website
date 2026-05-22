# Build & Deploy Guide

Keep Prism's Next.js builds predictable by following this checklist whenever you touch UI code or ship to Vercel.

Production is intentionally single-path: GitHub Actions runs the release gates and publishes with `vercel deploy --prod --yes`. `vercel.json` disables Vercel Git auto-deploy on `main` so production does not get duplicate deploys from both GitHub Actions and the Vercel Git integration.

## Required toolchain

- **Node.js** 22.x LTS
- **pnpm** 10.x via `corepack enable`
- **macOS/Linux shell** – scripts rely on POSIX utilities and may fail on Windows CMD

## Local build flow

1. `pnpm install` – keep `node_modules` aligned with the lockfile Vercel uses.
2. `pnpm lint` – catch ESLint/Tailwind issues early.
3. `pnpm typecheck` – required before shipping.
4. `pnpm test` – recommended before touching shared components or hooks.
5. `pnpm test:visual:locked` – required when touching `/`, `/about`, `/pricing`, or `/get-started`.
6. `pnpm exec jest __tests__/sitemap.test.ts __tests__/seo-indexability-guards.test.tsx __tests__/llms.test.ts __tests__/blog-canonical.test.ts --runInBand` – required when changing indexability, sitemap, blog visibility, RSS/latest-post behavior, or `llms.txt`.
7. `pnpm seo:inventory && pnpm seo:lint` – required when changing metadata, route search visibility, or blog curation.
8. `pnpm build` – mirrors the production bundle.
9. `pnpm test:visual` – optional wider visual sweep when you touched other routes.

### Production-parity preview

- `pnpm start` serves the last production build on disk. Rebuild first with `pnpm build` if you want a real preview of current changes.
- Recommended sequence:
  1. `pnpm build`
  2. `pnpm start -p 3005`
  3. test `http://localhost:3005`

## GitHub CLI + Vercel CLI playbook

### GitHub CLI

- `gh auth login`
- `gh auth status`
- `gh pr status -R enzo-prism/prism-website`
- `gh run list -R enzo-prism/prism-website --limit 20`
- `gh run view <run_id> --log`

### Vercel CLI

- `pnpm dlx vercel` or a global `vercel` install is fine.
- `vercel login`
- `vercel link` so the CLI is scoped to the single surviving project.
- `vercel pull --yes --environment=production` to sync production env vars locally.
- `pnpm verify:pricing-consistency` before build/deploy to block pricing drift.
- Preview deployment: `vercel deploy --yes`
- Production override/recovery deployment: `vercel deploy --prod --yes`
- Deployment inventory / debugging:
  - `vercel ls`
  - `vercel inspect <deployment-url>`
  - `vercel logs <deployment-url> --follow`
  - `vercel rollback <deployment-url>`

## Deployment checklist

- Pricing sign-off:
  - `/pricing` shows only `$1,000 one-time`, `$2,000/month`, and `$0` audit
  - legacy pricing routes resolve to `/pricing`
- SEO sign-off when route intent/canonicals changed:
  - `pnpm exec jest __tests__/sitemap.test.ts __tests__/seo-indexability-guards.test.tsx --runInBand`
  - `pnpm seo:inventory && pnpm seo:lint`
- Search-surface sign-off when dental-first visibility changed:
  - sitemap stays in the expected narrow range and excludes noindex routes
  - `public/llms.txt` includes only canonical dental growth, proof, and curated learning URLs
  - representative broad pages such as `/apps`, `/software`, `/openai`, and `/local-seo-agency` are noindex
  - representative dental pages such as `/dental-website`, `/dental-practice-seo-expert`, `/google/dental-ads`, and `/ai-agents/dental` remain indexable

## CI parity notes

- Production workflow order is:
  1. `UI Lock Screenshots` (`pnpm test:visual:locked`)
  2. `Build and Deploy` (`pnpm typecheck`, `vercel pull --environment=production`, `pnpm verify:pricing-consistency`, `vercel deploy --prod --yes`)
- Keep local troubleshooting aligned with that order.
- If production deploy fails, reproduce locally with `pnpm build` first. Most failures are deterministic once you mirror the production bundle.
- After pushing `main`, watch the run with `gh run list --branch main --limit 10` and `gh run watch <run_id> --interval 15`.

## Live production verification

After the workflow succeeds, verify the public domain instead of assuming the release is done:

```bash
curl -sS -L https://www.design-prism.com/sitemap.xml
curl -sS -L https://www.design-prism.com/robots.txt
curl -sS -L https://www.design-prism.com/llms.txt
```

Spot-check robots tags on both sides of the search policy:

- Indexable: `/dental-website`, `/dental-practice-seo-expert`, `/google/dental-ads`, `/blog/dental-seo-guide`
- Noindex: `/apps`, `/software`, `/openai`, `/local-seo-agency`, off-theme blog posts

`robots.txt` should not block public noindex pages. It should only keep API routes closed while allowing `/api/og/`.

## Common gotchas

- **Const arrays feeding components** – every item must include the same structural properties or `pnpm typecheck` can fail only at build time.
- **Dynamic imports and `"use client"` boundaries** – shared hook-using components still need client boundaries.
- **Third-party build scripts** – Vercel ignores install scripts unless you approve them with `pnpm approve-builds`.
- **Environment variables** – keep the canonical env list in `docs/environment-setup.md` and `.env.example` small and current.
- **Framer Motion drift** – we are on `framer-motion@12`; older snippet APIs may fail typecheck.

## Final pre-merge checklist

1. Rebase on `main` and resolve conflicts.
2. Run the local build flow above.
3. Skim the diff for accidental typography/casing regressions.
4. Push to a branch or push/merge `main` when the user explicitly asks for production.
5. Watch GitHub Actions and verify the live domain after the production run succeeds.
6. If Vercel fails, rerun the failing build locally and compare logs before changing deploy setup.
