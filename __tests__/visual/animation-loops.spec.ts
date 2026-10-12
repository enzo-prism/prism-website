import { expect, test } from '@playwright/test'

test.describe('Hero motion', () => {
  test('homepage refraction scene and work wall are in motion', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const scene = page.locator('[data-testid="home-refraction"] svg')
    await expect(scene).toBeVisible()
    // The spectrum extends from the glass on load (CSS keyframes).
    const spectrumAnimations = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('[data-testid="home-refraction"] polygon'),
      ).map((node) => getComputedStyle(node).animationName),
    )
    expect(spectrumAnimations.some((name) => name && name !== 'none')).toBe(
      true,
    )

    await page.locator('#work').scrollIntoViewIfNeeded()
    const track = page.locator('#work .prism-marquee-track').first()
    const before = await track.evaluate((el) => getComputedStyle(el).transform)
    await page.waitForTimeout(600)
    const after = await track.evaluate((el) => getComputedStyle(el).transform)
    expect(after).not.toBe(before)
  })
})
