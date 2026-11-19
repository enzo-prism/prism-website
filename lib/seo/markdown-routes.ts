import { isRouteIndexable } from "@/lib/seo/search-visibility"

/**
 * Markdown copies of Prism's pages, for AI agents and answer engines.
 *
 * Every indexable page has one at its URL plus `.md` (`/aeo.md`; the
 * homepage is `/index.md`), and the same markdown comes back when a request
 * asks for `Accept: text/markdown`. proxy.ts rewrites both to:
 * - `/api/blog/<slug>/markdown` for blog posts (the post's MDX source), and
 * - `/api/markdown/<path>` for every other indexable page (the rendered
 *   page's main content, converted in lib/html-to-markdown.ts). The path is
 *   in the URL segments, not the query: a proxy rewrite drops the query.
 *
 * The copies are noindex with a canonical Link header pointing at the HTML
 * page, so they never compete with it in search.
 */

const MARKDOWN_SUFFIX = ".md"
const BLOG_POST_PATH = /^\/blog\/([a-z0-9-]+)$/

export type MarkdownTarget =
  | { kind: "blog"; slug: string }
  | { kind: "page"; path: string }

/** The `.md` URL path for a page path ("/" → "/index.md"). */
export function markdownPathFor(pagePath: string): string {
  const clean = pagePath.replace(/\/+$/, "") || "/"
  return clean === "/" ? `/index${MARKDOWN_SUFFIX}` : `${clean}${MARKDOWN_SUFFIX}`
}

/** True for indexable non-blog pages the markdown route may render. */
export function isMarkdownPagePath(pagePath: string): boolean {
  if (!pagePath.startsWith("/") || pagePath.startsWith("//")) return false
  if (pagePath.startsWith("/blog/")) return false
  if (pagePath.startsWith("/api/")) return false
  return isRouteIndexable(pagePath)
}

/** The markdown source for a page path, or null when it has none. */
export function markdownTargetForPage(pagePath: string): MarkdownTarget | null {
  const blog = BLOG_POST_PATH.exec(pagePath)
  if (blog) return { kind: "blog", slug: blog[1] }
  return isMarkdownPagePath(pagePath) ? { kind: "page", path: pagePath } : null
}

/** Resolves a `.md` request path ("/aeo.md", "/index.md") to its target. */
export function resolveMarkdownRequest(pathname: string): MarkdownTarget | null {
  if (!pathname.endsWith(MARKDOWN_SUFFIX)) return null
  const base = pathname.slice(0, -MARKDOWN_SUFFIX.length)
  if (base === "/index") return markdownTargetForPage("/")
  if (!base || base === "/") return null
  return markdownTargetForPage(base)
}

/** The internal route that serves a target's markdown. */
export function markdownRewritePath(target: MarkdownTarget): string {
  return target.kind === "blog"
    ? `/api/blog/${target.slug}/markdown`
    : `/api/markdown${target.path === "/" ? "" : target.path}`
}

/**
 * True when the Accept header lists text/markdown at least as highly as
 * HTML. Browsers never list text/markdown, so they always get HTML.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false
  const weights = new Map<string, number>()
  for (const part of accept.toLowerCase().split(",")) {
    const [type, ...params] = part.trim().split(";")
    const q = params
      .map((param) => param.trim())
      .find((param) => param.startsWith("q="))
    const weight = q ? Number.parseFloat(q.slice(2)) : 1
    weights.set(type.trim(), Number.isFinite(weight) ? weight : 0)
  }
  const markdown = weights.get("text/markdown") ?? 0
  if (markdown <= 0) return false
  const html = Math.max(
    weights.get("text/html") ?? 0,
    weights.get("application/xhtml+xml") ?? 0,
  )
  return markdown >= html
}
