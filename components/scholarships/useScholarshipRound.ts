'use client'

import { useEffect, useState } from 'react'
import { getScholarshipRound, type ScholarshipRound } from '@/lib/scholarships'

/** Keep date labels and the illustrated selection rail on the same live round. */
export function useScholarshipRound(initialRound: ScholarshipRound) {
  const [round, setRound] = useState(initialRound)
  useEffect(() => {
    const refresh = () => {
      const current = getScholarshipRound()
      setRound((previous) => (previous.id === current.id ? previous : current))
    }
    const initialRefresh = window.setTimeout(refresh, 0)
    const timer = window.setInterval(refresh, 60_000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearTimeout(initialRefresh)
      window.clearInterval(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])
  return round
}
