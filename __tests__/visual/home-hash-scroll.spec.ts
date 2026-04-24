import { expect, test, type Page } from '@playwright/test'

async function waitForHomepage(page: Page) {
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /growth, handled for you\./i,
    }),
  ).toBeVisible({ timeout: 20_000 })
  await expect(
    page.getByRole('heading', {
      level: 2,
      name: /^how it works$/i,
    }),
  ).toBeVisible({ timeout: 20_000 })
}

async function readHowItWorksScrollState(page: Page) {
  return page.evaluate(() => {
    const target = document.getElementById('how-it-works')
    const heading = Array.from(document.querySelectorAll('h2')).find((node) =>
      /^How it works$/i.test(node.textContent?.trim() ?? ''),
    )
    const header = document.querySelector('header')

    return {
      hash: window.location.hash,
      scrollY: window.scrollY,
      targetTop: target?.getBoundingClientRect().top ?? null,
      headingTop: heading?.getBoundingClientRect().top ?? null,
      headerHeight: header?.getBoundingClientRect().height ?? 0,
      viewportHeight: window.innerHeight,
    }
  })
}

async function expectHowItWorksAnchorPosition(page: Page) {
  const state = await readHowItWorksScrollState(page)

  expect(state.hash).toBe('#how-it-works')
  expect(state.scrollY).toBeGreaterThan(1000)
  expect(state.targetTop).not.toBeNull()
  expect(state.headingTop).not.toBeNull()
  expect(state.targetTop ?? 0).toBeGreaterThanOrEqual(
    state.headerHeight + 16,
  )
  expect(state.headingTop ?? 0).toBeGreaterThan(state.targetTop ?? 0)
  expect(state.headingTop ?? 0).toBeLessThan(state.viewportHeight * 0.65)
}

test('homepage how-it-works hash opens below the fixed header', async ({
  page,
}) => {
  await page.goto('/#how-it-works', { waitUntil: 'domcontentloaded' })
  await waitForHomepage(page)
  await page.waitForTimeout(300)

  await expectHowItWorksAnchorPosition(page)
})

test('homepage how-it-works CTA still scrolls when the hash is already present', async ({
  page,
}) => {
  await page.goto('/#how-it-works', { waitUntil: 'domcontentloaded' })
  await waitForHomepage(page)
  await page.waitForTimeout(300)

  await page.evaluate(() => window.scrollTo(0, 0))
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThan(20)

  await page.getByRole('link', { name: /see how it works/i }).click()
  await page.waitForTimeout(300)

  await expectHowItWorksAnchorPosition(page)
})
