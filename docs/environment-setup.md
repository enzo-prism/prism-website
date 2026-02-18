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
