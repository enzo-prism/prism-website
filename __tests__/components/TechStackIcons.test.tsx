import { fireEvent, render, screen } from '@testing-library/react'

import { getBrandLogoSource } from '@/components/brand-logo'
import {
  ADS_STAGE_ICONS,
  TechStackIcon,
  WEBSITE_SURFACE_ICONS,
} from '@/components/tech-stack-icons'

describe('tech stack icons', () => {
  it('maps five Ads stages to resolvable brand marks', () => {
    expect(ADS_STAGE_ICONS.map((icon) => icon.label)).toEqual([
      'Google',
      'Meta',
      'TikTok',
      'Yelp',
      'ChatGPT Ads',
    ])

    for (const icon of ADS_STAGE_ICONS) {
      expect(
        getBrandLogoSource({ brand: icon.brand, theme: icon.theme }),
      ).toMatch(/^\/logos\//)
    }
  })

  it('maps seven website surfaces to resolvable brand marks', () => {
    expect(WEBSITE_SURFACE_ICONS.map((icon) => icon.label)).toEqual([
      'Google Search',
      'Google Maps',
      'AI Overviews',
      'ChatGPT',
      'Gemini',
      'Claude',
      'Perplexity',
    ])

    for (const icon of WEBSITE_SURFACE_ICONS) {
      expect(
        getBrandLogoSource({ brand: icon.brand, theme: icon.theme }),
      ).toMatch(/^\/logos\//)
    }
  })

  it('keeps every label free of em dashes', () => {
    const labels = [
      ...ADS_STAGE_ICONS.map((icon) => icon.label),
      ...WEBSITE_SURFACE_ICONS.map((icon) => icon.label),
    ]

    for (const label of labels) {
      expect(label).not.toContain('—')
    }
  })

  it('renders decorative icons out of the accessibility tree', () => {
    render(
      <ul aria-label="Ad platforms">
        {ADS_STAGE_ICONS.map((icon) => (
          <li key={icon.label}>
            <TechStackIcon spec={icon} />
            {icon.label}
          </li>
        ))}
      </ul>,
    )

    const images = screen.getAllByRole('presentation', { hidden: true })
    expect(images).toHaveLength(ADS_STAGE_ICONS.length)
    for (const image of images) {
      expect(image).toHaveAttribute('alt', '')
      expect(image).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('falls back to the Store glyph when the yelp mark fails to load', () => {
    const yelp = ADS_STAGE_ICONS.find((icon) => icon.label === 'Yelp')
    expect(yelp?.fallback).toBeDefined()

    render(<TechStackIcon spec={yelp!} />)

    const logo = screen.getByRole('presentation', { hidden: true })
    expect(logo).toHaveAttribute('src', '/logos/svgl/yelp.svg')

    fireEvent.error(logo)

    expect(
      screen.queryByRole('presentation', { hidden: true }),
    ).not.toBeInTheDocument()
    expect(document.querySelector('svg.lucide-store')).toBeInTheDocument()
  })
})
