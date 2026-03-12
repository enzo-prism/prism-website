import { expect, test } from "@playwright/test"

async function getWidgetState(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const widgets = Array.from(document.querySelectorAll<HTMLElement>("elevenlabs-convai"))
    const widgetScripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        'script[src*="@elevenlabs/convai-widget-embed"]',
      ),
    )

    return {
      customElementDefined:
        typeof window.customElements?.get("elevenlabs-convai") === "function",
      floatingWidgetCount: document.querySelectorAll('[data-testid="global-elevenlabs-widget"]').length,
      heroWidgetCount: document.querySelectorAll('[data-testid="home-elevenlabs-widget"]').length,
      launcherCount: document.querySelectorAll('[aria-label="Open sales chat"]').length,
      scriptCount: widgetScripts.length,
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
    .toMatchObject({
      customElementDefined: true,
      widgetCount: 1,
      scriptCount: 1,
      expandedCount: 1,
      defaultFloatingCount: 0,
      heroWidgetCount: 1,
      floatingWidgetCount: 0,
    })

  await page.goto("/about", { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { level: 1, name: /our story/i })).toBeVisible({ timeout: 20_000 })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      widgetCount: 1,
      scriptCount: 1,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
    })

  await page.goto("/get-started", { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { level: 1, name: /turn your online presence into a growth engine/i })).toBeVisible({
    timeout: 20_000,
  })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      launcherCount: 0,
      widgetCount: 1,
      scriptCount: 1,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
    })

  await page.goto("/blog/how-to-choose-local-seo-agency", {
    waitUntil: "domcontentloaded",
  })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      widgetCount: 1,
      scriptCount: 1,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
    })
  await expect(
    page.getByRole("button", {
      name: /copy full blog post in markdown format/i,
    }),
  ).toBeVisible()
})
