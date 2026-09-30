import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import { expect, test, type Locator, type Page } from '@playwright/test'
import { getScholarshipRound } from '../../lib/scholarships'

const approvedCode = 'prism-office-hours-test-code'
const contact = {
  firstName: 'Browser',
  lastName: 'Applicant',
  email: 'browser-test@example.com',
}

async function openScholarships(page: Page) {
  await page.goto('/scholarships', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /^Prism Scholarships$/i,
    }),
  ).toBeVisible()
}

async function fillContact(form: Locator) {
  for (const [name, value] of Object.entries(contact)) {
    await form.locator(`[name="${name}"]`).fill(value)
  }
}

async function fillScholarship(form: Locator) {
  await fillContact(form)
  await form.locator('[name="projectName"]').fill('Community project')
  await form.locator('[name="projectUrl"]').fill('https://example.com/project')
  await form
    .locator('[name="projectDescription"]')
    .fill('We are building a community project for our neighborhood.')
  await form
    .locator('[name="supportNeeded"]')
    .fill('We need a website and a clear content strategy.')
  await form
    .locator('[name="financialNeed"]')
    .fill('The project is early and paid support is currently out of reach.')
}

async function approveOfficeHours(page: Page) {
  const response = await page.request.post('/api/office-hours/access', {
    headers: { Origin: new URL(page.url()).origin },
    data: { code: approvedCode },
  })
  expect(response.ok()).toBe(true)
  await page.reload({ waitUntil: 'domcontentloaded' })
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  // Do not submit application or reservation requests to a real provider.
  await page.route(/^https:\/\/formspree\.io\//, (route) => {
    if (route.request().method() === 'POST') {
      return route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Provider blocked unless explicitly mocked by this test',
        }),
      })
    }
    return route.continue()
  })
})

test('programs, quarter, Sunday schedule, and application jump links are readable', async ({
  page,
}, testInfo) => {
  await openScholarships(page)
  // Safari uses Option+Tab to include links in keyboard traversal by default.
  await page.keyboard.press(
    testInfo.project.name === 'mobile-webkit' ? 'Alt+Tab' : 'Tab',
  )
  await expect(
    page.getByRole('link', { name: 'Skip to content', exact: true }),
  ).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await expect(page.locator('main')).toContainText(getScholarshipRound().label)
  await expect(page.locator('main')).toContainText('December 31, 2026')
  await expect(page.locator('main')).toContainText(
    /10(?:[:.]00)?\s*(?:am|a\.m\.)?\s*[–—-]\s*11(?:[:.]00)?\s*(?:am|a\.m\.)/i,
  )
  await expect(page.locator('main')).toContainText(/Pacific/)
  for (const id of [
    'scholarship-application',
    'office-hours-application',
    'approved-office-hours',
    'learn',
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1)
    await expect(page.locator(`a[href="#${id}"]`).first()).toHaveAttribute(
      'href',
      `#${id}`,
    )
  }
  await page.locator('a[href="#scholarship-application"]').first().click()
  await expect(page).toHaveURL(/#scholarship-application$/)
  await expect(
    page.getByRole('form', { name: 'Scholarship application' }),
  ).toBeVisible()
})

test('layout has no horizontal overflow at 320, 390, and 1280 pixels', async ({
  page,
}, testInfo) => {
  await openScholarships(page)
  for (const width of [320, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        ),
      )
      .toBeLessThanOrEqual(1)
  }
  const outputDir = process.env.PRISM_SCHOLARSHIPS_AUDIT_OUTPUT
  if (outputDir) {
    await mkdir(outputDir, { recursive: true })
    await page.setViewportSize({
      width: testInfo.project.name === 'desktop-chromium' ? 1280 : 390,
      height: 900,
    })
    await page.screenshot({
      path: path.join(outputDir, `scholarships-${testInfo.project.name}.png`),
      fullPage: true,
    })
    await page.screenshot({
      path: path.join(
        outputDir,
        `scholarships-${testInfo.project.name}-hero.png`,
      ),
      fullPage: false,
    })
    await page
      .locator('#office-hours')
      .evaluate((element) => element.scrollIntoView({ block: 'start' }))
    await page.screenshot({
      path: path.join(
        outputDir,
        `scholarships-${testInfo.project.name}-office-hours.png`,
      ),
      fullPage: false,
    })
  }
})

test('office hours requests exactly the four application fields and focuses an invalid answer', async ({
  page,
}) => {
  await openScholarships(page)
  const form = page.getByRole('form', { name: 'Office hours application' })
  const visibleNames = await form
    .locator('input:not([type="hidden"]):not([name="_gotcha"]), textarea')
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('name')),
    )
  expect(visibleNames).toEqual(['firstName', 'lastName', 'email', 'message'])
  await form
    .getByRole('button', { name: 'Apply for office hours', exact: true })
    .click()
  await expect(form.locator('[name="firstName"]')).toBeFocused()
  await fillContact(form)
  await form.locator('[name="message"]').fill('   ')
  await form
    .getByRole('button', { name: 'Apply for office hours', exact: true })
    .click()
  await expect(form.locator('[name="message"]')).toBeFocused()
  await expect(form).toBeVisible()
})

test('office hours application only acknowledges a successful provider response', async ({
  page,
}) => {
  let payload = ''
  let posts = 0
  await page.route(/^https:\/\/formspree\.io\//, async (route) => {
    posts += 1
    payload = route.request().postData() ?? ''
    await route.fulfill({
      status: posts === 1 ? 503 : 200,
      contentType: 'application/json',
      body: JSON.stringify(posts === 1 ? { error: 'temporary' } : { ok: true }),
    })
  })
  await openScholarships(page)
  const form = page.getByRole('form', { name: 'Office hours application' })
  await fillContact(form)
  await form
    .locator('[name="message"]')
    .fill('I want help with my project website.')
  await form
    .getByRole('button', { name: 'Apply for office hours', exact: true })
    .click()
  await expect(form.getByRole('alert')).toContainText('could not send')
  await expect(form.locator('[name="message"]')).toHaveValue(
    'I want help with my project website.',
  )
  await expect(page.locator('#office-hours-application')).not.toContainText(
    'Application received',
  )
  await form
    .getByRole('button', { name: 'Apply for office hours', exact: true })
    .click()
  await expect(page.locator('#office-hours-application')).toContainText(
    'Application received',
  )
  expect(posts).toBe(2)
  for (const value of [
    ...Object.values(contact),
    'I want help with my project website.',
    'office-hours',
  ])
    expect(payload).toContain(value)
  await expect(page.locator('#office-hours-application')).toContainText(
    'does not reserve a session',
  )
})

test('scholarship validates required answers and submits round plus project context', async ({
  page,
}) => {
  let payload = ''
  let posts = 0
  await page.route(/^https:\/\/formspree\.io\//, async (route) => {
    payload = route.request().postData() ?? ''
    posts += 1
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{"ok":true}',
    })
  })
  await openScholarships(page)
  const form = page.getByRole('form', { name: 'Scholarship application' })
  await form
    .getByRole('button', { name: 'Apply for a scholarship', exact: true })
    .click()
  await expect(form.locator('[name="firstName"]')).toBeFocused()
  expect(posts).toBe(0)
  await fillScholarship(form)
  await form
    .getByRole('button', { name: 'Apply for a scholarship', exact: true })
    .click()
  await expect(page.locator('#scholarship-application')).toContainText(
    'Application received',
  )
  expect(posts).toBe(1)
  for (const value of [
    ...Object.values(contact),
    'Community project',
    'https://example.com/project',
    'Q4',
    'scholarship_round',
    'supportNeeded',
    'financialNeed',
  ])
    expect(payload).toContain(value)
  await expect(page.locator('#scholarship-application')).toContainText(
    'does not guarantee a scholarship',
  )
})

test('approved access is signed, restores on reload, and can be revoked', async ({
  page,
}) => {
  await openScholarships(page)
  const invalid = await page.request.post('/api/office-hours/access', {
    headers: { Origin: new URL(page.url()).origin },
    data: { code: 'not-the-approved-code' },
  })
  expect(invalid.status()).toBe(401)
  expect((await invalid.json()).ok).toBe(false)
  await approveOfficeHours(page)
  const restored = await page.request.get('/api/office-hours/access')
  expect(await restored.json()).toMatchObject({ ok: true, approved: true })
  const cookies = await page.context().cookies()
  const accessCookie = cookies.find((cookie) => cookie.name.includes('office'))
  expect(accessCookie?.httpOnly).toBe(true)
  expect(accessCookie?.secure).toBe(true)
  expect(accessCookie?.sameSite).toBe('Strict')
  expect(accessCookie?.value).not.toContain(approvedCode)
  await page.reload({ waitUntil: 'domcontentloaded' })
  expect(
    (await (await page.request.get('/api/office-hours/access')).json())
      .approved,
  ).toBe(true)
  const revoke = await page.request.delete('/api/office-hours/access', {
    headers: { Origin: new URL(page.url()).origin },
  })
  expect(revoke.ok()).toBe(true)
  expect(
    (await (await page.request.get('/api/office-hours/access')).json())
      .approved,
  ).toBe(false)
})

test('registration refuses unapproved visitors and unavailable sessions', async ({
  page,
}) => {
  await openScholarships(page)
  const unauthorized = await page.request.post('/api/office-hours/register', {
    headers: { Origin: new URL(page.url()).origin },
    data: { ...contact, sessionId: '2020-01-05' },
  })
  expect(unauthorized.status()).toBe(401)
  await approveOfficeHours(page)
  const unavailable = await page.request.post('/api/office-hours/register', {
    headers: { Origin: new URL(page.url()).origin },
    data: { ...contact, sessionId: '2020-01-05' },
  })
  expect(unavailable.status()).toBe(400)
  expect((await unavailable.json()).ok).toBe(false)
})

test('reduced motion and no-JavaScript visitors retain useful program information', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    ignoreHTTPSErrors: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  await page.goto(`${baseURL}/scholarships`, { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /^Prism Scholarships$/i,
    }),
  ).toBeVisible()
  await expect(page.locator('main')).toContainText(getScholarshipRound().label)
  await expect(page.locator('main')).toContainText(/Sunday/)
  await expect(
    page.getByRole('form', { name: 'Scholarship application' }),
  ).toBeVisible()
  await expect(
    page.getByRole('form', { name: 'Office hours application' }),
  ).toBeVisible()
  expect(
    await page.locator('#learn a[href^="/blog/"]').count(),
  ).toBeGreaterThanOrEqual(3)
  expect(await page.locator('#learn a[href]').count()).toBeGreaterThanOrEqual(6)
  await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    ),
  ).toBeLessThanOrEqual(1)
  await context.close()
})

test('returning attendees unlock real approval and see six selectable Sundays', async ({
  page,
}) => {
  await openScholarships(page)
  const booking = page.locator('#approved-office-hours')
  await booking.getByLabel('Approval code', { exact: true }).fill(approvedCode)
  await booking.getByRole('button', { name: 'Unlock session signup' }).click()
  await expect(booking.getByRole('status')).toContainText('Approval verified')
  const duplicateIds = await page
    .locator('main [id]')
    .evaluateAll((elements) => {
      const ids = elements.map((element) => element.id)
      return ids.filter((id, index) => ids.indexOf(id) !== index)
    })
  expect(duplicateIds).toEqual([])
  await booking.getByText('First name', { exact: true }).click()
  await expect(booking.locator('[name=firstName]')).toBeFocused()
  const select = booking.getByLabel('Choose a Sunday', { exact: true })
  await expect(select.locator('option')).toHaveCount(6)
  const dates = await select
    .locator('option')
    .evaluateAll((elements) =>
      elements.map((element) => (element as HTMLOptionElement).value),
    )
  expect(new Set(dates).size).toBe(6)
  for (const date of dates)
    expect(new Date(`${date}T12:00:00Z`).getUTCDay()).toBe(0)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await expect(booking.getByRole('status')).toContainText('Approval verified')
})

test('returning signup preserves answers on failure and only confirms accepted registration', async ({
  page,
}) => {
  await openScholarships(page)
  await approveOfficeHours(page)
  const booking = page.locator('#approved-office-hours')
  await expect(booking.getByRole('status')).toContainText('Approval verified')
  const select = booking.getByLabel('Choose a Sunday', { exact: true })
  const sessionId = await select.inputValue()
  const label = await select.locator('option:checked').innerText()
  let calls = 0
  let sent: Record<string, unknown> | null = null
  await page.route('**/api/office-hours/register', async (route) => {
    calls += 1
    sent = route.request().postDataJSON()
    await route.fulfill({
      status: calls === 1 ? 502 : 200,
      contentType: 'application/json',
      body: JSON.stringify(
        calls === 1
          ? {
              ok: false,
              error:
                'We could not send your registration. Your session has not been reserved. Please try again.',
            }
          : {
              ok: true,
              session: {
                id: sessionId,
                label,
                startAt: `${sessionId}T17:00:00.000Z`,
                endAt: `${sessionId}T18:00:00.000Z`,
              },
            },
      ),
    })
  })
  await fillContact(booking.locator('form'))
  await booking
    .locator('[name="message"]')
    .fill('Help me decide what to build next.')
  await booking.getByRole('button', { name: 'Sign up for this Sunday' }).click()
  await expect(booking.getByRole('alert')).toContainText(
    'has not been reserved',
  )
  await expect(booking.locator('[name="email"]')).toHaveValue(contact.email)
  await expect(booking).not.toContainText('Your session signup is received.')
  await booking.getByRole('button', { name: 'Sign up for this Sunday' }).click()
  await expect(
    booking.getByRole('heading', { name: 'Your session signup is received.' }),
  ).toBeVisible()
  expect(calls).toBe(2)
  expect(sent).toEqual({
    ...contact,
    message: 'Help me decide what to build next.',
    sessionId,
  })
  await expect(booking).toContainText(label)
})

async function activeCssAnimations(page: Page) {
  return page
    .locator('main')
    .evaluate(
      (main) =>
        main
          .getAnimations({ subtree: true })
          .filter(
            (animation) =>
              animation instanceof CSSAnimation &&
              animation.playState === 'running',
          ).length,
    )
}

test('reduced-motion visitors get a static page and all program actions', async ({
  page,
}) => {
  await openScholarships(page)
  await expect.poll(() => activeCssAnimations(page)).toBe(0)
  await expect(
    page.getByRole('button', { name: 'Pause motion', exact: true }),
  ).not.toBeVisible()
  await expect(
    page.getByRole('form', { name: 'Scholarship application' }),
  ).toBeVisible()
  await expect(
    page.getByRole('form', { name: 'Office hours application' }),
  ).toBeVisible()
  await page.locator('a[href="#approved-office-hours"]').first().click()
  await expect(page.getByLabel('Approval code', { exact: true })).toBeVisible()
  await expect.poll(() => activeCssAnimations(page)).toBe(0)
})

test('visitors can pause animated graphics and resume them without losing page actions', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await openScholarships(page)
  const pause = page.getByRole('button', { name: 'Pause motion', exact: true })
  await expect(pause).toBeVisible()
  const heroScene = page.locator('[data-scholarship-scene]').first()
  await heroScene.scrollIntoViewIfNeeded()
  await expect.poll(() => activeCssAnimations(page)).toBeGreaterThan(0)
  const outputDir = process.env.PRISM_SCHOLARSHIPS_AUDIT_OUTPUT
  if (outputDir) {
    await mkdir(outputDir, { recursive: true })
    await page.screenshot({
      path: path.join(
        outputDir,
        `scholarships-${testInfo.project.name}-motion.png`,
      ),
      fullPage: false,
    })
  }
  await pause.click()
  const resume = page.getByRole('button', {
    name: 'Resume motion',
    exact: true,
  })
  await expect(resume).toHaveAttribute('aria-pressed', 'true')
  // Keep the graphic visible so offscreen suspension cannot mask a broken pause.
  await heroScene.scrollIntoViewIfNeeded()
  await expect.poll(() => activeCssAnimations(page)).toBe(0)
  await expect(
    page.locator('a[href="#scholarship-application"]').first(),
  ).toBeVisible()
  await resume.click()
  await expect(pause).toHaveAttribute('aria-pressed', 'false')
  await heroScene.scrollIntoViewIfNeeded()
  await expect.poll(() => activeCssAnimations(page)).toBeGreaterThan(0)
})

test('decorative graphics stop when offscreen and resume when visitors return', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await openScholarships(page)
  const scene = page.locator('[data-scholarship-scene]').first()
  await scene.scrollIntoViewIfNeeded()
  const runningSceneAnimations = () =>
    scene.evaluate(
      (element) =>
        element
          .getAnimations({ subtree: true })
          .filter(
            (animation) =>
              animation instanceof CSSAnimation &&
              animation.playState === 'running',
          ).length,
    )
  await expect.poll(runningSceneAnimations).toBeGreaterThan(0)
  await page
    .locator('#learn')
    .evaluate((element) => element.scrollIntoView({ block: 'start' }))
  await expect.poll(runningSceneAnimations).toBe(0)
  await scene.scrollIntoViewIfNeeded()
  await expect.poll(runningSceneAnimations).toBeGreaterThan(0)
})

test('changing the OS motion preference updates an already opened page', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await openScholarships(page)
  const scene = page.locator('[data-scholarship-scene]').first()
  await scene.scrollIntoViewIfNeeded()
  await expect.poll(() => activeCssAnimations(page)).toBeGreaterThan(0)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(() => activeCssAnimations(page)).toBe(0)
  await expect(
    page.getByRole('button', { name: 'Pause motion', exact: true }),
  ).not.toBeVisible()
  await expect(
    page.getByRole('form', { name: 'Scholarship application' }),
  ).toBeVisible()

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(
    page.getByRole('button', { name: 'Pause motion', exact: true }),
  ).toBeVisible()
  await scene.scrollIntoViewIfNeeded()
  await expect.poll(() => activeCssAnimations(page)).toBeGreaterThan(0)
})

test('background-tab visibility suspends graphics and foreground visibility restores them', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await openScholarships(page)
  const scene = page.locator('[data-scholarship-scene]').first()
  await scene.scrollIntoViewIfNeeded()
  await expect.poll(() => activeCssAnimations(page)).toBeGreaterThan(0)

  // Headless engines do not consistently occlude tabs on bringToFront. Emulate
  // the browser's public visibility contract, then inspect real animation state.
  const emulateVisibility = (hidden: boolean) =>
    page.evaluate((isHidden) => {
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get: () => isHidden,
      })
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: () => (isHidden ? 'hidden' : 'visible'),
      })
      document.dispatchEvent(new Event('visibilitychange'))
    }, hidden)
  await emulateVisibility(true)
  await expect.poll(() => activeCssAnimations(page)).toBe(0)
  await emulateVisibility(false)
  await expect.poll(() => activeCssAnimations(page)).toBeGreaterThan(0)
})
