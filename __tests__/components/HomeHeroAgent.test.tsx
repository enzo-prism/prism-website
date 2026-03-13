import { render } from '@testing-library/react'

import HomeHeroAgent from '@/components/home/HomeHeroAgent'

describe('HomeHeroAgent', () => {
  const originalWidgetDisabled =
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
  })

  afterAll(() => {
    if (originalWidgetDisabled === undefined) {
      delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
      return
    }

    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = originalWidgetDisabled
  })

  it('renders the stock expanded ElevenLabs widget inside the hero wrapper', () => {
    const { container } = render(<HomeHeroAgent />)

    const widget = container.querySelector(
      'elevenlabs-convai',
    ) as HTMLElement | null

    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute(
      'agent-id',
      'agent_4701kkcyc4efefkv5x4awhysjyrh',
    )
    expect(widget).toHaveAttribute('dismissible', 'false')
    expect(widget).toHaveAttribute('markdown-link-allow-http', 'false')
    expect(widget).toHaveAttribute('variant', 'expanded')
    expect(widget).toHaveAttribute('markdown-link-include-www', 'true')
    expect(widget).toHaveAttribute(
      'markdown-link-allowed-hosts',
      'calendar.notion.so,notion.so,cal.com,design-prism.com',
    )
    expect(widget?.style.position).toBe('absolute')
    expect(widget?.style.inset).toBe('0px')
    expect(widget?.style.zIndex).toBe('20')
    expect(widget?.closest('.home-hero-agent')).toBeInTheDocument()
  })

  it('skips the homepage widget entirely when the explicit public kill switch is set', () => {
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = 'true'

    const { container } = render(<HomeHeroAgent />)

    expect(container.querySelector('.home-hero-agent')).not.toBeInTheDocument()
    expect(container.querySelector('elevenlabs-convai')).not.toBeInTheDocument()
  })
})
