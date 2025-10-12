import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/thanks/", "/thanks-call/", "/ig/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/", "/thanks/", "/thanks-call/"],
      },
    ],
    sitemap: "https://www.design-prism.com/sitemap.xml",
    host: "www.design-prism.com",
  }
}
