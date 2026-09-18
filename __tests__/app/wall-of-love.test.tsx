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

describe('WallOfLoveClientPage hero', () => {
  it('renders a single Wall of Love H1 and the heart poster fallback', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = heroScope(container)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'Wall of Love',
      }),
    ).toBeInTheDocument()
    expect(
      hero.queryByText('Wall of Love / Incoming'),
    ).not.toBeInTheDocument()
    expect(
      hero.queryByText('Love letters, still arriving.'),
    ).not.toBeInTheDocument()

    const poster = container.querySelector(
      'img[src="/animations/heart/poster.svg"]',
    )
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps a single Prism Waitlist CTA with tracking', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = heroScope(container)

    const cta = hero.getByRole('link', { name: /Prism Waitlist/ })
    expect(cta).toHaveAttribute('href', '/waitlist')

    const button = within(cta).getByRole('button', { name: /Prism Waitlist/ })
    fireEvent.click(button)
    expect(trackCTAClick).toHaveBeenCalledWith(
      'wall_of_love_waitlist_cta',
      '/waitlist',
    )

    expect(
      hero.queryByRole('link', { name: /Read the letters/ }),
    ).not.toBeInTheDocument()
    expect(hero.getAllByRole('link')).toHaveLength(1)
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
    expect(
      screen.queryByText(/Incoming \/ .* voices/),
    ).not.toBeInTheDocument()
  })

  it('keeps hero copy free of em dashes', () => {
    const { container } = render(<WallOfLoveClientPage />)

    const hero = container.querySelector('#wall-of-love-hero')
    expect(hero?.textContent).not.toContain('—')
  })
})
