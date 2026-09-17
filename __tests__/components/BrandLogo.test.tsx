import { fireEvent, render, screen } from '@testing-library/react'

import { BrandLogo, getBrandLogoSource } from '@/components/brand-logo'

describe('BrandLogo', () => {
  it('renders a local SVGL asset for a known brand', () => {
    render(
      <BrandLogo
        brand="openai"
        theme="dark"
        decorative
        data-testid="openai-logo"
      />,
    )

    const logo = screen.getByTestId('openai-logo')

    expect(logo).toHaveAttribute('src', '/logos/svgl/openai-dark.svg')
    expect(logo).toHaveAttribute('alt', '')
    expect(logo).toHaveAttribute('aria-hidden', 'true')
  })

  it('uses accessible labels and falls back to a mark when a wordmark is unavailable', () => {
    render(
      <BrandLogo
        brand="figma"
        variant="wordmark"
        label="Figma design system"
        data-testid="figma-logo"
      />,
    )

    expect(screen.getByTestId('figma-logo')).toHaveAttribute(
      'src',
      '/logos/svgl/figma.svg',
    )
    expect(screen.getByAltText('Figma design system')).toBeInTheDocument()
    expect(getBrandLogoSource({ brand: 'google', variant: 'wordmark' })).toBe(
      '/logos/svgl/google-wordmark.svg',
    )
    expect(getBrandLogoSource({ brand: 'webflow' })).toBe(
      '/logos/svgl/webflow.svg',
    )
    expect(getBrandLogoSource({ brand: 'git' })).toBe('/logos/svgl/git.svg')
  })

  it('resolves the vendored yelp mark', () => {
    expect(getBrandLogoSource({ brand: 'yelp' })).toBe('/logos/svgl/yelp.svg')
  })

  it('attempts the logo first, then renders the fallback on load error', () => {
    render(
      <BrandLogo
        brand="yelp"
        decorative
        data-testid="yelp-logo"
        fallback={<span data-testid="yelp-fallback">fallback</span>}
      />,
    )

    const logo = screen.getByTestId('yelp-logo')
    expect(logo).toHaveAttribute('src', '/logos/svgl/yelp.svg')
    expect(screen.queryByTestId('yelp-fallback')).not.toBeInTheDocument()

    fireEvent.error(logo)

    expect(screen.queryByTestId('yelp-logo')).not.toBeInTheDocument()
    expect(screen.getByTestId('yelp-fallback')).toBeInTheDocument()
  })
})
