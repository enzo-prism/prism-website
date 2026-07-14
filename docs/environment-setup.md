# Environment & Service Setup

Use this guide to wire the Prism site to the services it still actively depends on. Copy `.env.example` to `.env.local` and fill in only the variables that match the workflow you are actually touching.

```bash
cp .env.example .env.local
```

> `.env.local` is git-ignored, so you can keep per-developer overrides without affecting the repo.

## Variable reference

| Variable                                             | Required            | Purpose                                                                                  | Default / Fallback                                                                           | Used in                                                                                                      |
| ---------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_BASE_URL`                               | ✅ for accurate SEO | Canonical host for metadata, OG images, RSS feeds, and sitemap generation.               | Falls back to `https://www.design-prism.com`.                                                | `app/blog/[slug]/page.tsx`, `app/blog/feed.xml/route.ts`, `app/sitemap.ts`                                   |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`                      | Optional            | Override the default GA4 property for analytics.                                         | Falls back to `G-P9VY77PRC0`.                                                                | `lib/constants.ts`, `app/layout.tsx`                                                                         |
| `NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT`              | Optional            | Override the scholarship Formspree endpoint without code changes.                        | Defaults to `https://formspree.io/f/mwpwwjek`.                                               | `app/scholarship/ScholarshipPageClient.tsx`                                                                  |
| `NEXT_PUBLIC_AEO_FORM_ENDPOINT`                      | Optional            | Override the AEO assessment Formspree endpoint without code changes.                     | Defaults to `https://formspree.io/f/xldarokj`.                                               | `components/forms/AeoAssessmentForm.tsx`                                                                     |
| `NEXT_PUBLIC_WEBSITE_BUILD_FORM_ENDPOINT`            | Optional            | Override the `/websites` order-form Formspree endpoint without code changes.             | Defaults to `https://formspree.io/f/xpqebnbz`.                                               | `components/forms/WebsiteOrderForm.tsx`                                                                      |
| `NEXT_PUBLIC_REFERRAL_FORM_ENDPOINT`                 | Optional            | Override the `/refer` referral-form Formspree endpoint without code changes.             | Defaults to `https://formspree.io/f/meebpgaj`.                                               | `components/forms/ReferralForm.tsx`                                                                          |
| `NEXT_PUBLIC_FOUNDER_OS_FORM_ENDPOINT`               | Optional            | Override the Founder OS application Formspree endpoint without code changes.              | Defaults to `https://formspree.io/f/xkoalapv`.                                               | `components/forms/FounderOsApplicationForm.tsx`                                                             |
| `NEXT_PUBLIC_DASHBOARD_INTAKE_ENDPOINT`              | Optional            | Preferred endpoint for creating or updating a private Growth Dashboard from `/apply`.    | If unset, `/apply` falls back to the Formspree endpoints below.                              | `components/forms/GetStartedForm.tsx`                                                                        |
| `NEXT_PUBLIC_APPLY_FORM_ENDPOINT`                    | Optional            | Override the Growth Dashboard intake Formspree endpoint without code changes.            | Defaults to `https://formspree.io/f/mreroojo` when dashboard intake is unset.                 | `components/forms/GetStartedForm.tsx`                                                                        |
| `NEXT_PUBLIC_GET_STARTED_FORM_ENDPOINT`              | Optional            | Backward-compatible fallback for older local configs that still use the legacy env name. | Used only when `NEXT_PUBLIC_APPLY_FORM_ENDPOINT` is unset.                                   | `components/forms/GetStartedForm.tsx`                                                                        |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`                    | Optional            | Public agent id used by the shared floating widget on `/pricing` and `/contact`.         | Falls back to Prism Sales (`agent_4701kkcyc4efefkv5x4awhysjyrh`).                            | `lib/elevenlabs.ts`, `components/global-elevenlabs-widget.tsx`                                               |
| `NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS` | Optional            | Comma-separated host allowlist for clickable markdown links inside ElevenLabs responses. | Falls back to trusted booking hosts plus Prism domains.                                      | `lib/elevenlabs.ts`, `components/global-elevenlabs-widget.tsx`                                               |
| `NEXT_PUBLIC_ELEVENLABS_HOMEPAGE_ENABLED`           | Optional            | Opt-in for the consent-gated inline Prism guide on the homepage.                          | Disabled unless explicitly set truthy.                                                       | `lib/elevenlabs-widget.ts`, `components/home/HomeElevenLabsAgentSection.tsx`                                 |
| `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED`             | Optional            | Public kill switch for deterministic visual builds or widget debugging.                  | Disabled only when explicitly set truthy. Leave unset for normal development and production. | `lib/elevenlabs.ts`, `components/elevenlabs/ElevenLabsWidget.tsx`, `components/global-elevenlabs-widget.tsx` |
| `INSTAGRAM_ACCESS_TOKEN`                             | Optional            | Instagram Graph API token for Prism Library.                                             | Falls back to the seed dataset.                                                              | `lib/library/getLibraryPosts.ts`                                                                             |
| `INSTAGRAM_USER_ID`                                  | Optional            | Instagram Graph API user ID for Prism Library.                                           | Falls back to the seed dataset.                                                              | `lib/library/getLibraryPosts.ts`                                                                             |
| `TIKTOK_ACCESS_TOKEN`                                | Optional            | TikTok Display API token for Prism Library.                                              | Falls back to the seed dataset.                                                              | `lib/library/getLibraryPosts.ts`                                                                             |
| `NEXT_PUBLIC_SITE_URL`                               | Optional            | Used by deployment verification scripts for local preview/prod URL comparisons.          | None.                                                                                        | `scripts/verify-deployment.ts`                                                                               |
| `NEXT_PUBLIC_VERCEL_URL`                             | Optional            | Vercel-provided deployment hostname exposed to the client when present.                  | None.                                                                                        | `scripts/verify-deployment.ts`                                                                               |

## Intentionally not part of the supported setup anymore

- Supabase credentials are not needed for the current website.
- Resend is not part of the supported Prism website runtime.
- The old custom sales-chat server/client stack has been removed from the supported codepath, so there are no canonical `SALES_CHAT_*` variables to configure.
- If a future project needs a bespoke assistant or custom lead-ingest backend, document that as a new implementation instead of relying on old env names.

## ElevenLabs widget notes

### Global launcher

- `components/global-elevenlabs-widget.tsx` mounts the stock floating widget only on non-mobile `/pricing` and `/contact`; mobile viewports and every other public route intentionally stay widget-free.
- On `/get-started`, the launcher is suppressed so the Growth Dashboard path stays focused on the built-in handoff into `/apply`.
- `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` names the public widget agent only. It is not a server-side assistant key and should not be used to revive the retired custom sales-chat stack.
- Without a saved preference, the widget should start collapsed by default.
- Keep its z-index high enough that sticky nav and other fixed chrome never render above the visible widget when it is mounted.

### Homepage guide

- `NEXT_PUBLIC_ELEVENLABS_HOMEPAGE_ENABLED=true` enables one bounded inline guide after the homepage audience-fit section on supported desktop browsers.
- Keep the flag off until the public agent configuration, Prism Privacy Policy, and Prism Terms of Service contain the required AI, recording, processing, and end-user terms disclosures.
- The first-party disclosure and affirmative acceptance control render before access. The ElevenLabs script and custom element load only after acceptance and only when the section is near the viewport.
- Mobile and unsupported-WebGL browsers receive a lightweight fallback link instead of the vendor runtime. `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED=true` overrides both homepage and global surfaces.

## Notes

- `GOOGLE_ADS_ID` (`AW-11373090310`) and the Hotjar site ID are still hard-coded. Update `lib/constants.ts` or the inline `hotjar-loader` script in `app/layout.tsx` if you ever need environment-specific values.
- Google Analytics, Google Ads, and Hotjar load **only in the real production environment**. Hotjar additionally waits for the first user interaction (pointer/scroll/key, with a 12s fallback) before its script loads — see the `hotjar-loader` script in `app/layout.tsx` — so it is expected to be absent right after page load. The gate is `IS_PRODUCTION_ENV` in `lib/constants.ts`, which reads `NEXT_PUBLIC_VERCEL_ENV` (auto-exposed by Vercel as `production` / `preview` / `development`) and falls back to `NODE_ENV` off-platform. Because Vercel preview builds also run with `NODE_ENV === "production"`, this guard is what stops preview/QA deployments from reporting to the live GA4 property or firing real Google Ads lead conversions. You do not set `NEXT_PUBLIC_VERCEL_ENV` yourself; Vercel provides it.
- Vercel Web Analytics does not require an env var. Enable it in the Vercel project dashboard and deploy. Unlike GA, it is intentionally left ungated so preview traffic is still visible in Vercel's own dashboard.
- `NEXT_PUBLIC_BASE_URL` should always match the public domain you expect search engines and OG scrapers to use.
- The Prism Library falls back to `content/library/seed.ts` whenever Instagram/TikTok credentials are missing.
- `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED=true` is the preferred way to keep visual tests deterministic or isolate non-widget page debugging.

## Verification workflow

1. `pnpm verify:deploy` – confirms `.env.local` contains the URLs required for deployment checks and that `next.config.mjs` has the correct image configuration.
2. For analytics overrides, run the site locally with `NEXT_PUBLIC_GA_MEASUREMENT_ID` defined and confirm the ID matches in the rendered `<head>` output.
