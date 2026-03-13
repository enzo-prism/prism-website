# Environment & Service Setup

Use this guide to wire the Prism site to the services it still actively depends on. Copy `.env.example` to `.env.local` and fill in only the variables that match the workflow you are actually touching.

```bash
cp .env.example .env.local
```

> `.env.local` is git-ignored, so you can keep per-developer overrides without affecting the repo.

## Variable reference

| Variable | Required | Purpose | Default / Fallback | Used in |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_BASE_URL` | ✅ for accurate SEO | Canonical host for metadata, OG images, RSS feeds, and sitemap generation. | Falls back to `https://www.design-prism.com`. | `app/blog/[slug]/page.tsx`, `app/blog/feed.xml/route.ts`, `app/sitemap.ts` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Override the default GA4 property for analytics. | Falls back to `G-P9VY77PRC0`. | `lib/constants.ts`, `app/layout.tsx` |
| `NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT` | Optional | Override the scholarship Formspree endpoint without code changes. | Defaults to `https://formspree.io/f/mwpwwjek`. | `app/scholarship/ScholarshipPageClient.tsx` |
| `NEXT_PUBLIC_AEO_FORM_ENDPOINT` | Optional | Override the AEO assessment Formspree endpoint without code changes. | Defaults to `https://formspree.io/f/xldarokj`. | `components/forms/AeoAssessmentForm.tsx` |
| `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` | Optional | Public agent id used by the homepage hero and the floating widget on inner pages. | Falls back to Prism Sales (`agent_4701kkcyc4efefkv5x4awhysjyrh`). | `lib/elevenlabs.ts`, `components/home/HomeHeroAgent.tsx`, `components/global-elevenlabs-widget.tsx` |
| `NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS` | Optional | Comma-separated host allowlist for clickable markdown links inside ElevenLabs responses. | Falls back to trusted booking hosts plus Prism domains. | `lib/elevenlabs.ts`, `components/home/HomeHeroAgent.tsx`, `components/global-elevenlabs-widget.tsx` |
| `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED` | Optional | Public kill switch for deterministic visual builds or widget debugging. | Disabled only when explicitly set truthy. Leave unset for normal development and production. | `lib/elevenlabs.ts`, `components/elevenlabs/ElevenLabsWidget.tsx`, `components/home/HomeHeroAgent.tsx`, `components/global-elevenlabs-widget.tsx` |
| `INSTAGRAM_ACCESS_TOKEN` | Optional | Instagram Graph API token for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `INSTAGRAM_USER_ID` | Optional | Instagram Graph API user ID for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `TIKTOK_ACCESS_TOKEN` | Optional | TikTok Display API token for Prism Library. | Falls back to the seed dataset. | `lib/library/getLibraryPosts.ts` |
| `NEXT_PUBLIC_SITE_URL` | Optional | Used by deployment verification scripts for local preview/prod URL comparisons. | None. | `scripts/verify-deployment.ts` |
| `NEXT_PUBLIC_VERCEL_URL` | Optional | Vercel-provided deployment hostname exposed to the client when present. | None. | `scripts/verify-deployment.ts` |

## Intentionally not part of the supported setup anymore

- Supabase credentials are not needed for the current website.
- Resend is not part of the supported Prism website runtime.
- The old custom sales-chat server/client stack has been removed from the supported codepath, so there are no canonical `SALES_CHAT_*` variables to configure.
- If a future project needs a bespoke assistant or custom lead-ingest backend, document that as a new implementation instead of relying on old env names.

## ElevenLabs widget notes

### Homepage hero

- `/` mounts the custom `HomeHeroAgent` card in `components/home/HomeHeroAgent.tsx`.
- The hero uses the official ElevenLabs widget embed script and the inline `<elevenlabs-convai>` element.
- The public agent id resolves through `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`, with a hardcoded fallback to Prism Sales.
- Keep markdown-link hosts limited to trusted booking destinations plus Prism domains.
- The homepage widget host should stay scoped to the hero container so it scrolls away with the section instead of floating above later content.

### Global launcher

- `components/global-elevenlabs-widget.tsx` mounts the stock floating widget on all non-homepage routes.
- On `/get-started`, this launcher is the live assistant surface today.
- Keep its z-index high enough that sticky nav and other fixed chrome never render above the visible widget.

## Notes

- `GOOGLE_ADS_ID` (`AW-11373090310`) and the Hotjar site ID are still hard-coded. Update `lib/constants.ts` or `components/hotjar-script.tsx` if you ever need environment-specific values.
- Vercel Web Analytics does not require an env var. Enable it in the Vercel project dashboard and deploy.
- `NEXT_PUBLIC_BASE_URL` should always match the public domain you expect search engines and OG scrapers to use.
- The Prism Library falls back to `content/library/seed.ts` whenever Instagram/TikTok credentials are missing.
- `NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED=true` is the preferred way to keep visual tests deterministic or isolate non-widget page debugging.

## Verification workflow

1. `pnpm verify:deploy` – confirms `.env.local` contains the URLs required for deployment checks and that `next.config.mjs` has the correct image configuration.
2. For analytics overrides, run the site locally with `NEXT_PUBLIC_GA_MEASUREMENT_ID` defined and confirm the ID matches in the rendered `<head>` output.
