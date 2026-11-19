/**
 * Submit the pages changed by a deploy to IndexNow (Bing and partners).
 *
 *   node scripts/indexnow-ping.ts --base <sha> [--head <sha>] [--dry-run]
 *
 * Diffs the two commits, maps changed source files to site paths
 * (lib/seo/indexnow.ts), keeps only URLs the live sitemap lists, and POSTs
 * them. Runs after the production deploy in .github/workflows/deploy.yml;
 * failures there never block a deploy. Without --base (manual workflow runs,
 * first push) it submits nothing.
 */
import { execFileSync } from "node:child_process"

import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  changedFilesToPaths,
  parseSitemapUrls,
  selectIndexNowUrls,
} from "../lib/seo/indexnow.ts"

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`)
  return index === -1 ? undefined : process.argv[index + 1]
}

const dryRun = process.argv.includes("--dry-run")
const base = arg("base")
const head = arg("head") ?? "HEAD"

async function main() {
  if (!base || /^0+$/.test(base)) {
    console.log("indexnow: no base commit, nothing to submit")
    return
  }

  const files = execFileSync("git", ["diff", "--name-only", base, head], {
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean)
  const changedPaths = changedFilesToPaths(files)
  if (changedPaths.size === 0) {
    console.log(`indexnow: ${files.length} changed files, none map to a page`)
    return
  }

  const sitemapResponse = await fetch(`https://${INDEXNOW_HOST}/sitemap.xml`)
  if (!sitemapResponse.ok) {
    throw new Error(`sitemap.xml returned ${sitemapResponse.status}`)
  }
  const urls = selectIndexNowUrls(
    changedPaths,
    parseSitemapUrls(await sitemapResponse.text()),
  )
  if (urls.length === 0) {
    console.log(
      `indexnow: changed paths (${[...changedPaths].join(", ")}) are not in the sitemap`,
    )
    return
  }

  console.log(`indexnow: ${urls.length} URL(s)\n${urls.join("\n")}`)
  if (dryRun) return

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: urls,
    }),
  })
  // 200 and 202 both mean accepted.
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(
      `IndexNow returned ${response.status}: ${(await response.text()).slice(0, 300)}`,
    )
  }
  console.log(`indexnow: submitted (HTTP ${response.status})`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
