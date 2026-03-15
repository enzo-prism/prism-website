import { expect, test } from '@playwright/test'

import { CASE_STUDIES } from '../../lib/case-study-data'

for (const { client, slug } of CASE_STUDIES) {
  test(`case study ${slug} renders the top navbar`, async ({ page }) => {
    await page.goto(`/case-studies/${slug}`, { waitUntil: 'load' })

    const banner = page.getByRole('banner')
    const mainNav = banner.getByRole('navigation', { name: 'Main' })
    const breadcrumbNav = banner.getByRole('navigation', { name: 'Breadcrumb' })

    await expect(banner).toBeVisible()
    await expect(banner.getByRole('link', { name: 'Prism home' })).toBeVisible()
    await expect(mainNav).toBeVisible()
    await expect(breadcrumbNav).toBeVisible()
    await expect(
      breadcrumbNav.getByRole('link', { name: 'case studies' }),
    ).toBeVisible()
    await expect(breadcrumbNav.getByText(client, { exact: true })).toBeVisible()
  })
}
