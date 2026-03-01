import { expect, test, type Page } from "@playwright/test"

const initPayload = {
  assistantMessage: "Hey, I'm Prism's assistant. What sounds closest to what you need?",
  nodeId: "welcome",
  quickReplies: [
    { id: "starter_free_audit", label: "Get a free audit of my website", actionType: "reply" },
    { id: "starter_website", label: "I need a new or better website", actionType: "reply" },
    { id: "starter_growth_partner", label: "I want a growth partner ($2K/mo)", actionType: "reply" },
    { id: "starter_help_choose", label: "Help me figure out what's best", actionType: "reply" },
    { id: "starter_general_question", label: "I just have a question about Prism", actionType: "reply" },
  ],
  memoryPatch: {},
  terminalAction: "none",
  conversationState: {
    nodeId: "welcome",
    exchangeCount: 0,
    memory: {},
  },
}

async function ensureChatIsOpen(page: Page) {
  const dialog = page.getByRole("dialog", { name: /chat with sales/i })
  const launcher = page.getByRole("button", { name: /open sales chat/i })
  const closeButton = page.getByRole("button", { name: /close sales chat/i })
  const headerText = page.getByText(/prism sales assistant/i).first()
  const overlay = page.locator(
    "div[data-state='open'][aria-hidden='true'][data-aria-hidden='true']",
  )

  await page.waitForLoadState("domcontentloaded")

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const chatIsOpen = (await dialog.isVisible().catch(() => false))
      || (await closeButton.isVisible().catch(() => false))
      || (await headerText.isVisible().catch(() => false))

    if (chatIsOpen) {
      return
    }

    // Defensive reset: a stale overlay can survive between test steps and block launcher clicks.
    const closeVisible = await closeButton.isVisible().catch(() => false)
    if (closeVisible) {
      await closeButton.click()
      await expect(dialog).toBeHidden({ timeout: 5_000 }).catch(() => {})
    } else {
      const overlayVisible = await overlay.first().isVisible().catch(() => false)
      if (overlayVisible) {
        await page.keyboard.press("Escape")
        await overlay.first().waitFor({ state: "hidden", timeout: 5_000 }).catch(() => {})
      }
    }

    const launcherVisible = await launcher.isVisible().catch(() => false)
    if (!launcherVisible) {
      await page.waitForTimeout(250)
      continue
    }

    try {
      await launcher.click({ timeout: 5_000, force: true })
    } catch {
      await page.keyboard.press("Escape")
      await overlay.first().waitFor({ state: "hidden", timeout: 5_000 }).catch(() => {})
      await launcher.click({ timeout: 5_000, force: true })
    }

    const openedAfterClick = (await dialog.isVisible().catch(() => false))
      || (await headerText.isVisible().catch(() => false))
    if (openedAfterClick) {
      return
    }
  }

  await expect(dialog).toBeVisible({ timeout: 15_000 })
}

test.describe("sales chat on /get-started (enabled)", () => {
  test("shows launcher, opens chat, and keeps long quick-reply chips inside container", async ({ page }) => {
    await page.goto("/get-started")
    await ensureChatIsOpen(page)

    const chips = page.getByLabel("Suggested replies").getByRole("button")
    await expect(chips).toHaveCount(5)
    await expect(page.getByRole("button", { name: /i just have a question about prism/i })).toBeVisible()

    const isOverflowing = await chips.evaluateAll((elements) => {
      return elements.some((element) => {
        const button = element as HTMLButtonElement
        return button.scrollWidth > button.clientWidth + 1
      })
    })

    expect(isOverflowing).toBe(false)
  })

  test("renders one polished fallback surface without transcript duplication", async ({ page }) => {
    let callCount = 0

    await page.route("**/api/chat", async (route, request) => {
      const body = request.postDataJSON() as { buttonId?: string }
      if (body.buttonId === "__init__") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(initPayload),
        })
        return
      }

      callCount += 1
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Service unavailable",
          message: "Service unavailable",
          fallbackToHuman: true,
          errorType: "config_missing",
        }),
      })
    })

    await page.goto("/get-started")
    await ensureChatIsOpen(page)

    const composer = page.getByRole("textbox", { name: /message sales assistant/i })
    await composer.fill("How long until I see results?")
    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText("A specialist is ready to help. Please use booking and we'll route you immediately.")).toBeVisible()
    await expect(page.getByRole("heading", { name: /specialist ready/i })).toBeVisible()
    await expect(page.getByRole("alert")).toHaveCount(0)

    await composer.fill("Can you still help?")
    await page.getByRole("button", { name: /send message/i }).click()

    await expect(page.getByText("A specialist is ready to help. Please use booking and we'll route you immediately.")).toHaveCount(1)
    expect(callCount).toBeGreaterThanOrEqual(2)
  })
})
