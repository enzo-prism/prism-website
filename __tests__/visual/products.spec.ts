import { expect, test } from '@playwright/test'

for (const width of [1024, 1280, 1440]) {
  test(`Client navigation fits and supports keyboard navigation at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main', exact: true })
    const links = nav.getByRole('link')
    await expect(links).toHaveText(['Home', 'Clients', 'Wall of Love'])
    await expect(nav.getByRole('button')).toHaveCount(0)
    await links.first().focus()
    await page.keyboard.press('Tab')
    const clients = nav.getByRole('link', { name: 'Clients', exact: true })
    await expect(clients).toBeFocused()
    await expect(clients).toHaveAttribute('href', '/case-studies')
    await page.keyboard.press('Tab')
    await expect(
      nav.getByRole('link', { name: 'Wall of Love', exact: true }),
    ).toBeFocused()
    await clients.click()
    await expect(page).toHaveURL(/\/case-studies$/)
    await expect(
      nav.getByRole('link', { name: 'Clients', exact: true }),
    ).toHaveAttribute('aria-current', 'page')
    const geometry = await page.evaluate(() => {
      const logo = document
        .querySelector('header a[aria-label="Prism home"]')
        ?.getBoundingClientRect()
      const nav = document
        .querySelector('header nav[aria-label="Main"]')
        ?.getBoundingClientRect()
      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        overlap: logo && nav ? logo.right - nav.left : 0,
      }
    })
    expect(geometry.overflow).toBeLessThanOrEqual(1)
    expect(geometry.overlap).toBeLessThanOrEqual(0)
  })
}

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
        name: 'Built for our team. Free for yours.',
      }),
    ).toBeVisible()
    for (const name of ['Midas', 'zRead']) {
      await expect(
        section.getByRole('link', { name: `Explore ${name}`, exact: true }),
      ).toBeVisible()
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
