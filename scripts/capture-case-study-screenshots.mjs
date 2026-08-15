// Capture homepage screenshots (desktop + mobile) for every case study with a websiteUrl.
// Output: public/case-studies/<slug>-home-desktop.jpg and public/case-studies/<slug>-home-mobile.jpg
//
// Usage:
//   node scripts/capture-case-study-screenshots.mjs                # all slugs (skip existing)
//   node scripts/capture-case-study-screenshots.mjs <slug> [slug]  # subset (still skip existing)
//   node scripts/capture-case-study-screenshots.mjs --force --mobile-only
//   node scripts/capture-case-study-screenshots.mjs --force --mobile-only olympic-bootworks
//
// Flags:
//   --force         overwrite existing files
//   --mobile-only   capture only the 390×844 mobile JPEG
//   --desktop-only  capture only the 1440×900 desktop JPEG
//
// Mobile captures dismiss first-party consent sheets, hide chat widgets, and
// apply per-site scroll so the branded hero fills the Cover Flow crop
// (object-cover object-top on a 3:4 card ≈ top 62% of the 390×844 frame).

import { chromium } from '@playwright/test'
import { mkdir, access } from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { readFile } from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'case-studies')

const rawArgs = process.argv.slice(2)
const FORCE = rawArgs.includes('--force')
const MOBILE_ONLY = rawArgs.includes('--mobile-only')
const DESKTOP_ONLY = rawArgs.includes('--desktop-only')
const argSlugs = rawArgs.filter((arg) => !arg.startsWith('--'))
const ROSEVILLE = 'roseville-dental-academy'

const HIDE_WIDGET_CSS = `
  elevenlabs-convai,
  [data-testid="elevenlabs-convai-widget"],
  .live-elevenlabs-widget,
  .rda-whatsapp-fab,
  iframe[title*="chat" i],
  #hubspot-messages-iframe-container,
  .crisp-client,
  .tawk-min-container,
  [class*="intercom-lightweight"],
  #tidio-chat {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
`

/**
 * Per-site mobile recipes from live homepage inspection (2026-08-15).
 * Only encode dismiss/scroll/wait that we verified on the live site.
 * Do not click generic Close — Belize Typeform uses that label to OPEN the form.
 */
const MOBILE_RECIPES = {
  'olympic-bootworks': {
    dismissButtons: [/allow analytics/i],
    dismissSelectors: [
      '.location-banner button[aria-label="Close"]',
      '.location-banner button',
    ],
    waitFor: 'img[alt*="Lake Tahoe" i]',
    settleMs: 600,
  },
  'saorsa-growth-partners': {
    waitForVideo: true,
    settleMs: 1200,
  },
  'belize-kids-foundation': {
    // Do not click Typeform Close — it opens the form and jumps the page.
    scrollY: 0,
    settleMs: 800,
  },
  'sr4-partners': {
    settleMs: 800,
  },
  'rebellious-aging': {
    scrollY: 300,
    waitFor: 'img[alt="Vibrant aging lifestyle 1"]',
    settleMs: 800,
  },
  'infobell-it': {
    skipNetworkIdle: true,
    extraWaitMs: 3000,
    settleMs: 400,
  },
  'dr-christopher-wong': {
    scrollY: 80,
    waitFor: 'img[alt*="Palo Alto dental office"]',
    settleMs: 800,
  },
  'exquisite-dentistry': {
    waitFor: 'img[src*="cosmetic-dentistry"]',
    settleMs: 600,
  },
  'laguna-beach-dental-arts': {
    settleMs: 800,
  },
  'roseville-dental-academy': {
    skipNetworkIdle: true,
    extraWaitMs: 2500,
    dismissSelectors: [
      'button[aria-label="Dismiss Saturday Academy announcement"]',
    ],
    scrollY: 180,
    waitFor: 'img[alt*="students celebrating" i]',
    settleMs: 600,
  },
  'coast-periodontics-and-laser-surgery': {
    waitForVideo: true,
    settleMs: 1200,
  },
  'canary-cove': {
    hideSelectors: [
      'elevenlabs-convai',
      '[data-testid="elevenlabs-convai-widget"]',
    ],
    waitFor: 'img[alt*="Canary Cove" i]',
    settleMs: 800,
  },
  'family-first-smile-care': {
    dismissButtons: [/^No thanks$/i],
    hideText: ['Need help?'],
    scrollY: 250,
    waitFor: 'img[alt*="Family First Smile Care office"]',
    settleMs: 800,
  },
  'grace-dental-santa-rosa': {
    skipNetworkIdle: true,
    extraWaitMs: 2000,
    waitForVideo: true,
    scrollY: 300,
    settleMs: 1000,
  },
  'we-are-saplings': {
    scrollY: 175,
    settleMs: 800,
  },
  'michael-njo-dds': {
    settleMs: 800,
  },
  'canary-foundation': {
    settleMs: 800,
  },
  'town-centre-dental': {
    scrollY: 200,
    waitFor:
      'img[alt*="waiting room at Town Centre Dental" i]',
    settleMs: 800,
  },
  'practice-transitions-institute': {
    waitFor: 'img[alt*="Practice Transitions Institute logo" i]',
    settleMs: 600,
  },
  'wine-country-root-canal': {
    settleMs: 800,
  },
  'leadership-retreat': {
    waitForVideo: true,
    settleMs: 1500,
  },
  'mataria-dental-group': {
    waitForVideo: true,
    scrollY: 175,
    waitFor: 'img[alt*="Mataria Dental Group logo" i]',
    settleMs: 1000,
  },
}

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
    const unknown = argSlugs.filter(
      (slug) => !entries.some((entry) => entry.slug === slug),
    )
    if (unknown.length > 0) {
      throw new Error(`Unknown slug(s): ${unknown.join(', ')}`)
    }
    return entries.filter((entry) => argSlugs.includes(entry.slug))
  }
  // Roseville used to be skipped because it already had assets. A forced
  // refresh (or an explicit slug) includes it with everyone else.
  if (FORCE) return entries
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

async function dismissOverlays(page, recipe) {
  await page.addStyleTag({ content: HIDE_WIDGET_CSS }).catch(() => {})

  for (const name of recipe.dismissButtons ?? []) {
    const button = page.getByRole('button', { name })
    if (await button.first().isVisible({ timeout: 2500 }).catch(() => false)) {
      await button.first().click({ timeout: 2000 }).catch(() => {})
      await page.waitForTimeout(400)
    }
  }

  for (const selector of recipe.dismissSelectors ?? []) {
    const locator = page.locator(selector)
    if (await locator.first().isVisible({ timeout: 2500 }).catch(() => false)) {
      await locator.first().click({ timeout: 2000 }).catch(() => {})
      await page.waitForTimeout(400)
    }
  }

  if (recipe.hideSelectors?.length) {
    await page
      .evaluate((selectors) => {
        for (const selector of selectors) {
          document.querySelectorAll(selector).forEach((el) => {
            el.style.setProperty('display', 'none', 'important')
            el.style.setProperty('visibility', 'hidden', 'important')
            el.style.setProperty('opacity', '0', 'important')
          })
        }
      }, recipe.hideSelectors)
      .catch(() => {})
  }

  if (recipe.hideText?.length) {
    await page
      .evaluate((phrases) => {
        const hide = (el) => {
          el.style.setProperty('display', 'none', 'important')
          el.style.setProperty('visibility', 'hidden', 'important')
          el.style.setProperty('opacity', '0', 'important')
        }
        for (const phrase of phrases) {
          const match = [...document.querySelectorAll('body *')].find(
            (el) => el.childElementCount === 0 && el.textContent?.trim() === phrase,
          )
          if (match) hide(match.closest('div,button,aside,section') ?? match)
        }
      }, recipe.hideText)
      .catch(() => {})
  }
}

async function waitForHero(page, recipe) {
  if (recipe.waitFor) {
    const locator = page.locator(recipe.waitFor).first()
    await locator.waitFor({ state: 'attached', timeout: 12_000 }).catch(() => {})
    await locator
      .evaluate((el) => {
        if (el instanceof HTMLImageElement && !el.complete) {
          return new Promise((resolve) => {
            el.addEventListener('load', resolve, { once: true })
            el.addEventListener('error', resolve, { once: true })
            setTimeout(resolve, 4000)
          })
        }
        return undefined
      })
      .catch(() => {})
  }

  if (recipe.waitForVideo) {
    await page
      .locator('video')
      .first()
      .waitFor({ state: 'attached', timeout: 10_000 })
      .catch(() => {})
    await page
      .evaluate(() => {
        const video = document.querySelector('video')
        if (!video || video.readyState >= 2) return
        return new Promise((resolve) => {
          video.addEventListener('loadeddata', resolve, { once: true })
          setTimeout(resolve, 4000)
        })
      })
      .catch(() => {})
  }

  await page.evaluate(() => document.fonts?.ready).catch(() => {})
}

async function prepareMobilePage(page, slug) {
  const recipe = MOBILE_RECIPES[slug] ?? {}

  if (recipe.skipNetworkIdle) {
    await page.waitForTimeout(recipe.extraWaitMs ?? 2500)
  } else {
    await page.waitForLoadState('networkidle', { timeout: 12_000 }).catch(() => {})
    if (recipe.extraWaitMs) await page.waitForTimeout(recipe.extraWaitMs)
  }

  await dismissOverlays(page, recipe)
  await waitForHero(page, recipe)

  const scrollY = recipe.scrollY ?? 0
  await page.evaluate((y) => window.scrollTo(0, y), scrollY)
  if (scrollY > 0) {
    await waitForHero(page, recipe)
  }

  await page.waitForTimeout(recipe.settleMs ?? 800)
}

async function captureOne(browser, entry) {
  const desktopPath = path.join(OUT_DIR, `${entry.slug}-home-desktop.jpg`)
  const mobilePath = path.join(OUT_DIR, `${entry.slug}-home-mobile.jpg`)

  const skipDesktop =
    DESKTOP_ONLY === false && MOBILE_ONLY
      ? true
      : !FORCE && (await fileExists(desktopPath))
  const skipMobile =
    MOBILE_ONLY === false && DESKTOP_ONLY
      ? true
      : !FORCE && (await fileExists(mobilePath))

  if (skipDesktop && skipMobile) {
    console.log(`[skip]  ${entry.slug} (both files exist)`)
    return { slug: entry.slug, ok: true, skipped: true }
  }

  console.log(`[work]  ${entry.slug}  ${entry.url}`)

  const results = { slug: entry.slug, ok: true, errors: [] }

  if (!skipDesktop) {
    const desktopCtx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    })
    try {
      const page = await desktopCtx.newPage()
      page.setDefaultTimeout(45_000)
      await page.goto(entry.url, {
        waitUntil: 'domcontentloaded',
        timeout: 45_000,
      })
      await page
        .waitForLoadState('networkidle', { timeout: 20_000 })
        .catch(() => {})
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
    } catch (err) {
      results.ok = false
      results.errors.push(`desktop: ${err.message}`)
      console.log(`  ✗ desktop  ${err.message}`)
    } finally {
      await desktopCtx.close()
    }
  }

  if (!skipMobile) {
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    })
    try {
      const page = await mobileCtx.newPage()
      page.setDefaultTimeout(45_000)
      await page.goto(entry.url, {
        waitUntil: 'domcontentloaded',
        timeout: 45_000,
      })
      await prepareMobilePage(page, entry.slug)
      await page.screenshot({
        path: mobilePath,
        type: 'jpeg',
        quality: 82,
        clip: { x: 0, y: 0, width: 390, height: 844 },
      })
      await page.close()
      console.log(`  ✓ mobile   ${path.relative(ROOT, mobilePath)}`)
    } catch (err) {
      results.ok = false
      results.errors.push(`mobile: ${err.message}`)
      console.log(`  ✗ mobile   ${err.message}`)
    } finally {
      await mobileCtx.close()
    }
  }

  return results
}

async function main() {
  if (MOBILE_ONLY && DESKTOP_ONLY) {
    throw new Error('Use only one of --mobile-only or --desktop-only')
  }

  await mkdir(OUT_DIR, { recursive: true })
  const targets = await loadTargets()
  console.log(
    `Targets: ${targets.length}  force=${FORCE}  mobileOnly=${MOBILE_ONLY}  desktopOnly=${DESKTOP_ONLY}`,
  )
  const browser = await chromium.launch({ headless: true })

  const summary = []
  for (const entry of targets) {
    const result = await captureOne(browser, entry)
    summary.push(result)
  }

  await browser.close()
  console.log('')
  console.log('Summary:')
  for (const result of summary) {
    const tag = result.skipped ? 'skip' : result.ok ? 'ok  ' : 'FAIL'
    console.log(
      `  [${tag}] ${result.slug}${
        result.errors?.length ? `  — ${result.errors.join('; ')}` : ''
      }`,
    )
  }

  const failed = summary.filter((result) => !result.ok)
  if (failed.length > 0) {
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

void pathToFileURL
