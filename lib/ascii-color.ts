/**
 * Shared decoder for color ASCII animations (asciify `color-ascii-v2`).
 *
 * Color frames are `packed-12` binary: cells are row-major and each pair of
 * cells occupies three bytes. Used by the hero player
 * (`components/ascii/AsciiAnimation.tsx`), the poster generator
 * (`scripts/generate-wizard-poster.mjs`), and the asset tests.
 */

export type ColorAsciiMeta = {
  version: 2 | 3
  format: 'color-ascii-v2' | 'color-ascii-v3'
  width: number
  height: number
  fps: number
  frameCount: number
  palette: string[]
  paletteSize: number
  charset: string
  renderMode: 'ascii'
  colorMode: 'color'
  bgMode: string
  dithering: string
  frameEncoding: 'packed-12'
  bitsPerGlyph: number
  bitsPerColor: number
  bytesPerFrame: number
}

export type DecodedColorFrame = {
  glyphs: Uint8Array
  colors: Uint8Array
}

export function isColorAsciiMeta(value: unknown): value is ColorAsciiMeta {
  if (typeof value !== 'object' || value === null) return false
  const meta = value as Record<string, unknown>
  return (
    meta.colorMode === 'color' &&
    meta.frameEncoding === 'packed-12' &&
    typeof meta.width === 'number' &&
    typeof meta.height === 'number' &&
    typeof meta.frameCount === 'number' &&
    typeof meta.fps === 'number' &&
    typeof meta.charset === 'string' &&
    Array.isArray(meta.palette) &&
    typeof meta.bitsPerColor === 'number' &&
    typeof meta.bytesPerFrame === 'number'
  )
}

export function colorFrameFileName(index: number): string {
  return `frame_${String(index + 1).padStart(5, '0')}.bin`
}

/**
 * Decode one packed-12 frame into per-cell glyph and palette indices.
 * Stops after width * height cells; the padded final cell of odd-sized
 * grids is ignored.
 */
export function decodePacked12Frame(
  meta: Pick<ColorAsciiMeta, 'width' | 'height' | 'bitsPerColor'>,
  buffer: Uint8Array,
): DecodedColorFrame {
  const cellCount = meta.width * meta.height
  const glyphs = new Uint8Array(cellCount)
  const colors = new Uint8Array(cellCount)
  const colorMask = (1 << meta.bitsPerColor) - 1

  for (let i = 0, offset = 0; i < cellCount; i += 2, offset += 3) {
    const byte0 = buffer[offset] ?? 0
    const byte1 = buffer[offset + 1] ?? 0
    const byte2 = buffer[offset + 2] ?? 0
    const cellA = (byte0 << 4) | (byte1 >> 4)
    const cellB = ((byte1 & 0x0f) << 8) | byte2

    glyphs[i] = cellA >> meta.bitsPerColor
    colors[i] = cellA & colorMask

    if (i + 1 < cellCount) {
      glyphs[i + 1] = cellB >> meta.bitsPerColor
      colors[i + 1] = cellB & colorMask
    }
  }

  return { glyphs, colors }
}

/** Resolve a decoded cell to its display character. */
export function frameGlyphAt(
  meta: Pick<ColorAsciiMeta, 'charset'>,
  frame: DecodedColorFrame,
  index: number,
): string {
  return meta.charset[frame.glyphs[index]] ?? ' '
}

/** Resolve a decoded cell to its palette color. */
export function frameColorAt(
  meta: Pick<ColorAsciiMeta, 'palette'>,
  frame: DecodedColorFrame,
  index: number,
): string {
  return meta.palette[frame.colors[index]] ?? '#ffffff'
}
