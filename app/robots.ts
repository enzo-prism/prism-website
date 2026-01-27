import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/thanks",
          "/thanks/",
          "/thanks-call/",
          "/thank-you",
          "/analysis-thank-you",
          "/pricing/thank-you",
          "/book-a-shoot/thank-you",
          "/checkout/launch/thank-you",
          "/checkout/grow/thank-you",
          "/checkout/scale/thank-you",
          "/ig/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: [
          "/api/",
          "/thanks",
          "/thanks/",
          "/thanks-call/",
          "/thank-you",
          "/analysis-thank-you",
          "/pricing/thank-you",
          "/book-a-shoot/thank-you",
          "/checkout/launch/thank-you",
          "/checkout/grow/thank-you",
          "/checkout/scale/thank-you",
        ],
      },
    ],
    sitemap: "https://www.design-prism.com/sitemap.xml",
    host: "www.design-prism.com",
  }
}
