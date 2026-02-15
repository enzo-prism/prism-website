/**
 * SEO Inventory Generator
 *
 * Run: `pnpm seo:inventory`
 *
 * This script scans the Next.js App Router `app/` tree plus blog MDX content
 * to produce `seo/inventory.csv` with route-level SEO metadata and quality flags.
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ts from "typescript"

type MetadataInfo = {
  titleStem?: string
  finalTitle?: string
  description?: string
  canonical?: string
  robots?: string
}

type RouteEntry = {
  route: string
  filePath: string
  type: "static" | "blog" | "library"
  blogSlug?: string
  librarySlug?: string
}

const ROOT = process.cwd()
const APP_DIR = path.join(ROOT, "app")
const BLOG_DIR = path.join(ROOT, "content", "blog")
const OUTPUT_DIR = path.join(ROOT, "seo")
const OUTPUT_CSV = path.join(OUTPUT_DIR, "inventory.csv")
const CANONICAL_HOST = "www.design-prism.com"
const BRAND_SUFFIX = " | Prism"
const TITLE_MIN_LENGTH = 25
const TITLE_MAX_LENGTH = 65
const DESCRIPTION_MIN_LENGTH = 70
const DESCRIPTION_MAX_LENGTH = 170

const TERMINAL_BRAND_PATTERN = /\s*(?:\||-|–|—|:)\s*(?:design\s+)?prism(?:\s+(?:agency|careers|podcast|services|openai\s+guide|case\s+study))?\s*$/i
const REPEATED_PIPE_PATTERN = /\|{2,}/g

const STRUCTURED_DATA_MARKERS = [
  "CaseStudySchema",
  "MinimalCaseStudyPage",
  "ServiceSchema",
  "BlogPostSchema",
  "HowToSchema",
  "VideoObjectSchema",
  "VideoSchema",
  "FAQSchema",
  "FAQSection",
  "PersonSchema",
  "OrganizationSchema",
  "ContactPageSchema",
  "CollectionPageSchema",
  "ItemListSchema",
  "JobPostingSchema",
  "PodcastSeriesSchema",
  "PodcastEpisodeSchema",
  "ProductSchema",
  "WebPageSchema",
  "LocalBusinessSchema",
  "GlobalSchemaGraph",
]

function canonicalUrl(pathOrUrl: string): string {
  try {
    const url = new URL(pathOrUrl, `https://${CANONICAL_HOST}`)
    url.hostname = CANONICAL_HOST
    url.protocol = "https:"
    return url.toString()
  } catch {
    return `https://${CANONICAL_HOST}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`
  }
}

function collapseWhitespace(value: string): string {
  return value.replace(/\\s+/g, " ").trim()
}

function sentenceCaseIfNeeded(value: string): string {
  const collapsed = collapseWhitespace(value)
  if (!collapsed) return ""
  if (collapsed === collapsed.toLowerCase()) {
    return collapsed.charAt(0).toUpperCase() + collapsed.slice(1)
  }
  return collapsed
}

function trimToWordBoundary(value: string, maxLength: number): string {
  if (maxLength <= 0) return ""
  const collapsed = collapseWhitespace(value)
  if (collapsed.length <= maxLength) return collapsed
  const hardSlice = collapsed.slice(0, maxLength)
  const boundary = hardSlice.lastIndexOf(" ")
  if (boundary >= Math.floor(maxLength * 0.6)) return hardSlice.slice(0, boundary).trim()
  return hardSlice.trim()
}

function normalizeTitleStem(input: string): string {
  let output = collapseWhitespace(input).replace(REPEATED_PIPE_PATTERN, "|")
  while (TERMINAL_BRAND_PATTERN.test(output)) {
    output = output.replace(TERMINAL_BRAND_PATTERN, "").trim()
  }
  const cased = sentenceCaseIfNeeded(output.replace(/\\s*(?:\\||-|–|—|:)\\s*$/, "").trim())
  return cased || "Prism"
}

function buildAbsoluteTitle(stem: string): string {
  const normalizedStem = normalizeTitleStem(stem)
  const maxStemLength = TITLE_MAX_LENGTH - BRAND_SUFFIX.length
  return `${trimToWordBoundary(normalizedStem, maxStemLength)}${BRAND_SUFFIX}`
}

function normalizeDescription(input: string): string {
  return trimToWordBoundary(sentenceCaseIfNeeded(input), DESCRIPTION_MAX_LENGTH)
}

function computeSeoIssueFlags(value: string, kind: "title" | "description"): string[] {
  const length = value.trim().length
  const issues: string[] = []
  if (length === 0) return ["missing"]

  if (kind === "title") {
    if (length < TITLE_MIN_LENGTH) issues.push("too_short")
    if (length > TITLE_MAX_LENGTH) issues.push("too_long")
  } else {
    if (length < DESCRIPTION_MIN_LENGTH) issues.push("too_short")
    if (length > DESCRIPTION_MAX_LENGTH) issues.push("too_long")
  }

  return issues
}

function isPageFile(fileName: string) {
  return /^page\.(tsx|ts|jsx|js)$/.test(fileName)
}

function shouldSkipDir(dirName: string) {
  return dirName === "api" || dirName.startsWith("_") || dirName.startsWith(".") || dirName === "node_modules"
}

function toRoutePath(segments: string[]) {
  const cleaned = segments.filter((seg) => !seg.startsWith("(") && !seg.startsWith("@"))
  if (cleaned.length === 0) return "/"
  return "/" + cleaned.join("/")
}

function walkApp(dir: string, segments: string[], out: RouteEntry[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue
      walkApp(path.join(dir, entry.name), [...segments, entry.name], out)
      continue
    }

    if (entry.isFile() && isPageFile(entry.name)) {
      const route = toRoutePath(segments)
      const filePath = path.join(dir, entry.name)
      out.push({ route, filePath, type: "static" })
    }
  }
}

function getStringFromExpression(
  expr: ts.Expression | undefined,
  constStrings?: Map<string, string>,
): string | undefined {
  if (!expr) return undefined
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return expr.text
  }

  if (ts.isIdentifier(expr) && constStrings?.has(expr.text)) {
    return constStrings.get(expr.text)
  }

  if (ts.isParenthesizedExpression(expr)) {
    return getStringFromExpression(expr.expression, constStrings)
  }

  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = getStringFromExpression(expr.left, constStrings)
    const right = getStringFromExpression(expr.right, constStrings)
    if (left !== undefined && right !== undefined) return `${left}${right}`
  }

  if (ts.isTemplateExpression(expr)) {
    const head = expr.head.text
    let value = head
    for (const span of expr.templateSpans) {
      const token = getStringFromExpression(span.expression, constStrings)
      if (token === undefined) return undefined
      value += token + span.literal.text
    }
    return value
  }

  return undefined
}

function getStringOrNull(expr: ts.Expression | undefined): string | null | undefined {
  if (!expr) return undefined
  if (expr.kind === ts.SyntaxKind.NullKeyword) return null
  return getStringFromExpression(expr)
}

function getProp(obj: ts.ObjectLiteralExpression, key: string): ts.Expression | undefined {
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const name = prop.name
    if (ts.isIdentifier(name) && name.text === key) return prop.initializer
    if (ts.isStringLiteral(name) && name.text === key) return prop.initializer
  }
  return undefined
}

function extractConstStrings(sourceFile: ts.SourceFile) {
  const constStrings = new Map<string, string>()

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    if (!(node.declarationList.flags & ts.NodeFlags.Const)) return

    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || !decl.initializer) continue
      const value = getStringFromExpression(decl.initializer, constStrings)
      if (value !== undefined) constStrings.set(decl.name.text, value)
    }
  })

  return constStrings
}

function extractMetadataFromObject(
  metadataObj: ts.ObjectLiteralExpression,
  constStrings: Map<string, string>,
  fallbackRoute: string,
): MetadataInfo {
  const titleExpr = getProp(metadataObj, "title")
  let titleStem = ""

  if (titleExpr && ts.isObjectLiteralExpression(titleExpr)) {
    titleStem =
      getStringFromExpression(getProp(titleExpr, "default"), constStrings) ??
      getStringFromExpression(getProp(titleExpr, "absolute"), constStrings) ??
      ""
  } else {
    titleStem = getStringFromExpression(titleExpr, constStrings) ?? ""
  }

  const description = normalizeDescription(
    getStringFromExpression(getProp(metadataObj, "description"), constStrings) ?? "",
  )

  const alternatesExpr = getProp(metadataObj, "alternates")
  let canonical = canonicalUrl(fallbackRoute)
  if (alternatesExpr && ts.isObjectLiteralExpression(alternatesExpr)) {
    canonical = canonicalUrl(getStringFromExpression(getProp(alternatesExpr, "canonical"), constStrings) ?? fallbackRoute)
  }

  let robots = "index"
  const robotsExpr = getProp(metadataObj, "robots")
  if (robotsExpr) {
    if (ts.isStringLiteral(robotsExpr)) {
      robots = robotsExpr.text.toLowerCase().includes("noindex") ? "noindex" : "index"
    } else if (ts.isObjectLiteralExpression(robotsExpr)) {
      const indexExpr = getProp(robotsExpr, "index")
      if (indexExpr && indexExpr.kind === ts.SyntaxKind.FalseKeyword) robots = "noindex"
    }
  }

  return {
    titleStem,
    finalTitle: buildAbsoluteTitle(titleStem),
    description,
    canonical,
    robots,
  }
}

function extractMetadataFromHelperCall(
  callExpr: ts.CallExpression,
  constStrings: Map<string, string>,
  fallbackRoute: string,
): MetadataInfo {
  const arg = callExpr.arguments[0]
  if (!arg || !ts.isObjectLiteralExpression(arg)) return {}

  const titleStem = getStringFromExpression(getProp(arg, "titleStem"), constStrings) ?? ""
  const description = normalizeDescription(getStringFromExpression(getProp(arg, "description"), constStrings) ?? "")
  const routePath = getStringFromExpression(getProp(arg, "path"), constStrings) ?? fallbackRoute

  const indexExpr = getProp(arg, "index")
  const robots = indexExpr && indexExpr.kind === ts.SyntaxKind.FalseKeyword ? "noindex" : "index"

  return {
    titleStem,
    finalTitle: buildAbsoluteTitle(titleStem),
    description,
    canonical: canonicalUrl(routePath),
    robots,
  }
}

function extractMetadataFromFile(filePath: string, route: string): MetadataInfo {
  const sourceText = fs.readFileSync(filePath, "utf8")
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const constStrings = extractConstStrings(sourceFile)

  let metadataInitializer: ts.Expression | undefined

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    const isExported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (!isExported) return

    for (const decl of node.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.name.text === "metadata" && decl.initializer) {
        metadataInitializer = decl.initializer
      }
    }
  })

  if (!metadataInitializer) return {}

  if (ts.isObjectLiteralExpression(metadataInitializer)) {
    return extractMetadataFromObject(metadataInitializer, constStrings, route)
  }

  if (ts.isCallExpression(metadataInitializer) && ts.isIdentifier(metadataInitializer.expression)) {
    if (metadataInitializer.expression.text === "buildRouteMetadata") {
      return extractMetadataFromHelperCall(metadataInitializer, constStrings, route)
    }
  }

  return {}
}

function stripTags(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function findFirstH1(dir: string): string | undefined {
  const files = fs.readdirSync(dir).filter((f) => /\.(tsx|ts|jsx|js|mdx)$/.test(f))
  const h1Regex = /<(?:[\w$]+\.)?h1[^>]*>([\s\S]*?)<\/(?:[\w$]+\.)?h1>/i
  const componentMarkers = ["SeoHero", "PricingHero", "MinimalCaseStudyPage"]
  let combined = ""

  for (const file of files) {
    if (
      file.startsWith("layout.") ||
      file.startsWith("loading.") ||
      file.startsWith("error.") ||
      file.includes("not-found") ||
      file.includes("global-error")
    ) {
      continue
    }

    const full = path.join(dir, file)
    const text = fs.readFileSync(full, "utf8")
    combined += `\n${text}`
    const match = text.match(h1Regex)
    if (match) {
      const cleaned = stripTags(match[1])
      if (cleaned) return cleaned
      if (match[1]?.trim()) return "dynamic"
    }
  }

  if (componentMarkers.some((marker) => combined.includes(marker))) {
    return "component"
  }

  return undefined
}

function hasStructuredData(dir: string): boolean {
  const files = fs.readdirSync(dir).filter((f) => /\.(tsx|ts|jsx|js|mdx)$/.test(f))
  const combined = files.map((f) => fs.readFileSync(path.join(dir, f), "utf8")).join("\n")
  return STRUCTURED_DATA_MARKERS.some((marker) => combined.includes(marker))
}

function listBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

type LibraryEntry = {
  slug: string
  titleStem: string
  finalTitle: string
  description: string
  canonical: string
  h1: string
}

type LibrarySeedPost = {
  id?: string
  platform?: string
  title?: string
  caption?: string | null
}

function parseLibrarySeedPosts(): LibrarySeedPost[] {
  const seedPath = path.join(ROOT, "content", "library", "seed.ts")
  if (!fs.existsSync(seedPath)) return []

  const sourceText = fs.readFileSync(seedPath, "utf8")
  const sourceFile = ts.createSourceFile(seedPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  let posts: LibrarySeedPost[] = []

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    const isExported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (!isExported) return

    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || decl.name.text !== "librarySeedPosts") continue
      if (!decl.initializer || !ts.isArrayLiteralExpression(decl.initializer)) continue

      posts = decl.initializer.elements
        .filter(ts.isObjectLiteralExpression)
        .map((obj) => ({
          id: getStringFromExpression(getProp(obj, "id")),
          platform: getStringFromExpression(getProp(obj, "platform")),
          title: getStringFromExpression(getProp(obj, "title")),
          caption: getStringOrNull(getProp(obj, "caption")) ?? undefined,
        }))
    }
  })

  return posts
}

function listLibraryEntries(): LibraryEntry[] {
  return parseLibrarySeedPosts()
    .map((post) => {
      if (!post.id || !post.platform) return null
      const slug = `${post.platform}-${post.id}`
      const titleStem = normalizeTitleStem(post.title || "Prism library short")
      const description = normalizeDescription(
        post.caption || `Short lesson from Prism Library: ${post.title || titleStem}.`,
      )
      return {
        slug,
        titleStem,
        finalTitle: buildAbsoluteTitle(titleStem),
        description,
        canonical: canonicalUrl(`/library/${slug}`),
        h1: post.title || titleStem,
      }
    })
    .filter((entry): entry is LibraryEntry => Boolean(entry))
}

function computeBlogSeo(slug: string): {
  titleStem: string
  finalTitle: string
  description: string
  canonical: string
  h1: string
  structured: boolean
} {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  const fm = parsed.data as Record<string, unknown>

  const titleStem = normalizeTitleStem(String(fm.seoTitle || fm.title || "Blog post"))
  const description = normalizeDescription(String(fm.seoDescription || fm.description || ""))
  const canonical = canonicalUrl(String(fm.canonical || `/blog/${slug}`))
  const h1 = String(fm.h1Title || fm.title || "")

  return {
    titleStem,
    finalTitle: buildAbsoluteTitle(titleStem),
    description,
    canonical,
    h1,
    structured: true,
  }
}

function countBrandSuffixes(value: string) {
  return (value.match(/\|\s*Prism/gi) || []).length
}

function issueListToString(issues: string[]) {
  const unique = Array.from(new Set(issues.filter(Boolean)))
  return unique.join(";")
}

function classifyIndexability(robots: string) {
  return robots === "noindex" ? "utility_noindex" : "indexable"
}

function computeTitleIssues(finalTitle: string, robots: string): string {
  const issues = computeSeoIssueFlags(finalTitle, "title")
  if (robots !== "noindex") {
    const suffixCount = countBrandSuffixes(finalTitle)
    if (suffixCount !== 1) issues.push("suffix_not_once")
  }
  return issueListToString(issues)
}

function computeDescriptionIssues(description: string): string {
  return issueListToString(computeSeoIssueFlags(description, "description"))
}

function buildInventory() {
  const routes: RouteEntry[] = []
  walkApp(APP_DIR, [], routes)

  const blogPlaceholderIndex = routes.findIndex((r) => r.route === "/blog/[slug]")
  if (blogPlaceholderIndex !== -1) routes.splice(blogPlaceholderIndex, 1)

  for (const slug of listBlogSlugs()) {
    routes.push({
      route: `/blog/${slug}`,
      filePath: path.join(APP_DIR, "blog", "[slug]", "page.tsx"),
      type: "blog",
      blogSlug: slug,
    })
  }

  const libraryEntries = listLibraryEntries()
  const libraryPlaceholderIndex = routes.findIndex((r) => r.route === "/library/[slug]")
  if (libraryPlaceholderIndex !== -1) routes.splice(libraryPlaceholderIndex, 1)

  for (const entry of libraryEntries) {
    routes.push({
      route: `/library/${entry.slug}`,
      filePath: path.join(APP_DIR, "library", "[slug]", "page.tsx"),
      type: "library",
      librarySlug: entry.slug,
    })
  }

  routes.sort((a, b) => a.route.localeCompare(b.route))

  const rows = routes.map((entry) => {
    if (entry.type === "blog" && entry.blogSlug) {
      const blogSeo = computeBlogSeo(entry.blogSlug)
      const robots = "index"
      return {
        route: entry.route,
        title: blogSeo.titleStem,
        final_title: blogSeo.finalTitle,
        meta_description: blogSeo.description,
        canonical: blogSeo.canonical,
        h1: blogSeo.h1,
        robots,
        indexability_class: classifyIndexability(robots),
        title_issues: computeTitleIssues(blogSeo.finalTitle, robots),
        description_issues: computeDescriptionIssues(blogSeo.description),
        structured_data: blogSeo.structured ? "yes" : "no",
      }
    }

    if (entry.type === "library" && entry.librarySlug) {
      const libraryEntry = libraryEntries.find((item) => item.slug === entry.librarySlug)
      const robots = "index"
      const titleStem = libraryEntry?.titleStem ?? ""
      const finalTitle = libraryEntry?.finalTitle ?? ""
      const description = libraryEntry?.description ?? ""
      return {
        route: entry.route,
        title: titleStem,
        final_title: finalTitle,
        meta_description: description,
        canonical: libraryEntry?.canonical ?? canonicalUrl(`/library/${entry.librarySlug}`),
        h1: libraryEntry?.h1 ?? "",
        robots,
        indexability_class: classifyIndexability(robots),
        title_issues: computeTitleIssues(finalTitle, robots),
        description_issues: computeDescriptionIssues(description),
        structured_data: "yes",
      }
    }

    const metadata = extractMetadataFromFile(entry.filePath, entry.route)
    const dir = path.dirname(entry.filePath)
    const h1 = findFirstH1(dir) ?? ""
    const structured = hasStructuredData(dir)
    const robots = metadata.robots ?? "index"
    const titleStem = metadata.titleStem ?? ""
    const finalTitle = metadata.finalTitle ?? ""
    const description = metadata.description ?? ""

    return {
      route: entry.route,
      title: titleStem,
      final_title: finalTitle,
      meta_description: description,
      canonical: metadata.canonical ?? canonicalUrl(entry.route),
      h1,
      robots,
      indexability_class: classifyIndexability(robots),
      title_issues: computeTitleIssues(finalTitle, robots),
      description_issues: computeDescriptionIssues(description),
      structured_data: structured ? "yes" : "no",
    }
  })

  const header = [
    "route",
    "title",
    "final_title",
    "meta_description",
    "canonical",
    "h1",
    "robots",
    "indexability_class",
    "title_issues",
    "description_issues",
    "structured_data",
  ]

  const csvLines = [header.join(",")].concat(
    rows.map((row) =>
      header
        .map((key) => {
          const value = (row as Record<string, string>)[key] ?? ""
          const escaped = String(value).replace(/"/g, '""')
          return `"${escaped}"`
        })
        .join(","),
    ),
  )

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  fs.writeFileSync(OUTPUT_CSV, csvLines.join("\n"))

  console.log(`✅ SEO inventory written to ${path.relative(ROOT, OUTPUT_CSV)} (${rows.length} routes).`)
}

buildInventory()
