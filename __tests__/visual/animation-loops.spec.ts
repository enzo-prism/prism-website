import { expect, test } from '@playwright/test'

async function waitForAsciiLoop(
  page: import('@playwright/test').Page,
  scopeSelector = '#homepage-hero',
) {
  // Canvas heroes (LCP) and color ASCII sources render <canvas>; monochrome
  // DOM-mode heroes render <pre>. Both expose data-current-frame. Static
  // ghost underlays (data-ghost-frame) are not players; skip them.
  const node = page
    .locator(
      `${scopeSelector} pre:not([data-ghost-frame]), ${scopeSelector} canvas`,
    )
    .first()

  await expect.poll(async () => await node.count()).toBe(1)
  await expect(node).toBeVisible()

  await expect
    .poll(
      async () =>
        await node.evaluate((el) => el.getAttribute('data-current-frame')),
      {
        timeout: 2500,
      },
    )
    .not.toBeNull()

  const initialFrame = await node.evaluate((el) =>
    el.getAttribute('data-current-frame'),
  )
  await expect
    .poll(
      async () =>
        await node.evaluate((el) => el.getAttribute('data-current-frame')),
      {
        timeout: 2500,
      },
    )
    .not.toBe(initialFrame)
}

test.describe('Hero animation loops', () => {
  test('homepage ASCII hero loop advances', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    // The ASCII hero sits below the full-viewport cover section; its loading
    // and playback are intersection-gated by design, so scroll it into view
    // (the same action the cover's scroll cue asks of visitors) first.
    await page.locator('#homepage-hero').scrollIntoViewIfNeeded()
    await waitForAsciiLoop(page)
  })

  test('case studies ASCII planet loop advances', async ({ page }) => {
    await page.goto('/case-studies', { waitUntil: 'domcontentloaded' })
    await waitForAsciiLoop(page, '#case-studies-hero')
  })

  test('wall of love ASCII heart loop advances', async ({ page }) => {
    await page.goto('/wall-of-love', { waitUntil: 'domcontentloaded' })
    await waitForAsciiLoop(page, '#wall-of-love-hero')
  })
})
