/**
 * Motion tokens guard (DESIGN.md "Motion").
 *
 * Every transition and keyframe on the site uses one of the four easing
 * curves and six durations defined once in app/globals.css. A raw
 * cubic-bezier anywhere else drifts the feel of the site, so this test
 * rejects it, and it keeps the tokens themselves free of overshoot.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(__dirname, '..', '..')
const SCAN_DIRS = ['app', 'components', 'lib', 'hooks']
const EXTENSIONS = new Set(['.ts', '.tsx', '.css', '.mjs', '.js'])

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, out)
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      out.push(full)
    }
  }
  return out
}

const globalsPath = path.join(ROOT, 'app', 'globals.css')
const globals = fs.readFileSync(globalsPath, 'utf8')

const TOKEN_LINE = /^\s*--ease-(out|in-out|drawer|in):\s*cubic-bezier\(([^)]*)\);\s*$/

describe('motion tokens', () => {
  it('defines the four easing curves and six durations once', () => {
    for (const name of ['out', 'in-out', 'drawer', 'in']) {
      expect(globals).toMatch(new RegExp(`--ease-${name}:\\s*cubic-bezier\\(`))
    }
    for (const name of ['press', 'ui', 'sheet', 'enter', 'count', 'refract']) {
      expect(globals).toMatch(new RegExp(`--dur-${name}:\\s*\\d+ms;`))
    }
  })

  it('keeps every curve inside 0..1 (no overshoot or bounce)', () => {
    const curves = globals
      .split('\n')
      .map((line) => line.match(TOKEN_LINE))
      .filter((match): match is RegExpMatchArray => Boolean(match))
    expect(curves).toHaveLength(4)
    for (const [, , args] of curves) {
      const [, y1, , y2] = args.split(',').map((value) => Number(value.trim()))
      expect(y1).toBeGreaterThanOrEqual(0)
      expect(y1).toBeLessThanOrEqual(1)
      expect(y2).toBeGreaterThanOrEqual(0)
      expect(y2).toBeLessThanOrEqual(1)
    }
  })

  it('rejects raw cubic-bezier values outside the token block', () => {
    const offenders: string[] = []
    for (const dir of SCAN_DIRS) {
      const abs = path.join(ROOT, dir)
      if (!fs.existsSync(abs)) continue
      for (const file of walk(abs)) {
        const lines = fs.readFileSync(file, 'utf8').split('\n')
        lines.forEach((line, index) => {
          if (!line.includes('cubic-bezier(')) return
          if (file === globalsPath && TOKEN_LINE.test(line)) return
          // Comments that only mention the function are fine.
          if (/^\s*(\/\/|\*|\/\*)/.test(line)) return
          offenders.push(`${path.relative(ROOT, file)}:${index + 1}`)
        })
      }
    }
    expect(offenders).toEqual([])
  })
})
