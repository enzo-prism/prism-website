import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import { expect, test, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Keep third-party Vimeo/WPE teardown outside this navigation regression.
  // The suite verifies when Prism requests the player and the control geometry,
  // while Vimeo playback itself is independent of the mobile menu contract.
  await page.route(
    /^https:\/\/(?:player\.vimeo\.com|f\.vimeocdn\.com)\//,
    (route) => route.abort(),
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

async function openMenu(page: Page) {
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await expect(toggle).toBeVisible()
  await toggle.click()
  await expect(
    page.getByRole('button', { name: 'Close menu' }),
  ).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#mobile-site-nav')).toBeVisible()
}

async function expectOpenMenuGeometry(page: Page) {
  const result = await page.evaluate(() => {
    const header = document.querySelector('header')
    const chrome = document.querySelector<HTMLElement>('[data-navbar-chrome]')
    const panel = document.getElementById('mobile-site-nav')
    if (!header || !chrome || !panel) return null

    const chromeRect = chrome.getBoundingClientRect()
    const panelRect = panel.getBoundingClientRect()
    const visualBottom = window.visualViewport
      ? window.visualViewport.offsetTop + window.visualViewport.height
      : window.innerHeight

    return {
      headerInert: header.hasAttribute('inert'),
      panelTopDelta: Math.abs(panelRect.top - chromeRect.bottom),
      panelBottomOverflow: panelRect.bottom - visualBottom,
      horizontalOverflow:
        document.documentElement.scrollWidth - window.innerWidth,
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
    }
  })

  expect(result).not.toBeNull()
  expect(result?.headerInert).toBe(false)
  expect(result?.panelTopDelta).toBeLessThanOrEqual(1.5)
  expect(result?.panelBottomOverflow).toBeLessThanOrEqual(1.5)
  expect(result?.horizontalOverflow).toBeLessThanOrEqual(1)
  expect(result?.bodyOverflow).toBe('hidden')
  expect(result?.htmlOverflow).toBe('hidden')
  await expect(page.locator('#mobile-site-nav').getByRole('link')).toHaveCount(
    6,
  )
}

for (const route of ['/', '/about', '/wall-of-love'] as const) {
  test(`${route} mobile menu remains usable and restores page state`, async ({
    page,
  }, testInfo) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() =>
      window.scrollTo(0, Math.min(720, document.body.scrollHeight / 3)),
    )
    const scrollBefore = await page.evaluate(() => window.scrollY)

    await openMenu(page)
    await expectOpenMenuGeometry(page)

    const homeLink = page
      .locator('#mobile-site-nav')
      .getByRole('link', { name: 'home', exact: true })
    await homeLink.scrollIntoViewIfNeeded()
    await expect(homeLink).toBeVisible()

    if (testInfo.project.name === 'mobile-webkit' && route === '/') {
      const outputDir = process.env.PRISM_MOBILE_AUDIT_OUTPUT
      if (outputDir) {
        await mkdir(outputDir, { recursive: true })
        await page.screenshot({
          path: path.join(outputDir, '01-home-menu-webkit.png'),
          fullPage: false,
        })
      }
    }

    await page.getByRole('button', { name: 'Close menu' }).click()
    await expect(page.locator('#mobile-site-nav')).toHaveCount(0)
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBe(scrollBefore)
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
    expect(
      await page.evaluate(() => document.documentElement.style.overflow),
    ).toBe('')

    await openMenu(page)
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-site-nav')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  })
}

test('mobile menu stays bounded in landscape and closes at desktop width', async ({
  page,
}, testInfo) => {
  await page.goto('/case-studies/exquisite-dentistry', {
    waitUntil: 'domcontentloaded',
  })
  await page.setViewportSize({ width: 844, height: 390 })
  await openMenu(page)
  await expectOpenMenuGeometry(page)

  const caseStudiesLink = page
    .locator('#mobile-site-nav')
    .getByRole('link', { name: 'case studies', exact: true })
  await caseStudiesLink.scrollIntoViewIfNeeded()
  await expect(caseStudiesLink).toBeVisible()

  if (testInfo.project.name === 'mobile-webkit') {
    const outputDir = process.env.PRISM_MOBILE_AUDIT_OUTPUT
    if (outputDir) {
      await mkdir(outputDir, { recursive: true })
      await page.screenshot({
        path: path.join(outputDir, '02-landscape-menu-webkit.png'),
        fullPage: false,
      })
    }
  }

  await page.setViewportSize({ width: 1024, height: 768 })
  await expect(page.locator('#mobile-site-nav')).toHaveCount(0)
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  expect(
    await page.evaluate(() => document.documentElement.style.overflow),
  ).toBe('')
})

test('a mobile navigation link remains tappable on direct-body-header pages', async ({
  page,
}) => {
  await page.goto('/wall-of-love', { waitUntil: 'domcontentloaded' })
  await openMenu(page)
  const caseStudiesLink = page
    .locator('#mobile-site-nav')
    .getByRole('link', { name: 'case studies', exact: true })
  await caseStudiesLink.scrollIntoViewIfNeeded()
  await caseStudiesLink.click()
  await expect(page).toHaveURL(/\/case-studies$/)
  await expect(page.locator('#mobile-site-nav')).toHaveCount(0)
})

test('about media stays deferred and exposes full-size touch controls', async ({
  page,
}) => {
  await page.goto('/about', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#vimeo-player-api')).toHaveCount(0)

  await page
    .getByRole('heading', { name: 'Olympic journey.' })
    .scrollIntoViewIfNeeded()
  await expect(page.locator('#vimeo-player-api')).toHaveCount(1)

  for (const name of ['Previous', 'Next'] as const) {
    const control = page.getByRole('button', { name, exact: true })
    await expect(control).toBeVisible()
    const box = await control.boundingBox()
    expect(box?.width).toBeGreaterThanOrEqual(44)
    expect(box?.height).toBeGreaterThanOrEqual(44)
  }

  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await expect(page.getByText('santa barbara, ca')).toBeVisible()
})
