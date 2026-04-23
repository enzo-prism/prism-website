import { render, screen } from "@testing-library/react"

import ApplyPage from "@/app/apply/page"

jest.mock("next/link", () => ({
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

jest.mock("@/components/navbar", () => ({
  __esModule: true,
  default: function MockNavbar() {
    return <header data-testid="navbar-mock" />
  },
}))

jest.mock("@/components/footer", () => ({
  __esModule: true,
  default: function MockFooter() {
    return <footer data-testid="footer-mock" />
  },
}))

jest.mock("@/components/forms/GetStartedForm", () => ({
  __esModule: true,
  default: function MockGetStartedForm() {
    return <form data-testid="apply-form" />
  },
}))

jest.mock("@/components/schema-markup", () => ({
  WebPageSchema: function MockWebPageSchema() {
    return null
  },
}))

describe("/apply page", () => {
  it("renders the dedicated application route with the form and qualification copy", () => {
    render(<ApplyPage />)

    expect(screen.getByTestId("apply-form")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /apply to work with prism\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/most engagements start between \$1k and \$3k\/month/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/review guaranteed/i),
    ).toBeInTheDocument()
  })
})
