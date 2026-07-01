import { CASE_STUDIES } from '@/lib/case-study-data'
import { CASE_STUDY_NAV_ITEMS } from '@/lib/case-study-nav-data'

describe('case-study nav data', () => {
  it('stays in sync with lib/case-study-data.ts', () => {
    const canonical = CASE_STUDIES.map((study) => ({
      slug: study.slug,
      client: study.client,
    }))

    // The slim module exists so the Navbar (rendered on every page) does not
    // bundle the full case-study blob. If this fails, update
    // lib/case-study-nav-data.ts to match lib/case-study-data.ts.
    expect([...CASE_STUDY_NAV_ITEMS]).toEqual(canonical)
  })
})
