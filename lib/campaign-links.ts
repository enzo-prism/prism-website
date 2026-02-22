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
  "ig-bio": {
    slug: "ig-bio",
    destination: "/get-started",
    utmSource: "instagram",
    utmMedium: "social",
    utmCampaign: "brand_profile",
    utmContent: "bio_link",
    enabled: true,
  },
  "x-profile": {
    slug: "x-profile",
    destination: "/get-started",
    utmSource: "x",
    utmMedium: "social",
    utmCampaign: "brand_profile",
    utmContent: "profile_link",
    enabled: true,
  },
  "yt-description": {
    slug: "yt-description",
    destination: "/get-started",
    utmSource: "youtube",
    utmMedium: "social",
    utmCampaign: "content_distribution",
    utmContent: "video_description",
    enabled: true,
  },
  "newsletter": {
    slug: "newsletter",
    destination: "/blog",
    utmSource: "email",
    utmMedium: "email",
    utmCampaign: "newsletter",
    utmContent: "weekly_digest",
    enabled: true,
  },
  "partner-referral": {
    slug: "partner-referral",
    destination: "/get-started",
    utmSource: "partner",
    utmMedium: "referral",
    utmCampaign: "partner_referral",
    enabled: true,
  },
}

export function getCampaignLink(slug: string): CampaignLink | null {
  const normalized = slug.trim().toLowerCase()
  const entry = CAMPAIGN_LINKS[normalized]
  if (!entry || entry.enabled === false) return null
  return entry
}
