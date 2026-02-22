export type CampaignLink = {
  slug: string
  destination: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent?: string
  utmTerm?: string
  permanent?: boolean
  enabled?: boolean
}

export const CAMPAIGN_LINKS: Record<string, CampaignLink> = {
  // Social profiles
  "ig-bio": {
    slug: "ig-bio",
    destination: "/offers",
    utmSource: "instagram",
    utmMedium: "social",
    utmCampaign: "brand_profile",
    utmContent: "bio_link",
    enabled: true,
  },
  "x-profile": {
    slug: "x-profile",
    destination: "/proof",
    utmSource: "x",
    utmMedium: "social",
    utmCampaign: "brand_profile",
    utmContent: "profile_link",
    enabled: true,
  },
  "linkedin-profile": {
    slug: "linkedin-profile",
    destination: "/proof",
    utmSource: "linkedin",
    utmMedium: "social",
    utmCampaign: "brand_profile",
    utmContent: "profile_link",
    enabled: true,
  },
  "tiktok-bio": {
    slug: "tiktok-bio",
    destination: "/offers",
    utmSource: "tiktok",
    utmMedium: "social",
    utmCampaign: "brand_profile",
    utmContent: "bio_link",
    enabled: true,
  },

  // Content distribution
  "yt-description": {
    slug: "yt-description",
    destination: "/blog",
    utmSource: "youtube",
    utmMedium: "social",
    utmCampaign: "content_distribution",
    utmContent: "video_description",
    enabled: true,
  },
  "podcast-show-notes": {
    slug: "podcast-show-notes",
    destination: "/podcast",
    utmSource: "podcast",
    utmMedium: "social",
    utmCampaign: "content_distribution",
    utmContent: "show_notes",
    enabled: true,
  },

  // Email
  "newsletter": {
    slug: "newsletter",
    destination: "/blog",
    utmSource: "email",
    utmMedium: "email",
    utmCampaign: "newsletter",
    utmContent: "weekly_digest",
    enabled: true,
  },
  "email-signature": {
    slug: "email-signature",
    destination: "/get-started",
    utmSource: "email",
    utmMedium: "email",
    utmCampaign: "email_signature",
    utmContent: "founder_signature",
    enabled: true,
  },

  // Paid + partner
  "meta-ad-01": {
    slug: "meta-ad-01",
    destination: "/get-started",
    utmSource: "meta",
    utmMedium: "paid_social",
    utmCampaign: "offer_test",
    utmContent: "ad_variation_01",
    enabled: true,
  },
  "google-ad-01": {
    slug: "google-ad-01",
    destination: "/get-started",
    utmSource: "google",
    utmMedium: "paid_search",
    utmCampaign: "offer_test",
    utmContent: "rsa_variation_01",
    enabled: true,
  },
  "partner-referral": {
    slug: "partner-referral",
    destination: "/get-started",
    utmSource: "partner",
    utmMedium: "referral",
    utmCampaign: "partner_referral",
    utmContent: "network_intro",
    enabled: true,
  },
}

export function getCampaignLink(slug: string): CampaignLink | null {
  const normalized = slug.trim().toLowerCase()
  const entry = CAMPAIGN_LINKS[normalized]
  if (!entry || entry.enabled === false) return null
  return entry
}
