'use client'

import type { ScholarshipRound } from '@/lib/scholarships'
import { useScholarshipRound } from './useScholarshipRound'

/** Keep visible program dates correct when a tab stays open across quarter end. */
export default function ScholarshipRoundText({
  initialRound,
  field = 'label',
}: {
  initialRound: ScholarshipRound
  field?: 'label' | 'selectionDateLabel'
}) {
  const round = useScholarshipRound(initialRound)
  return <span>{round[field]}</span>
}
