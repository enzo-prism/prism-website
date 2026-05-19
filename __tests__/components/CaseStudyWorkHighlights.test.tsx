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
})
