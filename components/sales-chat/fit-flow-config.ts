import type { LeadProfile } from "@/lib/sales-chat/types"

type FitFlowField = keyof Pick<
  LeadProfile,
  "role" | "businessType" | "goal" | "timeline" | "budgetBand"
>

export type FitFlowOption = {
  value: string
  label: string
}

export type FitFlowStep = {
  id: string
  field: FitFlowField
  prompt: string
  options: FitFlowOption[]
}

export const FIT_FLOW_STEPS: FitFlowStep[] = [
  {
    id: "role",
    field: "role",
    prompt: "Great, let's start with your role:",
    options: [
      { value: "Owner / Founder", label: "Owner / Founder" },
      { value: "Marketing lead", label: "Marketing lead" },
      { value: "Ops / practice manager", label: "Ops / practice manager" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: "business-type",
    field: "businessType",
    prompt: "What kind of business are you running?",
    options: [
      { value: "Dental / local healthcare", label: "Dental / local healthcare" },
      { value: "Consulting / expert services", label: "Consulting / expert services" },
      { value: "Online community / education", label: "Online community / education" },
      { value: "Nonprofit", label: "Nonprofit" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: "goal",
    field: "goal",
    prompt: "What outcome matters most over the next 6 months?",
    options: [
      { value: "More qualified leads / patients", label: "More qualified leads / patients" },
      { value: "A better website that converts", label: "A better website that converts" },
      { value: "Ongoing marketing execution", label: "Ongoing marketing done for me" },
      { value: "Not sure yet", label: "Not sure, I need help deciding" },
    ],
  },
  {
    id: "timeline",
    field: "timeline",
    prompt: "When are you aiming to start?",
    options: [
      { value: "ASAP (this month)", label: "ASAP (this month)" },
      { value: "1-3 months", label: "1-3 months" },
      { value: "3-6 months", label: "3-6 months" },
      { value: "Just exploring", label: "Just exploring" },
    ],
  },
  {
    id: "budget",
    field: "budgetBand",
    prompt: "Optional: which budget comfort band feels closest right now?",
    options: [
      { value: "Low", label: "Low" },
      { value: "Medium", label: "Medium" },
      { value: "High", label: "High" },
      { value: "Prefer not to say", label: "Prefer not to say" },
    ],
  },
]
