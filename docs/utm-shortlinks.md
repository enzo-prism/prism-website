# UTM + Shortlink System

Use clean public links via `/go/:slug` while preserving attribution.

## How it works
- Public link: `https://www.design-prism.com/go/ig-bio`
- Redirect target is defined in `lib/campaign-links.ts`
- Route injects UTM params and redirects in a single hop.

## Add a new campaign link
1. Open `lib/campaign-links.ts`
2. Add a new slug entry with:
   - `destination`
   - `utmSource`
   - `utmMedium`
   - `utmCampaign`
   - optional `utmContent`, `utmTerm`
3. Share only the clean `/go/<slug>` URL.

## Conventions
- Use lowercase snake_case for `utm_campaign`.
- Use normalized mediums: `social`, `email`, `referral`, `paid_social`, `paid_search`.
- Keep one intent per slug.

## Current starter slug pack
- `/go/ig-bio` -> `/offers`
- `/go/x-profile` -> `/proof`
- `/go/linkedin-profile` -> `/proof`
- `/go/tiktok-bio` -> `/offers`
- `/go/yt-description` -> `/blog`
- `/go/podcast-show-notes` -> `/podcast`
- `/go/newsletter` -> `/blog`
- `/go/email-signature` -> `/get-started`
- `/go/meta-ad-01` -> `/get-started`
- `/go/google-ad-01` -> `/get-started`
- `/go/partner-referral` -> `/get-started`

## QA
- Local/manual check: `pnpm qa:campaign-links`
- Uses production by default (`https://prism-website-gamma.vercel.app`)
- Override target: `BASE_URL=https://your-preview-url pnpm qa:campaign-links`

## Attribution persistence
Client analytics stores campaign context in first-party localStorage (`prism_attribution_v1`) for 30 days, then enriches downstream events with:
- current or stored `utm_*`
- `gclid`, `fbclid`, `msclkid`
- first-touch fields (`first_touch_source`, `first_touch_medium`, `first_touch_campaign`, `first_touch_at`)
