import type { NextRequest } from "next/server"

import { canonicalUrl } from "@/lib/canonical"
import { htmlPageToMarkdown } from "@/lib/html-to-markdown"
import { isMarkdownPagePath } from "@/lib/seo/markdown-routes"

/**
 * Markdown copy of an indexable page: `/api/markdown/<path>` (the homepage
 * is `/api/markdown`). Reached through proxy.ts as `/<path>.md` or with
 * `Accept: text/markdown` (lib/seo/markdown-routes.ts). The page path rides
 * in the URL segments because a proxy rewrite drops the destination's query;
 * blog posts use /api/blog/<slug>/markdown instead. Renders the page from
 * this same deployment and converts its main content, so the copy always
 * matches what the page shows.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments } = await params
  const pagePath = segments?.length ? `/${segments.join("/")}` : "/"
  if (!isMarkdownPagePath(pagePath)) {
    return new Response("No markdown copy for this path", { status: 404 })
  }

  const pageUrl = new URL(pagePath, request.nextUrl.origin)
  let html: string
  try {
    const response = await fetch(pageUrl, {
      headers: { accept: "text/html" },
      next: { revalidate: 3600 },
    })
    if (!response.ok) {
      return new Response(`Page returned ${response.status}`, {
        status: response.status === 404 ? 404 : 502,
      })
    }
    html = await response.text()
  } catch {
    return new Response("Page could not be rendered", { status: 502 })
  }

  const canonical = canonicalUrl(pagePath)
  return new Response(htmlPageToMarkdown({ html, url: canonical }), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // A copy for agents: keep it out of search, credit the HTML page.
      "X-Robots-Tag": "noindex, follow",
      Link: `<${canonical}>; rel="canonical"`,
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
