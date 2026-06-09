import { expect, test, type Page } from '@playwright/test'

const PERFECT_SCROLL_GAP_PX = 24
const PERFECT_SCROLL_TOLERANCE_PX = 4

const mobileScrollScenarios = [
  {
    name: 'compact phone',
    viewport: { width: 360, height: 640 },
  },
  {
    name: 'baseline phone',
    viewport: { width: 390, height: 844 },
  },
  {
    name: 'large phone',
    viewport: { width: 430, height: 932 },
  },
] as const

async function waitForHomepage(page: Page) {
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /get found\. get trusted\. get chosen\./i,
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
      ctaHref:
        document
          .querySelector<HTMLAnchorElement>(
            '#homepage-hero a[href="#how-it-works"]',
          )
          ?.getAttribute('href') ?? null,
    }
  })
}

async function waitForPerfectHowItWorksPosition(page: Page, label: string) {
  await expect
    .poll(
      async () => {
        const state = await readHowItWorksScrollState(page)
        if (state.targetTop === null || state.headingTop === null) {
          return false
        }

        const idealTargetTop = state.headerHeight + PERFECT_SCROLL_GAP_PX

        return (
          state.hash === '#how-it-works' &&
          state.scrollY > 1000 &&
          state.ctaHref === '#how-it-works' &&
          Math.abs(state.targetTop - idealTargetTop) <=
            PERFECT_SCROLL_TOLERANCE_PX &&
          state.headingTop > state.targetTop &&
          state.headingTop < state.viewportHeight * 0.65
        )
      },
      {
        message: `${label} should land the how-it-works section exactly below the fixed mobile header`,
        timeout: 5_000,
      },
    )
    .toBe(true)

  const state = await readHowItWorksScrollState(page)
  const idealTargetTop = state.headerHeight + PERFECT_SCROLL_GAP_PX

  expect(state.hash).toBe('#how-it-works')
  expect(state.scrollY).toBeGreaterThan(1000)
  expect(state.ctaHref).toBe('#how-it-works')
  expect(state.targetTop).not.toBeNull()
  expect(state.headingTop).not.toBeNull()
  expect(
    Math.abs((state.targetTop ?? 0) - idealTargetTop),
    `${label} target top should be ${idealTargetTop}px, received ${state.targetTop}px`,
  ).toBeLessThanOrEqual(PERFECT_SCROLL_TOLERANCE_PX)
  expect(
    state.targetTop ?? 0,
    `${label} target should not be hidden below the fixed header`,
  ).toBeGreaterThanOrEqual(
    state.headerHeight + PERFECT_SCROLL_GAP_PX - PERFECT_SCROLL_TOLERANCE_PX,
  )
  expect(state.headingTop ?? 0).toBeGreaterThan(state.targetTop ?? 0)
  expect(state.headingTop ?? 0).toBeLessThan(state.viewportHeight * 0.65)
}

test.describe('mobile homepage how-it-works scroll position', () => {
  for (const scenario of mobileScrollScenarios) {
    test(`${scenario.name}: direct hash opens at the perfect position`, async ({
      page,
    }) => {
      await page.setViewportSize(scenario.viewport)
      await page.goto('/#how-it-works', { waitUntil: 'domcontentloaded' })
      await waitForHomepage(page)

      await waitForPerfectHowItWorksPosition(
        page,
        `${scenario.name} direct hash`,
      )
    })

    test(`${scenario.name}: hero CTA scrolls from a clean page load`, async ({
      page,
    }) => {
      await page.setViewportSize(scenario.viewport)
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      await waitForHomepage(page)

      await page.getByRole('link', { name: /see how it works/i }).click()

      await waitForPerfectHowItWorksPosition(
        page,
        `${scenario.name} fresh CTA click`,
      )
    })

    test(`${scenario.name}: hero CTA still scrolls when hash is already present`, async ({
      page,
    }) => {
      await page.setViewportSize(scenario.viewport)
      await page.goto('/#how-it-works', { waitUntil: 'domcontentloaded' })
      await waitForHomepage(page)
      await waitForPerfectHowItWorksPosition(
        page,
        `${scenario.name} initial hash position`,
      )

      await page.evaluate(() => window.scrollTo(0, 0))
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBeLessThan(20)

      await page.getByRole('link', { name: /see how it works/i }).click()

      await waitForPerfectHowItWorksPosition(
        page,
        `${scenario.name} same-hash CTA click`,
      )
    })
  }
})
