"use client"

import { useEffect } from "react"

import {
  consumePendingLeadConversion,
  trackLeadConversion,
} from "@/utils/analytics"

export default function LeadSuccessTracker() {
  useEffect(() => {
    const pendingLeadContext = consumePendingLeadConversion()
    if (!pendingLeadContext) return

    trackLeadConversion(pendingLeadContext)
  }, [])

  return null
}
