import { CASE_STUDIES } from '@/lib/case-study-data'
import { CASE_STUDY_FRAMING, TWO_PROBLEMS } from '@/lib/case-study-framing'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { WORK_WITH_PRISM } from '@/components/case-studies/WorkWithPrism'

const FORMER = new Set<string>(FORMER_CLIENT_SLUGS)
const currentSlugs = CASE_STUDIES.filter((study) => !FORMER.has(study.slug)).map(
  (study) => study.slug,
)

// DESIGN.md copy rules for every line the Work framing publishes.
const BANNED = [
  /—/,
  /\bunlock/i,
  /\belevat/i,
  /\bseamless/i,
  /world[- ]class/i,
  /cutting[- ]edge/i,
  /revolutionary/i,
  /game[- ]chang/i,
  /supercharg/i,
  /\bguarantee/i,
]

function allCopy() {
  return [
    ...Object.values(CASE_STUDY_FRAMING).flatMap((entry) => Object.values(entry)),
    ...Object.values(TWO_PROBLEMS).flatMap((half) => [half.title, half.problem, ...half.builds]),
    WORK_WITH_PRISM.title,
    WORK_WITH_PRISM.description,
    ...WORK_WITH_PRISM.points.flatMap((point) => [point.title, point.body]),
  ]
}

describe('case study framing (be found, be chosen)', () => {
  it('frames every current client', () => {
    for (const slug of currentSlugs) {
      expect(CASE_STUDY_FRAMING[slug]).toBeDefined()
    }
  })

  it('never frames a former client or an unknown slug', () => {
    for (const slug of Object.keys(CASE_STUDY_FRAMING)) {
      expect(currentSlugs).toContain(slug)
    }
  })

  it('adds no numbers the published case study does not already make', () => {
    for (const [slug, entry] of Object.entries(CASE_STUDY_FRAMING)) {
      const study = CASE_STUDIES.find((item) => item.slug === slug)!
      const published = JSON.stringify(study)
      for (const line of Object.values(entry)) {
        for (const number of line.match(/\d[\d,.]*/g) ?? []) {
          expect(published).toContain(number)
        }
      }
    }
  })

  it('follows the house copy rules', () => {
    for (const line of allCopy()) {
      for (const pattern of BANNED) {
        expect(line).not.toMatch(pattern)
      }
    }
  })
})
