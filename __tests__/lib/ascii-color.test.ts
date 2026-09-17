import {
  colorFrameFileName,
  decodePacked12Frame,
  frameColorAt,
  frameGlyphAt,
  isColorAsciiMeta,
} from '@/lib/ascii-color'

const TEST_META = {
  width: 2,
  height: 1,
  bitsPerColor: 5,
  charset: ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  palette: ['#000000', '#111111', '#222222', '#333333'],
}

describe('decodePacked12Frame', () => {
  it('decodes a cell pair from three bytes', () => {
    // cellA: glyph 10, color 3 -> (10 << 5) | 3 = 323
    // cellB: glyph 0, color 2 -> 2
    // b0 = 323 >> 4 = 20, b1 = ((323 & 15) << 4) | (2 >> 8) = 48, b2 = 2
    const buffer = new Uint8Array([20, 48, 2])
    const frame = decodePacked12Frame(TEST_META, buffer)

    expect(Array.from(frame.glyphs)).toEqual([10, 0])
    expect(Array.from(frame.colors)).toEqual([3, 2])
  })

  it('ignores the padded final cell for odd cell counts', () => {
    const meta = { ...TEST_META, width: 3, height: 1 }
    // cells: (glyph 1, color 1), (glyph 2, color 2), (glyph 3, color 3);
    // the 4th slot is padding and must not appear in the output.
    const cell = (glyph: number, color: number) => (glyph << 5) | color
    const pack = (a: number, b: number) => [
      a >> 4,
      ((a & 15) << 4) | (b >> 8),
      b & 0xff,
    ]
    const buffer = new Uint8Array([
      ...pack(cell(1, 1), cell(2, 2)),
      ...pack(cell(3, 3), 0),
    ])

    const frame = decodePacked12Frame(meta, buffer)

    expect(frame.glyphs).toHaveLength(3)
    expect(Array.from(frame.glyphs)).toEqual([1, 2, 3])
    expect(Array.from(frame.colors)).toEqual([1, 2, 3])
  })

  it('treats missing bytes as blank cells', () => {
    const frame = decodePacked12Frame(TEST_META, new Uint8Array([]))

    expect(Array.from(frame.glyphs)).toEqual([0, 0])
    expect(Array.from(frame.colors)).toEqual([0, 0])
  })
})

describe('frameGlyphAt / frameColorAt', () => {
  const frame = {
    glyphs: new Uint8Array([1, 0]),
    colors: new Uint8Array([3, 0]),
  }

  it('resolves glyphs and colors through the meta', () => {
    expect(frameGlyphAt(TEST_META, frame, 0)).toBe('A')
    expect(frameColorAt(TEST_META, frame, 0)).toBe('#333333')
    expect(frameGlyphAt(TEST_META, frame, 1)).toBe(' ')
  })

  it('falls back for out-of-range indices', () => {
    const sparse = {
      glyphs: new Uint8Array([999]),
      colors: new Uint8Array([99]),
    }
    expect(frameGlyphAt(TEST_META, sparse, 0)).toBe(' ')
    expect(frameColorAt(TEST_META, sparse, 0)).toBe('#ffffff')
  })
})

describe('isColorAsciiMeta', () => {
  const colorMeta = {
    version: 2,
    format: 'color-ascii-v2',
    width: 60,
    height: 44,
    fps: 15,
    frameCount: 91,
    palette: ['#000000'],
    paletteSize: 1,
    charset: ' @',
    renderMode: 'ascii',
    colorMode: 'color',
    bgMode: 'transparent',
    dithering: 'off',
    frameEncoding: 'packed-12',
    bitsPerGlyph: 7,
    bitsPerColor: 5,
    bytesPerFrame: 3960,
  }

  it('accepts color-ascii v2 meta', () => {
    expect(isColorAsciiMeta(colorMeta)).toBe(true)
  })

  it('rejects non-color and malformed meta', () => {
    expect(isColorAsciiMeta(null)).toBe(false)
    expect(isColorAsciiMeta({})).toBe(false)
    expect(isColorAsciiMeta({ ...colorMeta, colorMode: 'mono' })).toBe(false)
    expect(isColorAsciiMeta({ ...colorMeta, frameEncoding: 'utf8' })).toBe(
      false,
    )
    expect(isColorAsciiMeta({ ...colorMeta, palette: 'nope' })).toBe(false)
  })
})

describe('colorFrameFileName', () => {
  it('pads .bin frame names to five digits', () => {
    expect(colorFrameFileName(0)).toBe('frame_00001.bin')
    expect(colorFrameFileName(90)).toBe('frame_00091.bin')
  })
})
