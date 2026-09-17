import { render, screen } from '@testing-library/react'

import ASCIIAnimation from '@/components/ascii/AsciiAnimation'

const COLOR_META = {
  version: 2,
  format: 'color-ascii-v2',
  width: 2,
  height: 1,
  fps: 15,
  frameCount: 2,
  palette: ['#000000', '#ffffff'],
  paletteSize: 2,
  charset: ' @',
  renderMode: 'ascii',
  colorMode: 'color',
  bgMode: 'transparent',
  dithering: 'off',
  frameEncoding: 'packed-12',
  bitsPerGlyph: 7,
  bitsPerColor: 1,
  bytesPerFrame: 3,
}

// Two cells: (glyph 1, color 1) and (glyph 0, color 0).
const FRAME_BYTES = new Uint8Array([0, 48, 0])

function mockFetch() {
  const calls: string[] = []
  const fetchMock = jest.fn(async (url: unknown) => {
    const href = String(url)
    calls.push(href)
    if (href.endsWith('meta.json')) {
      return { ok: true, json: async () => COLOR_META }
    }
    if (href.endsWith('.bin')) {
      return {
        ok: true,
        arrayBuffer: async () =>
          FRAME_BYTES.slice().buffer as ArrayBuffer,
      }
    }
    return { ok: false, status: 404 }
  })
  const originalFetch = globalThis.fetch
  globalThis.fetch = fetchMock as unknown as typeof fetch
  return { calls, restore: () => void (globalThis.fetch = originalFetch) }
}

describe('ASCIIAnimation color sources', () => {
  it('detects packed-12 meta and renders the first frame on canvas', async () => {
    const { calls, restore } = mockFetch()
    try {
      render(
        <ASCIIAnimation
          frameFolder="animations/wizard"
          frameCount={2}
          quality="medium"
          ariaLabel="Wizard test animation"
        />,
      )

      const figure = await screen.findByRole('img', {
        name: 'Wizard test animation',
      })
      expect(figure.querySelector('canvas')).not.toBeNull()
      expect(figure.querySelector('pre')).toBeNull()

      expect(calls).toContain('/animations/wizard/medium/meta.json')
      expect(calls).toContain('/animations/wizard/medium/frame_00001.bin')
    } finally {
      restore()
    }
  })

  it('forces canvas rendering for color sources even when dom is requested', async () => {
    const { restore } = mockFetch()
    try {
      render(
        <ASCIIAnimation
          frameFolder="animations/wizard"
          frameCount={2}
          quality="medium"
          renderMode="dom"
          ariaLabel="Wizard dom-mode animation"
        />,
      )

      const figure = await screen.findByRole('img', {
        name: 'Wizard dom-mode animation',
      })
      expect(figure.querySelector('canvas')).not.toBeNull()
      expect(figure.querySelector('pre')).toBeNull()
    } finally {
      restore()
    }
  })
})
