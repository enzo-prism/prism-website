'use client'

import type { ScholarshipRound } from '@/lib/scholarships'
import { QuarterGraphic } from './ScholarshipGraphics'
import { useScholarshipRound } from './useScholarshipRound'

export default function ScholarshipQuarterScene({
  initialRound,
}: {
  initialRound: ScholarshipRound
}) {
  const round = useScholarshipRound(initialRound)
  return <QuarterGraphic initialRound={round} />
}
