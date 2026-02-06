import "server-only"


export type TocItem = {
  id: string
  label: string
  level: 2 | 3
}

const HEADING_LEVELS = new Set([2, 3])
const JSX_HEADING_NAMES = new Set(["h2", "h3"])

function normalizeLabel(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function extractText(node: any): string {
  if (!node) return ""
  if (typeof node.value === "string") return node.value
  if (node.type === "text" || node.type === "inlineCode") return node.value ?? ""
  if (node.type === "mdxTextExpression") return ""
  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join("")
  }
  return ""
}

function getExplicitId(attributes?: any[]): string | undefined {
  if (!Array.isArray(attributes)) return undefined
  const attr = attributes.find(
    (item) => item?.type === "mdxJsxAttribute" && item.name === "id",
  )
  if (!attr) return undefined
  return typeof attr.value === "string" ? attr.value : undefined
}

function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, " ")
}

function slugifyFallback(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function extractTocFallback(content: string): TocItem[] {
  const candidates: Array<{
    index: number
    level: 2 | 3
    label: string
    explicitId?: string
  }> = []

  const mdHeading = /^(#{2,3})\s+(.+?)\s*$/gm
  let match: RegExpExecArray | null
  while ((match = mdHeading.exec(content))) {
    const level = match[1].length as 2 | 3
    if (!HEADING_LEVELS.has(level)) continue
    const raw = match[2]
      .replace(/\s+#+\s*$/, "") // remove trailing `###` in "ATX" style headings
      .replace(/[*_`]/g, "") // basic markdown formatting cleanup
      .trim()
    candidates.push({ index: match.index, level, label: raw })
  }

  const htmlHeading = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi
  while ((match = htmlHeading.exec(content))) {
    const level = Number(match[1]) as 2 | 3
    if (!HEADING_LEVELS.has(level)) continue

    const attrs = match[2] ?? ""
    const explicitIdMatch = attrs.match(/\sid=["']([^"']+)["']/i)
    const explicitId = explicitIdMatch?.[1]

    const rawInner = match[3] ?? ""
    const raw = stripHtml(rawInner).trim()
    candidates.push({ index: match.index, level, label: raw, explicitId })
  }

  candidates.sort((a, b) => a.index - b.index)

  const items: TocItem[] = []
  const usedIds = new Set<string>()
  for (const candidate of candidates) {
    const label = normalizeLabel(candidate.label)
    if (!label) continue

    const id = candidate.explicitId || slugifyFallback(label)
    if (!id) continue
    if (usedIds.has(id)) continue

    usedIds.add(id)
    items.push({ id, label, level: candidate.level })
  }

  return items
}

export async function getMdxToc(content: string): Promise<TocItem[]> {
  if (!content) return []
  try {
    const [{ unified }, { default: remarkParse }, { default: remarkMdx }, { visit }, { default: GithubSlugger }] =
      await Promise.all([
        import("unified"),
        import("remark-parse"),
        import("remark-mdx"),
        import("unist-util-visit"),
        import("github-slugger"),
      ])

    const tree = unified().use(remarkParse).use(remarkMdx).parse(content)
    const slugger = new GithubSlugger()
    const items: TocItem[] = []
    const usedIds = new Set<string>()

    visit(tree, (node: any) => {
      if (node?.type === "heading" && HEADING_LEVELS.has(node.depth)) {
        const label = normalizeLabel(extractText(node))
        if (!label) return
        const id = slugger.slug(label)
        if (usedIds.has(id)) return
        usedIds.add(id)
        items.push({
          id,
          label,
          level: node.depth as 2 | 3,
        })
        return
      }

      if (node?.type === "mdxJsxFlowElement" && JSX_HEADING_NAMES.has(node.name)) {
        const level = Number(node.name.replace("h", "")) as 2 | 3
        if (!HEADING_LEVELS.has(level)) return
        const label = normalizeLabel(extractText(node))
        if (!label) return
        const explicitId = getExplicitId(node.attributes)
        const id = explicitId || slugger.slug(label)
        if (usedIds.has(id)) return
        usedIds.add(id)
        items.push({
          id,
          label,
          level,
        })
      }
    })

    return items
  } catch (error) {
    // In Jest (CommonJS) some parser deps are ESM and won't load; the fallback below handles it.
    if (process.env.NODE_ENV !== "test") {
      console.warn("[MDX] Failed to extract table of contents:", error)
    }
    // Fallback: regex-based extraction (keeps TOC working even if parser deps can't load).
    return extractTocFallback(content)
  }
}
