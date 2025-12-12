/**
 * SEO Inventory Generator
 *
 * Run: `pnpm seo:inventory`
 *
 * This script scans the Next.js App Router `app/` tree plus blog MDX content
 * to produce `seo/inventory.csv` with route-level SEO metadata.
 */

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ts from "typescript"

type MetadataInfo = {
  title?: string
  description?: string
  canonical?: string
  robots?: string
}

type RouteEntry = {
  route: string
  filePath: string
  type: "static" | "blog"
  blogSlug?: string
}

const ROOT = process.cwd()
const APP_DIR = path.join(ROOT, "app")
const BLOG_DIR = path.join(ROOT, "content", "blog")
const OUTPUT_DIR = path.join(ROOT, "seo")
const OUTPUT_CSV = path.join(OUTPUT_DIR, "inventory.csv")

const STRUCTURED_DATA_MARKERS = [
  "CaseStudySchema",
  "ServiceSchema",
  "BlogPostSchema",
  "HowToSchema",
  "VideoObjectSchema",
  "FAQSchema",
  "OrganizationSchema",
  "LocalBusinessSchema",
  "GlobalSchemaGraph",
]

function isPageFile(fileName: string) {
  return /^page\.(tsx|ts|jsx|js)$/.test(fileName)
}

function shouldSkipDir(dirName: string) {
  return (
    dirName === "api" ||
    dirName.startsWith("_") ||
    dirName.startsWith(".") ||
    dirName === "node_modules"
  )
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

function getStringFromExpression(expr: ts.Expression | undefined): string | undefined {
  if (!expr) return undefined
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return expr.text
  }
  if (ts.isTemplateExpression(expr)) {
    const head = expr.head.text
    const spans = expr.templateSpans
    if (spans.every((s) => ts.isStringLiteral(s.expression) || ts.isNoSubstitutionTemplateLiteral(s.expression))) {
      const parts = spans.map((s) => (ts.isStringLiteral(s.expression) || ts.isNoSubstitutionTemplateLiteral(s.expression) ? s.expression.text : ""))
      const tails = spans.map((s) => s.literal.text)
      let out = head
      for (let i = 0; i < spans.length; i++) out += parts[i] + tails[i]
      return out
    }
  }
  return undefined
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

function extractMetadataFromFile(filePath: string): MetadataInfo {
  const sourceText = fs.readFileSync(filePath, "utf8")
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let metadataObj: ts.ObjectLiteralExpression | undefined

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    const isExported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (!isExported) return
    for (const decl of node.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.name.text === "metadata" && decl.initializer && ts.isObjectLiteralExpression(decl.initializer)) {
        metadataObj = decl.initializer
      }
    }
  })

  if (!metadataObj) return {}

  const titleExpr = getProp(metadataObj, "title")
  let title: string | undefined
  if (titleExpr && ts.isObjectLiteralExpression(titleExpr)) {
    title =
      getStringFromExpression(getProp(titleExpr, "default")) ??
      getStringFromExpression(getProp(titleExpr, "absolute"))
  } else {
    title = getStringFromExpression(titleExpr)
  }

  const description = getStringFromExpression(getProp(metadataObj, "description"))

  let canonical: string | undefined
  const alternatesExpr = getProp(metadataObj, "alternates")
  if (alternatesExpr && ts.isObjectLiteralExpression(alternatesExpr)) {
    canonical = getStringFromExpression(getProp(alternatesExpr, "canonical"))
  }

  let robots: string | undefined
  const robotsExpr = getProp(metadataObj, "robots")
  if (robotsExpr) {
    if (ts.isStringLiteral(robotsExpr)) {
      robots = robotsExpr.text
    } else if (ts.isObjectLiteralExpression(robotsExpr)) {
      const indexExpr = getProp(robotsExpr, "index")
      if (indexExpr && indexExpr.kind === ts.SyntaxKind.FalseKeyword) robots = "noindex"
      if (indexExpr && indexExpr.kind === ts.SyntaxKind.TrueKeyword) robots = "index"
    }
  }

  return { title, description, canonical, robots }
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
    const match = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    if (match) {
      const cleaned = stripTags(match[1])
      if (cleaned) return cleaned
    }
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

function computeBlogSeo(slug: string): { title: string; description?: string; canonical: string; h1: string; structured: boolean } {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, "utf8")
  const parsed = matter(raw)
  const fm = parsed.data as any

  const base = "https://www.design-prism.com"
  const canonical = (() => {
    try {
      const u = new URL(fm.canonical || `${base}/blog/${slug}`)
      u.hostname = "www.design-prism.com"
      return u.toString()
    } catch {
      return `${base}/blog/${slug}`
    }
  })()

  const maxTitleLength = 60
  const rawTitle = String(fm.title || "blog post").toLowerCase()
  const brandSuffix = " | prism"
  const seoTitle =
    rawTitle.length + brandSuffix.length <= maxTitleLength
      ? `${rawTitle}${brandSuffix}`
      : rawTitle.length > maxTitleLength
        ? `${rawTitle.slice(0, maxTitleLength - 1)}…`
        : rawTitle

  const h1 = String(fm.h1Title || fm.title || "")

  return {
    title: seoTitle,
    description: fm.description,
    canonical,
    h1,
    structured: true,
  }
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

  routes.sort((a, b) => a.route.localeCompare(b.route))

  const rows = routes.map((entry) => {
    if (entry.type === "blog" && entry.blogSlug) {
      const blogSeo = computeBlogSeo(entry.blogSlug)
      return {
        route: entry.route,
        title: blogSeo.title,
        meta_description: blogSeo.description ?? "",
        canonical: blogSeo.canonical,
        h1: blogSeo.h1,
        robots: "index",
        structured_data: "yes",
      }
    }

    const metadata = extractMetadataFromFile(entry.filePath)
    const dir = path.dirname(entry.filePath)
    const h1 = findFirstH1(dir) ?? ""
    const structured = hasStructuredData(dir)

    return {
      route: entry.route,
      title: metadata.title ?? "",
      meta_description: metadata.description ?? "",
      canonical: metadata.canonical ?? "",
      h1,
      robots: metadata.robots ?? "index",
      structured_data: structured ? "yes" : "no",
    }
  })

  const header = ["route", "title", "meta_description", "canonical", "h1", "robots", "structured_data"]
  const csvLines = [header.join(",")].concat(
    rows.map((r) =>
      header
        .map((key) => {
          const value = (r as any)[key] ?? ""
          const escaped = String(value).replace(/\"/g, "\"\"")
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
