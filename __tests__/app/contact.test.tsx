import { render, screen } from '@testing-library/react'

import ContactPage from '@/app/contact/page'

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

jest.mock('@/components/forms/ContactForm', () => ({
  __esModule: true,
  default: function MockContactForm() {
    return <form data-testid="contact-form" />
  },
}))

jest.mock('@/components/pixelish/PixelishIcon', () => ({
  __esModule: true,
  default: function MockPixelishIcon() {
    return <span data-testid="pixelish-icon" />
  },
}))

jest.mock('@/components/schema-markup', () => ({
  ContactPageSchema: function MockContactPageSchema() {
    return null
  },
}))

describe('/contact page', () => {
  it('keeps contact paths while removing the demo booking path', () => {
    const { container } = render(<ContactPage />)

    expect(
      screen.getByRole('heading', { name: /contact prism/i }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /what to expect/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/support@design-prism\.com/i)).toBeInTheDocument()

    expect(
      screen.queryByText(/prefer to see it live\?/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /book a demo/i }),
    ).not.toBeInTheDocument()
    expect(container.innerHTML).not.toContain(
      'calendar.notion.so/meet/enzosison/oj1fm4o2p',
    )
  })
})
