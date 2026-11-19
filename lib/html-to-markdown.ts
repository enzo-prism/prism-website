import TurndownService from "turndown"

/**
 * Server-side conversion of a rendered Prism page into markdown for the
 * `/<path>.md` copies (lib/seo/markdown-routes.ts). Keeps the page's
 * `<main>` content, drops scripts, styles, icons, and anything hidden from
 * readers, and makes links absolute. Turndown parses HTML strings on its own
 * in Node, so no DOM library is needed.
 */

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
}

export function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const point =
        code[1].toLowerCase() === "x"
          ? Number.parseInt(code.slice(2), 16)
          : Number.parseInt(code.slice(1), 10)
      return Number.isFinite(point) ? String.fromCodePoint(point) : match
    }
    return ENTITIES[code.toLowerCase()] ?? match
  })
}

/** The inner HTML of the page's first `<main>`, or its `<body>`. */
export function extractMainHtml(html: string): string {
  const main = /<main\b[^>]*>([\s\S]*)<\/main>/i.exec(html)
  if (main) return main[1]
  const body = /<body\b[^>]*>([\s\S]*)<\/body>/i.exec(html)
  return body ? body[1] : html
}

function readTitle(html: string): string | null {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)
  return match ? decodeEntities(match[1]).trim() : null
}

function readMetaDescription(html: string): string | null {
  const tag = /<meta\b[^>]*name=["']description["'][^>]*>/i.exec(html)?.[0]
  const content = tag ? /content=["']([^"']*)["']/i.exec(tag)?.[1] : null
  return content ? decodeEntities(content).trim() : null
}

function absolute(value: string | null, baseUrl: string): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed || /^(javascript|data):/i.test(trimmed)) return null
  try {
    return new URL(trimmed, baseUrl).toString()
  } catch {
    return null
  }
}

function isHidden(node: HTMLElement): boolean {
  if (node.nodeType !== 1) return false
  if (node.getAttribute("aria-hidden") === "true") return true
  if (node.hasAttribute("hidden")) return true
  const className = node.getAttribute("class") ?? ""
  return /(^|\s)sr-only(\s|$)/.test(className)
}

function buildTurndown(baseUrl: string): TurndownService {
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
  })

  const DROPPED = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "SVG", "CANVAS", "FORM"])
  turndown.remove((node) => DROPPED.has(node.nodeName.toUpperCase()))

  turndown.addRule("absoluteLinks", {
    filter: (node) => node.nodeName === "A" && Boolean((node as HTMLElement).getAttribute("href")),
    replacement: (content, node) => {
      const label = content.replace(/\s+/g, " ").trim()
      const href = absolute((node as HTMLElement).getAttribute("href"), baseUrl)
      if (!href) return label
      return label ? `[${label}](${href})` : ""
    },
  })

  turndown.addRule("images", {
    filter: "img",
    replacement: (_content, node) => {
      const element = node as HTMLElement
      const src = absolute(element.getAttribute("src"), baseUrl)
      const alt = (element.getAttribute("alt") ?? "").replace(/\s+/g, " ").trim()
      // Decorative images (empty alt) and inline data URIs add nothing.
      return src && alt ? `![${alt}](${src})` : ""
    },
  })

  turndown.addRule("media", {
    filter: ["iframe", "video"],
    replacement: (_content, node) => {
      const element = node as HTMLElement
      const src =
        absolute(element.getAttribute("src"), baseUrl) ??
        absolute(element.querySelector?.("source")?.getAttribute("src") ?? null, baseUrl)
      if (!src) return ""
      const title = element.getAttribute("title") || element.getAttribute("aria-label") || "Video"
      return `\n\n[${title.trim()}](${src})\n\n`
    },
  })

  turndown.addRule("buttons", {
    filter: "button",
    replacement: (content) => {
      const label = content.replace(/\s+/g, " ").trim()
      return label ? ` ${label} ` : ""
    },
  })

  // Added last so it is checked first (turndown tries the newest rule
  // first): hidden nodes are dropped whatever their tag.
  turndown.addRule("hidden", {
    filter: (node) => isHidden(node as HTMLElement),
    replacement: () => "",
  })

  return turndown
}

export type PageMarkdownInput = {
  html: string
  /** Canonical URL of the HTML page (links resolve against it). */
  url: string
}

/** A markdown document for one rendered page. */
export function htmlPageToMarkdown({ html, url }: PageMarkdownInput): string {
  const title = readTitle(html) ?? "Prism"
  const description = readMetaDescription(html)
  const body = buildTurndown(url)
    .turndown(extractMainHtml(html))
    // Turndown pads list markers ("-   item"); one space reads better.
    .replace(/^(\s*)(-|\d+\.) {2,}/gm, "$1$2 ")
    // A stray space from inline whitespace before a block (" ![img]").
    .replace(/^ (?=[^\s\-\d])/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  const header = [`# ${title}`, ""]
  if (description) header.push(`> ${description}`, "")
  header.push(
    `Source: ${url}`,
    "",
    "This is the markdown copy of the page above, for AI assistants and agents. Prism's company facts are at https://www.design-prism.com/ai-data.json and the reading guide is at https://www.design-prism.com/llms.txt.",
    "",
    "---",
    "",
  )
  return `${header.join("\n")}${body}\n`
}
