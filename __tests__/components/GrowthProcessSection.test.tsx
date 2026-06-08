import { fireEvent, render, screen } from '@testing-library/react'

import GrowthProcessSection, {
  GROWTH_PROCESS_STEPS,
} from '@/components/get-started/GrowthProcessSection'

const trackLinkInteraction = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: (...args: Array<unknown>) =>
    trackLinkInteraction(...args),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    prefetch: _prefetch,
    ...props
  }: {
    href: string
    children: React.ReactNode
    prefetch?: boolean
    [key: string]: unknown
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock('next/script', () => ({
  __esModule: true,
  default: function MockScript() {
    return null
  },
}))

describe('GrowthProcessSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders a single hero heading and three animated, minimally labeled steps', () => {
    const { container } = render(<GrowthProcessSection />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /three steps to your free growth audit/i,
      }),
    ).toBeInTheDocument()

    const icons = container.querySelectorAll('lord-icon')
    expect(icons).toHaveLength(3)
    expect(Array.from(icons).map((icon) => icon.getAttribute('src'))).toEqual(
      GROWTH_PROCESS_STEPS.map((step) => step.icon),
    )
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute('trigger', 'loop')
    })

    for (const step of GROWTH_PROCESS_STEPS) {
      expect(screen.getByText(step.label)).toBeInTheDocument()
      expect(screen.getByText(step.stage)).toBeInTheDocument()
    }
  })

  it('drives the single primary CTA to the apply form with tracking', () => {
    render(<GrowthProcessSection />)

    const cta = screen.getByRole('link', {
      name: /create free growth dashboard/i,
    })

    expect(cta).toHaveAttribute('href', '/apply')

    fireEvent.click(cta)

    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/apply',
      'create free growth dashboard',
      'get started hero',
    )
  })
})
