import { expect, test } from '@playwright/test'

for (const width of [1024, 1280, 1440]) {
  test(`Products dropdown fits and supports keyboard navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main', exact: true })
    const products = nav.getByRole('button', { name: 'products', exact: true })
    await products.focus()
    await page.keyboard.press('Enter')
    await expect(products).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Tab')
    await expect(nav.getByRole('link', { name: /Midas/ })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(products).toBeFocused()
    await expect(products).toHaveAttribute('aria-expanded', 'false')
    await nav.getByRole('button', { name: 'services', exact: true }).click()
    await products.click()
    await expect(nav.getByRole('button', { name: 'services', exact: true })).toHaveAttribute('aria-expanded', 'false')
    for (const [name, href] of [['Midas', 'https://midas-ai.dev'], ['zRead', 'https://zread.dev']]) {
      const link = nav.getByRole('link', { name: new RegExp(name) })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', href)
      const bounds = await link.boundingBox()
      expect(bounds!.x).toBeGreaterThanOrEqual(0)
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
    }
    const geometry = await page.evaluate(() => {
      const logo = document.querySelector('header a[aria-label="Prism home"]')?.getBoundingClientRect()
      const nav = document.querySelector('header nav[aria-label="Main"]')?.getBoundingClientRect()
      return { overflow: document.documentElement.scrollWidth - innerWidth, overlap: logo && nav ? logo.right - nav.left : 0 }
    })
    expect(geometry.overflow).toBeLessThanOrEqual(1)
    expect(geometry.overlap).toBeLessThanOrEqual(0)
  })
}

for (const width of [390, 768, 1280]) {
  test(`Products section and footer are usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#products')
    const section = page.locator('#products')
    await section.scrollIntoViewIfNeeded()
    await expect(section.getByRole('heading', { name: 'Built for our team. Free for yours.' })).toBeVisible()
    for (const name of ['Midas', 'zRead']) {
      await expect(section.getByRole('link', { name: `Explore ${name}`, exact: true })).toBeVisible()
      await expect(page.getByRole('navigation', { name: 'Footer', exact: true }).getByRole('link', { name, exact: true })).toHaveAttribute('target', '_blank')
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1)
  })
}
