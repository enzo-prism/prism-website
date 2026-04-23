import { expect, test } from '@playwright/test'

async function waitForAsciiLoop(
  page: import('@playwright/test').Page,
) {
  const pre = page.locator('#homepage-hero pre').first()

  await expect.poll(async () => await pre.count()).toBe(1)
  await expect(pre).toBeVisible()

  const initialFrame = await pre.textContent()
  expect(initialFrame?.trim().length ?? 0).toBeGreaterThan(0)

  await page.waitForTimeout(900)
  const nextFrame = await pre.textContent()
  expect(nextFrame).not.toBe(initialFrame)
}

async function waitForVideoLoop(
  page: import('@playwright/test').Page,
  path: string,
) {
  await page.goto(path, { waitUntil: 'domcontentloaded' })

  const video = page.locator('video[data-hero-loop="true"]').first()
  await expect(video).toHaveCount(1)
  await expect(video).toBeVisible()

  await expect
    .poll(async () => {
      return await video.evaluate((node: HTMLVideoElement) => {
        const element = node as HTMLVideoElement
        return element.readyState
      })
    })
    .toBeGreaterThan(1)

  const initialState = await video.evaluate((node: HTMLVideoElement) => {
    const element = node as HTMLVideoElement
    return {
      currentTime: element.currentTime,
      paused: element.paused,
      width: element.clientWidth,
      height: element.clientHeight,
    }
  })

  expect(initialState.width).toBeGreaterThan(0)
  expect(initialState.height).toBeGreaterThan(0)

  await page.waitForTimeout(1800)

  const nextState = await video.evaluate((node: HTMLVideoElement) => {
    const element = node as HTMLVideoElement
    return {
      currentTime: element.currentTime,
      paused: element.paused,
    }
  })

  expect(nextState.paused).toBe(false)
  expect(nextState.currentTime).toBeGreaterThan(initialState.currentTime)
}

test.describe('Hero animation loops', () => {
  test('homepage ASCII hero loop advances', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await waitForAsciiLoop(page)
  })

  test('case studies hero video loop advances', async ({ page }) => {
    await waitForVideoLoop(page, '/case-studies')
  })

  test('wall of love hero video loop advances', async ({ page }) => {
    await waitForVideoLoop(page, '/wall-of-love')
  })
})
