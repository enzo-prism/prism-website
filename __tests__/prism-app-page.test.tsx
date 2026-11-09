import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { metadata } from '@/app/app/page'
import { metadata as privacyMetadata } from '@/app/app/privacy/page'
import { metadata as supportMetadata } from '@/app/app/support/page'
import {
  PRISM_APP_DESCRIPTION,
  PRISM_APP_FAQ,
  PRISM_APP_ID,
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

  it('ships a capture for every step of the tour', () => {
    for (const step of PRISM_APP_TOUR) {
      expect(existsSync(join(process.cwd(), 'public', step.image))).toBe(true)
      expect(step.alt.length).toBeGreaterThan(0)
    }
  })

  it('follows the house copy rules', () => {
    const copy = JSON.stringify([
      PRISM_APP_DESCRIPTION,
      PRISM_APP_TOUR,
      PRISM_APP_TRUST,
      PRISM_APP_FAQ,
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
