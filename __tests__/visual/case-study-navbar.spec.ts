import { expect, test } from '@playwright/test'

import { CASE_STUDIES } from '../../lib/case-study-data'

for (const { client, slug } of CASE_STUDIES) {
  test(`case study ${slug} renders the top navbar`, async ({
    page,
  }, testInfo) => {
    await page.goto(`/case-studies/${slug}`, { waitUntil: 'load' })

    const banner = page.getByRole('banner')
    const mainNav = banner.getByRole('navigation', { name: 'Main' })
    const breadcrumbNav = banner.getByRole('navigation', { name: 'Breadcrumb' })

    await expect(banner).toBeVisible()
    await expect(banner.getByRole('link', { name: 'Prism home' })).toBeVisible()
    // The inline Main nav starts at lg; touch layouts use the Menu toggle.
    if (testInfo.project.name === 'desktop-chromium') {
      await expect(mainNav).toBeVisible()
    } else {
      await expect(
        banner.getByRole('button', { name: 'Open menu' }),
      ).toBeVisible()
    }
    await expect(breadcrumbNav).toBeVisible()
    await expect(
      breadcrumbNav.getByRole('link', { name: 'work' }),
    ).toBeVisible()
    await expect(breadcrumbNav.getByText(client, { exact: true })).toBeVisible()
  })
}
