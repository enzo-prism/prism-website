import { expect, test } from "@playwright/test"

test.describe("sales chat on /get-started (enabled)", () => {
  test("keeps the stock ElevenLabs widget visible even when legacy sales-chat env is enabled", async ({ page }) => {
    await page.goto("/get-started")
    await expect(page.locator("elevenlabs-convai")).toHaveCount(1)
    await expect(page.getByRole("button", { name: /open sales chat/i })).toHaveCount(0)
    await expect(page.getByRole("link", { name: /book your strategy call/i }).first()).toBeVisible()
  })
})
