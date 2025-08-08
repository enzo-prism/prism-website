import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/api/", "/thanks/", "/ig/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/_next/static/", "/_next/image/"],
        disallow: ["/api/", "/thanks/"],
      },
    ],
    sitemap: "https://www.design-prism.com/sitemap.xml",
    host: "https://www.design-prism.com",
  }
}
