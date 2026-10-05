/**
 * Public proof numbers that appear on more than one route.
 *
 * Keep the source and measurement window beside every value. Refresh the
 * complete snapshot together so homepage, offer, social, and proof pages do
 * not drift apart.
 */
export const PROOF_METRICS_VERIFIED_AT = 'October 4, 2026'

export const CONNECTED_CLIENT_TRAFFIC = {
  month: 'September 2026',
  newUsers: 5_310,
  connectedSites: 16,
  source: 'GA4',
  methodology:
    'September 1-30, 2026 across 16 named case-study client sites; production apex/www only, one property per site. Sum of GA4 new users, not deduplicated people across sites. New documented cohort; not comparable with the historical 17-site snapshot.',
} as const

export const SOCIAL_PROOF = {
  youtube: {
    platform: 'YouTube',
    audience: '24.7K',
    audienceLabel: 'subscribers',
    activity: '5.8M',
    activityLabel: 'lifetime views',
    url: 'https://www.youtube.com/@the_design_prism',
    source:
      'YouTube Studio: 24,718 subscribers; 5,839,447 lifetime views through October 3, 2026. Includes legacy gaming content and public/private/unlisted/deleted videos; not agency campaign views or current reach.',
    verifiedAt: 'October 4, 2026',
  },
  instagram: {
    platform: 'Instagram',
    audience: '37K',
    audienceLabel: 'followers',
    activity: '645',
    activityLabel: 'posts',
    url: 'https://www.instagram.com/the_design_prism/',
    source: 'Instagram account analytics via Ayrshare',
    verifiedAt: 'October 4, 2026',
  },
  tiktok: {
    platform: 'TikTok',
    audience: '11.7K',
    audienceAsOf: 'October 3, 2026',
    audienceLabel: 'followers',
    activity: '1,100',
    activityLabel: 'videos',
    url: 'https://www.tiktok.com/@the_design_prism',
    source:
      'TikTok account analytics via Ayrshare; follower data through October 3, 2026',
    verifiedAt: 'October 4, 2026',
  },
  combinedAudience: '73K+',
  combinedAudienceMethodology:
    'Sum of channel subscriptions and followers; not deduplicated people.',
} as const

export const SOCIAL_PROOF_CHANNELS = [
  SOCIAL_PROOF.youtube,
  SOCIAL_PROOF.instagram,
  SOCIAL_PROOF.tiktok,
] as const
