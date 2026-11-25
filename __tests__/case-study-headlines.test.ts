import { CASE_STUDIES } from '@/lib/case-study-data'
import { CASE_STUDY_HEADLINES } from '@/lib/case-study-headlines'

describe('case study headlines', () => {
  it('give every case study an outcome headline in house style', () => {
    for (const study of CASE_STUDIES) {
      const headline = CASE_STUDY_HEADLINES[study.slug]
      expect(headline).toBeDefined()
      // Lowercase, ends with a period, no em dash, no digits (numbers live
      // in the verified stats band with their source, never in the H1).
      expect(headline).toBe(headline.toLowerCase())
      expect(headline).toMatch(/\.$/)
      expect(headline).not.toMatch(/—|\d/)
      expect(headline.length).toBeLessThanOrEqual(64)
    }
  })

  it('has no headline for a slug that no longer exists', () => {
    const slugs = new Set(CASE_STUDIES.map((study) => study.slug))
    for (const slug of Object.keys(CASE_STUDY_HEADLINES)) {
      expect(slugs.has(slug)).toBe(true)
    }
  })
})
