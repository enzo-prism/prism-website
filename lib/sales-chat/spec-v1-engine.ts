import {
  edgeCaseCopy,
  faqCopy,
  fallbackRephraseCopy,
  intentAHasSiteFollowupCopy,
  intentANoSiteFollowupCopy,
  intentAStartCopy,
  intentAUnsureBusinessTypeCopy,
  intentBCollectBusinessTypeCopy,
  intentBCollectEmailCopy,
  intentBCollectPainCopy,
  intentBConfirmCopy,
  intentBPitchCopy,
  intentBWrittenOnlyCopy,
  intentCCloseCopy,
  intentCExamplesCopy,
  intentCPaymentConfirmedCopy,
  intentCPayNowCopy,
  intentCPitchCopy,
  intentCQualificationCopy,
  intentDBigCommitmentCopy,
  intentDBookCallCopy,
  intentDDirectSignupCopy,
  intentDPitchCopy,
  intentDScopeCopy,
  intentDSignupChoiceCopy,
  objectionCopy,
  routeAUnsureRecommendationCopy,
  routeToFreeAuditCopy,
  routeToGrowthPartnerDoingAllCopy,
  routeToGrowthPartnerNoLeadsCopy,
  routeToWebsiteOverhaulCopy,
  softCloseCopy,
  welcomeCopy,
  type NodeReply,
} from "@/lib/sales-chat/spec-v1-copy"
import { detectFaqTopic, detectGlobalIntent, detectRootIntent } from "@/lib/sales-chat/spec-v1-router"
import type {
  OfferRecommendation,
  QuickReply,
  SalesChatConversationState,
  SalesChatEngineInput,
  SalesChatResponseV2,
  SalesChatSpecMemory,
  SalesChatSpecNodeId,
  TerminalAction,
} from "@/lib/sales-chat/spec-v1-types"
import {
  enforceButtonPolicy,
  hasForwardPath,
  isLikelyWebsiteUrl,
  isValidEmail,
  normalizeInput,
  normalizeWebsiteUrl,
} from "@/lib/sales-chat/spec-v1-validation"

const DEFAULT_NODE: SalesChatSpecNodeId = "welcome"

const EXIT_PHRASES = new Set([
  "thanks",
  "thank you",
  "that's all",
  "that is all",
  "all good",
  "done",
])

const REPLY_HELP_CHOOSE: QuickReply = {
  id: "starter_help_choose",
  label: "Help me choose",
  actionType: "reply",
}

function quickReply(id: string, label: string): QuickReply {
  return { id, label, actionType: "reply" }
}

function mapTerminalActionToOffer(action: TerminalAction): OfferRecommendation | undefined {
  if (action === "emit_free_audit") return "free_audit"
  if (action === "emit_website_overhaul") return "website_overhaul"
  if (action === "emit_growth_partnership") return "growth_partnership"
  return undefined
}

function deriveObjectionKind(normalizedInput: string): string {
  if (normalizedInput.includes("too expensive") || normalizedInput.includes("can't afford")) return "too_expensive"
  if (normalizedInput.includes("think")) return "need_to_think"
  if (normalizedInput.includes("already have")) return "has_agency"
  if (normalizedInput.includes("no time")) return "no_time"
  if (normalizedInput.includes("different from")) return "competitor"
  if (normalizedInput.includes("contract") || normalizedInput.includes("commitment")) return "contract"
  return "unknown"
}

function deriveEdgeCaseKind(normalizedInput: string): string {
  if (normalizedInput.includes("discount")) return "discount"
  if (
    normalizedInput.includes("human")
    || normalizedInput.includes("talk to someone")
    || normalizedInput.includes("live person")
  ) {
    return "human"
  }
  if (normalizedInput.includes("already a client") || normalizedInput.includes("returning")) {
    return "returning_client"
  }
  if (normalizedInput.includes("confused") || normalizedInput.includes("overwhelmed")) {
    return "confused"
  }
  return "off_topic"
}

function deriveBusinessTypeFromButton(buttonId: string): string | undefined {
  const mapping: Record<string, string> = {
    a_business_dental: "Dental / medical practice",
    a_business_local: "Local retail or service business",
    a_business_consulting: "Consulting or professional services",
    a_business_community: "Online community or membership",
    a_business_nonprofit: "Nonprofit or education",
    b_business_dental: "Dental / medical",
    b_business_local: "Local retail / shop",
    b_business_consulting: "Consulting / services",
    b_business_community: "Online community",
    b_business_nonprofit: "Nonprofit / education",
  }
  return mapping[buttonId]
}

function extractGoalFromText(value: string): string {
  const normalized = normalizeInput(value)
  if (normalized.includes("lead")) return "More qualified leads"
  if (normalized.includes("customer")) return "More customers"
  if (normalized.includes("credibility")) return "Better credibility"
  return value.trim().slice(0, 200)
}

function extractEstimatedPages(value: string): string {
  const match = value.match(/(\d+\s*-\s*\d+|\d+)\s*(pages?|pgs?)/i)
  if (match?.[0]) {
    return match[0].replace(/\s+/g, " ").trim()
  }
  return value.trim().slice(0, 120)
}

function extractWebsiteFromText(value: string): string | undefined {
  const candidates = value.match(/(?:https?:\/\/)?[a-z0-9][a-z0-9.-]+\.[a-z]{2,}(?:\/\S*)?/gi)
  if (!candidates || candidates.length === 0) {
    return undefined
  }
  return normalizeWebsiteUrl(candidates[0])
}

function applyBehaviorRules(
  message: string,
  quickReplies: QuickReply[],
  state: SalesChatConversationState,
  recommendedOffer?: OfferRecommendation,
): {
  assistantMessage: string
  quickReplies: QuickReply[]
  recommendedOffer?: OfferRecommendation
} {
  let nextMessage = message
  let nextQuickReplies = [...quickReplies]
  let nextRecommendedOffer = recommendedOffer

  if (state.exchangeCount >= 3 && !state.convertedAction && !nextQuickReplies.some((replyItem) => replyItem.id === "b_start")) {
    nextQuickReplies.push(quickReply("b_start", "Start with a free audit"))
  }

  nextQuickReplies = enforceButtonPolicy(nextQuickReplies)
  if (!hasForwardPath(nextMessage, nextQuickReplies)) {
    nextQuickReplies = enforceButtonPolicy([REPLY_HELP_CHOOSE, ...nextQuickReplies])
  }

  return {
    assistantMessage: nextMessage,
    quickReplies: nextQuickReplies,
    recommendedOffer: nextRecommendedOffer,
  }
}

function mergeMemory(memory: SalesChatSpecMemory, patch: Record<string, unknown>): SalesChatSpecMemory {
  const next = { ...memory }
  for (const [key, value] of Object.entries(patch)) {
    if (value === null || value === undefined) {
      delete (next as Record<string, unknown>)[key]
      continue
    }
    ;(next as Record<string, unknown>)[key] = value
  }
  return next
}

function createResponse(args: {
  state: SalesChatConversationState
  nodeId: SalesChatSpecNodeId
  reply: NodeReply
  memoryPatch?: Record<string, string | boolean | null>
  terminalAction?: TerminalAction
  fallbackToHuman?: boolean
  incrementExchange?: boolean
}): SalesChatResponseV2 {
  const exchangeCount = args.incrementExchange
    ? args.state.exchangeCount + 1
    : args.state.exchangeCount

  const terminalAction = args.terminalAction ?? "none"
  const convertedFromTerminal = mapTerminalActionToOffer(terminalAction)
  const convertedAction = convertedFromTerminal ?? args.state.convertedAction
  const nextMemory = mergeMemory(args.state.memory, args.memoryPatch ?? {})

  const nextState: SalesChatConversationState = {
    nodeId: args.nodeId,
    exchangeCount,
    memory: nextMemory,
    convertedAction,
  }

  const behavior = applyBehaviorRules(
    args.reply.assistantMessage,
    args.reply.quickReplies,
    nextState,
    args.reply.recommendedOffer,
  )

  return {
    assistantMessage: behavior.assistantMessage,
    nodeId: args.nodeId,
    quickReplies: behavior.quickReplies,
    memoryPatch: args.memoryPatch ?? {},
    responseMode: "deterministic",
    recommendedOffer: behavior.recommendedOffer,
    terminalAction,
    fallbackToHuman: args.fallbackToHuman,
    conversationState: nextState,
  }
}

function handleGlobalRoutes(args: {
  normalizedInput: string
  state: SalesChatConversationState
  runtimeLinks: SalesChatEngineInput["runtimeLinks"]
  incrementExchange: boolean
}): SalesChatResponseV2 | null {
  const globalIntent = detectGlobalIntent(args.normalizedInput)

  if (globalIntent === "human_handoff") {
    return createResponse({
      state: args.state,
      nodeId: "intent_g_router",
      reply: edgeCaseCopy("human", args.runtimeLinks),
      fallbackToHuman: true,
      incrementExchange: args.incrementExchange,
    })
  }

  if (globalIntent === "objection") {
    return createResponse({
      state: args.state,
      nodeId: "intent_f_router",
      reply: objectionCopy(deriveObjectionKind(args.normalizedInput)),
      incrementExchange: args.incrementExchange,
    })
  }

  if (globalIntent === "edge_case") {
    return createResponse({
      state: args.state,
      nodeId: "intent_g_router",
      reply: edgeCaseCopy(deriveEdgeCaseKind(args.normalizedInput), args.runtimeLinks),
      incrementExchange: args.incrementExchange,
    })
  }

  if (globalIntent === "faq") {
    return createResponse({
      state: args.state,
      nodeId: "intent_e_router",
      reply: faqCopy(detectFaqTopic(args.normalizedInput)),
      incrementExchange: args.incrementExchange,
    })
  }

  return null
}

function routeFromIntent(args: {
  intent: ReturnType<typeof detectRootIntent>
  state: SalesChatConversationState
  runtimeLinks: SalesChatEngineInput["runtimeLinks"]
  incrementExchange: boolean
}): SalesChatResponseV2 {
  if (args.intent === "free_audit") {
    return createResponse({
      state: args.state,
      nodeId: "intent_b_pitch",
      reply: intentBPitchCopy(),
      incrementExchange: args.incrementExchange,
    })
  }
  if (args.intent === "website_overhaul") {
    return createResponse({
      state: args.state,
      nodeId: "intent_c_pitch",
      reply: intentCPitchCopy(),
      incrementExchange: args.incrementExchange,
    })
  }
  if (args.intent === "growth_partnership") {
    return createResponse({
      state: args.state,
      nodeId: "intent_d_pitch",
      reply: intentDPitchCopy(),
      incrementExchange: args.incrementExchange,
    })
  }
  if (args.intent === "help_choose") {
    return createResponse({
      state: args.state,
      nodeId: "intent_a_start",
      reply: intentAStartCopy(),
      incrementExchange: args.incrementExchange,
    })
  }
  if (args.intent === "general_question") {
    return createResponse({
      state: args.state,
      nodeId: "intent_e_router",
      reply: faqCopy("unknown"),
      incrementExchange: args.incrementExchange,
    })
  }

  return createResponse({
    state: args.state,
    nodeId: args.state.nodeId,
    reply: fallbackRephraseCopy(),
    incrementExchange: args.incrementExchange,
  })
}

export function createInitialConversationState(): SalesChatConversationState {
  return {
    nodeId: DEFAULT_NODE,
    exchangeCount: 0,
    memory: {},
  }
}

export function runSalesChatSpecV1Engine(input: SalesChatEngineInput): SalesChatResponseV2 {
  const rawState = input.state ?? createInitialConversationState()
  const state: SalesChatConversationState = {
    nodeId: rawState.nodeId ?? DEFAULT_NODE,
    exchangeCount: rawState.exchangeCount ?? 0,
    memory: rawState.memory ?? {},
    convertedAction: rawState.convertedAction,
  }

  const buttonId = input.request.buttonId ?? ""
  const normalizedInput = normalizeInput(input.request.inputValue ?? "")
  const isInitRequest = buttonId === "__init__"
  const incrementExchange = !isInitRequest

  if (isInitRequest && state.exchangeCount === 0) {
    return createResponse({
      state,
      nodeId: "welcome",
      reply: welcomeCopy(),
      incrementExchange: false,
    })
  }

  if (EXIT_PHRASES.has(normalizedInput)) {
    return createResponse({
      state,
      nodeId: "intent_g_router",
      reply: softCloseCopy(),
      incrementExchange,
    })
  }

  const global = handleGlobalRoutes({
    normalizedInput,
    state,
    runtimeLinks: input.runtimeLinks,
    incrementExchange,
  })
  if (global) {
    return global
  }

  const rootIntent = detectRootIntent(normalizedInput)

  if (buttonId.startsWith("starter_") || state.nodeId === "welcome") {
    if (buttonId === "starter_free_audit") {
      return createResponse({
        state,
        nodeId: "intent_b_pitch",
        reply: intentBPitchCopy(),
        incrementExchange,
      })
    }
    if (buttonId === "starter_website") {
      return createResponse({
        state,
        nodeId: "intent_c_pitch",
        reply: intentCPitchCopy(),
        incrementExchange,
      })
    }
    if (buttonId === "starter_growth_partner") {
      return createResponse({
        state,
        nodeId: "intent_d_pitch",
        reply: intentDPitchCopy(),
        incrementExchange,
      })
    }
    if (buttonId === "starter_help_choose") {
      return createResponse({
        state,
        nodeId: "intent_a_start",
        reply: intentAStartCopy(),
        incrementExchange,
      })
    }
    if (buttonId === "starter_general_question") {
      return createResponse({
        state,
        nodeId: "intent_e_router",
        reply: faqCopy("unknown"),
        incrementExchange,
      })
    }

    return routeFromIntent({
      intent: rootIntent,
      state,
      runtimeLinks: input.runtimeLinks,
      incrementExchange,
    })
  }

  switch (state.nodeId) {
    case "intent_a_start": {
      if (buttonId === "a_has_site_yes" || normalizedInput.includes("yes")) {
        return createResponse({
          state,
          nodeId: "intent_a_has_site_followup",
          reply: intentAHasSiteFollowupCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "a_has_site_no" || normalizedInput.includes("no")) {
        return createResponse({
          state,
          nodeId: "intent_a_no_site_followup",
          reply: intentANoSiteFollowupCopy(),
          incrementExchange,
        })
      }
      return createResponse({
        state,
        nodeId: "intent_a_start",
        reply: intentAStartCopy(),
        incrementExchange,
      })
    }

    case "intent_a_has_site_followup": {
      if (buttonId === "a_has_site_outdated") {
        return createResponse({
          state,
          nodeId: "intent_c_pitch",
          reply: routeToWebsiteOverhaulCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "a_has_site_no_leads") {
        return createResponse({
          state,
          nodeId: "intent_d_pitch",
          reply: routeToGrowthPartnerNoLeadsCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "a_has_site_doing_it_all") {
        return createResponse({
          state,
          nodeId: "intent_d_pitch",
          reply: routeToGrowthPartnerDoingAllCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "a_has_site_tell_me_fix") {
        return createResponse({
          state,
          nodeId: "intent_b_pitch",
          reply: routeToFreeAuditCopy(),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_a_no_site_followup": {
      if (buttonId === "a_no_site_fast") {
        return createResponse({
          state,
          nodeId: "intent_c_pitch",
          reply: routeToWebsiteOverhaulCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "a_no_site_full_partner") {
        return createResponse({
          state,
          nodeId: "intent_d_pitch",
          reply: intentDPitchCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "a_no_site_unsure") {
        return createResponse({
          state,
          nodeId: "intent_a_unsure_business_type",
          reply: intentAUnsureBusinessTypeCopy(),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_a_unsure_business_type": {
      const businessType = deriveBusinessTypeFromButton(buttonId) ?? input.request.inputValue.trim()
      const safeBusinessType = businessType || "your"
      return createResponse({
        state,
        nodeId: "intent_a_unsure_business_type",
        reply: routeAUnsureRecommendationCopy(safeBusinessType),
        memoryPatch: {
          businessType: safeBusinessType,
        },
        incrementExchange,
      })
    }

    case "intent_b_pitch": {
      if (buttonId === "b_skip_url") {
        return createResponse({
          state,
          nodeId: "intent_b_collect_business_type",
          reply: intentBCollectBusinessTypeCopy(),
          memoryPatch: {
            websiteUrl: "",
          },
          incrementExchange,
        })
      }
      if (isLikelyWebsiteUrl(input.request.inputValue)) {
        return createResponse({
          state,
          nodeId: "intent_b_collect_business_type",
          reply: intentBCollectBusinessTypeCopy(),
          memoryPatch: {
            websiteUrl: normalizeWebsiteUrl(input.request.inputValue),
          },
          incrementExchange,
        })
      }
      return createResponse({
        state,
        nodeId: "intent_b_pitch",
        reply: {
          ...intentBPitchCopy(),
          assistantMessage: "Please share a valid website URL so I can start the free audit (for example, example.com).",
        },
        incrementExchange,
      })
    }

    case "intent_b_collect_business_type": {
      const businessType = deriveBusinessTypeFromButton(buttonId) ?? input.request.inputValue.trim()
      return createResponse({
        state,
        nodeId: "intent_b_collect_pain",
        reply: intentBCollectPainCopy(),
        memoryPatch: {
          businessType: businessType || "",
        },
        incrementExchange,
      })
    }

    case "intent_b_collect_pain": {
      const painPoint = input.request.inputValue.trim()
      if (!painPoint) {
        return createResponse({
          state,
          nodeId: "intent_b_collect_pain",
          reply: intentBCollectPainCopy(),
          incrementExchange,
        })
      }
      return createResponse({
        state,
        nodeId: "intent_b_collect_email",
        reply: intentBCollectEmailCopy(),
        memoryPatch: {
          painPoint,
        },
        incrementExchange,
      })
    }

    case "intent_b_collect_email": {
      if (!isValidEmail(input.request.inputValue)) {
        return createResponse({
          state,
          nodeId: "intent_b_collect_email",
          reply: {
            ...intentBCollectEmailCopy(),
            assistantMessage: "Please share a valid email address so we can send your audit.",
          },
          incrementExchange,
        })
      }

      return createResponse({
        state,
        nodeId: "intent_b_confirm",
        reply: intentBConfirmCopy(input.runtimeLinks),
        memoryPatch: {
          email: input.request.inputValue.trim(),
        },
        terminalAction: state.convertedAction ? "none" : "emit_free_audit",
        incrementExchange,
      })
    }

    case "intent_b_confirm": {
      if (buttonId === "b_written_only") {
        return createResponse({
          state,
          nodeId: "intent_b_confirm",
          reply: intentBWrittenOnlyCopy(),
          incrementExchange,
        })
      }

      if (buttonId === "b_book_call_too" || buttonId === "book_call") {
        return createResponse({
          state,
          nodeId: "intent_b_confirm",
          reply: {
            assistantMessage:
              `Awesome. Here's the booking link: ${input.runtimeLinks.bookingUrl}\n\nPick any time that works and we'll come prepared with your site context.`,
            quickReplies: [
              quickReply("b_written_only", "The written audit is great for now"),
              quickReply("starter_general_question", "I have another question"),
            ],
          },
          memoryPatch: {
            alsoBookedCall: true,
          },
          incrementExchange,
        })
      }

      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_c_pitch": {
      if (buttonId === "c_examples") {
        return createResponse({
          state,
          nodeId: "intent_c_examples",
          reply: intentCExamplesCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "c_ready" || buttonId === "c_walkthrough") {
        return createResponse({
          state,
          nodeId: "intent_c_qualification",
          reply: intentCQualificationCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "c_questions") {
        return createResponse({
          state,
          nodeId: "intent_e_router",
          reply: faqCopy("unknown"),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_c_examples": {
      if (buttonId === "c_ready") {
        return createResponse({
          state,
          nodeId: "intent_c_qualification",
          reply: intentCQualificationCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "e_website_timeline") {
        return createResponse({
          state,
          nodeId: "intent_e_router",
          reply: faqCopy("website_timeline"),
          incrementExchange,
        })
      }
      if (buttonId === "book_call") {
        return createResponse({
          state,
          nodeId: "intent_c_close",
          reply: intentCCloseCopy(input.runtimeLinks),
          memoryPatch: {
            actionTaken: "booked_call",
          },
          terminalAction: state.convertedAction ? "none" : "emit_website_overhaul",
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_c_qualification": {
      if (buttonId === "c_has_existing_site") {
        return createResponse({
          state,
          nodeId: "intent_c_qualification",
          reply: {
            assistantMessage:
              "Great. Share your rough page count and primary goal in one line (example: 6 pages, more qualified leads).",
            quickReplies: [
              quickReply("c_scope_example", "5 to 7 pages, more leads"),
              quickReply("c_scope_example", "10+ pages, credibility + SEO"),
              quickReply("c_scope_done", "I'll type my scope"),
            ],
          },
          memoryPatch: {
            hasExistingSite: true,
          },
          incrementExchange,
        })
      }
      if (buttonId === "c_from_scratch") {
        return createResponse({
          state,
          nodeId: "intent_c_qualification",
          reply: {
            assistantMessage:
              "Perfect. Share your rough page count and primary goal in one line so I can finalize the recommendation.",
            quickReplies: [
              quickReply("c_scope_example", "5 to 7 pages, launch fast"),
              quickReply("c_scope_example", "10+ pages, long-term growth"),
              quickReply("c_scope_done", "I'll type my scope"),
            ],
          },
          memoryPatch: {
            hasExistingSite: false,
          },
          incrementExchange,
        })
      }

      const existingUrl = extractWebsiteFromText(input.request.inputValue)
      const estimatedPages = extractEstimatedPages(input.request.inputValue)
      const primaryGoal = extractGoalFromText(input.request.inputValue)

      return createResponse({
        state,
        nodeId: "intent_c_close",
        reply: intentCCloseCopy(input.runtimeLinks),
        memoryPatch: {
          existingUrl: existingUrl ?? state.memory.existingUrl ?? "",
          estimatedPages,
          primaryGoal,
        },
        incrementExchange,
      })
    }

    case "intent_c_close": {
      if (buttonId === "c_pay_now") {
        return createResponse({
          state,
          nodeId: "intent_c_pay_now",
          reply: intentCPayNowCopy(input.runtimeLinks),
          memoryPatch: {
            actionTaken: "pay_now",
          },
          terminalAction: state.convertedAction ? "none" : "emit_website_overhaul",
          incrementExchange,
        })
      }
      if (buttonId === "c_book_call" || buttonId === "book_call") {
        return createResponse({
          state,
          nodeId: "intent_c_close",
          reply: {
            assistantMessage:
              `Smart move. Here's the booking link: ${input.runtimeLinks.bookingUrl}\n\nPick a time that works and we'll talk through scope, timeline, and next steps.`,
            quickReplies: [
              quickReply("c_pay_now", "Actually, send pay-now option"),
              quickReply("starter_general_question", "I have another question"),
            ],
          },
          memoryPatch: {
            actionTaken: "booked_call",
          },
          terminalAction: state.convertedAction ? "none" : "emit_website_overhaul",
          incrementExchange,
        })
      }
      if (buttonId === "c_scope_questions") {
        return createResponse({
          state,
          nodeId: "intent_c_pitch",
          reply: intentCPitchCopy(),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_c_pay_now": {
      if (buttonId === "c_payment_confirmed") {
        return createResponse({
          state,
          nodeId: "intent_c_waiting_payment",
          reply: intentCPaymentConfirmedCopy(),
          terminalAction: state.convertedAction ? "none" : "emit_website_overhaul",
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_d_pitch": {
      if (buttonId === "book_call") {
        return createResponse({
          state,
          nodeId: "intent_d_book_call",
          reply: intentDBookCallCopy(input.runtimeLinks),
          memoryPatch: {
            actionTaken: "booked_call",
          },
          incrementExchange,
        })
      }
      if (buttonId === "d_scope") {
        return createResponse({
          state,
          nodeId: "intent_d_scope",
          reply: intentDScopeCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "d_ready_signup") {
        return createResponse({
          state,
          nodeId: "intent_d_signup_choice",
          reply: intentDSignupChoiceCopy(input.runtimeLinks),
          incrementExchange,
        })
      }
      if (buttonId === "d_big_commitment") {
        return createResponse({
          state,
          nodeId: "intent_d_big_commitment",
          reply: intentDBigCommitmentCopy(),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_d_scope": {
      if (buttonId === "book_call") {
        return createResponse({
          state,
          nodeId: "intent_d_book_call",
          reply: intentDBookCallCopy(input.runtimeLinks),
          memoryPatch: {
            actionTaken: "booked_call",
          },
          incrementExchange,
        })
      }
      if (buttonId === "e_results_timeline") {
        return createResponse({
          state,
          nodeId: "intent_e_router",
          reply: faqCopy("results_timeline"),
          incrementExchange,
        })
      }
      if (buttonId === "e_business_types") {
        return createResponse({
          state,
          nodeId: "intent_e_router",
          reply: faqCopy("business_types"),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_d_signup_choice": {
      if (buttonId === "d_book_strategy_call") {
        return createResponse({
          state,
          nodeId: "intent_d_book_call",
          reply: intentDBookCallCopy(input.runtimeLinks),
          memoryPatch: {
            actionTaken: "booked_call",
          },
          terminalAction: state.convertedAction ? "none" : "emit_growth_partnership",
          incrementExchange,
        })
      }
      if (buttonId === "d_direct_signup") {
        return createResponse({
          state,
          nodeId: "intent_d_direct_signup",
          reply: intentDDirectSignupCopy(input.runtimeLinks),
          memoryPatch: {
            actionTaken: "direct_signup",
          },
          terminalAction: state.convertedAction ? "none" : "emit_growth_partnership",
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_d_direct_signup": {
      if (buttonId === "d_collect_qualification") {
        return createResponse({
          state,
          nodeId: "intent_d_collect_qualification",
          reply: {
            assistantMessage:
              "Share these so the team can prepare your kickoff: business type, website URL, and your number one outcome for the next 3 to 6 months.",
            quickReplies: [
              quickReply("d_example_details", "Dental practice, example.com, more implant leads"),
              quickReply("d_example_details", "Consulting firm, no site yet, launch pipeline"),
            ],
          },
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_d_book_call": {
      if (buttonId === "d_collect_qualification") {
        return createResponse({
          state,
          nodeId: "intent_d_collect_qualification",
          reply: {
            assistantMessage:
              "Perfect. Share your business type, website URL if you have one, and your number one outcome for the next 3 to 6 months.",
            quickReplies: [
              quickReply("d_example_details", "Dental practice, example.com, more calls"),
              quickReply("d_example_details", "Local shop, example.com, more in-store visits"),
            ],
          },
          incrementExchange,
        })
      }
      if (buttonId === "b_start") {
        return createResponse({
          state,
          nodeId: "intent_b_pitch",
          reply: intentBPitchCopy(),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_d_big_commitment": {
      if (buttonId === "b_start") {
        return createResponse({
          state,
          nodeId: "intent_b_pitch",
          reply: intentBPitchCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "book_call") {
        return createResponse({
          state,
          nodeId: "intent_d_book_call",
          reply: intentDBookCallCopy(input.runtimeLinks),
          memoryPatch: {
            actionTaken: "booked_call",
          },
          terminalAction: state.convertedAction ? "none" : "emit_growth_partnership",
          incrementExchange,
        })
      }
      if (buttonId === "d_scope") {
        return createResponse({
          state,
          nodeId: "intent_d_scope",
          reply: intentDScopeCopy(),
          incrementExchange,
        })
      }
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    case "intent_d_collect_qualification": {
      const patch: Record<string, string | boolean | null> = {}
      const businessFromButton = deriveBusinessTypeFromButton(buttonId)
      const extractedWebsite = extractWebsiteFromText(input.request.inputValue)
      const extractedGoal = extractGoalFromText(input.request.inputValue)
      const extractedEmail = input.request.inputValue.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)?.[0]

      if (businessFromButton) {
        patch.businessType = businessFromButton
      } else if (!state.memory.businessType && input.request.inputValue.trim()) {
        patch.businessType = input.request.inputValue.trim().slice(0, 120)
      }

      if (extractedWebsite) {
        patch.websiteUrl = extractedWebsite
      }
      if (extractedGoal) {
        patch.primaryGoal = extractedGoal
      }
      if (extractedEmail && isValidEmail(extractedEmail)) {
        patch.email = extractedEmail
      }

      return createResponse({
        state,
        nodeId: "intent_d_collect_qualification",
        reply: {
          assistantMessage:
            "Perfect. I've passed that along to the team so they can come prepared. Ready for the next step?",
          quickReplies: [
            quickReply("book_call", "Book my 30-min strategy call"),
            quickReply("d_direct_signup", "Send direct signup link"),
            quickReply("starter_general_question", "I have one more question"),
          ],
          recommendedOffer: "growth_partnership",
        },
        memoryPatch: patch,
        terminalAction: state.convertedAction ? "none" : "emit_growth_partnership",
        incrementExchange,
      })
    }

    case "intent_e_router": {
      if (buttonId === "b_start") {
        return createResponse({
          state,
          nodeId: "intent_b_pitch",
          reply: intentBPitchCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "c_start") {
        return createResponse({
          state,
          nodeId: "intent_c_pitch",
          reply: intentCPitchCopy(),
          incrementExchange,
        })
      }
      if (buttonId === "d_start") {
        return createResponse({
          state,
          nodeId: "intent_d_pitch",
          reply: intentDPitchCopy(),
          incrementExchange,
        })
      }
      return createResponse({
        state,
        nodeId: "intent_e_router",
        reply: faqCopy(detectFaqTopic(input.request.inputValue)),
        incrementExchange,
      })
    }

    case "intent_f_router": {
      return createResponse({
        state,
        nodeId: "intent_f_router",
        reply: objectionCopy(deriveObjectionKind(normalizedInput)),
        incrementExchange,
      })
    }

    case "intent_g_router": {
      return createResponse({
        state,
        nodeId: "intent_g_router",
        reply: edgeCaseCopy(deriveEdgeCaseKind(normalizedInput), input.runtimeLinks),
        fallbackToHuman: deriveEdgeCaseKind(normalizedInput) === "human",
        incrementExchange,
      })
    }

    case "intent_c_waiting_payment": {
      return routeFromIntent({
        intent: rootIntent,
        state,
        runtimeLinks: input.runtimeLinks,
        incrementExchange,
      })
    }

    default:
      return createResponse({
        state,
        nodeId: DEFAULT_NODE,
        reply: fallbackRephraseCopy(),
        incrementExchange,
      })
  }
}
