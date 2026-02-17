import { expect, test } from "@playwright/test"

test("global page markdown copy is available on inner pages (not homepage)", async ({
  context,
  isMobile,
  page,
}) => {
  test.skip(
    isMobile,
    "Clipboard validation is desktop-only; mobile profiles can block clipboard writes.",
  )

  await context.grantPermissions(["clipboard-read", "clipboard-write"])

  await page.goto("/", { waitUntil: "domcontentloaded" })
  await expect(
    page.getByRole("button", { name: /copy current page as markdown/i }),
  ).toHaveCount(0)

  await page.goto("/about", { waitUntil: "domcontentloaded" })
  await expect(
    page.getByRole("heading", { level: 1, name: /our story/i }),
  ).toBeVisible({ timeout: 20_000 })

  const globalCopyButton = page.getByRole("button", {
    name: /copy current page as markdown/i,
  })
  await expect(globalCopyButton).toBeVisible()
  await globalCopyButton.click()

  await expect(globalCopyButton).toContainText(/markdown copied/i, {
    timeout: 20_000,
  })

  const clipboard = await page.evaluate(async () => navigator.clipboard.readText())
  expect(clipboard).toContain(
    "Source: [http://localhost:3000/about](http://localhost:3000/about)",
  )
  expect(clipboard).toContain("## Page links")

  await page.goto("/blog/how-to-choose-local-seo-agency", {
    waitUntil: "domcontentloaded",
  })
  await expect(
    page.getByRole("button", { name: /copy current page as markdown/i }),
  ).toHaveCount(0)
  await expect(
    page.getByRole("button", {
      name: /copy full blog post in markdown format/i,
    }),
  ).toBeVisible()
})
