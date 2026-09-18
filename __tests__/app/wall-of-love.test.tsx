import { fireEvent, render, screen, within } from '@testing-library/react'

import WallOfLoveClientPage from '@/app/wall-of-love/client-page'
import { SOCIAL_PROOF } from '@/lib/proof-metrics'
import { trackCTAClick } from '@/utils/analytics'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: jest.fn(),
}))

function heroScope(container: HTMLElement) {
  return within(
    container.querySelector('#wall-of-love-hero') as HTMLElement,
  )
}

describe('WallOfLoveClientPage incoming hero', () => {
  it('renders the incoming copy and heart poster fallback', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = heroScope(container)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'Love letters, still arriving.',
      }),
    ).toBeInTheDocument()
    expect(hero.getByText('Wall of Love / Incoming')).toBeInTheDocument()

    const poster = container.querySelector(
      'img[src="/animations/heart/poster.svg"]',
    )
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps the Become a Client CTA with tracking', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = heroScope(container)

    const cta = hero.getByRole('link', { name: /Become a Client/ })
    expect(cta).toHaveAttribute('href', '/waitlist')

    const button = within(cta).getByRole('button', { name: /Become a Client/ })
    fireEvent.click(button)
    expect(trackCTAClick).toHaveBeenCalledWith(
      'wall_of_love_become_client_cta',
      '/waitlist',
    )
  })

  it('links the secondary action to the testimonials feed', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = heroScope(container)

    const secondary = hero.getByRole('link', { name: /Read the letters/ })
    expect(secondary).toHaveAttribute('href', '#testimonials-feed')
    expect(document.getElementById('testimonials-feed')).toBeInTheDocument()
  })

  it('reads the system strip from the shared proof snapshot', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = heroScope(container)

    expect(
      hero.getByText((_, element) => {
        const text = element?.textContent ?? ''
        return (
          element?.tagName === 'P' &&
          text.includes(
            `Instagram ${SOCIAL_PROOF.instagram.audience}`,
          ) &&
          text.includes(`TikTok ${SOCIAL_PROOF.tiktok.audience}`) &&
          text.includes(`YouTube ${SOCIAL_PROOF.youtube.audience}`)
        )
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Wall of Love', { selector: 'h1' })).not.toBeInTheDocument()
  })

  it('keeps hero copy free of em dashes', () => {
    const { container } = render(<WallOfLoveClientPage />)

    const hero = container.querySelector('#wall-of-love-hero')
    expect(hero?.textContent).not.toContain('—')
  })
})
