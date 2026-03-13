import { render } from '@testing-library/react'

import GlobalElevenLabsWidget from '@/components/global-elevenlabs-widget'

const usePathname = jest.fn()

jest.mock('next/navigation', () => ({
  usePathname: () => usePathname(),
}))

describe('GlobalElevenLabsWidget', () => {
  const originalWidgetDisabled =
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED

  beforeEach(() => {
    document.body.innerHTML = ''
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

  it('renders the stock floating ElevenLabs widget on inner pages', () => {
    usePathname.mockReturnValue('/about')

    const { container } = render(<GlobalElevenLabsWidget />)
    const widget = container.querySelector(
      'elevenlabs-convai',
    ) as HTMLElement | null

    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute(
      'agent-id',
      'agent_4701kkcyc4efefkv5x4awhysjyrh',
    )
    expect(widget).toHaveAttribute('markdown-link-allow-http', 'false')
    expect(widget).toHaveAttribute('markdown-link-include-www', 'true')
    expect(widget).toHaveAttribute(
      'markdown-link-allowed-hosts',
      'calendar.notion.so,notion.so,cal.com,design-prism.com',
    )
    expect(widget).not.toHaveAttribute('dismissible')
    expect(widget).not.toHaveAttribute('variant')
    expect(widget?.style.zIndex).toBe('2147483000')
  })

  it('skips the homepage so the hero remains the dedicated primary experience', () => {
    usePathname.mockReturnValue('/')

    const { container } = render(<GlobalElevenLabsWidget />)

    expect(container.querySelector('elevenlabs-convai')).not.toBeInTheDocument()
  })

  it('renders on get-started so the stock floating widget owns the page assistant experience', () => {
    usePathname.mockReturnValue('/get-started')

    const { container } = render(<GlobalElevenLabsWidget />)

    expect(container.querySelector('elevenlabs-convai')).toBeInTheDocument()
  })

  it('honors the explicit public widget kill switch', () => {
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = 'true'
    usePathname.mockReturnValue('/about')

    const { container } = render(<GlobalElevenLabsWidget />)

    expect(container.querySelector('elevenlabs-convai')).not.toBeInTheDocument()
  })
})
