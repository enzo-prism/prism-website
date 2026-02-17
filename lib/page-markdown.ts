import type TurndownService from "turndown"

const SKIPPED_SELECTOR =
  "script,style,noscript,template,svg,[hidden],[aria-hidden='true'],.sr-only,[data-copy-markdown-control]"

type UrlBuckets = {
  pageLinks: Set<string>
  imageLinks: Set<string>
  videoLinks: Set<string>
}

function toAbsoluteUrl(rawValue: string | null, baseUrl: string): string | null {
  if (!rawValue) return null
  const value = rawValue.trim()
  if (!value) return null
  if (value.startsWith("javascript:")) return null

  try {
    return new URL(value, baseUrl).toString()
  } catch {
    return null
  }
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim()
}

function pruneRoot(root: HTMLElement) {
  root.querySelectorAll(SKIPPED_SELECTOR).forEach((node) => node.remove())
}

function getSourceUrl(doc: Document, overrideBaseUrl?: string): string {
  if (overrideBaseUrl) return overrideBaseUrl
  if (typeof window !== "undefined" && window.location?.href) {
    return window.location.href
  }
  return doc.location?.href ?? "https://www.design-prism.com"
}

function getExtractionRoot(doc: Document): HTMLElement {
  return (
    (doc.querySelector("main") as HTMLElement | null) ??
    (doc.querySelector("article") as HTMLElement | null) ??
    doc.body
  )
}

function getMediaSource(element: Element, baseUrl: string): string | null {
  return (
    toAbsoluteUrl(element.getAttribute("src"), baseUrl) ??
    toAbsoluteUrl(element.getAttribute("data-src"), baseUrl)
  )
}

function collectUrls(root: HTMLElement, baseUrl: string): UrlBuckets {
  const buckets: UrlBuckets = {
    pageLinks: new Set<string>(),
    imageLinks: new Set<string>(),
    videoLinks: new Set<string>(),
  }

  root.querySelectorAll("a[href]").forEach((link) => {
    const href = toAbsoluteUrl(link.getAttribute("href"), baseUrl)
    if (href) buckets.pageLinks.add(href)
  })

  root.querySelectorAll("img").forEach((img) => {
    const src = getMediaSource(img, baseUrl)
    if (src) buckets.imageLinks.add(src)
  })

  root.querySelectorAll("video").forEach((video) => {
    const directVideoSrc = getMediaSource(video, baseUrl)
    if (directVideoSrc) buckets.videoLinks.add(directVideoSrc)

    const posterSrc = toAbsoluteUrl(video.getAttribute("poster"), baseUrl)
    if (posterSrc) buckets.imageLinks.add(posterSrc)

    video.querySelectorAll("source[src]").forEach((source) => {
      const sourceSrc = getMediaSource(source, baseUrl)
      if (sourceSrc) buckets.videoLinks.add(sourceSrc)
    })
  })

  root.querySelectorAll("iframe[src]").forEach((iframe) => {
    const src = getMediaSource(iframe, baseUrl)
    if (src) buckets.videoLinks.add(src)
  })

  return buckets
}

function appendLinkSection(
  sections: string[],
  heading: string,
  urls: Set<string>,
) {
  if (urls.size === 0) return

  const lines = Array.from(urls)
    .sort((a, b) => a.localeCompare(b))
    .map((url) => `- [${url}](${url})`)
    .join("\n")

  sections.push(`## ${heading}\n${lines}`)
}

function normalizeOutput(markdown: string): string {
  return markdown
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function buildTurndown(baseUrl: string) {
  return async (): Promise<TurndownService> => {
    const turndownModule = await import("turndown")
    const TurndownCtor = turndownModule.default

    const turndown = new TurndownCtor({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
      emDelimiter: "*",
      strongDelimiter: "**",
      linkStyle: "inlined",
    })

    turndown.addRule("absoluteLinks", {
      filter: "a",
      replacement: (content, node) => {
        const element = node as HTMLAnchorElement
        const href = toAbsoluteUrl(element.getAttribute("href"), baseUrl)
        const label = normalizeWhitespace(content || element.textContent || href || "")
        if (!href) return label
        return label ? `[${label}](${href})` : href
      },
    })

    turndown.addRule("absoluteImages", {
      filter: "img",
      replacement: (_content, node) => {
        const element = node as HTMLImageElement
        const src = getMediaSource(element, baseUrl)
        if (!src) return ""
        const alt = normalizeWhitespace(element.getAttribute("alt") || "")
        return alt ? `![${alt}](${src})` : `![](${src})`
      },
    })

    turndown.addRule("videoEmbeds", {
      filter: (node) => node.nodeName === "VIDEO",
      replacement: (_content, node) => {
        const element = node as HTMLVideoElement
        const links: string[] = []
        const directSource = getMediaSource(element, baseUrl)
        if (directSource) {
          links.push(`[Video](${directSource})`)
        }

        element.querySelectorAll("source[src]").forEach((source) => {
          const sourceUrl = getMediaSource(source, baseUrl)
          if (sourceUrl) links.push(`[Video source](${sourceUrl})`)
        })

        const poster = toAbsoluteUrl(element.getAttribute("poster"), baseUrl)
        if (poster) {
          links.push(`![Video poster](${poster})`)
        }

        return links.length > 0 ? `\n\n${links.join("\n")}\n\n` : "\n\n"
      },
    })

    turndown.addRule("iframeEmbeds", {
      filter: "iframe",
      replacement: (_content, node) => {
        const element = node as HTMLIFrameElement
        const src = getMediaSource(element, baseUrl)
        if (!src) return ""
        const title = normalizeWhitespace(element.getAttribute("title") || "Embedded content")
        return `\n\n[Embedded content: ${title}](${src})\n\n`
      },
    })

    turndown.addRule("buttons", {
      filter: "button",
      replacement: (content) => {
        const label = normalizeWhitespace(content)
        return label ? `\n\n**Button:** ${label}\n\n` : ""
      },
    })

    turndown.addRule("inputs", {
      filter: (node) =>
        node.nodeName === "INPUT" ||
        node.nodeName === "TEXTAREA" ||
        node.nodeName === "SELECT",
      replacement: (_content, node) => {
        const element = node as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        const label = normalizeWhitespace(
          element.getAttribute("aria-label") ||
            element.getAttribute("placeholder") ||
            element.getAttribute("name") ||
            "",
        )
        return label ? `\n\n**Field:** ${label}\n\n` : ""
      },
    })

    return turndown
  }
}

function toParagraphMarkdown(value: string): string {
  const lines = value
    .split("\n")
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
  return lines.join("\n\n")
}

export async function buildPageMarkdownFromDocument(
  doc: Document,
  options?: { baseUrl?: string },
): Promise<string> {
  const sourceUrl = getSourceUrl(doc, options?.baseUrl)
  const root = getExtractionRoot(doc)
  const clone = root.cloneNode(true) as HTMLElement
  const fullPageClone = doc.body.cloneNode(true) as HTMLElement
  pruneRoot(clone)
  pruneRoot(fullPageClone)

  const urls = collectUrls(fullPageClone, sourceUrl)
  const createTurndown = buildTurndown(sourceUrl)
  const turndown = await createTurndown()
  const bodyMarkdown = normalizeOutput(turndown.turndown(clone.innerHTML))
  const bodyFallback = toParagraphMarkdown(clone.textContent || "")
  const mainBody = bodyMarkdown || bodyFallback || "_No readable content found._"

  const headingFromPage = normalizeWhitespace(
    ((clone.querySelector("h1") as HTMLElement | null)?.innerText || doc.title || "Prism page"),
  )

  const sections: string[] = [
    `# ${headingFromPage}`,
    `Source: [${sourceUrl}](${sourceUrl})`,
    mainBody,
  ]

  appendLinkSection(sections, "Page links", urls.pageLinks)
  appendLinkSection(sections, "Image links", urls.imageLinks)
  appendLinkSection(sections, "Video and embed links", urls.videoLinks)

  return `${normalizeOutput(sections.join("\n\n"))}\n`
}
