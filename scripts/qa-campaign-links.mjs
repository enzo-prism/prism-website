import fs from "node:fs"
import path from "node:path"

const BASE_URL = process.env.BASE_URL || "https://prism-website-gamma.vercel.app"
const sourcePath = path.resolve("lib/campaign-links.ts")
const source = fs.readFileSync(sourcePath, "utf8")

function parseLinks(ts) {
  const links = []
  const entryRegex = /"([a-z0-9-]+)"\s*:\s*\{([\s\S]*?)\n\s*\},/g
  for (const match of ts.matchAll(entryRegex)) {
    const slugKey = match[1]
    const body = match[2]
    const get = (name) => {
      const m = body.match(new RegExp(`${name}:\\s*\"([^\"]+)\"`))
      return m?.[1]
    }

    const enabled = !/enabled:\s*false/.test(body)
    if (!enabled) continue

    links.push({
      slug: slugKey,
      utmSource: get("utmSource"),
      utmMedium: get("utmMedium"),
      utmCampaign: get("utmCampaign"),
      utmContent: get("utmContent"),
      utmTerm: get("utmTerm"),
    })
  }
  return links
}

async function check(link) {
  const response = await fetch(`${BASE_URL}/go/${link.slug}`, { redirect: "manual" })
  const location = response.headers.get("location") || ""

  if (response.status < 300 || response.status >= 400) {
    return { slug: link.slug, ok: false, reason: `Expected 3xx, got ${response.status}` }
  }

  const u = new URL(location)
  const required = [
    ["utm_source", link.utmSource],
    ["utm_medium", link.utmMedium],
    ["utm_campaign", link.utmCampaign],
  ]

  for (const [k, v] of required) {
    if (!v || u.searchParams.get(k) !== v) {
      return { slug: link.slug, ok: false, reason: `Mismatch ${k}` }
    }
  }

  if (link.utmContent && u.searchParams.get("utm_content") !== link.utmContent) {
    return { slug: link.slug, ok: false, reason: "Mismatch utm_content" }
  }
  if (link.utmTerm && u.searchParams.get("utm_term") !== link.utmTerm) {
    return { slug: link.slug, ok: false, reason: "Mismatch utm_term" }
  }

  return { slug: link.slug, ok: true }
}

const links = parseLinks(source)
const results = await Promise.all(links.map(check))
const failed = results.filter((r) => !r.ok)

console.log(`Checked ${results.length} campaign slugs against ${BASE_URL}`)
for (const r of results) console.log(`${r.ok ? "✅" : "❌"} ${r.slug}${r.reason ? ` - ${r.reason}` : ""}`)

if (failed.length) process.exit(1)
