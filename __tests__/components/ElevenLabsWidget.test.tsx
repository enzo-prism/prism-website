import { act, render, waitFor } from '@testing-library/react'

import ElevenLabsWidget from '@/components/elevenlabs/ElevenLabsWidget'

class MockElevenLabsConvaiElement extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
    }
  }
}

describe('ElevenLabsWidget', () => {
  const originalWidgetDisabled =
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED

  beforeAll(() => {
    if (!customElements.get('elevenlabs-convai')) {
      customElements.define('elevenlabs-convai', MockElevenLabsConvaiElement)
    }
  })

  beforeEach(() => {
    document.body.innerHTML = ''
    delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
  })

  afterAll(() => {
    if (originalWidgetDisabled === undefined) {
      delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
      return
    }

    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = originalWidgetDisabled
  })

  it('maps defaultExpanded to the documented stock widget attribute', () => {
    const { container } = render(
      <ElevenLabsWidget defaultExpanded testId="elevenlabs-widget" />,
    )

    const widget = container.querySelector(
      'elevenlabs-convai',
    ) as HTMLElement | null

    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute('default-expanded', 'true')
  })

  it('observes stock widget expand state changes through the open shadow root', async () => {
    const onExpandedChange = jest.fn()
    const onInteraction = jest.fn()
    const { container } = render(
      <ElevenLabsWidget
        defaultExpanded={false}
        onExpandedChange={onExpandedChange}
        onInteraction={onInteraction}
        testId="elevenlabs-widget"
      />,
    )

    const widget = container.querySelector(
      'elevenlabs-convai',
    ) as HTMLElement | null

    expect(widget).toBeInTheDocument()

    await waitFor(() => {
      expect(widget?.shadowRoot).not.toBeNull()
    })

    await waitFor(() => {
      expect(onExpandedChange).toHaveBeenCalledWith(false)
    })

    act(() => {
      widget?.shadowRoot?.replaceChildren()
      const collapseButton = document.createElement('button')
      collapseButton.setAttribute('aria-label', 'Collapse')
      collapseButton.textContent = 'Collapse'
      widget?.shadowRoot?.appendChild(collapseButton)
    })

    await waitFor(() => {
      expect(onExpandedChange).toHaveBeenLastCalledWith(true)
    })

    act(() => {
      widget?.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
        }),
      )
    })

    expect(onInteraction).toHaveBeenCalled()
  })
})
