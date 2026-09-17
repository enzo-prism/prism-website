import { fireEvent, render, screen } from '@testing-library/react'

import { CaseStudyWorkHighlights } from '@/components/case-studies/CaseStudyWorkHighlights'

const openTechStackTab = () => {
  fireEvent.mouseDown(screen.getByRole('tab', { name: 'Tech stack' }), {
    button: 0,
    ctrlKey: false,
  })
}

describe('CaseStudyWorkHighlights', () => {
  it('uses official logos for supported case-study tech and icon fallbacks for unsupported tools', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="olympic-bootworks" />)

    openTechStackTab()

    const replitButton = screen.getByRole('button', { name: 'Replit' })
    const semrushButton = screen.getByRole('button', { name: 'Semrush' })

    expect(
      replitButton.querySelector('img[src="/logos/svgl/replit.svg"]'),
    ).toBeInTheDocument()
    expect(semrushButton.querySelector('img')).not.toBeInTheDocument()
    expect(semrushButton.querySelector('svg')).toBeInTheDocument()
  })

  it('uses light-surface logo variants in item dialogs', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="olympic-bootworks" />)

    openTechStackTab()
    fireEvent.click(screen.getByRole('button', { name: 'Vercel' }))

    const dialog = screen.getByRole('dialog')

    expect(
      dialog.querySelector('img[src="/logos/svgl/vercel-light.svg"]'),
    ).toBeInTheDocument()
  })

  it('attempts the yelp logo, then falls back to the store icon on error', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="mataria-dental-group" />)

    openTechStackTab()

    const yelpButton = screen.getByRole('button', { name: 'Yelp for Business' })
    const logo = yelpButton.querySelector('img[src="/logos/svgl/yelp.svg"]')
    expect(logo).toBeInTheDocument()
    expect(yelpButton.querySelector('svg')).not.toBeInTheDocument()

    fireEvent.error(logo as Element)

    expect(
      yelpButton.querySelector('img[src="/logos/svgl/yelp.svg"]'),
    ).not.toBeInTheDocument()
    expect(yelpButton.querySelector('svg')).toBeInTheDocument()
  })
})
