import { expect, test } from "@playwright/test"

const BASE_SLUGS = ["exquisite-dentistry", "dr-christopher-wong"] as const

const VIEWPORTS = [
  { name: "mobile-sm", width: 360, height: 640 },
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 720 },
] as const

for (const slug of BASE_SLUGS) {
  for (const viewport of VIEWPORTS) {
    test.describe(`case study popups on ${slug} at ${viewport.name}`, () => {
      test(`opens every service and tech tile dialog within viewport`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto(`/case-studies/${slug}`, { waitUntil: "domcontentloaded" })

        const header = page.getByText(/What we delivered for this case/i)
        await expect(header).toBeVisible()

        const activePanel = page.getByRole("tabpanel").first()
        await expect(activePanel).toBeVisible()

        const openAndValidateDialog = async (buttonLabel: string, index: number, group: string) => {
          const dialog = page.getByRole("dialog")
          let opened = false
          for (let attempt = 0; attempt < 20; attempt += 1) {
            if ((await dialog.count()) > 0 && (await dialog.first().isVisible())) {
              opened = true
              break
            }
            await page.waitForTimeout(250)
          }
          if (!opened) {
            const dialogTitleText = await page.evaluate(() => {
              const title = document.querySelector('[role=\"dialog\"] [data-slot=\"dialog-title\"]') as HTMLElement | null
              if (title) return title.textContent?.trim() || ""
              const h2 = document.querySelector('[role=\"dialog\"] h2') as HTMLElement | null
              return h2 ? h2.textContent?.trim() || "" : null
            })
            const dialogCount = await dialog.count()
            const firstDialog = dialog.first()
            const firstDialogText = dialogCount > 0 ? await firstDialog.textContent() : null
            const stateAttr = dialogCount > 0 ? await firstDialog.getAttribute("data-state") : null
            const inertAttr = dialogCount > 0 ? await firstDialog.getAttribute("inert") : null
            const ariaHidden = dialogCount > 0 ? await firstDialog.getAttribute("aria-hidden") : null
            const visibility =
              dialogCount > 0 ? await firstDialog.evaluate((node) => getComputedStyle(node as Element).visibility) : "not-found"
            const opacity =
              dialogCount > 0 ? await firstDialog.evaluate((node) => getComputedStyle(node as Element).opacity) : "not-found"
            const display =
              dialogCount > 0 ? await firstDialog.evaluate((node) => getComputedStyle(node as Element).display) : "not-found"
            const hidden = dialogCount > 0 ? await firstDialog.isHidden() : true
            const isVisible = dialogCount > 0 ? await firstDialog.isVisible() : false
            const box = dialogCount > 0 ? await firstDialog.boundingBox() : null
            console.log(
              `${group} ${index + 1} dialog visibility probe -> dialogTitleText=${dialogTitleText}, firstDialogText=${firstDialogText}, data-state=${stateAttr}, inert=${inertAttr}, aria-hidden=${ariaHidden}, visibility=${visibility}, opacity=${opacity}, display=${display}, hidden=${hidden}, isVisible=${isVisible}, box=${JSON.stringify(
                box,
              )}, count=${dialogCount}`,
            )
            throw new Error(`No dialog for ${group} tile "${buttonLabel}" at index ${index} (${viewport.name}) on ${slug}`)
          }
          await expect(dialog).toBeVisible()
          await expect(dialog.getByText(buttonLabel, { exact: false })).toBeVisible({
            timeout: 5000,
          })
          await expect(dialog.getByText(/What it is/i)).toBeVisible()
          await expect(dialog.getByText(/Why Prism is world-class with this/i)).toBeVisible()

          const box = await dialog.boundingBox()
          expect(box).not.toBeNull()

          if (box) {
            expect(box.width).toBeLessThanOrEqual(viewport.width - 8)
            expect(box.height).toBeLessThanOrEqual(viewport.height - 8)
            expect(box.x).toBeGreaterThanOrEqual(0)
            expect(box.y).toBeGreaterThanOrEqual(0)
          }

          const closeButton = page.getByRole("button", { name: /close details/i })
          await closeButton.click()
          await expect(dialog).toBeHidden({ timeout: 5000 })
        }

        const serviceButtons = activePanel.getByRole("button")
        const serviceCount = await serviceButtons.count()
        expect(serviceCount).toBeGreaterThan(0)

        for (let index = 0; index < serviceCount; index += 1) {
          const button = serviceButtons.nth(index)
          const label = (await button.textContent())?.trim()

          await button.scrollIntoViewIfNeeded()
          const box = await button.boundingBox()
          const isVisible = await button.isVisible()
          const isEnabled = await button.isEnabled()
          const pointerEvents = box ? await button.evaluate((el) => getComputedStyle(el).pointerEvents) : "unknown"
          console.log(
            `service button ${index + 1}/${serviceCount} (${label}) visible=${isVisible} enabled=${isEnabled} pointerEvents=${pointerEvents} box=${JSON.stringify(box)}`,
          )
          if (box) {
            const topElement = await page.evaluate(
              ({ x, y }) => {
                const el = document.elementFromPoint(x, y)
                if (!el) return null
                return {
                  tag: el.tagName,
                  text: (el.textContent || "").trim().slice(0, 80),
                  className: (el as HTMLElement).className,
                }
              },
              { x: box.x + box.width / 2, y: box.y + box.height / 2 },
            )
            console.log(`top element at center: ${JSON.stringify(topElement)}`)
          }
          console.log(`clicking service ${index + 1}/${serviceCount} (${label}) on ${viewport.name}`)
          try {
            await button.click()
          } catch (error) {
            console.log(`standard click failed for service ${index + 1}, retrying force click`)
            await button.click({ force: true })
          }
          let dialog = page.getByRole('dialog')
          let exists = await dialog.count().then((count) => count > 0)
          console.log(`dialog count after click for service ${index + 1}: ${exists ? 'found' : 'missing'}`)
          if (!exists) {
            console.log('retrying with dispatchEvent for service click')
            await button.dispatchEvent('click')
            dialog = page.getByRole('dialog')
            exists = await dialog.count().then((count) => count > 0)
            console.log(`dialog count after dispatch for service ${index + 1}: ${exists ? 'found' : 'missing'}`)
          }
          await openAndValidateDialog(label ?? "", index, "service")
        }

        const techTab = page.getByRole("tab", { name: /Tech stack/i })
        await techTab.click()

        const techButtons = activePanel.getByRole("button")
        const techCount = await techButtons.count()
        expect(techCount).toBeGreaterThan(0)

        for (let index = 0; index < techCount; index += 1) {
          const button = techButtons.nth(index)
          const label = (await button.textContent())?.trim()

          await button.scrollIntoViewIfNeeded()
          console.log(`clicking tech ${index + 1}/${techCount} (${label}) on ${viewport.name}`)
          await button.click()
          await openAndValidateDialog(label ?? "", index, "tech")
        }
      })
    })
  }
}
