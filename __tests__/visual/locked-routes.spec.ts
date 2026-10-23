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

/**
 * The intake month renders from the visitor's clock, so without a freeze the
 * locked screenshots would drift every month ("October" becomes "November").
 * This shifts `new Date()` / `Date.now()` to a fixed mid-September instant
 * (intake: October) while leaving timers and animation frames on real time.
 * The instant sits mid-month so every timezone still reads September.
 */
async function freezeIntakeMonth(page: Page) {
  await page.addInitScript(() => {
    const RealDate = Date
    const frozenTime = new RealDate('2026-09-16T12:00:00-07:00').getTime()
    const shift = frozenTime - RealDate.now()

    class ShiftedDate extends RealDate {
      constructor(...args: Array<never>) {
        if (args.length === 0) {
          super(RealDate.now() + shift)
        } else {
          // @ts-expect-error - constructor overloads are caller-side only.
          super(...args)
        }
      }

      static now() {
        return RealDate.now() + shift
      }
    }
    ShiftedDate.parse = RealDate.parse.bind(RealDate)
    ShiftedDate.UTC = RealDate.UTC.bind(RealDate)

    window.Date = ShiftedDate as unknown as DateConstructor
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
  await expect(
    page.locator('script[src*="@elevenlabs/convai-widget-embed"]'),
  ).toHaveCount(0)
  await expect(page.locator('#prism-guide')).toHaveCount(0)
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

  await locator.evaluate((node, height) => {
    ;(node as HTMLElement).style.minHeight = `${height}px`
    ;(node as HTMLElement).style.height = `${height}px`
  }, lockedHeight)
}

const lockedRoutes = [
  {
    name: 'home',
    path: '/',
    readyHeading: /^impossible is temporary\.$/i,
    mustContain: [
      /website design, content, ads, and AEO that turn strangers into customers/i,
      /loved by b2b and consumer brands/i,
      /waitlist open for [a-z]+/i,
      /prism is fully booked right now\./i,
      /join the waitlist to work with us in [a-z]+\./i,
      /join the waitlist/i,
    ],
  },
  { name: 'about', path: '/about', readyHeading: /built by enzo sison\./i },
  {
    name: 'pricing',
    path: '/pricing',
    readyHeading: /a clearer way to invest in growth\./i,
    mustContain: [
      /prism is fully booked right now\./i,
      /join the waitlist to work with us in [a-z]+\./i,
      /four ways to work with prism\./i,
    ],
  },
  {
    name: 'waitlist',
    path: '/waitlist',
    readyHeading: /^join the waitlist$/i,
    mustContain: [
      /prism is fully booked\. join the waitlist to work with us in [a-z]+\./i,
      /see why clients love prism/i,
      /step 1 of 5/i,
      /what should prism focus on\?/i,
    ],
  },
] as const

// Screenshot comparisons alone cannot protect copy on these dark routes: a
// full pricing-page redesign moves only ~4% of pixels, under the 5%
// maxDiffPixelRatio needed for macOS<->Linux font drift. These text guards
// catch what pixel tolerance absorbs: retired public pricing reappearing,
// waitlist copy disappearing, the retired booking/intake CTAs coming back, or
// the two packaged offers retired on 2026-10-12 reappearing (Prism offers four
// services: Websites, Content, Ads, AEO). Mirrors lib/pricing-consistency.ts
// policy.
const retiredPricingTokens = [
  /\$1,000 one-time/i,
  /\$1,000(?:\/| per )month/i,
  /\$2,000(?:\/| per )month/i,
  /\$5,000\b/,
  /book a free demo/i,
  /start my website/i,
  /scoped on a 30-min(?:ute)? (?:zoom )?call/i,
  /\bdental os\b/i,
  /\bprism infinity\b/i,
] as const

for (const route of lockedRoutes) {
  test(`${route.name} copy stays waitlist-first (no retired pricing)`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop-chromium',
      'Rendered copy is identical across projects; one pass is enough.',
    )

    await freezeIntakeMonth(page)
    await page.goto(route.path, { waitUntil: 'domcontentloaded' })
    await expect(
      page.getByRole('heading', { level: 1, name: route.readyHeading }),
    ).toBeVisible({ timeout: 20_000 })

    const bodyText = await page.evaluate(() => document.body.innerText)

    if ('mustContain' in route && route.mustContain) {
      for (const phrase of route.mustContain) {
        expect(bodyText, `${route.path} lost required copy ${phrase}`).toMatch(
          phrase,
        )
      }
    }

    for (const token of retiredPricingTokens) {
      expect(
        bodyText,
        `${route.path} shows retired public pricing ${token}`,
      ).not.toMatch(token)
    }
  })

  test(`${route.name} UI snapshot stays stable`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await seedDeterministicRandom(page)
    await freezeIntakeMonth(page)
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

async function snapshotHomeSection(page: Page, heading: RegExp, name: string) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await seedDeterministicRandom(page)
  await freezeIntakeMonth(page)
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(250)

  const sectionHeading = page.getByRole('heading', { level: 2, name: heading })
  await expect(sectionHeading).toBeVisible({ timeout: 20_000 })

  const section = sectionHeading.locator('xpath=ancestor::section[1]')
  await expect(section).toBeVisible()
  await section.scrollIntoViewIfNeeded()

  await stabilizePage(page)
  await expectLockedRouteSnapshotSurface(page)
  await page.waitForTimeout(300)

  await expect(section).toHaveScreenshot(name, { timeout: 15_000 })
}

test('home numbers section snapshot stays stable', async ({ page }) => {
  await snapshotHomeSection(
    page,
    /numbers, not adjectives\./i,
    'home-numbers-section.png',
  )
})

test('home services section snapshot stays stable', async ({ page }) => {
  await snapshotHomeSection(
    page,
    /shine\. convert\. get seen\./i,
    'home-services-section.png',
  )
})

test('home how-to-get-in section snapshot stays stable', async ({ page }) => {
  await snapshotHomeSection(
    page,
    /fully booked\. here’s how to get in\./i,
    'home-how-section.png',
  )
})

test('home cards stay contained across responsive breakpoints', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chromium',
    'Manual breakpoint loop already covers mobile and tablet sizes.',
  )

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await freezeIntakeMonth(page)

  const breakpoints = [
    { width: 1440, height: 960 },
    { width: 1150, height: 1100 },
    { width: 768, height: 1200 },
    { width: 390, height: 1200 },
  ]

  const sections = [
    {
      heading: /shine\. convert\. get seen\./i,
      cardSelector: '[data-home-service-card]',
      expectedCount: 3,
    },
    {
      heading: /fully booked\. here’s how to get in\./i,
      cardSelector: '[data-home-step]',
      expectedCount: 3,
    },
    {
      heading: /numbers, not adjectives\./i,
      cardSelector: '[data-home-stat]',
      expectedCount: 4,
    },
  ]

  for (const breakpoint of breakpoints) {
    await page.setViewportSize(breakpoint)
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(250)

    for (const sectionConfig of sections) {
      const sectionHeading = page.getByRole('heading', {
        level: 2,
        name: sectionConfig.heading,
      })
      await expect(sectionHeading).toBeVisible({ timeout: 20_000 })

      const section = sectionHeading.locator('xpath=ancestor::section[1]')
      await section.scrollIntoViewIfNeeded()

      await expect(section.locator(sectionConfig.cardSelector)).toHaveCount(
        sectionConfig.expectedCount,
      )

      const containment = await section.evaluate(
        (sectionNode, cardSelector) => {
          const cards = Array.from(
            sectionNode.querySelectorAll<HTMLElement>(cardSelector),
          )

          return cards.map((card) => {
            const cardRect = card.getBoundingClientRect()
            const children = Array.from(
              card.querySelectorAll<HTMLElement>('h3, p, span'),
            ).filter((node) => {
              // Visible text boxes only: skip sr-only copies (1px clipped
              // boxes), aria-hidden layout ghosts, and empty nodes.
              if (node.offsetParent === null || !node.textContent?.trim()) {
                return false
              }
              if (node.closest('[aria-hidden="true"]')) return false
              const rect = node.getBoundingClientRect()
              return rect.width > 2 && rect.height > 2
            })

            const escaped = children.find((node) => {
              const rect = node.getBoundingClientRect()
              return (
                rect.left < cardRect.left - 1 || rect.right > cardRect.right + 1
              )
            })

            return {
              label: card.textContent?.trim().slice(0, 40) ?? 'unknown',
              escaped: escaped?.textContent?.trim().slice(0, 40) ?? null,
            }
          })
        },
        sectionConfig.cardSelector,
      )

      for (const card of containment) {
        expect(
          card.escaped,
          `"${card.label}" let "${card.escaped}" overflow at ${breakpoint.width}px`,
        ).toBeNull()
      }
    }
  }
})

test('home hero layout stays readable across responsive breakpoints', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chromium',
    'Manual breakpoint loop already covers mobile and tablet sizes.',
  )

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
        name: /^impossible is temporary\.$/i,
      }),
    ).toBeVisible({ timeout: 20_000 })

    const hero = page.locator('#homepage-hero')
    await expect(hero).toBeVisible({ timeout: 20_000 })
    await expect(
      hero.getByRole('link', { name: /join the waitlist/i }),
    ).toBeVisible({ timeout: 20_000 })
    await expect(hero.getByRole('link', { name: /see the work/i })).toBeVisible(
      { timeout: 20_000 },
    )

    const result = await page.evaluate(() => {
      const hero = document.getElementById('homepage-hero')
      if (!hero) {
        return null
      }

      const heroRect = hero.getBoundingClientRect()
      const primaryCta = hero.querySelector<HTMLAnchorElement>(
        'a[href="/waitlist"]:not([class*="group/status"])',
      )
      const secondaryCta =
        hero.querySelector<HTMLAnchorElement>('a[href="#work"]')
      const primaryCtaRect = primaryCta?.getBoundingClientRect()
      const secondaryCtaRect = secondaryCta?.getBoundingClientRect()

      return {
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        primaryCtaAboveFold:
          !!primaryCtaRect && primaryCtaRect.bottom <= window.innerHeight,
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
      result?.primaryCtaAboveFold,
      `primary hero CTA fell below the fold at ${breakpoint.width}px`,
    ).toBe(true)
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
