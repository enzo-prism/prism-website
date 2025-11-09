import { getAllPosts } from "@/lib/mdx"

const CANONICAL_HOST = "www.design-prism.com"

function normalizedOrigin(envUrl?: string): string {
  try {
    const url = new URL(envUrl || `https://${CANONICAL_HOST}`)
    url.hostname = CANONICAL_HOST
    url.protocol = "https:"
    return url.origin
  } catch {
    return `https://${CANONICAL_HOST}`
  }
}

const siteOrigin = normalizedOrigin(process.env.NEXT_PUBLIC_BASE_URL)

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export const runtime = "nodejs"
export const revalidate = 3600

export async function GET() {
  const posts = (await getAllPosts()) ?? []
  const latest = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 25)

  const items = latest
    .map((post) => {
      const link = `${siteOrigin}/blog/${post.slug}`
      return `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${link}</link>
    <guid>${link}</guid>
    <description>${escapeXml(post.description)}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <category>${escapeXml(post.category)}</category>
  </item>`
    })
    .join("\n")

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Prism Blog</title>
  <link>${siteOrigin}/blog</link>
  <description>Playbooks, experiments, and growth notes from the Prism team.</description>
  <language>en-us</language>
  ${items}
</channel>
</rss>`

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
