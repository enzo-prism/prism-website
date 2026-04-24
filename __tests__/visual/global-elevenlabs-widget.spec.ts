import { expect, test } from '@playwright/test'

async function getWidgetState(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const widgets = Array.from(
      document.querySelectorAll<HTMLElement>('elevenlabs-convai'),
    )
    const widgetScripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        'script[src*="@elevenlabs/convai-widget-embed"]',
      ),
    )

    const floatingWidget = document.querySelector<HTMLElement>(
      '[data-testid="global-elevenlabs-widget"]',
    )
    const floatingShadowButtons = floatingWidget?.shadowRoot
      ? Array.from(floatingWidget.shadowRoot.querySelectorAll('button')).map(
          (button) => button.getAttribute('aria-label') ?? '',
        )
      : []
    const floatingWidgetStyle = floatingWidget
      ? window.getComputedStyle(floatingWidget)
      : null
    const topNodeNearWidget = document.elementFromPoint(
      window.innerWidth - 120,
      window.innerHeight - 120,
    )

    return {
      customElementDefined:
        typeof window.customElements?.get('elevenlabs-convai') === 'function',
      floatingWidgetCount: document.querySelectorAll(
        '[data-testid="global-elevenlabs-widget"]',
      ).length,
      heroWidgetCount: document.querySelectorAll(
        '[data-testid="home-elevenlabs-widget"]',
      ).length,
      launcherCount: document.querySelectorAll('[aria-label="Open sales chat"]')
        .length,
      markdownLinkAllowHttpValues: widgets.map((widget) =>
        widget.getAttribute('markdown-link-allow-http'),
      ),
      markdownLinkIncludeWwwValues: widgets.map((widget) =>
        widget.getAttribute('markdown-link-include-www'),
      ),
      floatingHostPosition: floatingWidgetStyle?.position ?? null,
      floatingHostZIndex: floatingWidgetStyle?.zIndex ?? null,
      floatingTopElementTag: topNodeNearWidget?.tagName ?? null,
      floatingTopElementTestId:
        topNodeNearWidget?.getAttribute('data-testid') ?? null,
      scriptCount: widgetScripts.length,
      scrollY: window.scrollY,
      widgetCount: widgets.length,
      defaultExpandedCount: widgets.filter(
        (widget) => widget.getAttribute('default-expanded') === 'true',
      ).length,
      expandedCount: widgets.filter(
        (widget) => widget.getAttribute('variant') === 'expanded',
      ).length,
      defaultFloatingCount: widgets.filter(
        (widget) => !widget.hasAttribute('variant'),
      ).length,
      floatingButtonLabels: floatingShadowButtons,
      collapseButtonCount: floatingShadowButtons.filter(
        (label) => label === 'Collapse',
      ).length,
    }
  })
}

test('ElevenLabs widget stays closed for first-touch inner-page landings', async ({
  page,
}) => {
  await page.goto('/about', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', { level: 1, name: /built by enzo sison\./i }),
  ).toBeVisible({ timeout: 20_000 })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      floatingHostPosition: 'fixed',
      floatingHostZIndex: '2147483000',
      floatingTopElementTag: 'ELEVENLABS-CONVAI',
      floatingTopElementTestId: 'global-elevenlabs-widget',
      widgetCount: 1,
      scriptCount: 1,
      defaultExpandedCount: 0,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
      collapseButtonCount: 0,
    })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        markdownLinkAllowHttpValues: ['false'],
        markdownLinkIncludeWwwValues: ['true'],
      }),
    )
})

test('ElevenLabs widget stays unmounted on mobile inner-page landings', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/about', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', { level: 1, name: /built by enzo sison\./i }),
  ).toBeVisible({ timeout: 20_000 })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: false,
      floatingHostPosition: null,
      floatingHostZIndex: null,
      floatingTopElementTestId: null,
      widgetCount: 0,
      scriptCount: 0,
      defaultExpandedCount: 0,
      expandedCount: 0,
      defaultFloatingCount: 0,
      heroWidgetCount: 0,
      floatingWidgetCount: 0,
      collapseButtonCount: 0,
    })

  await page.goto('/get-started', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /start here\./i,
    }),
  ).toBeVisible({
    timeout: 20_000,
  })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: false,
      launcherCount: 0,
      widgetCount: 0,
      scriptCount: 0,
      defaultExpandedCount: 0,
      expandedCount: 0,
      defaultFloatingCount: 0,
      heroWidgetCount: 0,
      floatingWidgetCount: 0,
      collapseButtonCount: 0,
    })
})

test('ElevenLabs widget stays off the homepage and remains the same floating launcher across inner public routes', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /growth, handled for you\./i,
    }),
  ).toBeVisible({ timeout: 20_000 })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: false,
      floatingHostPosition: null,
      floatingHostZIndex: null,
      floatingTopElementTestId: null,
      widgetCount: 0,
      scriptCount: 0,
      defaultExpandedCount: 0,
      expandedCount: 0,
      defaultFloatingCount: 0,
      heroWidgetCount: 0,
      floatingWidgetCount: 0,
      collapseButtonCount: 0,
    })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        markdownLinkAllowHttpValues: [],
        markdownLinkIncludeWwwValues: [],
      }),
    )

  await page.goto('/about', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', { level: 1, name: /built by enzo sison\./i }),
  ).toBeVisible({ timeout: 20_000 })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      floatingHostPosition: 'fixed',
      floatingHostZIndex: '2147483000',
      floatingTopElementTag: 'ELEVENLABS-CONVAI',
      floatingTopElementTestId: 'global-elevenlabs-widget',
      widgetCount: 1,
      scriptCount: 1,
      defaultExpandedCount: 0,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
      collapseButtonCount: 0,
    })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        markdownLinkAllowHttpValues: ['false'],
        markdownLinkIncludeWwwValues: ['true'],
      }),
    )
  await page.evaluate(() => window.scrollTo(0, 1200))
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        floatingHostZIndex: '2147483000',
        floatingTopElementTag: 'ELEVENLABS-CONVAI',
        floatingTopElementTestId: 'global-elevenlabs-widget',
        scrollY: 1200,
      }),
    )

  await page.goto('/get-started', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /start here\./i,
    }),
  ).toBeVisible({
    timeout: 20_000,
  })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      launcherCount: 0,
      widgetCount: 1,
      scriptCount: 1,
      defaultExpandedCount: 0,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
      collapseButtonCount: 0,
    })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        markdownLinkAllowHttpValues: ['false'],
        markdownLinkIncludeWwwValues: ['true'],
      }),
    )

  await page.goto('/blog/how-to-choose-local-seo-agency', {
    waitUntil: 'domcontentloaded',
  })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      floatingHostPosition: 'fixed',
      floatingHostZIndex: '2147483000',
      widgetCount: 1,
      scriptCount: 1,
      defaultExpandedCount: 0,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
      collapseButtonCount: 0,
    })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        markdownLinkAllowHttpValues: ['false'],
        markdownLinkIncludeWwwValues: ['true'],
      }),
    )
  await expect(
    page.getByRole('button', {
      name: /copy full blog post in markdown format/i,
    }),
  ).toBeVisible()
})

test('ElevenLabs widget respects an explicit saved expanded preference on public pages', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      'prism-elevenlabs-widget-preference',
      'expanded',
    )
  })

  await page.goto('/about', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', { level: 1, name: /built by enzo sison\./i }),
  ).toBeVisible({ timeout: 20_000 })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      floatingHostPosition: 'fixed',
      floatingHostZIndex: '2147483000',
      floatingTopElementTag: 'ELEVENLABS-CONVAI',
      floatingTopElementTestId: 'global-elevenlabs-widget',
      widgetCount: 1,
      scriptCount: 1,
      defaultExpandedCount: 1,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
      collapseButtonCount: 1,
    })
})
