import type { FitFlowStep } from "@/components/sales-chat/fit-flow-config"
import { FIT_FLOW_STEPS } from "@/components/sales-chat/fit-flow-config"
import type { LeadProfile } from "@/lib/sales-chat/types"

export type FitFlowState = {
  started: boolean
  completed: boolean
  stepIndex: number
}

export function createInitialFitFlowState(): FitFlowState {
  return {
    started: false,
    completed: false,
    stepIndex: 0,
  }
}

export function getCurrentFitFlowStep(state: FitFlowState): FitFlowStep | null {
  if (!state.started || state.completed) {
    return null
  }

  return FIT_FLOW_STEPS[state.stepIndex] ?? null
}

export function advanceFitFlowState(state: FitFlowState): FitFlowState {
  if (state.completed) {
    return state
  }

  const nextIndex = state.stepIndex + 1
  if (nextIndex >= FIT_FLOW_STEPS.length) {
    return {
      started: true,
      completed: true,
      stepIndex: FIT_FLOW_STEPS.length - 1,
    }
  }

  return {
    started: true,
    completed: false,
    stepIndex: nextIndex,
  }
}

export function buildQualificationSnapshot(profile: LeadProfile): string {
  const role = profile.role ?? "Unknown role"
  const businessType = profile.businessType ?? "Unknown business type"
  const goal = profile.goal ?? "Unknown primary goal"
  const timeline = profile.timeline ?? "Unknown timeline"
  const budget = profile.budgetBand ?? "Budget not shared"

  return `${role}, ${businessType}, goal: ${goal}, timeline: ${timeline}, budget: ${budget}.`
}

export function buildFitCompletionMessage(profile: LeadProfile): string {
  const snapshot = buildQualificationSnapshot(profile)

  return [
    `Got it - ${snapshot}`,
    "This looks like a strong fit for Prism's Online Presence Transformation program.",
    "Fastest next step is a 30-min Zoom demo where we audit your current online presence and map your plan.",
    "[Book my 30-min demo](#book-call) or [Show me a similar case study first](/case-studies).",
  ].join(" ")
}

export function isLikelyBusinessEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return false
  }

  const blockedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"]
  const domain = normalized.split("@")[1] ?? ""
  return !blockedDomains.includes(domain)
}
