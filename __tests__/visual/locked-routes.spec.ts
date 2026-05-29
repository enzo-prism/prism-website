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

async function stabilizeDesktopSectionHeight(
  page: Page,
  locator: ReturnType<Page['locator']>,
  minHeightPx: number,
) {
  const viewportWidth = page.viewportSize()?.width ?? 0

  if (viewportWidth < 1280) {
    return
  }

  await locator.evaluate((node, minHeight) => {
    ;(node as HTMLElement).style.minHeight = `${minHeight}px`
  }, minHeightPx)
}

async function stabilizeSectionHeight(
  page: Page,
  locator: ReturnType<Page['locator']>,
  heights: { mobile: number; desktop: number },
) {
  const viewportWidth = page.viewportSize()?.width ?? 0
  const lockedHeight = viewportWidth >= 1280 ? heights.desktop : heights.mobile

  await locator.evaluate(
    (node, height) => {
      ;(node as HTMLElement).style.minHeight = `${height}px`
      ;(node as HTMLElement).style.height = `${height}px`
    },
    lockedHeight,
  )
}

const lockedRoutes = [
  {
    name: 'home',
    path: '/',
    readyHeading: /get found\. get trusted\. get booked\./i,
  },
  { name: 'about', path: '/about', readyHeading: /built by enzo sison\./i },
  {
    name: 'pricing',
    path: '/pricing',
    readyHeading: /a clearer way to invest in growth\./i,
  },
  {
    name: 'get-started',
    path: '/get-started',
    readyHeading: /three steps to your free light audit\./i,
    // The hero step icons are looping Lordicon (lottie) animations, so their
    // rendered frame is non-deterministic. Mask them to keep the locked layout
    // snapshot stable while still locking the surrounding hero structure.
    mask: ['lord-icon'],
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

    const mask =
      'mask' in route && route.mask
        ? route.mask.map((selector) => page.locator(selector))
        : undefined

    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      timeout: 15_000,
      ...(mask ? { mask } : {}),
    })
  })
}

test('home promise section snapshot stays stable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await seedDeterministicRandom(page)
  await disableElevenLabsWidget(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(250)

  const systemHeading = page.getByRole('heading', {
    level: 2,
    name: /found\. trusted\. booked\./i,
  })
  await expect(systemHeading).toBeVisible({ timeout: 20_000 })

  const systemSection = systemHeading.locator('xpath=ancestor::section[1]')
  await expect(systemSection).toBeVisible()
  await systemSection.scrollIntoViewIfNeeded()
  await stabilizeDesktopSectionHeight(page, systemSection, 460)

  await stabilizePage(page)
  await expectLockedRouteSnapshotSurface(page)
  await page.waitForTimeout(300)

  await expect(systemSection).toHaveScreenshot('home-promise-section.png', {
    timeout: 15_000,
  })
})

test('home problem section snapshot stays stable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await seedDeterministicRandom(page)
  await disableElevenLabsWidget(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(250)

  const problemHeading = page.getByRole('heading', {
    level: 2,
    name: /patients decide fast/i,
  })
  await expect(problemHeading).toBeVisible({ timeout: 20_000 })

  const problemSection = problemHeading.locator('xpath=ancestor::section[1]')
  await expect(problemSection).toBeVisible()
  await problemSection.scrollIntoViewIfNeeded()
  await stabilizeSectionHeight(page, problemSection, {
    mobile: 751,
    desktop: 431,
  })

  await stabilizePage(page)
  await expectLockedRouteSnapshotSurface(page)
  await page.waitForTimeout(300)

  await expect(problemSection).toHaveScreenshot('home-problem-section.png', {
    maxDiffPixelRatio: 0.05,
    timeout: 15_000,
  })
})

test('home services section snapshot stays stable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await seedDeterministicRandom(page)
  await disableElevenLabsWidget(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(250)

  const servicesHeading = page.getByRole('heading', {
    level: 2,
    name: /one system\. seven parts\./i,
  })
  await expect(servicesHeading).toBeVisible({ timeout: 20_000 })

  const servicesSection = servicesHeading.locator('xpath=ancestor::section[1]')
  await expect(servicesSection).toBeVisible()
  await servicesSection.scrollIntoViewIfNeeded()
  await stabilizeSectionHeight(page, servicesSection, {
    mobile: 913,
    desktop: 580,
  })

  await stabilizePage(page)
  await expectLockedRouteSnapshotSurface(page)
  await page.waitForTimeout(300)

  await expect(servicesSection).toHaveScreenshot('home-services-section.png', {
    timeout: 15_000,
  })
})

test('home proof section snapshot stays stable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await seedDeterministicRandom(page)
  await disableElevenLabsWidget(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(250)

  const proofHeading = page.getByRole('heading', {
    level: 2,
    name: /dental proof/i,
  })
  await expect(proofHeading).toBeVisible({ timeout: 20_000 })

  const proofSection = proofHeading.locator('xpath=ancestor::section[1]')
  await expect(proofSection).toBeVisible()
  await proofSection.scrollIntoViewIfNeeded()
  await stabilizeSectionHeight(page, proofSection, {
    mobile: 1753,
    desktop: 691,
  })

  await stabilizePage(page)
  await expectLockedRouteSnapshotSurface(page)
  await page.waitForTimeout(300)

  await expect(proofSection).toHaveScreenshot('home-proof-section.png', {
    timeout: 15_000,
  })
})

test('home promise and service cards stay contained across responsive breakpoints', async ({
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

    const sections = [
      {
        heading: /found\. trusted\. booked\./i,
        cardSelector: '[data-home-promise-card]',
        expectedCount: 3,
      },
      {
        heading: /one system\. seven parts\./i,
        cardSelector: '[data-home-service-card]',
        expectedCount: 7,
      },
    ]

    for (const sectionConfig of sections) {
      const sectionHeading = page.getByRole('heading', {
        level: 2,
        name: sectionConfig.heading,
      })
      await expect(sectionHeading).toBeVisible({ timeout: 20_000 })

      const section = sectionHeading.locator('xpath=ancestor::section[1]')
      await expect(section).toBeVisible()
      await section.scrollIntoViewIfNeeded()

      await expect(section.locator(sectionConfig.cardSelector)).toHaveCount(
        sectionConfig.expectedCount,
      )

      const containment = await section.evaluate((sectionNode, cardSelector) => {
        const cards = Array.from(
          sectionNode.querySelectorAll<HTMLElement>(cardSelector),
        )

        return cards.map((card) => {
          const heading = card.querySelector('h3')
          const description = card.querySelector('p:last-of-type')
          const cardRect = card.getBoundingClientRect()
          const titleRect = heading?.getBoundingClientRect()
          const descriptionRect = description?.getBoundingClientRect()

          return {
            title: heading?.textContent?.trim() ?? 'unknown',
            titleWithin:
              !!titleRect &&
              titleRect.top >= cardRect.top &&
              titleRect.left >= cardRect.left &&
              titleRect.right <= cardRect.right &&
              titleRect.bottom <= cardRect.bottom,
            descriptionWithin:
              !descriptionRect ||
              (descriptionRect.top >= cardRect.top &&
                descriptionRect.left >= cardRect.left &&
                descriptionRect.right <= cardRect.right &&
                descriptionRect.bottom <= cardRect.bottom),
          }
        })
      }, sectionConfig.cardSelector)

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
  }
})

test('home hero layout stays readable across responsive breakpoints', async ({
  page,
}) => {
  const breakpoints = [
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 900 },
    { width: 1280, height: 900 },
    { width: 1440, height: 960 },
  ]

  for (const breakpoint of breakpoints) {
    await page.setViewportSize(breakpoint)
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(250)

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /get found\. get trusted\. get booked\./i,
      }),
    ).toBeVisible({ timeout: 20_000 })

    const hero = page.locator('#homepage-hero')
    await expect(hero).toBeVisible({ timeout: 20_000 })
    await expect(
      hero.getByRole('link', { name: /free practice audit/i }),
    ).toBeVisible({
      timeout: 20_000,
    })
    await expect(
      hero.getByRole('link', { name: /see the system/i }),
    ).toBeVisible({ timeout: 20_000 })

    const result = await page.evaluate(() => {
      const hero = document.getElementById('homepage-hero')
      if (!hero) {
        return null
      }

      const heroRect = hero.getBoundingClientRect()
      const primaryCta = hero.querySelector<HTMLAnchorElement>(
        'a[href="/get-started"]',
      )
      const secondaryCta = hero.querySelector<HTMLAnchorElement>(
        'a[href="#how-it-works"], a[href="/#how-it-works"]',
      )
      const primaryCtaRect = primaryCta?.getBoundingClientRect()
      const secondaryCtaRect = secondaryCta?.getBoundingClientRect()

      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        primaryCtaWithinHero:
          !!primaryCtaRect &&
          primaryCtaRect.left >= heroRect.left - 1 &&
          primaryCtaRect.right <= heroRect.right + 1,
        secondaryCtaWithinHero:
          !!secondaryCtaRect &&
          secondaryCtaRect.left >= heroRect.left - 1 &&
          secondaryCtaRect.right <= heroRect.right + 1,
      }
    })

    expect(result).not.toBeNull()
    expect(
      result?.overflow,
      `hero created horizontal overflow at ${breakpoint.width}px`,
    ).toBeLessThanOrEqual(1)
    expect(
      result?.primaryCtaWithinHero,
      `primary hero CTA escaped the hero frame at ${breakpoint.width}px`,
    ).toBe(true)
    expect(
      result?.secondaryCtaWithinHero,
      `secondary hero CTA escaped the hero frame at ${breakpoint.width}px`,
    ).toBe(true)
  }
})
