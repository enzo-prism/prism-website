#!/usr/bin/env node
/**
 * AI visibility report for design-prism.com.
 *
 * Pulls (1) sessions referred by AI answer engines from GA4 and (2) Google
 * Search Console clicks/impressions trend for the Prism site, then prints a
 * compact report. Used to steer the blog index allowlist and the quarterly
 * pillar-refresh cycle (see docs/development-guide.md).
 *
 * Requires the `gog` CLI (https://github.com/...gogcli) authenticated with an
 * account that can read the Prism GA4 property and Search Console site.
 *
 * Usage: pnpm seo:ai-report [days]   (default 90)
 */

import { execFileSync } from "node:child_process"

const GA4_PROPERTY = "properties/383270357" // Prism GA4
const GSC_SITE = "sc-domain:design-prism.com"
const AI_SOURCE_PATTERN =
  /chatgpt|openai|perplexity|claude|anthropic|gemini|copilot|you\.com|phind|poe\.com|meta\.ai/i

const days = Number.parseInt(process.argv[2] ?? "90", 10) || 90

function gog(args) {
  try {
    return execFileSync("gog", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
  } catch (error) {
    console.error(`gog ${args[0]} failed:`, error.stderr?.toString() || error.message)
    return ""
  }
}

function isoDaysAgo(count) {
  const date = new Date()
  date.setDate(date.getDate() - count)
  return date.toISOString().slice(0, 10)
}

console.log(`\nPrism AI visibility report — last ${days} days\n${"=".repeat(48)}`)

// 1. AI answer-engine referrals (GA4)
const ga = gog([
  "analytics",
  "report",
  GA4_PROPERTY,
  "--from",
  `${days}daysAgo`,
  "--to",
  "yesterday",
  "--dimensions",
  "sessionSource",
  "--metrics",
  "sessions,totalUsers",
  "-p",
])

const aiRows = ga
  .split("\n")
  .slice(1)
  .map((line) => line.split("\t"))
  .filter((cols) => cols.length >= 3 && AI_SOURCE_PATTERN.test(cols[0]))

let aiSessions = 0
console.log("\nAI answer-engine referrals (GA4 sessionSource):")
if (aiRows.length === 0) {
  console.log("  none recorded")
} else {
  for (const [source, sessions, users] of aiRows) {
    aiSessions += Number(sessions) || 0
    console.log(`  ${source.padEnd(28)} sessions=${sessions} users=${users}`)
  }
  console.log(`  ${"TOTAL".padEnd(28)} sessions=${aiSessions}`)
}

// 2. Search Console trend (first vs last 28 days of the window)
const from = isoDaysAgo(days)
const to = isoDaysAgo(1)
const gsc = gog([
  "searchconsole",
  "query",
  GSC_SITE,
  "--from",
  from,
  "--to",
  to,
  "--dimensions",
  "DATE",
  "--max",
  "25000",
  "-p",
])

const daily = gsc
  .split("\n")
  .slice(1)
  .map((line) => line.split("\t"))
  .filter((cols) => cols.length >= 3)
  .map(([date, clicks, imps]) => ({
    date,
    clicks: Number(clicks) || 0,
    imps: Number(imps) || 0,
  }))
  .sort((a, b) => a.date.localeCompare(b.date))

if (daily.length >= 28) {
  const head = daily.slice(0, 28)
  const tail = daily.slice(-28)
  const sum = (rows, key) => rows.reduce((total, row) => total + row[key], 0)
  const pct = (a, b) => (a > 0 ? `${Math.round(((b - a) / a) * 100)}%` : "n/a")

  console.log("\nGoogle Search trend (first vs last 28 days of window):")
  console.log(
    `  clicks      ${sum(head, "clicks")} -> ${sum(tail, "clicks")} (${pct(sum(head, "clicks"), sum(tail, "clicks"))})`,
  )
  console.log(
    `  impressions ${sum(head, "imps")} -> ${sum(tail, "imps")} (${pct(sum(head, "imps"), sum(tail, "imps"))})`,
  )
} else {
  console.log("\nGoogle Search trend: not enough daily rows returned")
}

// 3. Top queries for context
const topQueries = gog([
  "searchconsole",
  "query",
  GSC_SITE,
  "--from",
  isoDaysAgo(28),
  "--to",
  to,
  "--dimensions",
  "QUERY",
  "--max",
  "10",
  "-p",
])

console.log("\nTop queries (last 28 days):")
for (const line of topQueries.split("\n").slice(1, 11)) {
  if (line.trim()) console.log(`  ${line.replaceAll("\t", "  ")}`)
}

console.log(
  "\nNext actions: feed strong queries into INDEXABLE_BLOG_SLUGS candidates,",
)
console.log(
  "refresh stale pillars (see docs/development-guide.md, AI visibility loop).\n",
)
