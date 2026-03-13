import { expect, test } from '@playwright/test'

async function getWidgetState(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const getRect = (element: Element | null) => {
      if (!(element instanceof HTMLElement)) {
        return null
      }

      const rect = element.getBoundingClientRect()

      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      }
    }

    const widgets = Array.from(
      document.querySelectorAll<HTMLElement>('elevenlabs-convai'),
    )
    const widgetScripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        'script[src*="@elevenlabs/convai-widget-embed"]',
      ),
    )

    const heroWidget = document.querySelector<HTMLElement>(
      '[data-testid="home-elevenlabs-widget"]',
    )
    const floatingWidget = document.querySelector<HTMLElement>(
      '[data-testid="global-elevenlabs-widget"]',
    )
    const homeHero = document.querySelector('.home-hero-agent')
    const heroWidgetStyle = heroWidget
      ? window.getComputedStyle(heroWidget)
      : null
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
      homeDismissible: document
        .querySelector<HTMLElement>('[data-testid="home-elevenlabs-widget"]')
        ?.getAttribute('dismissible'),
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
      heroHostPosition: heroWidgetStyle?.position ?? null,
      heroHostInset: heroWidgetStyle?.inset ?? null,
      heroHostZIndex: heroWidgetStyle?.zIndex ?? null,
      heroRect: getRect(homeHero),
      heroWidgetRect: getRect(heroWidget),
      scriptCount: widgetScripts.length,
      scrollY: window.scrollY,
      widgetCount: widgets.length,
      expandedCount: widgets.filter(
        (widget) => widget.getAttribute('variant') === 'expanded',
      ).length,
      defaultFloatingCount: widgets.filter(
        (widget) => !widget.hasAttribute('variant'),
      ).length,
    }
  })
}

test('ElevenLabs widget stays route-aware while the homepage keeps the inline hero experience', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toMatchObject({
      customElementDefined: true,
      homeDismissible: 'false',
      heroHostInset: '0px',
      heroHostPosition: 'absolute',
      heroHostZIndex: '20',
      widgetCount: 1,
      scriptCount: 1,
      expandedCount: 1,
      defaultFloatingCount: 0,
      heroWidgetCount: 1,
      floatingWidgetCount: 0,
    })
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        markdownLinkAllowHttpValues: ['false'],
        markdownLinkIncludeWwwValues: ['true'],
      }),
    )
  const initialHomeState = await getWidgetState(page)
  expect(initialHomeState.heroRect).toEqual(initialHomeState.heroWidgetRect)

  await page.evaluate(() => window.scrollTo(0, 900))
  await expect
    .poll(async () => getWidgetState(page), { timeout: 20_000 })
    .toEqual(
      expect.objectContaining({
        heroHostPosition: 'absolute',
        scrollY: 900,
      }),
    )
  const scrolledHomeState = await getWidgetState(page)
  expect(scrolledHomeState.heroRect).toEqual(scrolledHomeState.heroWidgetRect)
  expect(scrolledHomeState.heroWidgetRect?.y ?? 0).toBeLessThan(0)

  await page.goto('/about', { waitUntil: 'domcontentloaded' })
  await expect(
    page.getByRole('heading', { level: 1, name: /our story/i }),
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
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
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
      name: /turn your online presence into a growth engine/i,
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
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
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
      widgetCount: 1,
      scriptCount: 1,
      expandedCount: 0,
      defaultFloatingCount: 1,
      heroWidgetCount: 0,
      floatingWidgetCount: 1,
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
