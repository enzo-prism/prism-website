import { CAMPAIGN_LINKS, getCampaignLink } from "@/lib/campaign-links"

describe("campaign links", () => {
  it("routes Instagram and TikTok bio links to the blog", () => {
    expect(getCampaignLink("ig-bio")).toMatchObject({
      destination: "/blog",
      utmSource: "instagram",
      utmMedium: "social",
      utmCampaign: "brand_profile",
      utmContent: "bio_link",
    })

    expect(getCampaignLink("tiktok-bio")).toMatchObject({
      destination: "/blog",
      utmSource: "tiktok",
      utmMedium: "social",
      utmCampaign: "brand_profile",
      utmContent: "bio_link",
    })
  })

  it("sends sales-intent links to the waitlist with UTM params intact", () => {
    expect(getCampaignLink("email-signature")).toMatchObject({
      destination: "/waitlist",
      utmSource: "email",
      utmMedium: "email",
      utmCampaign: "email_signature",
      utmContent: "founder_signature",
    })

    expect(getCampaignLink("partner-referral")).toMatchObject({
      destination: "/waitlist",
      utmSource: "partner",
      utmMedium: "referral",
      utmCampaign: "partner_referral",
    })
  })

  it("never points a campaign link at a retired lead funnel", () => {
    for (const link of Object.values(CAMPAIGN_LINKS)) {
      expect(link.destination).not.toMatch(
        /^\/(get-started|apply|free-analysis|contact|book-a-shoot|website-intake|content-intake|ads-intake)\b/,
      )
    }
  })
})
