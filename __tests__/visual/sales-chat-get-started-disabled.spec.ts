import { expect, test } from "@playwright/test"

test.describe("sales chat on /get-started (disabled)", () => {
  test("does not render chat launcher and keeps booking path visible", async ({ page }) => {
    await page.goto("/get-started")

    await expect(page.getByRole("button", { name: /open sales chat/i })).toHaveCount(0)
    await expect(page.getByRole("link", { name: /book your strategy call/i }).first()).toBeVisible()
    await expect(page.getByText(/book a strategy call/i).first()).toBeVisible()
  })
})
