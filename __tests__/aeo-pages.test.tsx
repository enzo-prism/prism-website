import React from "react"
import { render, screen } from "@testing-library/react"

import AeoLandingPage, { metadata as aeoMetadata } from "@/app/aeo/page"
import AeoThankYouPage, { metadata as aeoThankYouMetadata } from "@/app/aeo-thank-you/page"

const pagePushMock = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pagePushMock }),
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string | { pathname?: string }; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={typeof href === "string" ? href : href?.pathname ?? ""} {...props}>
      {children}
    </a>
  ),
}))

jest.mock("next/script", () => ({
  __esModule: true,
  default: ({ id, children }: { id?: string; children?: React.ReactNode }) =>
    <script id={id}>{children}</script>,
}))

jest.mock("@/components/navbar", () => () => <header data-testid="navbar-mock" />)
jest.mock("@/components/footer", () => () => <footer data-testid="footer-mock" />)
jest.mock("@/components/scroll-to-top", () => () => <div data-testid="scroll-to-top-mock" />)
jest.mock("@/components/reveal-on-scroll", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
jest.mock("@/components/faq-section", () => ({
  __esModule: true,
  default: ({
    title,
    subtitle,
    items,
  }: {
    title: string
    subtitle: string
    items: Array<{ question: string; answer: string }>
  }) => (
    <section>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {items.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </section>
  ),
}))
jest.mock("@/components/schema-markup", () => ({
  FAQSchema: () => null,
  HowToSchema: () => null,
  ServiceSchema: () => null,
}))

describe("AEO landing and thank-you routes", () => {
  it("exports SEO metadata for /aeo", () => {
    expect(aeoMetadata.title).toEqual({ absolute: "AEO Assessment | Prism" })
    expect(aeoMetadata.alternates?.canonical).toBe("https://www.design-prism.com/aeo")
    expect(aeoMetadata.description).toContain("AEO")
  })

  it("renders lead capture and core conversion sections on /aeo", () => {
    render(<AeoLandingPage />)

    expect(screen.getByRole("heading", { name: /be cited, not ignored, in ai-powered discovery/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /AEO framework: content, technical, authority, measurement/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /what the assessment report includes/i })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /AEO assessment FAQ/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /get free aeo assessment/i })).toBeInTheDocument()
  })

  it("exports noindex metadata and renders conversion copy on /aeo-thank-you", () => {
    expect(aeoThankYouMetadata.title).toEqual({ absolute: "AEO assessment received | Prism" })
    expect(aeoThankYouMetadata.alternates?.canonical).toBe("https://www.design-prism.com/aeo-thank-you")
    expect(aeoThankYouMetadata.robots).toEqual({ index: false, follow: false })

    render(<AeoThankYouPage />)

    expect(screen.getByRole("heading", { name: /your free aeo assessment is on its way/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /back to home/i })).toBeInTheDocument()
    expect(document.getElementById("google-ads-conversion-thank-you")).toBeInTheDocument()
  })
})
