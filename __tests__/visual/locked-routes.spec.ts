import { expect, test, type Page } from "@playwright/test"

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
    for (const video of Array.from(document.querySelectorAll("video"))) {
      try {
        video.pause()
        video.currentTime = 0
      } catch {
        // ignore
      }
    }
  })

  await page.evaluate(async () => {
    if ("fonts" in document) {
      const fonts = (document as any).fonts as { ready?: Promise<unknown> } | undefined
      await fonts?.ready
    }
  })
}

async function expectLockedRouteSnapshotSurface(page: Page) {
  if (process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED === "true") {
    await expect(page.locator("elevenlabs-convai")).toHaveCount(0)
  }
}

const lockedRoutes = [
  { name: "home", path: "/", readyHeading: /^prism$/i },
  { name: "about", path: "/about", readyHeading: /our story/i },
  { name: "pricing", path: "/pricing", readyHeading: /simple pricing for teams that want a clearer growth path\./i },
] as const

for (const route of lockedRoutes) {
  test(`${route.name} UI snapshot stays stable`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await seedDeterministicRandom(page)
    await disableElevenLabsWidget(page)
    await page.goto(route.path, { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(250)

    await expect(page.getByRole("heading", { level: 1, name: route.readyHeading })).toBeVisible({
      timeout: 20_000,
    })

    await stabilizePage(page)
    await expectLockedRouteSnapshotSurface(page)
    await page.waitForTimeout(750)

    await expect(page).toHaveScreenshot(`${route.name}.png`, { timeout: 15_000 })
  })
}
