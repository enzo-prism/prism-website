import { expect, test } from '@playwright/test'

test.describe('Hero motion', () => {
  test('homepage refraction scene, logo rail, and work wall are in motion', async ({
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

    for (const id of ['clients', 'more-work']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      const track = page.locator(`#${id} .prism-marquee-track`).first()
      const before = await track.evaluate(
        (el) => getComputedStyle(el).transform,
      )
      await page.waitForTimeout(600)
      const after = await track.evaluate((el) => getComputedStyle(el).transform)
      expect(after, `#${id} marquee is static`).not.toBe(before)
    }
  })
})
