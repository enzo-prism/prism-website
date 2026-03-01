import { randomUUID } from "node:crypto"

import { NextResponse } from "next/server"
import { z } from "zod"

import { dispatchSalesChatLead } from "@/lib/sales-chat/lead-dispatch"
import { buildLeadPayload } from "@/lib/sales-chat/lead-payloads"
import {
  createInitialConversationState,
  runSalesChatSpecV1Engine,
} from "@/lib/sales-chat/spec-v1-engine"
import type {
  LeadDispatchOutcome,
  SalesChatConversationState,
  SalesChatRequestV2,
  SalesChatSpecNodeId,
  SalesChatSpecRuntimeLinks,
} from "@/lib/sales-chat/spec-v1-types"
import { getSalesChatRuntimeConfig } from "@/lib/sales-chat/runtime-config"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const HUMAN_HANDOFF_MESSAGE =
  "A specialist is ready to help. Please use booking and we'll route you immediately."

type ChatErrorResponse = {
  error: string
  message?: string
  fallbackToHuman?: boolean
  errorType?: string
}

const CHAT_ROUTE_EVENTS = {
  DISABLED: "disabled",
  CONFIG_MISSING: "config_missing",
  INVALID_REQUEST: "invalid_request",
  SUCCESS: "success",
} as const

const LEAD_DISPATCH_DEDUPE_TTL_MS = 10 * 60 * 1000
const recentLeadDispatchKeys = new Map<string, number>()

const salesChatNodeIds: Array<SalesChatSpecNodeId> = [
  "welcome",
  "intent_a_start",
  "intent_a_has_site_followup",
  "intent_a_no_site_followup",
  "intent_a_unsure_business_type",
  "intent_b_pitch",
  "intent_b_collect_business_type",
  "intent_b_collect_pain",
  "intent_b_collect_email",
  "intent_b_confirm",
  "intent_c_pitch",
  "intent_c_examples",
  "intent_c_qualification",
  "intent_c_close",
  "intent_c_pay_now",
  "intent_c_waiting_payment",
  "intent_d_pitch",
  "intent_d_scope",
  "intent_d_signup_choice",
  "intent_d_direct_signup",
  "intent_d_book_call",
  "intent_d_collect_qualification",
  "intent_d_big_commitment",
  "intent_e_router",
  "intent_f_router",
  "intent_g_router",
]

const salesChatNodeIdSchema = z.enum(salesChatNodeIds)
const offerRecommendationSchema = z.enum([
  "free_audit",
  "website_overhaul",
  "growth_partnership",
])

const conversationStateSchema = z.object({
  nodeId: salesChatNodeIdSchema,
  exchangeCount: z.number().int().min(0).max(200),
  memory: z
    .object({
      businessType: z.string().max(120).optional(),
      websiteUrl: z.string().max(400).optional(),
      painPoint: z.string().max(500).optional(),
      email: z.string().email().max(160).optional(),
      businessName: z.string().max(160).optional(),
      brandAssets: z.string().max(400).optional(),
      hasExistingSite: z.boolean().optional(),
      existingUrl: z.string().max(400).optional(),
      estimatedPages: z.string().max(120).optional(),
      primaryGoal: z.string().max(300).optional(),
      timeline: z.string().max(120).optional(),
      alsoBookedCall: z.boolean().optional(),
      actionTaken: z.enum(["booked_call", "direct_signup", "pay_now"]).optional(),
      askedQuestionIds: z.array(z.string().max(80)).optional(),
    })
    .default({}),
  convertedAction: offerRecommendationSchema.optional(),
})

const chatRequestSchema: z.ZodType<SalesChatRequestV2> = z.object({
  sessionId: z.string().trim().min(8).max(120),
  sourcePage: z.string().trim().min(1).max(200),
  inputType: z.enum(["text", "button"]),
  inputValue: z.string().max(2000),
  buttonId: z.string().trim().max(120).optional(),
  conversationState: conversationStateSchema.optional(),
})

function buildFallbackError(
  message: string,
  status: number,
  errorType: string,
  headers?: Record<string, string>,
): Response {
  const payload: ChatErrorResponse = {
    error: message,
    message,
    fallbackToHuman: true,
    errorType,
  }

  return NextResponse.json(payload, {
    status,
    headers: {
      "x-sales-chat-route": errorType,
      ...(headers ?? {}),
    },
  })
}

function getRuntimeLinks(env: NodeJS.ProcessEnv): SalesChatSpecRuntimeLinks {
  return {
    bookingUrl: env.SALES_CHAT_BOOKING_URL?.trim() || "/get-started#book-call",
    websiteOverhaulCheckoutUrl:
      env.SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL?.trim() || "/get-started#book-call",
    growthPartnershipSignupUrl:
      env.SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL?.trim() || "/get-started#book-call",
  }
}

function validateRequestPayload(payload: unknown): { success: true; data: SalesChatRequestV2 } | { success: false } {
  const parsed = chatRequestSchema.safeParse(payload)
  if (!parsed.success) {
    return { success: false }
  }
  return { success: true, data: parsed.data }
}

function pruneRecentLeadDispatchKeys(nowMs: number) {
  for (const [key, timestamp] of recentLeadDispatchKeys.entries()) {
    if (nowMs - timestamp > LEAD_DISPATCH_DEDUPE_TTL_MS) {
      recentLeadDispatchKeys.delete(key)
    }
  }
}

function buildLeadDispatchKey(args: {
  sessionId: string
  terminalAction: string
  nodeId: string
  exchangeCount: number
}): string {
  return `${args.sessionId}:${args.terminalAction}:${args.nodeId}:${args.exchangeCount}`
}

function classifyLeadDispatchError(error: unknown): string {
  const normalized = (error instanceof Error ? error.message : String(error)).toLowerCase()

  if (normalized.includes("configuration")) {
    return "configuration_missing"
  }
  if (normalized.includes("lead webhook failed")) {
    return "webhook_http_error"
  }
  if (normalized.includes("aborted") || normalized.includes("abort")) {
    return "webhook_timeout"
  }
  return "webhook_dispatch_error"
}

export async function POST(request: Request) {
  const requestId = randomUUID()
  const runtimeConfig = getSalesChatRuntimeConfig(process.env)

  if (!runtimeConfig.enabled) {
    return buildFallbackError(HUMAN_HANDOFF_MESSAGE, 503, CHAT_ROUTE_EVENTS.DISABLED)
  }

  if (!runtimeConfig.uiAvailable || !runtimeConfig.leadsWebhookConfigured) {
    console.warn("[sales-chat] deterministic runtime is missing required config", {
      requestId,
      missingRequiredKeys: runtimeConfig.missingRequiredKeys,
    })
    return buildFallbackError(HUMAN_HANDOFF_MESSAGE, 503, CHAT_ROUTE_EVENTS.CONFIG_MISSING)
  }

  let payloadRaw: unknown
  try {
    payloadRaw = await request.json()
  } catch {
    return buildFallbackError("Invalid request payload.", 400, CHAT_ROUTE_EVENTS.INVALID_REQUEST)
  }

  const validated = validateRequestPayload(payloadRaw)
  if (!validated.success) {
    return buildFallbackError("Invalid payload.", 400, CHAT_ROUTE_EVENTS.INVALID_REQUEST)
  }

  const runtimeLinks = getRuntimeLinks(process.env)
  const state: SalesChatConversationState =
    validated.data.conversationState ?? createInitialConversationState()

  const responsePayload = runSalesChatSpecV1Engine({
    request: validated.data,
    state,
    runtimeLinks,
    nowIso: new Date().toISOString(),
  })

  let leadDispatchStatus: LeadDispatchOutcome = "none"
  let leadDispatchCode: string | undefined

  if (responsePayload.terminalAction && responsePayload.terminalAction !== "none") {
    const leadPayload = buildLeadPayload({
      terminalAction: responsePayload.terminalAction,
      state: responsePayload.conversationState,
      sourcePage: validated.data.sourcePage,
      nowIso: new Date().toISOString(),
      latestUserInput: validated.data.inputValue,
    })

    if (leadPayload) {
      const nowMs = Date.now()
      pruneRecentLeadDispatchKeys(nowMs)
      const dedupeKey = buildLeadDispatchKey({
        sessionId: validated.data.sessionId,
        terminalAction: responsePayload.terminalAction,
        nodeId: responsePayload.conversationState.nodeId,
        exchangeCount: responsePayload.conversationState.exchangeCount,
      })

      if (recentLeadDispatchKeys.has(dedupeKey)) {
        leadDispatchCode = "duplicate_suppressed"
      } else {
        recentLeadDispatchKeys.set(dedupeKey, nowMs)
        leadDispatchStatus = "attempted"
        try {
          await dispatchSalesChatLead(leadPayload)
          leadDispatchStatus = "succeeded"
        } catch (error) {
          leadDispatchStatus = "failed"
          leadDispatchCode = classifyLeadDispatchError(error)
          console.error("[sales-chat] lead dispatch failed", {
            requestId,
            terminalAction: responsePayload.terminalAction,
            leadDispatchCode,
          })
        }
      }
    } else {
      leadDispatchCode = "payload_unavailable"
    }
  }

  return NextResponse.json({
    ...responsePayload,
    leadDispatchStatus,
    leadDispatchCode,
  }, {
    status: 200,
    headers: {
      "x-sales-chat-route": CHAT_ROUTE_EVENTS.SUCCESS,
      "x-request-id": requestId,
    },
  })
}
