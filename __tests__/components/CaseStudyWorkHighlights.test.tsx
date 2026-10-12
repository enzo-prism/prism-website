import { fireEvent, render, screen, within } from '@testing-library/react'

import { CaseStudyWorkHighlights } from '@/components/case-studies/CaseStudyWorkHighlights'

const openTechStackTab = () => {
  fireEvent.mouseDown(screen.getByRole('tab', { name: 'Tech stack' }), {
    button: 0,
    ctrlKey: false,
  })
}

const markOf = (button: HTMLElement) =>
  button.querySelector('[data-slot="work-item-mark"]') as HTMLElement

describe('CaseStudyWorkHighlights', () => {
  it('renders the section heading and the services tab first', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="olympic-bootworks" />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'what we delivered.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Services' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Website design' })).toBeInTheDocument()
  })

  it('uses official logos for supported case-study tech and icon fallbacks for unsupported tools', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="olympic-bootworks" />)

    openTechStackTab()

    const replitButton = screen.getByRole('button', { name: 'Replit' })
    const semrushButton = screen.getByRole('button', { name: 'Semrush' })

    expect(
      markOf(replitButton).querySelector('img[src="/logos/svgl/replit.svg"]'),
    ).toBeInTheDocument()
    expect(markOf(semrushButton).querySelector('img')).not.toBeInTheDocument()
    expect(markOf(semrushButton).querySelector('svg')).toBeInTheDocument()
  })

  it('uses dark-surface logo variants in the dark item dialog', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="olympic-bootworks" />)

    openTechStackTab()
    fireEvent.click(screen.getByRole('button', { name: 'Vercel' }))

    const dialog = screen.getByRole('dialog')

    expect(
      dialog.querySelector('img[src="/logos/svgl/vercel-dark.svg"]'),
    ).toBeInTheDocument()
    expect(
      dialog.querySelector('img[src="/logos/svgl/vercel-light.svg"]'),
    ).not.toBeInTheDocument()
  })

  it('explains each item with "What it is" and "Why it matters" and never claims world-class', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="olympic-bootworks" />)

    fireEvent.click(screen.getByRole('button', { name: 'Website design' }))

    const dialog = screen.getByRole('dialog')
    expect(
      within(dialog).getByRole('heading', { name: 'Website design' }),
    ).toBeInTheDocument()
    expect(within(dialog).getByText('What it is')).toBeInTheDocument()
    expect(within(dialog).getByText('Why it matters')).toBeInTheDocument()
    expect(dialog.textContent).not.toMatch(/world-class/i)
    expect(
      within(dialog).getByRole('link', { name: /Explore Prism websites/ }),
    ).toHaveAttribute('href', '/websites')

    fireEvent.click(within(dialog).getByRole('button', { name: 'Close details' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('attempts the yelp logo, then falls back to the store icon on error', () => {
    render(<CaseStudyWorkHighlights caseStudySlug="mataria-dental-group" />)

    openTechStackTab()

    const yelpButton = screen.getByRole('button', { name: 'Yelp for Business' })
    const mark = markOf(yelpButton)
    const logo = mark.querySelector('img[src="/logos/svgl/yelp.svg"]')
    expect(logo).toBeInTheDocument()
    expect(mark.querySelector('svg')).not.toBeInTheDocument()

    fireEvent.error(logo as Element)

    expect(
      markOf(yelpButton).querySelector('img[src="/logos/svgl/yelp.svg"]'),
    ).not.toBeInTheDocument()
    expect(markOf(yelpButton).querySelector('svg')).toBeInTheDocument()
  })
})
