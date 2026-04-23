import { expect, test, type Locator, type Page } from "@playwright/test"

async function disableElevenLabsWidget(page: Page) {
  await page.addInitScript(() => {
    window.__PRISM_DISABLE_ELEVENLABS_WIDGET__ = true
  })
}

async function stabilizePage(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }
    `,
  })
}

async function readContrast(locator: Locator) {
  return locator.evaluate((el) => {
    const parseAlpha = (value: string | undefined) => {
      if (!value) return 1
      const trimmed = value.trim()
      if (trimmed.endsWith("%")) {
        return (Number.parseFloat(trimmed) || 0) / 100
      }
      return Number.parseFloat(trimmed) || 0
    }

    const parseCssColor = (input: string) => {
      const value = input.trim().toLowerCase()
      if (!value || value === "transparent") {
        return { r: 0, g: 0, b: 0, a: 0 }
      }

      const rgbaMatch = value.match(/^rgba?\(([^)]+)\)$/)
      if (rgbaMatch) {
        const [r, g, b, alpha] = rgbaMatch[1]
          .split(",")
          .map((part) => part.trim())
        return {
          r: Number.parseFloat(r) || 0,
          g: Number.parseFloat(g) || 0,
          b: Number.parseFloat(b) || 0,
          a: alpha == null ? 1 : Number.parseFloat(alpha) || 0,
        }
      }

      const hex = value.replace("#", "")
      if ([3, 4, 6, 8].includes(hex.length)) {
        const expanded =
          hex.length <= 4
            ? hex
                .split("")
                .map((char) => char + char)
                .join("")
            : hex
        const hasAlpha = expanded.length === 8
        return {
          r: Number.parseInt(expanded.slice(0, 2), 16),
          g: Number.parseInt(expanded.slice(2, 4), 16),
          b: Number.parseInt(expanded.slice(4, 6), 16),
          a: hasAlpha ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
        }
      }

      const parseFunctionalColor = (pattern: RegExp) => {
        const match = value.match(pattern)
        if (!match) return null

        const parts = match[1]
          .split("/")
          .map((part) => part.trim())
        const rawChannels = parts[0]
          .split(/\s+/)
          .filter(Boolean)
        const channels = rawChannels.map((channel) =>
          channel.endsWith("%")
            ? Number.parseFloat(channel)
            : Number.parseFloat(channel),
        )
        const alpha = parts[1] == null ? 1 : parseAlpha(parts[1])

        return { channels, rawChannels, alpha }
      }

      const linearToSrgb = (channel: number) => {
        const clamped = Math.min(Math.max(channel, 0), 1)
        return clamped <= 0.0031308
          ? 12.92 * clamped
          : 1.055 * clamped ** (1 / 2.4) - 0.055
      }

      const oklabParts = parseFunctionalColor(/^oklab\((.+)\)$/)
      if (oklabParts) {
        const [l, a, b] = oklabParts.channels
        const lPrime = l + 0.3963377774 * a + 0.2158037573 * b
        const mPrime = l - 0.1055613458 * a - 0.0638541728 * b
        const sPrime = l - 0.0894841775 * a - 1.291485548 * b

        const lCube = lPrime ** 3
        const mCube = mPrime ** 3
        const sCube = sPrime ** 3

        const rLinear =
          4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube
        const gLinear =
          -1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube
        const bLinear =
          -0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube

        return {
          r: Math.round(linearToSrgb(rLinear) * 255),
          g: Math.round(linearToSrgb(gLinear) * 255),
          b: Math.round(linearToSrgb(bLinear) * 255),
          a: oklabParts.alpha,
        }
      }

      const oklchParts = parseFunctionalColor(/^oklch\((.+)\)$/)
      if (oklchParts) {
        const [l, chroma, hue = 0] = oklchParts.channels
        const hueRadians = (hue * Math.PI) / 180
        const a = chroma * Math.cos(hueRadians)
        const b = chroma * Math.sin(hueRadians)

        const lPrime = l + 0.3963377774 * a + 0.2158037573 * b
        const mPrime = l - 0.1055613458 * a - 0.0638541728 * b
        const sPrime = l - 0.0894841775 * a - 1.291485548 * b

        const lCube = lPrime ** 3
        const mCube = mPrime ** 3
        const sCube = sPrime ** 3

        const rLinear =
          4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube
        const gLinear =
          -1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube
        const bLinear =
          -0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube

        return {
          r: Math.round(linearToSrgb(rLinear) * 255),
          g: Math.round(linearToSrgb(gLinear) * 255),
          b: Math.round(linearToSrgb(bLinear) * 255),
          a: oklchParts.alpha,
        }
      }

      const labParts = parseFunctionalColor(/^lab\((.+)\)$/)
      if (labParts) {
        const [lightness, a, b] = labParts.channels
        const epsilon = 216 / 24389
        const kappa = 24389 / 27
        const fy = (lightness + 16) / 116
        const fx = fy + a / 500
        const fz = fy - b / 200
        const fx3 = fx ** 3
        const fz3 = fz ** 3
        const xr =
          fx3 > epsilon ? fx3 : (116 * fx - 16) / kappa
        const yr =
          lightness > kappa * epsilon ? fy ** 3 : lightness / kappa
        const zr =
          fz3 > epsilon ? fz3 : (116 * fz - 16) / kappa

        const xD50 = xr * 0.96422
        const yD50 = yr
        const zD50 = zr * 0.82521

        const x =
          0.9555766 * xD50 + -0.0230393 * yD50 + 0.0631636 * zD50
        const y =
          -0.0282895 * xD50 + 1.0099416 * yD50 + 0.0210077 * zD50
        const z =
          0.0122982 * xD50 + -0.020483 * yD50 + 1.3299098 * zD50

        const rLinear = 3.2404542 * x + -1.5371385 * y + -0.4985314 * z
        const gLinear = -0.969266 * x + 1.8760108 * y + 0.041556 * z
        const bLinear = 0.0556434 * x + -0.2040259 * y + 1.0572252 * z

        return {
          r: Math.round(linearToSrgb(rLinear) * 255),
          g: Math.round(linearToSrgb(gLinear) * 255),
          b: Math.round(linearToSrgb(bLinear) * 255),
          a: labParts.alpha,
        }
      }

      return { r: 0, g: 0, b: 0, a: 1 }
    }

    const blend = (
      fg: { r: number; g: number; b: number; a: number },
      bg: { r: number; g: number; b: number; a: number },
    ) => {
      const alpha = fg.a + bg.a * (1 - fg.a)
      if (alpha <= 0) return { r: 255, g: 255, b: 255, a: 1 }

      return {
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha,
      }
    }

    const srgbToLinear = (channel: number) => {
      const value = channel / 255
      return value <= 0.03928
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4
    }

    const luminance = (color: { r: number; g: number; b: number }) =>
      0.2126 * srgbToLinear(color.r) +
      0.7152 * srgbToLinear(color.g) +
      0.0722 * srgbToLinear(color.b)

    const contrastRatio = (
      fg: { r: number; g: number; b: number },
      bg: { r: number; g: number; b: number },
    ) => {
      const light = Math.max(luminance(fg), luminance(bg))
      const dark = Math.min(luminance(fg), luminance(bg))
      return (light + 0.05) / (dark + 0.05)
    }

    const effectiveBackground = (target: Element) => {
      const rootBg = parseCssColor(
        getComputedStyle(document.documentElement).backgroundColor ||
          "rgb(255,255,255)",
      )
      let bg = rootBg.a === 0 ? { r: 255, g: 255, b: 255, a: 1 } : rootBg
      const chain: Element[] = []
      let current: Element | null = target

      while (current) {
        chain.push(current)
        current = current.parentElement
      }

      for (const node of chain.reverse()) {
        const layer = parseCssColor(getComputedStyle(node).backgroundColor)
        if (layer.a > 0) {
          bg = blend(layer, bg)
        }
      }

      return bg
    }

    const preferredTextTarget =
      el.querySelector("span, strong, em, p, label") ?? el
    const textStyles = getComputedStyle(preferredTextTarget)
    const bg = effectiveBackground(el)
    const fg = parseCssColor(textStyles.color)

    return {
      ratio: Number(contrastRatio(fg, bg).toFixed(2)),
      color: textStyles.color,
      backgroundColor: getComputedStyle(el).backgroundColor,
      text: (
        el.getAttribute("aria-label") ||
        el.textContent ||
        (el as HTMLInputElement).placeholder ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim(),
    }
  })
}

async function expectReadableIfVisible(
  locator: Locator,
  threshold: number,
  states: Array<"default" | "hover" | "focus">,
) {
  if ((await locator.count()) === 0) return
  const target = locator.first()
  if (!(await target.isVisible())) return
  await expectReadableStates(target, threshold, states)
}

async function expectReadableStates(
  locator: Locator,
  threshold: number,
  states: Array<"default" | "hover" | "focus">,
) {
  await locator.scrollIntoViewIfNeeded()
  await expect(locator).toBeVisible()

  for (const state of states) {
    if (state === "hover") {
      await locator.hover({ force: true })
    }

    if (state === "focus") {
      await locator.focus()
    }

    const result = await readContrast(locator)

    expect(
      result.ratio,
      `${state} contrast too low for "${result.text}" (fg ${result.color}, bg ${result.backgroundColor})`,
    ).toBeGreaterThanOrEqual(threshold)
  }
}

test.describe("interactive contrast", () => {
  test.beforeEach(async ({ page }) => {
    await disableElevenLabsWidget(page)
    await stabilizePage(page)
  })

  test("homepage CTA and proof states stay readable", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(300)
    const viewport = page.viewportSize()
    const interactiveStates: Array<"default" | "hover" | "focus"> =
      viewport && viewport.width < 768
        ? ["default", "focus"]
        : ["default", "hover", "focus"]

    await expectReadableStates(
      page.getByRole("link", { name: /get a free growth plan/i }).first(),
      4.5,
      interactiveStates,
    )

    await expectReadableStates(
      page.getByRole("link", { name: /see how it works/i }).first(),
      4.5,
      interactiveStates,
    )

    await expectReadableStates(
      page.getByRole("link", { name: /see client results/i }),
      4.5,
      interactiveStates,
    )

    await expectReadableStates(
      page.getByRole("button", {
        name: /do i need to understand ai or marketing tools\?/i,
      }),
      4.5,
      ["default", "focus"],
    )

    if (viewport && viewport.width < 768) {
      await expectReadableIfVisible(
        page.getByLabel(/open menu/i),
        4.5,
        ["default", "focus"],
      )
    } else {
      await expectReadableIfVisible(
        page.getByRole("link", { name: /^start$/i }),
        4.5,
        interactiveStates,
      )
    }
  })

  test("application entry and form CTAs stay readable", async ({
    page,
  }) => {
    await page.goto("/get-started", { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(300)
    const viewport = page.viewportSize()
    const interactiveStates: Array<"default" | "hover" | "focus"> =
      viewport && viewport.width < 768
        ? ["default", "focus"]
        : ["default", "hover", "focus"]

    await expectReadableStates(
      page.getByRole("link", { name: /start application/i }).first(),
      4.5,
      interactiveStates,
    )

    await page.goto("/apply", { waitUntil: "domcontentloaded" })
    await page.waitForTimeout(300)

    await expectReadableStates(
      page.getByRole("button", { name: /continue/i }).first(),
      4.5,
      interactiveStates,
    )

    await page.getByRole("checkbox", { name: /new website/i }).click()
    await page.getByLabel(/yes/i).check({ force: true })
    await page.getByLabel(/current website/i).fill("design-prism.com")
    await page
      .getByLabel(/i need more leads\/customers online/i)
      .check({ force: true })
    await page.getByRole("button", { name: /continue/i }).first().click()

    await expectReadableStates(
      page.getByRole("button", { name: /submit application/i }),
      4.5,
      interactiveStates,
    )
  })
})
