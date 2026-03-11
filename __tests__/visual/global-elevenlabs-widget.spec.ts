import { expect, test } from "@playwright/test"

async function getVisibleWidgetAndLauncherCounts(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const launcherCount = document.querySelectorAll('[aria-label="Open sales chat"]').length
    const widgetCount = Array.from(
      document.querySelectorAll<HTMLElement>('elevenlabs-convai[variant="tiny"][placement="bottom-right"]'),
    ).filter((widget) => {
      const styles = window.getComputedStyle(widget)
      return styles.display !== "none" && styles.visibility !== "hidden"
    }).length

    return `${launcherCount}:${widgetCount}`
  })
}

test("global ElevenLabs launcher is route-aware and keeps dedicated chat routes clean", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" })
  await expect(page.locator('elevenlabs-convai[variant="tiny"][placement="bottom-right"]')).toHaveCount(0)

  await page.goto("/about", { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { level: 1, name: /our story/i })).toBeVisible({ timeout: 20_000 })

  const aboutWidget = page.locator('elevenlabs-convai[variant="tiny"][placement="bottom-right"]')
  await expect(aboutWidget).toHaveCount(1)
  await expect(aboutWidget).toHaveAttribute("dismissible", "true")
  await expect(aboutWidget).toHaveAttribute("default-expanded", "false")

  await page.goto("/get-started", { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { level: 1, name: /turn your online presence into a growth engine/i })).toBeVisible({
    timeout: 20_000,
  })
  await expect
    .poll(async () => getVisibleWidgetAndLauncherCounts(page), { timeout: 20_000 })
    .toMatch(/^(1:0|0:1)$/)

  await page.goto("/blog/how-to-choose-local-seo-agency", {
    waitUntil: "domcontentloaded",
  })
  await expect(page.locator('elevenlabs-convai[variant="tiny"][placement="bottom-right"]')).toHaveCount(1)
  await expect(
    page.getByRole("button", {
      name: /copy full blog post in markdown format/i,
    }),
  ).toBeVisible()
})
