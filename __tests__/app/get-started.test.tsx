import { render, screen } from '@testing-library/react'

import GetStartedPage from '@/app/get-started/page'

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

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: function MockNavbar() {
    return <header data-testid="navbar-mock" />
  },
}))

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: function MockFooter() {
    return <footer data-testid="footer-mock" />
  },
}))

jest.mock('@/components/get-started/GrowthProcessSection', () => ({
  __esModule: true,
  default: function MockGrowthProcessSection() {
    return <section data-testid="growth-process-section" />
  },
}))

jest.mock('@/components/schema-markup', () => ({
  WebPageSchema: function MockWebPageSchema() {
    return null
  },
}))

describe('/get-started page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the overview-led get-started page with the process section', () => {
    render(<GetStartedPage />)

    expect(screen.getByTestId('growth-process-section')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /one short dashboard intake\./i,
      }),
    ).toBeInTheDocument()
  })

  it('funnels people from get-started into the dedicated apply page', () => {
    render(<GetStartedPage />)

    expect(
      screen.getByRole('link', { name: /create free growth dashboard/i }),
    ).toHaveAttribute('href', '/apply')
    expect(screen.getByText(/focus/i)).toBeInTheDocument()
    expect(screen.getByText(/6 steps/i)).toBeInTheDocument()
    expect(
      screen.getAllByText(/every real practice submission receives a light audit/i)
        .length,
    ).toBeGreaterThan(0)
  })
})
