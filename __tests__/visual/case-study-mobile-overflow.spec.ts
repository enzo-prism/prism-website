import { expect, test } from "@playwright/test"

import { CASE_STUDIES } from "../../lib/case-study-data"

const MOBILE_VIEWPORT = { width: 390, height: 844 }
const ALLOWED_SCROLL_DELTA = 4

for (const { slug, title } of CASE_STUDIES) {
  test(`case study ${slug} stays within the mobile viewport`, async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT)
    await page.goto(`/case-studies/${slug}`, { waitUntil: "networkidle" })
    await expect(page.locator("main")).toBeVisible()

    const overflow = await page.evaluate(() => {
      const viewport = window.innerWidth
      const doc = document.documentElement

      const offenders = [...document.querySelectorAll("body *")]
        .map((element) => {
          const rect = element.getBoundingClientRect()
          const style = window.getComputedStyle(element)
          const text = (element.textContent || "").replace(/\s+/g, " ").trim()

          return {
            tag: element.tagName.toLowerCase(),
            className: (element.className || "").toString().slice(0, 160),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            top: Math.round(rect.top),
            width: Math.round(rect.width),
            position: style.position,
            text: text.slice(0, 100),
          }
        })
        .filter((item) => item.right > viewport + 1 || item.left < -1)
        .slice(0, 12)

      return {
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        delta: doc.scrollWidth - doc.clientWidth,
        offenders,
      }
    })

    expect(
      overflow.delta,
      `${title} (${slug}) overflowed by ${overflow.delta}px on mobile.\nOffenders: ${JSON.stringify(overflow.offenders, null, 2)}`,
    ).toBeLessThanOrEqual(ALLOWED_SCROLL_DELTA)
  })
}
