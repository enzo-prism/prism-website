import { render, screen } from "@testing-library/react"

import GetStartedPage from "@/app/get-started/page"

jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
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

jest.mock("@/components/BookDemoEmbed", () => ({
  __esModule: true,
  default: function MockBookDemoEmbed() {
    return <section data-testid="book-demo-embed" />
  },
}))

jest.mock("@/components/get-started/GetStartedHeroScene", () => ({
  __esModule: true,
  default: function MockHeroScene() {
    return <section data-testid="hero-scene-mock" />
  },
}))

jest.mock("@/components/video-player", () => ({
  __esModule: true,
  default: function MockVideoPlayer() {
    return <div data-testid="video-player-mock" />
  },
}))

jest.mock("@/components/pixelish/PixelishIcon", () => ({
  __esModule: true,
  default: function MockPixelishIcon() {
    return <span data-testid="pixelish-icon-mock" />
  },
}))

jest.mock("@/components/faq-section", () => ({
  __esModule: true,
  default: function MockFaqSection() {
    return <section data-testid="faq-mock">Frequently asked questions</section>
  },
}))

jest.mock("@/components/schema-markup", () => ({
  WebPageSchema: function MockWebPageSchema() {
    return null
  },
}))

describe("/get-started page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the booking-led get-started content without the legacy sales chat gate", () => {
    render(<GetStartedPage />)

    expect(screen.getByTestId("book-demo-embed")).toBeInTheDocument()
    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1, name: /turn your online presence into a growth engine/i })).toBeInTheDocument()
  })

  it("keeps the booking call CTA visible", () => {
    render(<GetStartedPage />)

    expect(screen.getAllByRole("link", { name: /book your strategy call/i }).length).toBeGreaterThan(0)
    expect(screen.getByText(/book a strategy call/i)).toBeInTheDocument()
  })
})
