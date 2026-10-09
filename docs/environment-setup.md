# Environment & Service Setup

Use this guide to wire the Prism site to the services it still actively depends on. Copy `.env.example` to `.env.local` and fill in only the variables that match the workflow you are actually touching.

```bash
cp .env.example .env.local
```

> `.env.local` is git-ignored, so you can keep per-developer overrides without affecting the repo.

## Variable reference

| Variable                                             | Required            | Purpose                                                                                                 | Default / Fallback                                                                                                                                                                                                                                 | Used in                                                                                                                 |
| ---------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL`                               | ✅ for accurate SEO | Canonical host for metadata, OG images, RSS feeds, and sitemap generation.                              | Falls back to `https://www.design-prism.com`.                                                                                                                                                                                                      | `app/blog/[slug]/page.tsx`, `app/blog/feed.xml/route.ts`, `app/sitemap.ts`                                              |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`                      | Optional            | Override the default GA4 property for analytics.                                                        | Falls back to `G-P9VY77PRC0`.                                                                                                                                                                                                                      | `lib/constants.ts`, `app/layout.tsx`                                                                                    |
| `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL`              | Legacy (inert)      | Google Ads purchase conversion label from the retired `$300` website order (label only; the `AW-` id is added in code). | No effect today: nothing fires a purchase event since the self-serve checkout was retired. Leave unset. See [`docs/analytics.md`](analytics.md#legacy-purchase-redirect). | `lib/constants.ts`, `utils/analytics.ts`                                                                                |
| `NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT`                 | Optional            | Formspree endpoint for the `/waitlist` form, the only live sales funnel while Prism is at capacity.       | Defaults to the dedicated "Prism Waitlist" form `https://formspree.io/f/xvkzkqqp` (notifies enzo@design-prism.com) with `_subject` `New Prism waitlist application`; it shared the Contact form `xjkjbpdb` until 2026-10-07. | `lib/waitlist.ts`, `components/forms/WaitlistForm.tsx`                                                    |
| `NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT`              | Optional            | Override the scholarship Formspree endpoint without code changes.                                       | Defaults to `https://formspree.io/f/mwpwwjek`.                                                                                                                                                                                                     | `app/scholarship/ScholarshipPageClient.tsx`                                                                             |
| `NEXT_PUBLIC_REFERRAL_FORM_ENDPOINT`                 | Optional            | Override the `/refer` referral-form Formspree endpoint without code changes.                            | Defaults to `https://formspree.io/f/meebpgaj`.                                                                                                                                                                                                     | `components/forms/ReferralForm.tsx`                                                                                     |
| `INSTAGRAM_ACCESS_TOKEN`                             | Optional            | Instagram Graph API token for Prism Library.                                                            | Falls back to the seed dataset.                                                                                                                                                                                                                    | `lib/library/getLibraryPosts.ts`                                                                                        |
| `INSTAGRAM_USER_ID`                                  | Optional            | Instagram Graph API user ID for Prism Library.                                                          | Falls back to the seed dataset.                                                                                                                                                                                                                    | `lib/library/getLibraryPosts.ts`                                                                                        |
| `TIKTOK_ACCESS_TOKEN`                                | Optional            | TikTok Display API token for Prism Library.                                                             | Falls back to the seed dataset.                                                                                                                                                                                                                    | `lib/library/getLibraryPosts.ts`                                                                                        |
| `NEXT_PUBLIC_SITE_URL`                               | Optional            | Used by deployment verification scripts for local preview/prod URL comparisons.                         | None.                                                                                                                                                                                                                                              | `scripts/verify-deployment.ts`                                                                                          |
| `NEXT_PUBLIC_VERCEL_URL`                             | Optional            | Vercel-provided deployment hostname exposed to the client when present.                                 | None.                                                                                                                                                                                                                                              | `scripts/verify-deployment.ts`                                                                                          |

## Formspree notes

- Marketing forms post to public `https://formspree.io/f/{hash}` endpoints. This repo does not require a Formspree deploy key at runtime.
- Creating, renaming, or changing notification workflows requires a signed-in Formspree dashboard session.
- After changing any `NEXT_PUBLIC_*` Formspree endpoint in Vercel, redeploy. Those values are inlined at build time.
- `/waitlist` posts to `NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT`, falling back to the dedicated "Prism Waitlist" Formspree form `xvkzkqqp` (created 2026-10-07; previously the Contact form `xjkjbpdb`). The retired intake forms (`xrpzlkrd`, `mwlkrezj`, `mnpqgaya`) receive no traffic; do not delete them until historical submissions are archived. See [`docs/forms.md`](forms.md#waitlist).

## Intentionally not part of the supported setup anymore

- Supabase credentials are not needed for the current website.
- Resend is not part of the supported Prism website runtime.
- The website assistant, homepage guide, floating launcher, and earlier custom sales-chat stack are retired. No assistant environment variables are used by the website.
- If a future project needs a bespoke assistant or custom lead-ingest backend, document that as a new implementation instead of relying on old env names.

## Notes

- `GOOGLE_ADS_ID` (`AW-11373090310`) and the Hotjar site ID are still hard-coded. Update `lib/constants.ts` or the inline `hotjar-loader` script in `app/layout.tsx` if you ever need environment-specific values.
- Google Analytics, Google Ads, and Hotjar load **only in the real production environment**. Hotjar additionally waits for the first user interaction (pointer/scroll/key, with a 12s fallback) before its script loads — see the `hotjar-loader` script in `app/layout.tsx` — so it is expected to be absent right after page load. The gate is `IS_PRODUCTION_ENV` in `lib/constants.ts`, which reads `NEXT_PUBLIC_VERCEL_ENV` (auto-exposed by Vercel as `production` / `preview` / `development`) and falls back to `NODE_ENV` off-platform. Because Vercel preview builds also run with `NODE_ENV === "production"`, this guard is what stops preview/QA deployments from reporting to the live GA4 property or firing real Google Ads lead conversions. You do not set `NEXT_PUBLIC_VERCEL_ENV` yourself; Vercel provides it.
- Vercel Web Analytics does not require an env var. Enable it in the Vercel project dashboard and deploy. Unlike GA, it is intentionally left ungated so preview traffic is still visible in Vercel's own dashboard.
- `NEXT_PUBLIC_BASE_URL` should always match the public domain you expect search engines and OG scrapers to use.
- The Prism Library falls back to `content/library/seed.ts` whenever Instagram/TikTok credentials are missing.

## Verification workflow

1. `pnpm verify:deploy` – confirms `.env.local` contains the URLs required for deployment checks and that `next.config.mjs` has the correct image configuration.
2. For analytics overrides, run the site locally with `NEXT_PUBLIC_GA_MEASUREMENT_ID` defined and confirm the ID matches in the rendered `<head>` output.


### Retired service intake and WebMCP (2026-09-14)

`/website-intake`, `/content-intake`, and `/ads-intake` 308-redirect to `/waitlist?focus=…`. `NEXT_PUBLIC_CONTENT_INTAKE_FORM_ENDPOINT`, `NEXT_PUBLIC_ADS_INTAKE_FORM_ENDPOINT`, `NEXT_PUBLIC_WEBSITE_INTAKE_FORM_ENDPOINT`, and `WEBMCP_ORIGIN_TRIAL_TOKEN` are no longer read by the codebase; remove them from Vercel at your convenience.

### Analytics report property

The operator-only `GA4_PROPERTY_ID` override selects the numeric property for `pnpm seo:ai-report` (default `508295014`, Prism Website in Prism Alpha). It does not change browser tracking and is not required by production. Export it in the shell when running the report.
