import { expect, test, type Page } from '@playwright/test'

async function seedDeterministicRandom(page: Page) {
  await page.addInitScript(() => {
    let seed = 123456789
    const modulus = 2147483647
    const multiplier = 16807

    Math.random = () => {
      seed = (seed * multiplier) % modulus
      return (seed - 1) / (modulus - 1)
    }
  })
}

async function disableElevenLabsWidget(page: Page) {
  if (process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED === 'true') {
    return
  }

  await page.addInitScript(() => {
    window.__PRISM_DISABLE_ELEVENLABS_WIDGET__ = true
  })
}

async function stabilizePage(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }
    `,
  })

  await page.evaluate(() => {
    for (const video of Array.from(document.querySelectorAll('video'))) {
      try {
        video.pause()
        video.currentTime = 0
      } catch {
        // ignore
      }
    }
  })

  await page.evaluate(async () => {
    if ('fonts' in document) {
      const fonts = (document as any).fonts as
        | { ready?: Promise<unknown> }
        | undefined
      await fonts?.ready
    }
  })
}

async function expectLockedRouteSnapshotSurface(page: Page) {
  await expect(page.locator('elevenlabs-convai')).toHaveCount(0)
}

const lockedRoutes = [
  { name: 'home', path: '/', readyHeading: /^prism$/i },
  { name: 'about', path: '/about', readyHeading: /our story/i },
  {
    name: 'pricing',
    path: '/pricing',
    readyHeading: /simple pricing for teams that want a clearer growth path\./i,
  },
] as const

for (const route of lockedRoutes) {
  test(`${route.name} UI snapshot stays stable`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await seedDeterministicRandom(page)
    await disableElevenLabsWidget(page)
    await page.goto(route.path, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(250)

    await expect(
      page.getByRole('heading', { level: 1, name: route.readyHeading }),
    ).toBeVisible({
      timeout: 20_000,
    })

    await stabilizePage(page)
    await expectLockedRouteSnapshotSurface(page)
    await page.waitForTimeout(750)

    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      timeout: 15_000,
    })
  })
}

test('home features section snapshot stays stable', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await seedDeterministicRandom(page)
  await disableElevenLabsWidget(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(250)

  const featuresHeading = page.getByRole('heading', {
    level: 2,
    name: /everything your brand needs to grow, in one system/i,
  })
  await expect(featuresHeading).toBeVisible({ timeout: 20_000 })

  const featuresSection = featuresHeading.locator('xpath=ancestor::section[1]')
  await expect(featuresSection).toBeVisible()
  await featuresSection.scrollIntoViewIfNeeded()

  await stabilizePage(page)
  await expectLockedRouteSnapshotSurface(page)
  await page.waitForTimeout(300)

  await expect(featuresSection).toHaveScreenshot('home-features-section.png', {
    timeout: 15_000,
  })

  if (testInfo.project.name !== 'desktop-chromium') {
    return
  }

  const aiAgentsCard = page
    .locator('div')
    .filter({
      has: page.getByRole('heading', {
        level: 3,
        name: /ai agents that answer \+ book/i,
      }),
    })
    .first()

  await aiAgentsCard.hover()
  await page.waitForTimeout(150)

  await expect(aiAgentsCard).toHaveScreenshot('home-features-ai-hover.png', {
    timeout: 15_000,
  })
})

test('home features copy stays contained across responsive breakpoints', async ({
  page,
}) => {
  await disableElevenLabsWidget(page)

  const breakpoints = [
    { width: 1150, height: 1100 },
    { width: 768, height: 1200 },
    { width: 390, height: 1200 },
  ]

  for (const breakpoint of breakpoints) {
    await page.setViewportSize(breakpoint)
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(250)

    const featuresHeading = page.getByRole('heading', {
      level: 2,
      name: /everything your brand needs to grow, in one system/i,
    })
    await expect(featuresHeading).toBeVisible({ timeout: 20_000 })

    const featuresSection = featuresHeading.locator('xpath=ancestor::section[1]')
    await expect(featuresSection).toBeVisible()
    await featuresSection.scrollIntoViewIfNeeded()

    await expect(featuresSection.locator('h3')).toHaveCount(5)

    const containment = await featuresSection.evaluate((section) => {
      const headings = Array.from(section.querySelectorAll('h3'))

      return headings.map((heading) => {
        const card =
          heading.closest('[data-home-feature-card], article, .group') ??
          heading.parentElement?.parentElement
        const description =
          heading.parentElement?.querySelector('p') ?? card?.querySelector('p')
        const cardRect = card?.getBoundingClientRect()
        const titleRect = heading.getBoundingClientRect()
        const descriptionRect = description?.getBoundingClientRect()

        return {
          title: heading.textContent?.trim() ?? 'unknown',
          titleWithin:
            !!cardRect &&
            titleRect.top >= cardRect.top &&
            titleRect.left >= cardRect.left &&
            titleRect.right <= cardRect.right &&
            titleRect.bottom <= cardRect.bottom,
          descriptionWithin:
            !!cardRect &&
            !!descriptionRect &&
            descriptionRect.top >= cardRect.top &&
            descriptionRect.left >= cardRect.left &&
            descriptionRect.right <= cardRect.right &&
            descriptionRect.bottom <= cardRect.bottom,
        }
      })
    })

    for (const card of containment) {
      expect(
        card.titleWithin,
        `${card.title} heading overflowed at ${breakpoint.width}px`,
      ).toBe(true)
      expect(
        card.descriptionWithin,
        `${card.title} description overflowed at ${breakpoint.width}px`,
      ).toBe(true)
    }
  }
})
