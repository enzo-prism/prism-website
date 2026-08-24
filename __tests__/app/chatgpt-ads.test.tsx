import { render, screen } from '@testing-library/react'

import ChatGptAdsPage from '@/app/chatgpt-ads/page'

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

jest.mock('@/components/chatgpt-ads/ChatGptAdsAccess', () => ({
  __esModule: true,
  default: function MockAccess() {
    return <div data-testid="chatgpt-ads-access">Invite required</div>
  },
}))

jest.mock('@/components/chatgpt-ads/ChatGptAdsConversation', () => ({
  __esModule: true,
  default: function MockConversation() {
    return <div data-testid="chatgpt-ads-conversation" />
  },
}))

jest.mock('@/components/schema-markup', () => ({
  ServiceSchema: function MockServiceSchema() {
    return null
  },
  FAQSchema: function MockFAQSchema() {
    return null
  },
}))

jest.mock('@/components/brand-logo', () => ({
  __esModule: true,
  default: function MockBrandLogo() {
    return <span data-testid="brand-logo" />
  },
}))

describe('/chatgpt-ads page', () => {
  it('leads with the invite-only ChatGPT ads story', () => {
    render(<ChatGptAdsPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /ads, inside chatgpt/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/invite only/i)).toBeInTheDocument()
    expect(screen.getByText(/a code is required/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /get started/i })).toHaveAttribute(
      'href',
      '#access',
    )
    expect(screen.getByTestId('chatgpt-ads-access')).toBeInTheDocument()
    expect(document.body.textContent).not.toMatch(/\bmichael\b/i)
    expect(document.body.textContent).not.toMatch(/\bnjo\b/i)
  })
})
