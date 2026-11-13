import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { fireEvent, render, screen, within } from '@testing-library/react'

import { metadata } from '@/app/app/page'
import { metadata as privacyMetadata } from '@/app/app/privacy/page'
import { metadata as supportMetadata } from '@/app/app/support/page'
import { AppDemo } from '@/components/prism-app/AppDemo'
import {
  PRISM_APP_DEMO_BRANCH,
  PRISM_APP_DEMO_NOTE,
  PRISM_APP_DESCRIPTION,
  PRISM_APP_FAQ,
  PRISM_APP_ID,
  PRISM_APP_NAME,
  PRISM_APP_NOTIFICATIONS,
  PRISM_APP_PROSPECT,
  PRISM_APP_STEPS,
  PRISM_APP_STORE_URL,
  PRISM_APP_TOUR,
  PRISM_APP_TRUST,
} from '@/lib/prism-app'
import { isRouteIndexable } from '@/lib/seo/search-visibility'

describe('Prism iPhone app page', () => {
  it('indexes the app page and keeps its policy pages out of search', () => {
    expect(isRouteIndexable('/app')).toBe(true)
    expect(isRouteIndexable('/app/privacy')).toBe(false)
    expect(isRouteIndexable('/app/support')).toBe(false)
    expect(privacyMetadata.robots).toMatchObject({ index: false })
    expect(supportMetadata.robots).toMatchObject({ index: false })
  })

  it('points the Smart App Banner and store links at the same app', () => {
    expect(metadata.itunes).toEqual({ appId: PRISM_APP_ID })
    expect(PRISM_APP_STORE_URL).toContain(`id${PRISM_APP_ID}`)
  })

  it('uses the App Store name, Prism Grow', () => {
    expect(PRISM_APP_NAME).toBe('Prism Grow')
    expect(PRISM_APP_STORE_URL).toBe(
      'https://apps.apple.com/us/app/prism-grow/id6829975700',
    )
    expect(JSON.stringify(metadata.title)).toContain('Prism Grow')
    expect(PRISM_APP_TOUR.map((step) => step.id)).toContain('report')
  })

  it('keeps the app’s wording: forms are submissions, not leads', () => {
    const copy = JSON.stringify([
      PRISM_APP_DESCRIPTION,
      PRISM_APP_TOUR,
      PRISM_APP_NOTIFICATIONS,
      PRISM_APP_STEPS,
    ])
    expect(copy).not.toMatch(/\bleads?\b/i)
  })

  it('ships the assets the page draws with', () => {
    for (const file of ['app-icon.png', 'app-store-qr.svg', 'signin-1-5.jpg', 'og.jpg']) {
      expect(existsSync(join(process.cwd(), 'public', 'prism-app', file))).toBe(
        true,
      )
    }
  })

  it('gives every screen a plain-English takeaway', () => {
    expect(PRISM_APP_TOUR).toHaveLength(6)
    for (const step of PRISM_APP_TOUR) {
      expect(step.takeaway.length).toBeGreaterThan(0)
      expect(step.takeaway.endsWith('.') || step.takeaway.endsWith('”')).toBe(
        true,
      )
    }
  })

  it('keeps the demo as a branch, not a third step', () => {
    expect(PRISM_APP_STEPS).toHaveLength(2)
    expect(JSON.stringify(PRISM_APP_STEPS)).not.toMatch(/demo/i)
    expect(PRISM_APP_DEMO_BRANCH.title).toMatch(/demo/)
  })

  it('switches screens from the labeled tabs', () => {
    render(<AppDemo steps={PRISM_APP_TOUR} />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs.map((tab) => tab.textContent)).toEqual(
      PRISM_APP_TOUR.map((step) => step.label),
    )
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(
      screen.getByRole('heading', { name: PRISM_APP_TOUR[0].title }),
    ).toBeVisible()

    fireEvent.click(screen.getByRole('tab', { name: 'Forms' }))
    expect(screen.getByRole('tab', { name: 'Forms' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(
      screen.getByRole('heading', { name: PRISM_APP_TOUR[2].title }),
    ).toBeVisible()
    expect(
      within(screen.getByRole('tabpanel')).getByText(PRISM_APP_TOUR[2].takeaway),
    ).toBeVisible()

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' })
    expect(screen.getByRole('tab', { name: 'Google' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('follows the house copy rules', () => {
    const copy = JSON.stringify([
      PRISM_APP_DESCRIPTION,
      PRISM_APP_TOUR,
      PRISM_APP_TRUST,
      PRISM_APP_FAQ,
      PRISM_APP_NOTIFICATIONS,
      PRISM_APP_STEPS,
      PRISM_APP_DEMO_BRANCH,
      PRISM_APP_DEMO_NOTE,
      PRISM_APP_PROSPECT,
    ])

    expect(copy).not.toContain('—')
    expect(copy).not.toMatch(
      /unlock|elevate|seamless|world-class|cutting-edge|revolutionary|game-changing|supercharge/i,
    )
    for (const step of PRISM_APP_TOUR) {
      expect(step.title).toMatch(/^[a-z]/)
      expect(step.title.endsWith('.')).toBe(true)
    }
  })
})
