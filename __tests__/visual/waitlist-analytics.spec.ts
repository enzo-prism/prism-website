import { expect, test } from '@playwright/test'

// Chromium resolves *.localhost locally. The production host gate permits this
// test hostname; every external request is intercepted below, including GA/Ads.
const port = process.env.PLAYWRIGHT_PORT ?? '3000'
test.use({ baseURL: `http://prism-audit.localhost:${port}` })

test.beforeEach(async ({ page }) => {
  // No test may send analytics, application data, or other traffic externally.
  await page.route('**/*', (route) =>
    new URL(route.request().url()).hostname === 'prism-audit.localhost'
      ? route.continue()
      : route.abort(),
  )
})

test('accepted waitlist receipt and conversion survive tracking/storage constraints', async ({
  page,
  isMobile,
}) => {
  const receipts: string[] = []
  await page.route('**/*', async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    if (url.hostname === 'prism-audit.localhost') return route.continue()
    if (url.hostname === 'formspree.io' && request.method() === 'POST') {
      receipts.push(request.postData() ?? '')
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"ok":true}',
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
    }
    if (url.hostname === 'formspree.io' && request.method() === 'OPTIONS') {
      return route.fulfill({
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': '*',
        },
      })
    }
    return route.abort()
  })
  await page.addInitScript(() => {
    Object.defineProperty(document, 'referrer', {
      configurable: true,
      value: 'https://chatgpt.com/c/private?email=private@example.com',
    })
    // The conversion must not depend on writing pending context into storage.
    const originalSetItem = Storage.prototype.setItem
    Storage.prototype.setItem = function (key, value) {
      if (this === window.sessionStorage)
        throw new DOMException('Blocked', 'SecurityError')
      originalSetItem.call(this, key, value)
    }
  })
  await page.goto('/waitlist?focus=ads')
  await page.getByRole('button', { name: /^continue/i }).click()
  await page
    .getByRole('radio', { name: /in 1–3 months/i })
    .locator('..')
    .click()
  await page.getByRole('button', { name: /^continue/i }).click()
  await page.getByLabel(/first name/i).fill('QA')
  await page.getByLabel(/last name/i).fill('Fixture')
  await page.getByLabel(/^email$/i).fill('qa@example.com')
  await page.getByRole('button', { name: /^continue/i }).click()
  const noWebsite = page
    .getByRole('checkbox', { name: /i don.t have a website yet/i })
    .locator('..')
  if (isMobile) await noWebsite.tap()
  else await noWebsite.click()
  await expect(
    page.getByRole('checkbox', { name: /i don.t have a website yet/i }),
  ).toBeChecked()
  await page.getByRole('button', { name: /^continue/i }).click()
  await page
    .getByLabel(/your goals/i)
    .fill('Local QA only; the endpoint is intercepted.')
  await page.getByRole('button', { name: /join the waitlist/i }).click()
  await expect(page).toHaveURL(/\/waitlist\/thank-you$/)
  expect(receipts).toHaveLength(1)
  const id = receipts[0].match(/waitlist-[a-f0-9-]{36}/)?.[0]
  expect(id).toBeTruthy()
  expect(receipts[0]).toContain('chatgpt.com')
  const leads = await page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((entry) => entry[0] === 'event' && entry[1] === 'generate_lead'),
  )
  expect(leads).toHaveLength(1)
  expect(leads[0][2]).toMatchObject({
    transaction_id: id,
    lead_type: 'waitlist',
  })
  expect(JSON.stringify(leads)).not.toContain('qa@example.com')
  expect(JSON.stringify(leads)).not.toContain('private@example.com')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /you.re on the list/i,
  )
  const reloadedLeads = await page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((entry) => entry[0] === 'event' && entry[1] === 'generate_lead'),
  )
  expect(reloadedLeads).toHaveLength(0)
  expect(receipts).toHaveLength(1)
})

test('priority titles and contextual links are rendered in HTML', async ({
  page,
}, testInfo) => {
  await page.goto('/ads')
  await page
    .getByRole('link', { name: /check the destination troubleshooting guide/i })
    .locator('..')
    .screenshot({ path: testInfo.outputPath('ads-contextual-link.png') })
  await page
    .getByRole('link', { name: /check the destination troubleshooting guide/i })
    .click()
  await expect(page).toHaveTitle('Google Ads: destination not working | Prism')
  await page.goto('/services')
  await page
    .getByRole('link', {
      name: /read how the website, ads, and local presence work together/i,
    })
    .screenshot({ path: testInfo.outputPath('services-contextual-link.png') })
  await page
    .getByRole('link', {
      name: /read how the website, ads, and local presence work together/i,
    })
    .click()
  await expect(page).toHaveTitle(
    "Small business growth: Prism's approach | Prism",
  )
})
