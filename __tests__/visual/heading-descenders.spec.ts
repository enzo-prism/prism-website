import { expect, test, type Page } from '@playwright/test'

const fills = '.text-gradient, .text-spectrum, .text-refract, .prism-glint'

// Measure the actual font's ink relative to the element that paints the fill.
// A zero-height inline marker exposes the baseline without relying on guessed
// font ascent ratios or a screenshot tolerance that can miss a clipped pixel.
async function measureDescenders(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((elements) =>
    elements
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => {
        const style = getComputedStyle(element)
        const text = element.textContent ?? ''
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!
        context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
        const descent = context.measureText(text).actualBoundingBoxDescent
        const marker = document.createElement('span')
        marker.style.cssText =
          'display:inline-block;width:0;height:0;padding:0;margin:0;border:0;vertical-align:baseline;'
        element.append(marker)
        const baseline = marker.getBoundingClientRect().bottom
        const bottom = element.getBoundingClientRect().bottom
        marker.remove()
        return {
          text: text.trim().slice(0, 100),
          className: element.className,
          clearance: bottom - (baseline + descent),
        }
      }),
  )
}

test.use({ contextOptions: { reducedMotion: 'reduce' } })

test('homepage keeps its original two-line rhythm', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const geometry = await page.locator('#home-hero-title').evaluate((heading) => {
    const lines = Array.from(heading.children) as HTMLElement[]
    const measure = () => ({
      height: heading.getBoundingClientRect().height,
      lineGap:
        lines[1].getBoundingClientRect().top -
        lines[0].getBoundingClientRect().top,
    })
    const padded = measure()
    const originalStyles = lines.map((line) => line.getAttribute('style'))
    for (const line of lines) {
      line.style.paddingBottom = '0'
      line.style.marginBottom = '0'
    }
    const original = measure()
    lines.forEach((line, index) => {
      const originalStyle = originalStyles[index]
      if (originalStyle === null) line.removeAttribute('style')
      else line.setAttribute('style', originalStyle)
    })
    return {
      heightChange: padded.height - original.height,
      lineGapChange: padded.lineGap - original.lineGap,
    }
  })
  expect(Math.abs(geometry.heightChange)).toBeLessThan(1)
  expect(Math.abs(geometry.lineGapChange)).toBeLessThan(1)
  await page.screenshot({ path: testInfo.outputPath('homepage-hero.png') })
})

test('all shared fills paint descenders at the tightest heading leading', async ({
  page,
}) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => {
    const fixture = document.createElement('div')
    fixture.id = 'descender-fixtures'
    fixture.style.cssText = 'position:absolute;left:0;top:0;width:100%;'
    for (const fill of [
      'text-gradient',
      'text-spectrum',
      'text-refract',
      'prism-glint',
    ]) {
      const line = document.createElement('div')
      // Include existing fixed padding utilities to catch cascade regressions.
      line.className = `text-hero ${fill} pb-1`
      line.style.whiteSpace = 'nowrap'
      // Under reduced motion, globals.css gives every element a 0.01ms
      // transition, so a style change is still mid-transition when measured
      // in the same frame. Fixtures opt out so both measurements are exact.
      line.style.setProperty('transition', 'none', 'important')
      line.textContent = 'agjpqy.'
      fixture.append(line)
    }
    document.body.append(fixture)
  })

  const painted = await measureDescenders(page, '#descender-fixtures > div')
  expect(painted).toHaveLength(4)
  for (const result of painted) {
    expect(result.clearance, JSON.stringify(result)).toBeGreaterThanOrEqual(1)
  }

  // Prove this check detects the original bug, including g's deeper descender.
  await page.evaluate(() => {
    for (const line of document.querySelectorAll<HTMLElement>(
      '#descender-fixtures > div',
    )) {
      line.style.setProperty('padding-bottom', '0', 'important')
    }
  })
  const clipped = await measureDescenders(page, '#descender-fixtures > div')
  expect(
    clipped.every((result) => result.clearance < -1),
    JSON.stringify(clipped),
  ).toBe(true)
})

for (const path of [
  '/',
  '/about',
  '/pricing',
  '/waitlist',
  '/website-design',
  '/content',
  '/ads',
  '/aeo',
  '/case-studies',
  '/case-studies/exquisite-dentistry',
  '/case-studies/mach-1',
  '/blog',
  '/dental-website',
]) {
  test(`gradient glyphs fit their paint boxes on ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('h1')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)

    const painted = await measureDescenders(page, fills)
    expect(painted.length).toBeGreaterThan(0)
    for (const result of painted) {
      expect(result.clearance, JSON.stringify(result)).toBeGreaterThanOrEqual(0)
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
  })
}
