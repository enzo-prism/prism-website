import { cleanup, render, screen } from "@testing-library/react"

import GetStartedHeroScene from "@/components/get-started/GetStartedHeroScene"
import UnicornHeroScene from "@/components/home/UnicornHeroScene"
import { UNICORN_SDK_URL } from "@/lib/unicorn-hero-config"

const mockUnicornScene = jest.fn((_: Record<string, unknown>) => <div data-testid="unicorn-scene" />)

jest.mock("unicornstudio-react/next", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => mockUnicornScene(props),
}))

type MatchMediaConfig = {
  reducedMotion?: boolean
  pointerCoarse?: boolean
  maxWidthMobile?: boolean
}

function setMatchMedia({
  reducedMotion = false,
  pointerCoarse = false,
  maxWidthMobile = false,
}: MatchMediaConfig = {}) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => {
      const matches =
        (query === "(prefers-reduced-motion: reduce)" && reducedMotion) ||
        (query === "(pointer: coarse)" && pointerCoarse) ||
        (query === "(max-width: 768px)" && maxWidthMobile)

      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      } as MediaQueryList
    }),
  })
}

function setConnectionState(connection: { saveData?: boolean; effectiveType?: string } | undefined) {
  Object.defineProperty(window.navigator, "connection", {
    configurable: true,
    value: connection,
  })
}

function getMockSceneProps() {
  const latestCall = mockUnicornScene.mock.calls.at(-1)
  if (!latestCall?.[0]) {
    throw new Error("Expected UnicornScene to be called with props")
  }
  return latestCall[0]
}

describe("Unicorn hero scenes", () => {
  beforeEach(() => {
    mockUnicornScene.mockClear()
    setMatchMedia()
    setConnectionState(undefined)
  })

  it("passes eager local Unicorn settings for the homepage hero", () => {
    render(<UnicornHeroScene />)

    expect(mockUnicornScene).toHaveBeenCalledTimes(1)
    const props = getMockSceneProps()

    expect(props.jsonFilePath).toBe("/unicorn/hero-scene.json")
    expect(props.sdkUrl).toBe(UNICORN_SDK_URL)
    expect(props.lazyLoad).toBe(false)
    expect(props.placeholderClassName).toBe("unicorn-hero-scene__placeholder")
    expect(props.fps).toBe(60)
    expect(props.dpi).toBe(1.5)
  })

  it("passes eager local Unicorn settings for the get-started hero", () => {
    render(<GetStartedHeroScene />)

    expect(mockUnicornScene).toHaveBeenCalledTimes(1)
    const props = getMockSceneProps()

    expect(props.jsonFilePath).toBe("/unicorn/get-started-hero.json")
    expect(props.sdkUrl).toBe(UNICORN_SDK_URL)
    expect(props.lazyLoad).toBe(false)
    expect(props.placeholderClassName).toBe("unicorn-hero-scene__placeholder")
    expect(props.fps).toBe(60)
    expect(props.dpi).toBe(1.5)
  })

  it("uses the mobile/reduced-data render profile for coarse pointers", () => {
    setMatchMedia({ pointerCoarse: true })

    render(<GetStartedHeroScene />)

    expect(mockUnicornScene).toHaveBeenCalledTimes(1)
    const props = getMockSceneProps()
    expect(props.fps).toBe(30)
    expect(props.dpi).toBe(1)
  })

  it("renders reduced-motion fallback instead of UnicornScene", () => {
    setMatchMedia({ reducedMotion: true })

    const { container: homeContainer } = render(<UnicornHeroScene />)
    expect(mockUnicornScene).not.toHaveBeenCalled()
    expect(screen.queryByTestId("unicorn-scene")).not.toBeInTheDocument()
    expect(homeContainer.querySelector(".unicorn-hero-scene > div")).toBeInTheDocument()

    cleanup()
    mockUnicornScene.mockClear()

    const { container: getStartedContainer } = render(<GetStartedHeroScene />)
    expect(mockUnicornScene).not.toHaveBeenCalled()
    expect(screen.queryByTestId("unicorn-scene")).not.toBeInTheDocument()
    expect(getStartedContainer.querySelector(".unicorn-hero-scene > div")).toBeInTheDocument()
  })
})
