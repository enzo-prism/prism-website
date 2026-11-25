import { expect, test } from '@playwright/test'

const port = process.env.PLAYWRIGHT_PORT ?? '3000'
test.use({ baseURL: `http://prism-audit.localhost:${port}` })

test('review example and intake respect capacity and keep reviews out of sales', async ({ page }) => {
  const receipts: string[] = []
  await page.route('**/*', async route => {
    const request = route.request()
    const url = new URL(request.url())
    if (url.hostname === 'prism-audit.localhost') return route.continue()
    if (url.hostname !== 'formspree.io') return route.abort()
    const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': '*' }
    if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers })
    if (request.method() !== 'POST') return route.abort()
    receipts.push(request.postData() ?? '')
    return route.fulfill({ status: receipts.length === 1 ? 503 : 200, headers, contentType: 'application/json', body: '{}' })
  })
  await page.goto('/waitlist?intent=review')
  await expect(page.getByRole('heading', { name: /a sample site review/i })).toBeVisible()
  if (process.env.PRISM_SITE_REVIEWS_OPEN !== 'true') {
    await expect(page.getByText(/individual reviews are currently closed/i)).toBeVisible()
    await expect(page.getByLabel('Work email')).toHaveCount(0)
    return
  }
  await page.getByLabel('Website or business name').fill('Fixture Shop')
  await page.getByLabel('Work email').fill('test@example.com')
  await page.getByLabel('What do you want more customers to do?').fill('Request a test ride')
  const submit = page.getByRole('button', { name: 'Request a site review' })
  await submit.click()
  await expect(page.locator('form').getByRole('alert')).toContainText('Your answers are still here')
  await submit.click()
  await expect(page.getByRole('heading', { name: 'your request is in.' })).toBeVisible()
  expect(receipts).toHaveLength(2)
  const firstId = receipts[0].match(/review-[a-f0-9-]{36}/)?.[0]
  expect(firstId).toBeTruthy()
  expect(receipts[1]).toContain(firstId!)
  expect(receipts[1]).toContain('site_review')
  const events = await page.evaluate(() => (window.dataLayer ?? []).map(row => Array.from(row as ArrayLike<unknown>)).filter(row => row[0] === 'event'))
  expect(events.filter(row => row[1] === 'site_review_received')).toHaveLength(1)
  expect(events.filter(row => row[1] === 'generate_lead')).toHaveLength(0)
  expect(JSON.stringify(events)).not.toContain('test@example.com')
})
