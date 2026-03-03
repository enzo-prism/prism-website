import { render, screen } from "@testing-library/react"

import GetStartedPage from "@/app/get-started/page"

const mockGetSalesChatRuntimeConfig = jest.fn()
const mockParseBooleanEnv = jest.fn()

jest.mock("@/lib/sales-chat/runtime-config", () => ({
  getSalesChatRuntimeConfig: (...args: Array<unknown>) => mockGetSalesChatRuntimeConfig(...args),
  parseBooleanEnv: (...args: Array<unknown>) => mockParseBooleanEnv(...args),
}))

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

jest.mock("@/components/SalesChat", () => ({
  __esModule: true,
  default: function MockSalesChat() {
    return <section>Chat with Sales</section>
  },
}))

describe("/get-started page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockParseBooleanEnv.mockImplementation((value: string | undefined, fallback: boolean) => {
      if (!value) return fallback
      return value === "true"
    })
  })

  it("renders chat only when uiAvailable=true", () => {
    mockGetSalesChatRuntimeConfig.mockReturnValue({
      enabled: true,
      aiFallbackEnabled: false,
      aiResponseMode: "long_tail",
      aiResponseEnabled: false,
      hasGatewayBaseUrl: true,
      hasGatewayApiKey: true,
      hasGatewayModel: true,
      gatewayFallbackModels: [],
      gatewayProviderOrder: [],
      gatewayConfigured: true,
      hasBookingUrl: true,
      hasWebsiteOverhaulCheckoutUrl: true,
      hasGrowthPartnershipSignupUrl: true,
      ctaUrlsConfigured: true,
      hasLeadsWebhookUrl: true,
      hasLeadsWebhookSecret: true,
      leadsWebhookConfigured: true,
      uiAvailable: true,
      missingRequiredKeys: [],
    })

    render(<GetStartedPage />)

    expect(screen.getByText("Chat with Sales")).toBeInTheDocument()
    expect(screen.getByTestId("book-demo-embed")).toBeInTheDocument()
    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument()
  })

  it("hides chat when enabled flag is true but gateway env is missing", () => {
    mockGetSalesChatRuntimeConfig.mockReturnValue({
      enabled: true,
      aiFallbackEnabled: false,
      aiResponseMode: "long_tail",
      aiResponseEnabled: false,
      hasGatewayBaseUrl: false,
      hasGatewayApiKey: false,
      hasGatewayModel: false,
      gatewayFallbackModels: [],
      gatewayProviderOrder: [],
      gatewayConfigured: false,
      hasBookingUrl: true,
      hasWebsiteOverhaulCheckoutUrl: false,
      hasGrowthPartnershipSignupUrl: false,
      ctaUrlsConfigured: false,
      hasLeadsWebhookUrl: true,
      hasLeadsWebhookSecret: true,
      leadsWebhookConfigured: true,
      uiAvailable: false,
      missingRequiredKeys: [
        "SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL",
        "SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL",
      ],
    })

    render(<GetStartedPage />)

    expect(screen.queryByText("Chat with Sales")).not.toBeInTheDocument()
    expect(screen.getByTestId("book-demo-embed")).toBeInTheDocument()
  })
})
