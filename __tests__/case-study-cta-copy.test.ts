import { readFileSync } from 'node:fs'
import path from 'node:path'

const caseStudyCtaFiles = [
  'components/case-study-minimal.tsx',
  'app/case-studies/client-page.tsx',
  'app/case-studies/roseville-dental-academy/page.tsx',
]

describe('case study CTA copy', () => {
  it('keeps audit CTAs growth-first instead of practice-only', () => {
    for (const file of caseStudyCtaFiles) {
      const source = readFileSync(path.join(process.cwd(), file), 'utf8')

      expect(source).not.toMatch(/\bfree practice audit\b/i)
      expect(source).not.toMatch(/\bpractice audit\b/i)
    }
  })
})
