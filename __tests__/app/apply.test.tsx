import { render, screen } from '@testing-library/react'

import ApplyPage from '@/app/apply/page'

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

jest.mock('@/components/forms/GetStartedForm', () => ({
  __esModule: true,
  default: function MockGetStartedForm() {
    return <form data-testid="apply-form" />
  },
}))

jest.mock('@/components/schema-markup', () => ({
  WebPageSchema: function MockWebPageSchema() {
    return null
  },
}))

describe('/apply page', () => {
  it('renders the focused application route with minimal chrome', () => {
    render(<ApplyPage />)

    expect(screen.getByTestId('apply-form')).toBeInTheDocument()
    expect(screen.getByText(/^Prism$/i)).toBeInTheDocument()
    expect(screen.getByText(/^Exit$/i)).toBeInTheDocument()
    expect(screen.queryByText(/review guaranteed/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/most engagements start between \$1k/i),
    ).not.toBeInTheDocument()
  })
})
