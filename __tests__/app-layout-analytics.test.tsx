import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import RootLayout from "@/app/layout"

jest.mock("geist/font/mono", () => ({
  GeistMono: { variable: "geist-mono" },
}))
jest.mock("geist/font/sans", () => ({
  GeistSans: { variable: "geist-sans" },
}))
// Decorative pixel fonts now come from @/lib/fonts (next/font/local), which jest
// cannot evaluate without the SWC font transform — mock the variables.
jest.mock("@/lib/fonts", () => ({
  geistPixelGrid: { variable: "geist-pixel-grid" },
  geistPixelSquare: { variable: "geist-pixel-square" },
}))

jest.mock("@/components/skip-to-content", () => ({
  __esModule: true,
  default: function MockSkipToContent() {
    return <div data-testid="skip-to-content" />
  },
}))
jest.mock("@/components/schema-markup", () => ({
  __esModule: true,
  GlobalSchemaGraph: function MockGlobalSchemaGraph() {
    return <div data-testid="schema-graph" />
  },
}))
jest.mock("@/components/runtime-client-shell", () => ({
  __esModule: true,
  default: function MockRuntimeClientShell() {
    return <div data-testid="runtime-client-shell" />
  },
}))

describe("RootLayout analytics wiring", () => {
  it("mounts the runtime client shell that owns analytics wiring", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <div>content</div>
      </RootLayout>,
    )

    expect(markup).toContain('data-testid="runtime-client-shell"')
  })
})
