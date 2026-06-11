import { expect, test } from '@playwright/test'

async function waitForAsciiLoop(
  page: import('@playwright/test').Page,
) {
  const pre = page.locator('#homepage-hero pre').first()

  await expect.poll(async () => await pre.count()).toBe(1)
  await expect(pre).toBeVisible()

  await expect
    .poll(
      async () =>
        await pre.evaluate((node) => node.getAttribute('data-current-frame')),
      {
        timeout: 2500,
      },
    )
    .not.toBeNull()

  const initialFrame = await pre.evaluate((node) =>
    node.getAttribute('data-current-frame'),
  )
  await expect
    .poll(
      async () =>
        await pre.evaluate((node) => node.getAttribute('data-current-frame')),
      {
        timeout: 2500,
      },
    )
    .not.toBe(initialFrame)
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

  // Poll on actual playback progress: `paused` flips false synchronously at
  // play(), long before the first frame of a remote stream decodes, so it is
  // not a reliable readiness signal on its own.
  await expect
    .poll(
      async () =>
        await video.evaluate(
          (node: HTMLVideoElement) => node.currentTime,
        ),
      {
        timeout: 8000,
      },
    )
    .toBeGreaterThan(initialState.currentTime)

  const nextState = await video.evaluate((node: HTMLVideoElement) => {
    const element = node as HTMLVideoElement
    return {
      currentTime: element.currentTime,
      paused: element.paused,
    }
  })

  expect(nextState.paused).toBe(false)
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
