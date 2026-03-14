import { act, render, waitFor } from '@testing-library/react'

import GlobalElevenLabsWidget from '@/components/global-elevenlabs-widget'

const usePathname = jest.fn()
const publishPrismWidgetExpandedState = jest.fn()
const elevenLabsWidgetMock = jest.fn()

jest.mock('@/components/elevenlabs/ElevenLabsWidget', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    elevenLabsWidgetMock(props)

    return <div data-testid={String(props.testId ?? 'mock-elevenlabs-widget')} />
  },
}))

jest.mock('@/lib/elevenlabs', () => ({
  publishPrismWidgetExpandedState: (expanded: boolean) =>
    publishPrismWidgetExpandedState(expanded),
}))

jest.mock('next/navigation', () => ({
  usePathname: () => usePathname(),
}))

type MockWidgetProps = {
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  onInteraction?: () => void
  testId?: string
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
    window.sessionStorage.clear()
    usePathname.mockReset()
    delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
  })

  afterAll(() => {
    if (originalWidgetDisabled === undefined) {
      delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
      return
    }

    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = originalWidgetDisabled
  })

  it('renders the floating widget closed by default for first-touch inner-page sessions', async () => {
    usePathname.mockReturnValue('/about')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    expect(getLastWidgetProps().defaultExpanded).toBe(false)
    expect(window.sessionStorage.getItem('prism-elevenlabs-entry-route')).toBe(
      'inner',
    )
  })

  it('skips the homepage while still capturing the home entry route for later pages', async () => {
    usePathname.mockReturnValue('/')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(window.sessionStorage.getItem('prism-elevenlabs-entry-route')).toBe(
        'home',
      )
    })

    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
    expect(publishPrismWidgetExpandedState).toHaveBeenCalledWith(false)
  })

  it('opens the floating widget by default after a homepage entry when the user has no saved preference', async () => {
    let currentPathname = '/'
    usePathname.mockImplementation(() => currentPathname)

    const { rerender } = render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(window.sessionStorage.getItem('prism-elevenlabs-entry-route')).toBe(
        'home',
      )
    })

    currentPathname = '/blog/how-to-choose-local-seo-agency'
    rerender(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    expect(getLastWidgetProps().defaultExpanded).toBe(true)
  })

  it('lets an explicit user preference override the session entry route default', async () => {
    window.sessionStorage.setItem('prism-elevenlabs-entry-route', 'home')
    window.localStorage.setItem('prism-elevenlabs-widget-preference', 'collapsed')
    usePathname.mockReturnValue('/about')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    expect(getLastWidgetProps().defaultExpanded).toBe(false)
  })

  it('persists explicit expand and collapse choices while syncing Prism chrome state', async () => {
    usePathname.mockReturnValue('/about')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    await act(async () => {
      getLastWidgetProps().onInteraction?.()
      getLastWidgetProps().onExpandedChange?.(true)
    })

    expect(window.localStorage.getItem('prism-elevenlabs-widget-preference')).toBe(
      'expanded',
    )
    expect(publishPrismWidgetExpandedState).toHaveBeenLastCalledWith(true)

    await act(async () => {
      getLastWidgetProps().onInteraction?.()
      getLastWidgetProps().onExpandedChange?.(false)
    })

    expect(window.localStorage.getItem('prism-elevenlabs-widget-preference')).toBe(
      'collapsed',
    )
    expect(publishPrismWidgetExpandedState).toHaveBeenLastCalledWith(false)
  })

  it('does not turn automatic defaults into sticky preferences without user interaction', async () => {
    window.sessionStorage.setItem('prism-elevenlabs-entry-route', 'home')
    usePathname.mockReturnValue('/about')

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(elevenLabsWidgetMock).toHaveBeenCalled()
    })

    await act(async () => {
      getLastWidgetProps().onExpandedChange?.(true)
    })

    expect(window.localStorage.getItem('prism-elevenlabs-widget-preference')).toBeNull()
    expect(publishPrismWidgetExpandedState).toHaveBeenLastCalledWith(true)
  })

  it('honors the explicit public widget kill switch', () => {
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = 'true'
    usePathname.mockReturnValue('/about')

    render(<GlobalElevenLabsWidget />)

    expect(elevenLabsWidgetMock).not.toHaveBeenCalled()
  })
})
