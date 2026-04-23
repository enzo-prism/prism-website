import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import RootLayout from "@/app/layout"

jest.mock("geist/font/mono", () => ({
  GeistMono: { variable: "geist-mono" },
}))
jest.mock("geist/font/pixel", () => ({
  GeistPixelGrid: { variable: "geist-pixel-grid" },
  GeistPixelSquare: { variable: "geist-pixel-square" },
}))
jest.mock("geist/font/sans", () => ({
  GeistSans: { variable: "geist-sans" },
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
