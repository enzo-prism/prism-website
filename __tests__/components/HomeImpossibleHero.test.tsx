import { render, screen } from '@testing-library/react'

import HomeImpossibleHero from '@/components/home/HomeImpossibleHero'

describe('HomeImpossibleHero scroll cue', () => {
  it('links the scroll cue to the homepage hero section', () => {
    render(<HomeImpossibleHero />)

    const cue = screen.getByRole('link', { name: 'scroll' })

    expect(cue).toHaveAttribute('href', '#homepage-hero')
  })
})
