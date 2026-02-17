import { expect, test } from "@playwright/test"

const BLOG_SLUG = "how-to-choose-local-seo-agency"
const BLOG_PATH = `/blog/${BLOG_SLUG}`
const MARKDOWN_API_PATH = `/api/blog/${BLOG_SLUG}/markdown`

function normalizeNewlines(value: string) {
  return value.replace(/\r\n/g, "\n").trim()
}

test("blog markdown copy action copies full post source", async ({
  browserName,
  context,
  isMobile,
  page,
  request,
}) => {
  test.skip(
    isMobile,
    "Clipboard validation is desktop-only; mobile device profiles can block clipboard writes.",
  )

  if (browserName === "chromium") {
    try {
      await context.grantPermissions(["clipboard-read", "clipboard-write"])
    } catch {
      await context.grantPermissions(["clipboard-read"]).catch(() => {
        // Some mobile/browser profiles do not support clipboard permissions.
      })
    }
  } else {
    await context.grantPermissions(["clipboard-read"]).catch(() => {
      // Some mobile/browser profiles do not support clipboard permissions.
    })
  }

  const markdownResponse = await request.get(MARKDOWN_API_PATH, {
    headers: { Accept: "text/plain" },
  })
  expect(markdownResponse.ok()).toBeTruthy()

  const expectedMarkdown = await markdownResponse.text()
  expect(normalizeNewlines(expectedMarkdown)).toContain("---")
  expect(normalizeNewlines(expectedMarkdown)).toContain("title:")

  await page.goto(BLOG_PATH, { waitUntil: "domcontentloaded" })
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /how to choose a local seo agency/i,
    }),
  ).toBeVisible({ timeout: 20_000 })

  const copyButton = page.getByRole("button", {
    name: /copy full blog post in markdown format/i,
  })

  await expect(copyButton).toBeVisible()
  await copyButton.click()

  await expect(page.getByText("full post markdown copied")).toBeVisible({
    timeout: 10_000,
  })
  await expect(copyButton).toContainText(/markdown copied/i)

  const clipboardText = await page.evaluate(async () => {
    if (!navigator.clipboard?.readText) {
      return null
    }
    try {
      return await navigator.clipboard.readText()
    } catch {
      return null
    }
  })

  if (clipboardText) {
    expect(normalizeNewlines(clipboardText)).toBe(
      normalizeNewlines(expectedMarkdown),
    )
  } else {
    expect(browserName).not.toBe("chromium")
  }
})
