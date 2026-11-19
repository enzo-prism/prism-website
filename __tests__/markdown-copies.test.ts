/** @jest-environment node */
import { GET } from "@/app/api/markdown/[[...path]]/route"
import { decodeEntities, htmlPageToMarkdown } from "@/lib/html-to-markdown"
import { buildRouteMetadata } from "@/lib/seo/metadata"
import {
  markdownPathFor,
  markdownRewritePath,
  prefersMarkdown,
  resolveMarkdownRequest,
} from "@/lib/seo/markdown-routes"
import { proxy } from "@/proxy"

function requestFor(url: string, accept?: string) {
  const parsed = new URL(url)
  const headers = new Headers({ host: parsed.host })
  if (accept) headers.set("accept", accept)
  return {
    nextUrl: { clone: () => new URL(url), ...parsed },
    headers,
  } as never
}

const rewriteOf = (response: Response) => response.headers.get("x-middleware-rewrite")

describe("markdown copy routes", () => {
  it("maps page paths to .md URLs", () => {
    expect(markdownPathFor("/")).toBe("/index.md")
    expect(markdownPathFor("/aeo")).toBe("/aeo.md")
    expect(markdownPathFor("/case-studies/mach-1")).toBe("/case-studies/mach-1.md")
  })

  it("resolves .md requests for indexable pages and blog posts only", () => {
    expect(resolveMarkdownRequest("/index.md")).toEqual({ kind: "page", path: "/" })
    expect(resolveMarkdownRequest("/aeo.md")).toEqual({ kind: "page", path: "/aeo" })
    expect(resolveMarkdownRequest("/case-studies/mach-1.md")).toEqual({
      kind: "page",
      path: "/case-studies/mach-1",
    })
    expect(resolveMarkdownRequest("/blog/dental-seo-guide.md")).toEqual({
      kind: "blog",
      slug: "dental-seo-guide",
    })
    expect(resolveMarkdownRequest("/refer.md")).toBeNull()
    expect(resolveMarkdownRequest("/api/markdown.md")).toBeNull()
    expect(resolveMarkdownRequest("/aeo")).toBeNull()
    expect(markdownRewritePath({ kind: "page", path: "/" })).toBe("/api/markdown")
    expect(markdownRewritePath({ kind: "page", path: "/case-studies/mach-1" })).toBe("/api/markdown/case-studies/mach-1")
  })

  it.each([
    ["text/markdown", true],
    ["text/markdown, text/html;q=0.9", true],
    ["text/markdown, text/html, */*", true],
    ["text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", false],
    ["text/html, text/markdown;q=0.5", false],
    ["*/*", false],
    [null, false],
  ])("Accept %p prefers markdown: %p", (accept, expected) => {
    expect(prefersMarkdown(accept)).toBe(expected)
  })

  it("rewrites .md URLs and markdown Accept headers in the proxy", () => {
    expect(rewriteOf(proxy(requestFor("https://www.design-prism.com/aeo.md")))).toBe(
      "https://www.design-prism.com/api/markdown/aeo",
    )
    expect(
      rewriteOf(proxy(requestFor("https://www.design-prism.com/blog/dental-seo-guide.md"))),
    ).toBe("https://www.design-prism.com/api/blog/dental-seo-guide/markdown")
    expect(
      rewriteOf(proxy(requestFor("https://www.design-prism.com/aeo", "text/markdown"))),
    ).toBe("https://www.design-prism.com/api/markdown/aeo")
    expect(rewriteOf(proxy(requestFor("https://www.design-prism.com/aeo", "text/html")))).toBeNull()
    expect(
      rewriteOf(proxy(requestFor("https://www.design-prism.com/refer", "text/markdown"))),
    ).toBeNull()
  })

  it("advertises the copy on indexable routes only", () => {
    const types = (path: string) =>
      buildRouteMetadata({
        titleStem: "Test",
        description: "A test page description that is long enough.",
        path,
      }).alternates?.types
    expect(types("/aeo")?.["text/markdown"]).toEqual([{ url: "/aeo.md", title: "Markdown copy" }])
    expect(types("/")?.["text/markdown"]).toEqual([{ url: "/index.md", title: "Markdown copy" }])
    expect(types("/refer")?.["text/markdown"]).toBeUndefined()
  })
})

const PAGE = `<!doctype html><html><head>
<title>AEO for small businesses | Prism</title>
<meta name="description" content="Show up in AI answers &amp; on Google."/>
</head><body><header><nav><a href="/">Home</a></nav></header>
<main id="main-content">
<h1>aeo.</h1><svg><path d="M0"/></svg>
<p>We fix <a href="/aeo#faq">crawler access</a> and <strong>page answers</strong>.</p>
<span aria-hidden="true">decorative</span><span class="sr-only">screen reader only</span>
<img src="/logo.png" alt="Prism logo"/><img src="/bg.png" alt=""/>
<script>window.x = 1</script>
<ul><li>One</li><li>Two</li></ul>
</main><footer>Footer links</footer></body></html>`

describe("htmlPageToMarkdown", () => {
  const markdown = htmlPageToMarkdown({ html: PAGE, url: "https://www.design-prism.com/aeo" })

  it("keeps the main content with absolute links", () => {
    expect(markdown).toContain("# AEO for small businesses | Prism")
    expect(markdown).toContain("> Show up in AI answers & on Google.")
    expect(markdown).toContain("Source: https://www.design-prism.com/aeo")
    expect(markdown).toContain("# aeo.")
    expect(markdown).toContain("[crawler access](https://www.design-prism.com/aeo#faq)")
    expect(markdown).toContain("**page answers**")
    expect(markdown).toContain("![Prism logo](https://www.design-prism.com/logo.png)")
    expect(markdown).toMatch(/- One\n- Two/)
  })

  it("drops scripts, icons, hidden text, decorative images, and page chrome", () => {
    for (const absent of ["window.x", "M0", "decorative", "screen reader only", "bg.png", "Footer links", "[Home]"]) {
      expect(markdown).not.toContain(absent)
    }
  })

  it("decodes entities", () => {
    expect(decodeEntities("a &amp; b &#39;c&#x27; &nbsp;")).toBe("a & b 'c'  ")
  })
})

describe("GET /api/markdown", () => {
  const originalFetch = global.fetch
  afterEach(() => {
    global.fetch = originalFetch
  })

  it("renders the page and returns noindex markdown with a canonical link", async () => {
    const fetchMock = jest.fn().mockResolvedValue(new Response(PAGE, { status: 200 }))
    global.fetch = fetchMock as never
    const { NextRequest } = await import("next/server")
    const response = await GET(new NextRequest("https://www.design-prism.com/api/markdown/aeo"), {
      params: Promise.resolve({ path: ["aeo"] }),
    })
    expect(fetchMock.mock.calls[0][0].toString()).toBe("https://www.design-prism.com/aeo")
    expect(response.status).toBe(200)
    expect(response.headers.get("content-type")).toContain("text/markdown")
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow")
    expect(response.headers.get("link")).toBe('<https://www.design-prism.com/aeo>; rel="canonical"')
    expect(await response.text()).toContain("[crawler access]")
  })

  it("refuses paths that are not indexable pages", async () => {
    const fetchMock = jest.fn()
    global.fetch = fetchMock as never
    const { NextRequest } = await import("next/server")
    for (const path of [["refer"], ["blog", "dental-seo-guide"], ["api", "markdown"], ["", "evil.example", "x"]]) {
      const response = await GET(new NextRequest("https://www.design-prism.com/api/markdown/x"), {
        params: Promise.resolve({ path }),
      })
      expect(response.status).toBe(404)
    }
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
