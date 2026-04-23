"use client"

import { useEffect } from "react"

import {
  consumePendingApplyLeadContext,
  getDefaultLeadSource,
  trackEvent,
} from "@/utils/analytics"

export default function ApplySuccessTracker() {
  useEffect(() => {
    const pendingLeadContext = consumePendingApplyLeadContext()
    const leadSource = pendingLeadContext?.lead_source || getDefaultLeadSource()

    trackEvent("apply_success", {
      source: "apply",
      ...pendingLeadContext,
    })

    if (!pendingLeadContext) {
      return
    }

    trackEvent("generate_lead", {
      form_name: pendingLeadContext.form_name || "growth_application",
      form_location: pendingLeadContext.form_location || "apply_page",
      lead_type: pendingLeadContext.lead_type || "growth_application",
      lead_source: leadSource,
      service_count: pendingLeadContext.service_count,
      primary_goal: pendingLeadContext.primary_goal,
      has_website: pendingLeadContext.has_website,
      budget: pendingLeadContext.budget,
      timeline: pendingLeadContext.timeline,
      elapsed_seconds: pendingLeadContext.elapsed_seconds,
    })
  }, [])

  return null
}
