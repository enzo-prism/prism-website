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
    activity: '421.3K',
    activityLabel: 'likes',
    url: 'https://www.tiktok.com/@the_design_prism',
    source:
      'TikTok followers via Ayrshare through October 3, 2026; rounded profile likes (421.3K) supplied by the account owner on October 4, 2026',
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

/**
 * Single-reel Instagram insights, read from Prism's own Reel insights
 * screenshots in public/growth/. Counts are as of when each screenshot was
 * taken, not live totals, so always print them with the reel's post date.
 * The reels clip third-party interviews; show the insights screen only,
 * never the footage.
 */
export const TOP_REELS = [
  {
    id: 'C8ulpLrvSCl',
    platform: 'Instagram',
    posted: 'June 27, 2024',
    views: '2.7M',
    accountsReached: '1,626,261',
    image: '/growth/instagram-hormozi.png',
    width: 490,
    height: 951,
    source: 'Instagram Reel insights screenshot (public/growth/instagram-hormozi.png)',
  },
  {
    id: 'C483wd1SFB6',
    platform: 'Instagram',
    posted: 'March 25, 2024',
    views: '2.3M',
    accountsReached: '1,620,342',
    image: '/growth/instagram-nvidia-stanford.png',
    width: 520,
    height: 974,
    source:
      'Instagram Reel insights screenshot (public/growth/instagram-nvidia-stanford.png)',
  },
  {
    id: 'C7CD7TArrBt',
    platform: 'Instagram',
    posted: 'May 16, 2024',
    views: '950K',
    accountsReached: '599,064',
    image: '/growth/instagram-stats-6.png',
    width: 1000,
    height: 1000,
    source: 'Instagram Reel insights screenshot (public/growth/instagram-stats-6.png)',
  },
] as const
