import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/thanks/", "/ig/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/thanks/"],
      },
    ],
    sitemap: "https://design-prism.com/sitemap.xml", // UPDATED
    host: "https://design-prism.com", // UPDATED
  }
}
