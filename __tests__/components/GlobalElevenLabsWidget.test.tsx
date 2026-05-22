import { act, render, waitFor } from '@testing-library/react'

import GlobalElevenLabsWidget from '@/components/global-elevenlabs-widget'

const usePathname = jest.fn()
const publishPrismWidgetExpandedState = jest.fn()
const elevenLabsWidgetMock = jest.fn()

jest.mock('@/components/elevenlabs/ElevenLabsWidget', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    elevenLabsWidgetMock(props)

    return (
      <div data-testid={String(props.testId ?? 'mock-elevenlabs-widget')} />
    )
  },
}))

jest.mock('@/lib/elevenlabs', () => ({
  publishPrismWidgetExpandedState: (expanded: boolean) =>
    publishPrismWidgetExpandedState(expanded),
}))

jest.mock('next/navigation', () => ({
  usePathname: () => usePathname(),
}))

const originalMatchMedia = window.matchMedia

type MockWidgetProps = {
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onInteraction?: () => void
  testId?: string
}

function mockWidgetViewport(isMobileViewport: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: isMobileViewport,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('GlobalElevenLabsWidget', () => {
  const originalWidgetDisabled =
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
  const getLastWidgetProps = (): MockWidgetProps => {
    const lastCall = elevenLabsWidgetMock.mock.calls.at(-1)?.[0] as
      | MockWidgetProps
      | undefined

    if (!lastCall) {
      throw new Error('Expected ElevenLabsWidget to be rendered')
    }

    return lastCall
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    elevenLabsWidgetMock.mockReset()
    publishPrismWidgetExpandedState.mockReset()
    window.localStorage.clear()
    usePathname.mockReset()
    delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
    mockWidgetViewport(false)
  })

  afterAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: originalMatchMedia,
    })

    if (originalWidgetDisabled === undefined) {
      delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
      return
    }

    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = originalWidgetDisabled
  })

  it.each(['/pricing', '/contact'])(
    'renders the floating widget closed by default on %s',
    async (eligiblePath) => {
      usePathname.mockReturnValue(eligiblePath)

      render(<GlobalElevenLabsWidget />)

      await waitFor(() => {
        expect(elevenLabsWidgetMock).toHaveBeenCalled()
      })

      expect(getLastWidgetProps().defaultExpanded).toBe(false)
    },
  )

  it('does not mount the floating widget on mobile viewports', async () => {
    mockWidgetViewport(true)
    usePathname.mockReturnValue('/pricing')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(publishPrismWidgetExpandedState).toHaveBeenCalledWith(false)
    })

    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
  })

  it.each([
    '/',
    '/about',
    '/get-started',
    '/services',
    '/blog/how-to-choose-local-seo-agency',
    '/apply',
    '/ig',
    '/tiktok',
  ])('does not mount the floating widget on %s', async (blockedPath) => {
    usePathname.mockReturnValue(blockedPath)

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(publishPrismWidgetExpandedState).toHaveBeenCalledWith(false)
    })

    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
  })

  it('lets an explicit user preference override the closed-by-default baseline', async () => {
    window.localStorage.setItem(
      'prism-elevenlabs-widget-preference',
      'expanded',
    )
    usePathname.mockReturnValue('/pricing')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    expect(getLastWidgetProps().defaultExpanded).toBe(true)
  })

  it('persists explicit expand and collapse choices while syncing Prism chrome state', async () => {
    usePathname.mockReturnValue('/pricing')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    await act(async () => {
      getLastWidgetProps().onInteraction?.()
      getLastWidgetProps().onExpandedChange?.(true)
    })

    expect(
      window.localStorage.getItem('prism-elevenlabs-widget-preference'),
    ).toBe('expanded')
    expect(publishPrismWidgetExpandedState).toHaveBeenLastCalledWith(true)

    await act(async () => {
      getLastWidgetProps().onInteraction?.()
      getLastWidgetProps().onExpandedChange?.(false)
    })

    expect(
      window.localStorage.getItem('prism-elevenlabs-widget-preference'),
    ).toBe('collapsed')
    expect(publishPrismWidgetExpandedState).toHaveBeenLastCalledWith(false)
  })

  it('does not turn automatic defaults into sticky preferences without user interaction', async () => {
    usePathname.mockReturnValue('/pricing')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    await act(async () => {
      getLastWidgetProps().onExpandedChange?.(true)
    })

    expect(
      window.localStorage.getItem('prism-elevenlabs-widget-preference'),
    ).toBeNull()
    expect(publishPrismWidgetExpandedState).toHaveBeenLastCalledWith(true)
  })

  it('honors the explicit public widget kill switch', () => {
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = 'true'
    usePathname.mockReturnValue('/pricing')

    render(<GlobalElevenLabsWidget />)

    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
  })
})
