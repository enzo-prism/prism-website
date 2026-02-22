# Campaign Link Governance

Use this to keep attribution clean and avoid noisy GA data.

## Funnel destination standards
- Top-of-funnel social profile links (`ig-bio`, `tiktok-bio`): `/offers`
- Thought-leadership/profile links (`x-profile`, `linkedin-profile`): `/proof`
- Content distribution links (`yt-description`, `podcast-show-notes`, `newsletter`): content hubs (`/blog`, `/podcast`)
- High-intent links (`email-signature`, partner, paid ads): `/get-started`

## Naming rules
- Slugs: short, lowercase, hyphen-separated, one intent per slug
- UTM campaign: lowercase snake_case
- Medium values only from allowlist: `social`, `email`, `referral`, `paid_social`, `paid_search`

## Operating cadence
- Add/update links in `lib/campaign-links.ts`
- Run QA before shipping: `pnpm qa:campaign-links`
- Weekly QA in CI/automation should alert on broken or mismatched redirects

## Owner checklist before launch
1. slug exists and is enabled
2. destination matches campaign intent
3. expected utm fields are present
4. tested with final public link
