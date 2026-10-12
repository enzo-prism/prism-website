import { expect, test } from '@playwright/test'

for (const width of [1024, 1280, 1440]) {
  test(`Header navigation fits and supports keyboard navigation at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'desktop-chromium',
      'Desktop header navigation; touch emulation has its own menu spec.',
    )
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main', exact: true })
    const links = nav.getByRole('link')
    await expect(links).toHaveText(['Work', 'Wall of Love', 'About', 'Pricing'])
    await expect(nav.getByRole('button', { name: /services/i })).toBeVisible()

    const work = nav.getByRole('link', { name: 'Work', exact: true })
    await work.focus()
    await page.keyboard.press('Tab')
    await expect(nav.getByRole('button', { name: /services/i })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(
      nav.getByRole('link', { name: 'Wall of Love', exact: true }),
    ).toBeFocused()

    await work.click()
    await expect(page).toHaveURL(/\/case-studies$/)
    await expect(
      nav.getByRole('link', { name: 'Work', exact: true }),
    ).toHaveAttribute('aria-current', 'page')

    const geometry = await page.evaluate(() => {
      const logo = document
        .querySelector('header a[aria-label="Prism home"]')
        ?.getBoundingClientRect()
      const nav = document
        .querySelector('header nav[aria-label="Main"]')
        ?.getBoundingClientRect()
      const cta = document
        .querySelector('[data-testid="navbar-cta"]')
        ?.getBoundingClientRect()
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        logoOverlap: logo && nav ? logo.right - nav.left : 0,
        ctaOverlap: cta && nav ? nav.right - cta.left : 0,
      }
    })
    expect(geometry.overflow).toBeLessThanOrEqual(1)
    expect(geometry.logoOverlap).toBeLessThanOrEqual(0)
    expect(geometry.ctaOverlap).toBeLessThanOrEqual(0)
  })
}

test('Services menu opens and links every service', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'desktop-chromium',
    'Desktop header navigation; touch emulation has its own menu spec.',
  )
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/about')
  const nav = page.getByRole('navigation', { name: 'Main', exact: true })
  await nav.getByRole('button', { name: /services/i }).click()
  for (const [name, href] of [
    ['Websites', '/websites'],
    ['Content', '/content'],
    ['Ads', '/ads'],
    ['Dental OS', '/dental-os'],
    ['Prism Infinity', '/prism-infinity'],
  ]) {
    await expect(
      page.getByRole('link', { name: new RegExp(`^${name}`) }).first(),
    ).toHaveAttribute('href', href)
  }
})

for (const width of [390, 768, 1280]) {
  test(`Products section and footer are usable at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#products')
    const section = page.locator('#products')
    await section.scrollIntoViewIfNeeded()
    await expect(
      section.getByRole('heading', {
        name: 'built for our team. free for yours.',
      }),
    ).toBeVisible()
    for (const name of ['Midas', 'zRead']) {
      await expect(
        section.getByRole('link', { name, exact: true }),
      ).toHaveAttribute('target', '_blank')
      await expect(
        page
          .getByRole('navigation', { name: 'Footer', exact: true })
          .getByRole('link', { name, exact: true }),
      ).toHaveAttribute('target', '_blank')
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      ),
    ).toBeLessThanOrEqual(1)
  })
}
