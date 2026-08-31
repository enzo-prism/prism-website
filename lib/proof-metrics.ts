/**
 * Public proof numbers that appear on more than one route.
 *
 * Keep the source and measurement window beside every value. Refresh the
 * complete snapshot together so homepage, offer, social, and proof pages do
 * not drift apart.
 */
export const PROOF_METRICS_VERIFIED_AT = 'August 30, 2026'

export const CONNECTED_CLIENT_TRAFFIC = {
  month: 'July 2026',
  newUsers: 16_882,
  connectedSites: 17,
  source: 'GA4',
  methodology:
    'Production hostnames only across 17 connected client sites; duplicate properties, localhost, preview, and staging traffic excluded.',
} as const

export const SOCIAL_PROOF = {
  youtube: {
    platform: 'YouTube',
    audience: '24.7K',
    audienceLabel: 'subscribers',
    activity: '5.8M',
    activityLabel: 'views',
    url: 'https://www.youtube.com/@the_design_prism',
    source: 'Public YouTube profile',
    verifiedAt: 'August 30, 2026',
  },
  instagram: {
    platform: 'Instagram',
    audience: '37K',
    audienceLabel: 'followers',
    activity: '644',
    activityLabel: 'posts',
    url: 'https://www.instagram.com/the_design_prism/',
    source: 'Public Instagram profile',
    verifiedAt: 'August 30, 2026',
  },
  tiktok: {
    platform: 'TikTok',
    audience: '11.4K',
    audienceLabel: 'followers',
    activity: '1.2M',
    activityLabel: 'views / 60 days',
    url: 'https://www.tiktok.com/@the_design_prism',
    source:
      'Public TikTok profile verified August 30, 2026; authenticated 60-day analytics verified August 21, 2026',
    verifiedAt: 'August 30, 2026',
  },
  combinedAudience: '73K+',
} as const

export const SOCIAL_PROOF_CHANNELS = [
  SOCIAL_PROOF.youtube,
  SOCIAL_PROOF.instagram,
  SOCIAL_PROOF.tiktok,
] as const
