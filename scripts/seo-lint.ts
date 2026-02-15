import fs from "fs"
import path from "path"

type InventoryRow = Record<string, string>

type Finding = {
  code: string
  detail: string
}

const ROOT = process.cwd()
const INVENTORY_CSV = path.join(ROOT, "seo", "inventory.csv")
const SITEMAP_FILE = path.join(ROOT, "app", "sitemap.ts")
const ROBOTS_FILE = path.join(ROOT, "app", "robots.ts")

function parseCsv(content: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let inQuotes = false

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i]
    const next = content[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"'
        i += 1
      } else if (char === '"') {
        inQuotes = false
      } else {
        field += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
      continue
    }

    if (char === ",") {
      row.push(field)
      field = ""
      continue
    }

    if (char === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
      continue
    }

    if (char === "\r") continue

    field += char
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }

  return rows
}

function readInventory(): InventoryRow[] {
  if (!fs.existsSync(INVENTORY_CSV)) {
    throw new Error(`Missing inventory file: ${INVENTORY_CSV}. Run pnpm seo:inventory first.`)
  }

  const csv = fs.readFileSync(INVENTORY_CSV, "utf8")
  const rows = parseCsv(csv)
  if (rows.length < 2) return []

  const header = rows[0]
  return rows.slice(1).map((values) => {
    const record: InventoryRow = {}
    header.forEach((column, idx) => {
      record[column] = values[idx] ?? ""
    })
    return record
  })
}

function countBrandSuffixes(title: string) {
  return (title.match(/\|\s*Prism/gi) || []).length
}

function extractStringArray(sourceText: string, variableName: string): string[] {
  const escaped = variableName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const arrayRegex = new RegExp(`const\\s+${escaped}\\s*=\\s*\\[([\\s\\S]*?)\\]`, "m")
  const setRegex = new RegExp(`const\\s+${escaped}\\s*=\\s*new\\s+Set\\s*\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)`, "m")
  const match = sourceText.match(arrayRegex) ?? sourceText.match(setRegex)
  if (!match) return []

  const items = Array.from(match[1].matchAll(/"([^"]+)"/g)).map((hit) => hit[1])
  return items
}

function extractDisallowRules(sourceText: string): string[] {
  const disallows: string[] = []
  const regex = /disallow:\s*\[([\s\S]*?)\]/g
  let match = regex.exec(sourceText)
  while (match) {
    const items = Array.from(match[1].matchAll(/"([^"]+)"/g)).map((hit) => hit[1])
    disallows.push(...items)
    match = regex.exec(sourceText)
  }
  return Array.from(new Set(disallows))
}

function isExcludedBySitemap(route: string, exact: Set<string>, prefixes: string[]) {
  if (exact.has(route)) return true
  return prefixes.some((prefix) => route === prefix || route.startsWith(`${prefix}/`))
}

function lint() {
  const rows = readInventory()
  const findings: Finding[] = []

  if (rows.length === 0) {
    findings.push({ code: "inventory_empty", detail: "Inventory has no rows." })
  }

  const indexable = rows.filter((row) => row.indexability_class === "indexable")

  rows.forEach((row) => {
    const finalTitle = row.final_title ?? ""
    const description = row.meta_description ?? ""
    const canonical = row.canonical ?? ""

    if (!finalTitle.trim()) {
      findings.push({ code: "missing_final_title", detail: row.route })
    }
    if (!description.trim()) {
      findings.push({ code: "missing_description", detail: row.route })
    }
    if (!canonical.trim()) {
      findings.push({ code: "missing_canonical", detail: row.route })
    }
  })

  indexable.forEach((row) => {
    const suffixCount = countBrandSuffixes(row.final_title ?? "")
    if (suffixCount !== 1) {
      findings.push({
        code: "suffix_not_once",
        detail: `${row.route} (count=${suffixCount})`,
      })
    }
  })

  const titleGroups = new Map<string, string[]>()
  indexable.forEach((row) => {
    const key = (row.final_title ?? "").trim()
    if (!key) return
    const items = titleGroups.get(key) ?? []
    items.push(row.route)
    titleGroups.set(key, items)
  })
  titleGroups.forEach((routes, title) => {
    if (routes.length > 1) {
      findings.push({
        code: "duplicate_final_title",
        detail: `${title} => ${routes.join(", ")}`,
      })
    }
  })

  const descriptionGroups = new Map<string, string[]>()
  indexable.forEach((row) => {
    const key = (row.meta_description ?? "").trim()
    if (!key) return
    const items = descriptionGroups.get(key) ?? []
    items.push(row.route)
    descriptionGroups.set(key, items)
  })
  descriptionGroups.forEach((routes, description) => {
    if (routes.length > 1) {
      findings.push({
        code: "duplicate_description",
        detail: `${description.slice(0, 120)} => ${routes.join(", ")}`,
      })
    }
  })

  const sitemapText = fs.readFileSync(SITEMAP_FILE, "utf8")
  const noindexRouteSet = new Set(extractStringArray(sitemapText, "NOINDEX_ROUTES"))
  const noindexPrefixes = extractStringArray(sitemapText, "NOINDEX_PREFIXES")

  const robotsText = fs.readFileSync(ROBOTS_FILE, "utf8")
  const disallowRules = extractDisallowRules(robotsText)

  const utilityNoindex = rows.filter((row) => row.indexability_class === "utility_noindex")
  utilityNoindex.forEach((row) => {
    if (!isExcludedBySitemap(row.route, noindexRouteSet, noindexPrefixes)) {
      findings.push({
        code: "noindex_missing_from_sitemap_exclusions",
        detail: row.route,
      })
    }

    const blocked = disallowRules.some((rule) => {
      if (rule === "/") return true
      return row.route === rule || row.route.startsWith(`${rule}/`)
    })

    if (blocked) {
      findings.push({
        code: "noindex_blocked_by_robots_disallow",
        detail: row.route,
      })
    }
  })

  if (findings.length > 0) {
    console.error(`❌ SEO lint failed with ${findings.length} finding(s).`)
    findings.forEach((finding) => {
      console.error(`- [${finding.code}] ${finding.detail}`)
    })
    process.exit(1)
  }

  console.log(`✅ SEO lint passed (${rows.length} routes checked).`)
}

lint()
