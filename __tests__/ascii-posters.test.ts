import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ANIMATIONS_DIR = join(__dirname, '..', 'public', 'animations')

// Every hero animation ships a static SVG poster for reduced-motion, no-JS,
// and constrained-device visitors (rendered by DeferredAsciiHeroBackdrop).
const EXPECTED_POSTERS: Array<{ animation: string; title: string }> = [
  { animation: 'mail', title: 'Mail' },
  { animation: 'computer', title: 'Computer' },
  { animation: 'fire-2', title: 'Fire' },
  { animation: 'rocket', title: 'Rocket' },
  { animation: 'planet', title: 'Planet' },
  { animation: 'wizard', title: 'Wizard' },
]

describe.each(EXPECTED_POSTERS)(
  '$animation hero poster',
  ({ animation, title }) => {
    it('ships a non-empty poster.svg', () => {
      const posterPath = join(ANIMATIONS_DIR, animation, 'poster.svg')
      expect(existsSync(posterPath)).toBe(true)

      const poster = readFileSync(posterPath, 'utf8')
      expect(poster).toContain('<svg')
      expect(poster).toContain(`<title>${title}</title>`)
      expect(poster.trim().length).toBeGreaterThan(500)
    })
  },
)

describe('planet ghost frame', () => {
  it('keeps ghost.txt identical to the brightest medium frame', () => {
    const ghostPath = join(ANIMATIONS_DIR, 'planet', 'ghost.txt')
    const brightFramePath = join(
      ANIMATIONS_DIR,
      'planet',
      'medium',
      'frame_00001.txt',
    )
    expect(existsSync(ghostPath)).toBe(true)
    expect(readFileSync(ghostPath, 'utf8')).toBe(
      readFileSync(brightFramePath, 'utf8'),
    )
  })
})
