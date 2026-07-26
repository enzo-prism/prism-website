import React from "react"
import { render, screen } from "@testing-library/react"

import AiSeoServicesPage from "@/app/ai-seo-services/page"

jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    legacyBehavior: _legacyBehavior,
    passHref: _passHref,
    ...props
  }: {
    href: string
    children: React.ReactNode
    legacyBehavior?: boolean
    passHref?: boolean
    [key: string]: unknown
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock("@/components/core-image", () => ({
  __esModule: true,
  default: function MockCoreImage() {
    return <div data-testid="core-image-mock" />
  },
}))
jest.mock("@/components/pixelish/PixelishIcon", () => ({
  __esModule: true,
  default: function MockPixelishIcon() {
    return <div data-testid="pixelish-icon-mock" />
  },
}))
jest.mock("@/components/gradient-card", () => ({
  __esModule: true,
  default: function MockGradientCard() {
    return <div data-testid="gradient-card-mock" />
  },
}))

describe("AEO discoverability links", () => {
  // The /offers page was retired (it 301s to /pricing), so the only remaining
  // first-party entry point to /aeo is the AI SEO services page.
  it("features /aeo link from AI SEO services page", () => {
    render(<AiSeoServicesPage />)

    const aeoLink = screen.getByRole("link", {
      name: /free aeo assessment/i,
    })

    expect(aeoLink).toHaveAttribute("href", "/aeo")
  })
})
