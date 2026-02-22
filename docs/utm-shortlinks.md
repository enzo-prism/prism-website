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
- `/go/ig-bio`
- `/go/x-profile`
- `/go/linkedin-profile`
- `/go/tiktok-bio`
- `/go/yt-description`
- `/go/podcast-show-notes`
- `/go/newsletter`
- `/go/email-signature`
- `/go/meta-ad-01`
- `/go/google-ad-01`
- `/go/partner-referral`

## Attribution persistence
Client analytics stores campaign context in first-party localStorage (`prism_attribution_v1`) for 30 days, then enriches downstream events with:
- current or stored `utm_*`
- `gclid`, `fbclid`, `msclkid`
- first-touch fields (`first_touch_source`, `first_touch_medium`, `first_touch_campaign`, `first_touch_at`)
