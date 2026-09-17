import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ANIMATIONS_DIR = join(__dirname, '..', 'public', 'animations')

// Animation -> tier -> expected .txt frame count. planet ships medium only;
// the player falls back to it from any requested quality.
const EXPECTED_TIERS: Record<string, Record<string, number>> = {
  planet: { medium: 300 },
  rocket: { high: 120, medium: 120, low: 120 },
  computer: { high: 78, medium: 78, low: 78 },
  'fire-2': { high: 94, medium: 94, low: 94 },
  mail: { high: 56, medium: 56, low: 56 },
}

function frameName(index: number): string {
  return `frame_${String(index + 1).padStart(5, '0')}.txt`
}

describe.each(Object.entries(EXPECTED_TIERS))(
  '%s ascii tiers',
  (animation, tiers) => {
    it.each(Object.entries(tiers))(
      'ships %i complete .txt frames for tier %s',
      (tier, count) => {
        const dir = join(ANIMATIONS_DIR, animation, tier)
        expect(existsSync(dir)).toBe(true)

        const files = readdirSync(dir).filter((name) =>
          /^frame_\d+\.txt$/.test(name),
        )
        expect(files).toHaveLength(count)

        // No gaps: first, middle, and last frames exist and are non-empty.
        for (const index of [0, Math.floor(count / 2), count - 1]) {
          const content = readFileSync(join(dir, frameName(index)), 'utf8')
          expect(content.trim().length).toBeGreaterThan(0)
        }
      },
    )

    it.each(Object.entries(tiers))(
      'bundles tier %s into frames.json',
      (tier, count) => {
        const bundlePath = join(ANIMATIONS_DIR, animation, tier, 'frames.json')
        expect(existsSync(bundlePath)).toBe(true)

        const bundled: unknown = JSON.parse(readFileSync(bundlePath, 'utf8'))
        expect(Array.isArray(bundled)).toBe(true)
        expect((bundled as unknown[])).toHaveLength(count)

        // The bundle must match the first frame on disk, or it is stale.
        const firstFrame = readFileSync(
          join(ANIMATIONS_DIR, animation, tier, frameName(0)),
          'utf8',
        )
        expect((bundled as string[])[0]).toBe(firstFrame)
      },
    )
  },
)
