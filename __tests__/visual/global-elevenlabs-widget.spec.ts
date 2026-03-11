import { expect, test } from "@playwright/test"

async function getWidgetState(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const widgets = Array.from(document.querySelectorAll<HTMLElement>("elevenlabs-convai"))

    return {
      launcherCount: document.querySelectorAll('[aria-label="Open sales chat"]').length,
      widgetCount: widgets.length,
      expandedCount: widgets.filter((widget) => widget.getAttribute("variant") === "expanded").length,
      defaultFloatingCount: widgets.filter((widget) => !widget.hasAttribute("variant")).length,
    }
  })
}

test("ElevenLabs widget stays route-aware while the homepage keeps the inline hero experience", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({ widgetCount: 1, expandedCount: 1, defaultFloatingCount: 0 })

  await page.goto("/about", { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { level: 1, name: /our story/i })).toBeVisible({ timeout: 20_000 })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({ widgetCount: 1, expandedCount: 0, defaultFloatingCount: 1 })

  await page.goto("/get-started", { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { level: 1, name: /turn your online presence into a growth engine/i })).toBeVisible({
    timeout: 20_000,
  })
  await expect
    .poll(async () => {
      const { launcherCount, widgetCount } = await getWidgetState(page)
      return `${launcherCount}:${widgetCount}`
    }, { timeout: 20_000 })
    .toMatch(/^(1:0|0:1)$/)

  await page.goto("/blog/how-to-choose-local-seo-agency", {
    waitUntil: "domcontentloaded",
  })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({ widgetCount: 1, expandedCount: 0, defaultFloatingCount: 1 })
  await expect(
    page.getByRole("button", {
      name: /copy full blog post in markdown format/i,
    }),
  ).toBeVisible()
})
