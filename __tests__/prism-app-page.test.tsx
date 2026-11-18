import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { fireEvent, render, screen, within } from '@testing-library/react'

import { metadata } from '@/app/app/page'
import { metadata as privacyMetadata } from '@/app/app/privacy/page'
import { metadata as supportMetadata } from '@/app/app/support/page'
import { LeadDayChart } from '@/components/prism-app/LeadDayChart'
import { AppDemo } from '@/components/prism-app/AppDemo'
import {
  PRISM_APP_DEMO_BRANCH,
  DEMO_LEADS,
  DEMO_LEAD_TOTAL,
  PRISM_APP_DESCRIPTION,
  PRISM_APP_FAQ,
  PRISM_APP_ID,
  PRISM_APP_NAME,
  PRISM_APP_PROSPECT,
  PRISM_APP_RELEASES,
  PRISM_APP_VERSION,
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

  it('connects the Leads tour tab to the form count clients see in the app', () => {
    const leadStep = PRISM_APP_TOUR.find((step) => step.label === 'Leads')
    expect(leadStep?.id).toBe('forms')
    expect(leadStep?.body).toContain('Forms Submitted')
    expect(PRISM_APP_DESCRIPTION).toContain('leads from website forms')
  })

  it('reconciles the daily and by-form counts shown in the hero and native tour', () => {
    expect(DEMO_LEADS.daily).toHaveLength(28)
    expect(DEMO_LEAD_TOTAL).toBe(30)
    expect(DEMO_LEADS.byForm.reduce((total, form) => total + form.count, 0)).toBe(DEMO_LEAD_TOTAL)
  })

  it('shows the date and count selected on the daily leads chart', () => {
    render(<LeadDayChart />)
    const slider = screen.getByRole('slider', { name: 'Select a day' })
    expect(slider).toHaveAttribute('aria-valuetext', 'Nov 11 · 3 leads')
    fireEvent.change(slider, { target: { value: '0' } })
    expect(slider).toHaveAttribute('aria-valuetext', 'Oct 15 · 0 leads')
  })

  it('ships the assets the page draws with', () => {
    for (const file of ['app-icon.png', 'app-store-qr.svg', 'signin-1-5.jpg', 'og.jpg']) {
      expect(existsSync(join(process.cwd(), 'public', 'prism-app', file))).toBe(
        true,
      )
    }
  })

  it('labels the public release consistently with the download metadata', () => {
    const available = PRISM_APP_RELEASES.filter((entry) => entry.status === 'Available on the App Store')
    expect(available.map((entry) => entry.version)).toEqual([PRISM_APP_VERSION])
    for (const entry of PRISM_APP_RELEASES) {
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(entry.changes.length).toBeGreaterThan(0)
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
    expect(tabs[0]).toHaveAccessibleName('Leads')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(
      screen.getByRole('heading', { name: PRISM_APP_TOUR[0].title }),
    ).toBeVisible()

    fireEvent.click(screen.getByRole('tab', { name: 'Report' }))
    expect(screen.getByRole('tab', { name: 'Report' })).toHaveAttribute(
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
    expect(screen.getByRole('tab', { name: 'Summary' })).toHaveAttribute(
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
      PRISM_APP_STEPS,
      PRISM_APP_DEMO_BRANCH,
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
