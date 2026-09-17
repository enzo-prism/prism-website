import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

import {
  decodePacked12Frame,
  isColorAsciiMeta,
} from '@/lib/ascii-color'

const WIZARD_DIR = join(__dirname, '..', 'public', 'animations', 'wizard')
const MEDIUM_DIR = join(WIZARD_DIR, 'medium')

function framePath(index: number): string {
  return join(
    MEDIUM_DIR,
    `frame_${String(index + 1).padStart(5, '0')}.bin`,
  )
}

describe('wizard ascii assets', () => {
  const meta = JSON.parse(
    readFileSync(join(MEDIUM_DIR, 'meta.json'), 'utf8'),
  ) as unknown

  it('ships a valid color-ascii v2 meta.json', () => {
    expect(isColorAsciiMeta(meta)).toBe(true)
    if (!isColorAsciiMeta(meta)) return

    expect(meta.frameCount).toBe(91)
    expect(meta.frameEncoding).toBe('packed-12')
    expect(meta.bytesPerFrame).toBe(3960)
    expect(meta.width).toBe(60)
    expect(meta.height).toBe(44)
    expect(meta.fps).toBe(15)
    expect(meta.palette).toHaveLength(meta.paletteSize)
  })

  it('ships all 91 .bin frames at the meta byte size', () => {
    if (!isColorAsciiMeta(meta)) return

    for (let index = 0; index < meta.frameCount; index += 1) {
      const path = framePath(index)
      expect(existsSync(path)).toBe(true)
      expect(readFileSync(path).length).toBe(meta.bytesPerFrame)
    }
  })

  it.each([0, 90])('decodes frame %i within the charset and palette', (index) => {
    if (!isColorAsciiMeta(meta)) return

    const buffer = new Uint8Array(readFileSync(framePath(index)))
    const frame = decodePacked12Frame(meta, buffer)

    expect(frame.glyphs).toHaveLength(meta.width * meta.height)

    let nonSpace = 0
    for (let i = 0; i < frame.glyphs.length; i += 1) {
      expect(frame.glyphs[i]).toBeLessThan(meta.charset.length)
      expect(frame.colors[i]).toBeLessThan(meta.paletteSize)
      if (meta.charset[frame.glyphs[i]] !== ' ') nonSpace += 1
    }
    expect(nonSpace).toBeGreaterThan(0)
  })

  it('ships a static poster fallback rendered from frame 1', () => {
    const posterPath = join(WIZARD_DIR, 'poster.svg')
    expect(existsSync(posterPath)).toBe(true)

    const poster = readFileSync(posterPath, 'utf8')
    expect(poster).toContain('<svg')
    // 60x44 cells at the canvas renderer's 7x10 cell size, so the still
    // frames the same art at the same size as the loop.
    expect(poster).toContain('viewBox="0 0 420 440"')
    expect(poster).toContain('<tspan')
  })
})
