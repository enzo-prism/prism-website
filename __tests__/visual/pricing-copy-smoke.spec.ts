import { expect, test } from "@playwright/test"

const keyPages = [
  "/pricing",
  "/get-started",
  "/faq",
  "/services",
  "/websites",
  "/ads",
  "/seo",
  "/local-listings",
] as const

const legacyPricingPatterns = [
  /\$400\b/i,
  /\$900\/mo\b/i,
  /\$1,500\/mo\b/i,
  /\$2,500\b/i,
  /\$297\b/i,
  /\$97\b/i,
  /\$3,000\/mo\b/i,
  /\$3,600\/mo\b/i,
  /\$1,100\/mo\b/i,
  /\$1,400\/mo\b/i,
  /\$300\/mo\b/i,
  /starting around \$1,000/i,
  /from \$1,500\/mo/i,
] as const

test.describe("pricing copy consistency", () => {
  for (const path of keyPages) {
    test(`${path} avoids legacy conflicting pricing copy`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" })
      await page.waitForTimeout(250)
      const bodyText = await page.locator("body").innerText()

      for (const pattern of legacyPricingPatterns) {
        expect(bodyText).not.toMatch(pattern)
      }
    })
  }
})
