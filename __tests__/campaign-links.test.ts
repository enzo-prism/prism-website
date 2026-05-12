import { getCampaignLink } from "@/lib/campaign-links"

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
})
