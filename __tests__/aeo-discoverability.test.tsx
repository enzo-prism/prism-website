import React from "react"
import { render, screen } from "@testing-library/react"

import OffersClientPage from "@/app/offers/client-page"
import AiSeoServicesPage from "@/app/ai-seo-services/page"

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
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
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

jest.mock("@/components/core-image", () => () => <div data-testid="core-image-mock" />)
jest.mock("@/components/pixelish/PixelishIcon", () => () => <div data-testid="pixelish-icon-mock" />)
jest.mock("@/components/gradient-card", () => ({
  __esModule: true,
  default: () => <div data-testid="gradient-card-mock" />,
}))

describe("AEO discoverability links", () => {
  it("includes /aeo card in offers page", () => {
    render(<OffersClientPage />)

    const aeoOffer = screen.getByRole("link", { name: /get your aeo assessment/i })
    expect(aeoOffer).toHaveAttribute("href", "/aeo")
  })

  it("features /aeo link from AI SEO services page", () => {
    render(<AiSeoServicesPage />)

    const aeoLink = screen.getByRole("link", {
      name: /free aeo assessment/i,
    })

    expect(aeoLink).toHaveAttribute("href", "/aeo")
  })
})
