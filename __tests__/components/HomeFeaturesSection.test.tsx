import { render, screen, within } from '@testing-library/react'

import HomeFeaturesSection from '@/components/home/HomeFeaturesSection'

describe('HomeFeaturesSection', () => {
  it('renders all five homepage growth pillars including AI agents', () => {
    render(<HomeFeaturesSection />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /everything your brand needs to grow, in one system/i,
      }),
    ).toBeInTheDocument()

    const featureHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(featureHeadings).toHaveLength(5)

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /high-converting websites/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /search \+ ai visibility/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 3, name: /paid ads that scale/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /analytics that drive decisions/i,
      }),
    ).toBeInTheDocument()

    const aiAgentsCardHeading = screen.getByRole('heading', {
      level: 3,
      name: /ai agents that answer \+ book/i,
    })
    const aiAgentsCard = aiAgentsCardHeading.closest('[data-home-feature-card]')

    expect(aiAgentsCard).toBeInTheDocument()
    expect(
      within(aiAgentsCard as HTMLElement).getByText(
        /deploy human-sounding voice agents that answer calls, qualify leads, and schedule appointments 24\/7\./i,
      ),
    ).toBeInTheDocument()
  })
})
