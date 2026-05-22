// Capture homepage screenshots (desktop + mobile) for every case study with a websiteUrl.
// Output: public/case-studies/<slug>-home-desktop.jpg and public/case-studies/<slug>-home-mobile.jpg
//
// Usage:
//   node scripts/capture-case-study-screenshots.mjs                # all slugs
//   node scripts/capture-case-study-screenshots.mjs <slug> [slug]  # subset

import { chromium } from '@playwright/test'
import { mkdir, access } from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'case-studies')

const argSlugs = process.argv.slice(2)
const ROSEVILLE = 'roseville-dental-academy' // already has screenshots, skip by default

// Load CASE_STUDIES via dynamic TS-free parsing — keep this script JS-only.
// Strategy: parse the source file with a tiny regex to extract slug + websiteUrl pairs.
import { readFile } from 'node:fs/promises'

async function loadTargets() {
  const src = await readFile(path.join(ROOT, 'lib', 'case-study-data.ts'), 'utf8')
  const entries = []
  const blocks = src.split(/\{\s*\n\s*id:/)
  for (const block of blocks) {
    const slugMatch = block.match(/slug:\s*'([^']+)'/)
    const urlMatch = block.match(/websiteUrl:\s*'([^']+)'/)
    if (slugMatch && urlMatch) {
      entries.push({ slug: slugMatch[1], url: urlMatch[1] })
    }
  }
  if (argSlugs.length > 0) {
    return entries.filter((entry) => argSlugs.includes(entry.slug))
  }
  return entries.filter((entry) => entry.slug !== ROSEVILLE)
}

async function fileExists(p) {
  try {
    await access(p, fsConstants.F_OK)
    return true
  } catch {
    return false
  }
}

async function captureOne(browser, entry) {
  const desktopPath = path.join(OUT_DIR, `${entry.slug}-home-desktop.jpg`)
  const mobilePath = path.join(OUT_DIR, `${entry.slug}-home-mobile.jpg`)

  const skipDesktop = await fileExists(desktopPath)
  const skipMobile = await fileExists(mobilePath)
  if (skipDesktop && skipMobile) {
    console.log(`[skip]  ${entry.slug} (both files exist)`)
    return { slug: entry.slug, ok: true, skipped: true }
  }

  console.log(`[work]  ${entry.slug}  ${entry.url}`)

  const desktopCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  })
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  })

  const results = { slug: entry.slug, ok: true, errors: [] }

  // Desktop
  try {
    if (!skipDesktop) {
      const page = await desktopCtx.newPage()
      page.setDefaultTimeout(45_000)
      await page.goto(entry.url, { waitUntil: 'domcontentloaded', timeout: 45_000 })
      await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {})
      await page.waitForTimeout(2500)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({
        path: desktopPath,
        type: 'jpeg',
        quality: 80,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      })
      await page.close()
      console.log(`  ✓ desktop  ${path.relative(ROOT, desktopPath)}`)
    }
  } catch (err) {
    results.ok = false
    results.errors.push(`desktop: ${err.message}`)
    console.log(`  ✗ desktop  ${err.message}`)
  } finally {
    await desktopCtx.close()
  }

  // Mobile
  try {
    if (!skipMobile) {
      const page = await mobileCtx.newPage()
      page.setDefaultTimeout(45_000)
      await page.goto(entry.url, { waitUntil: 'domcontentloaded', timeout: 45_000 })
      await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {})
      await page.waitForTimeout(2500)
      await page.evaluate(() => window.scrollTo(0, 0))
      // Capture a tall mobile viewport — clip to 390x844 to match design frame aspect.
      await page.screenshot({
        path: mobilePath,
        type: 'jpeg',
        quality: 82,
        clip: { x: 0, y: 0, width: 390, height: 844 },
      })
      await page.close()
      console.log(`  ✓ mobile   ${path.relative(ROOT, mobilePath)}`)
    }
  } catch (err) {
    results.ok = false
    results.errors.push(`mobile: ${err.message}`)
    console.log(`  ✗ mobile   ${err.message}`)
  } finally {
    await mobileCtx.close()
  }

  return results
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const targets = await loadTargets()
  console.log(`Targets: ${targets.length}`)
  const browser = await chromium.launch({ headless: true })

  const summary = []
  for (const entry of targets) {
    const result = await captureOne(browser, entry)
    summary.push(result)
  }

  await browser.close()
  console.log('')
  console.log('Summary:')
  for (const r of summary) {
    const tag = r.skipped ? 'skip' : r.ok ? 'ok  ' : 'FAIL'
    console.log(`  [${tag}] ${r.slug}${r.errors?.length ? `  — ${r.errors.join('; ')}` : ''}`)
  }

  const failed = summary.filter((r) => !r.ok)
  if (failed.length > 0) {
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

// keep imports referenced
void pathToFileURL
