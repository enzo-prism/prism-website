import { createHash, createHmac, randomUUID } from "node:crypto"

import { NextResponse } from "next/server"
import { z } from "zod"

import { buildQualificationSnapshot } from "@/lib/sales-chat/fit-flow"
import { supabaseAdmin } from "@/lib/supabase"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_SNIPPET_CHARS = 800

const SALES_CHAT_EVENT_NAMES = [
  "sales_chat_open",
  "sales_chat_launcher_click",
  "sales_chat_open_mode",
  "sales_chat_message_sent",
  "sales_chat_error",
  "sales_chat_welcome_seen",
  "sales_chat_fit_flow_started",
  "sales_chat_fit_flow_step_answered",
  "sales_chat_fit_flow_completed",
  "sales_chat_demo_cta_shown",
  "sales_chat_demo_cta_clicked",
  "sales_chat_calendar_opened",
  "sales_chat_demo_booked",
  "sales_chat_state_changed",
  "sales_chat_faq_answered",
  "sales_chat_csat_submitted",
  "sales_chat_quick_reply_clicked",
  "sales_chat_spec_node_entered",
  "sales_chat_offer_recommended",
  "sales_chat_lead_payload_attempted",
  "sales_chat_lead_payload_emitted",
  "sales_chat_lead_payload_failed",
  "sales_chat_dead_end_prevented",
] as const

const SALES_CHAT_STATES = [
  "MEETING_BOOKED",
  "MEETING_REQUESTED",
  "CALLBACK_REQUESTED",
  "WARM_NURTURE",
  "NOT_SALES",
] as const

type SalesChatEventName = (typeof SALES_CHAT_EVENT_NAMES)[number]
type SalesChatState = (typeof SALES_CHAT_STATES)[number]

const eventSchema = z.object({
  sessionId: z.string().trim().min(8).max(120),
  sourcePage: z.string().trim().min(1).max(200),
  eventName: z.enum(SALES_CHAT_EVENT_NAMES),
  eventTs: z.string().datetime().optional(),
  leadProfilePatch: z
    .object({
      name: z.string().trim().max(120).optional(),
      email: z.string().trim().email().max(160).optional(),
      company: z.string().trim().max(120).optional(),
      role: z.string().trim().max(80).optional(),
      businessType: z.string().trim().max(120).optional(),
      goal: z.string().trim().max(160).optional(),
      timeline: z.string().trim().max(80).optional(),
      budgetBand: z.string().trim().max(80).optional(),
    })
    .optional(),
  stateTransition: z.enum(SALES_CHAT_STATES).optional(),
  transcriptSnippet: z.string().trim().max(MAX_SNIPPET_CHARS).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

function sanitizeSnippet(value: string | undefined): string | undefined {
  if (!value) return undefined
  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SNIPPET_CHARS)
}

function hashSessionId(sessionId: string): string {
  return createHash("sha256").update(sessionId).digest("hex").slice(0, 12)
}

async function sendWebhook(body: string) {
  const url = process.env.SALES_CHAT_EVENTS_WEBHOOK_URL?.trim()
  if (!url) {
    return
  }

  const secret = process.env.SALES_CHAT_EVENTS_WEBHOOK_SECRET?.trim()
  const signature = secret ? createHmac("sha256", secret).update(body).digest("hex") : undefined

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(signature ? { "x-sales-chat-signature": signature } : {}),
    },
    body,
  })
}

async function persistOptionalSupabaseEvent(payload: {
  eventName: SalesChatEventName
  sessionHash: string
  sourcePage: string
  snippet?: string
  snapshot: string
  stateTransition?: SalesChatState
  leadProfilePatch?: {
    name?: string
    email?: string
    company?: string
  }
}) {
  if (!supabaseAdmin) {
    return
  }

  const fallbackEmail = `sales-chat-${payload.sessionHash}@no-email.design-prism.com`

  await supabaseAdmin.from("form_submissions").insert([
    {
      name: payload.leadProfilePatch?.name ?? "Sales Chat Prospect",
      email: payload.leadProfilePatch?.email ?? fallbackEmail,
      company: payload.leadProfilePatch?.company ?? "Unknown",
      message: payload.snippet ?? `Sales chat event: ${payload.eventName}`,
      why_prism_excites: payload.snapshot,
      source: `sales-chat:${payload.eventName}${payload.stateTransition ? `:${payload.stateTransition}` : ""}`,
    },
  ])
}

export async function POST(request: Request) {
  const requestId = randomUUID()

  let payloadRaw: unknown
  try {
    payloadRaw = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const parsed = eventSchema.safeParse(payloadRaw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event payload." }, { status: 400 })
  }

  const eventTs = parsed.data.eventTs ?? new Date().toISOString()
  const sessionHash = hashSessionId(parsed.data.sessionId)
  const transcriptSnippet = sanitizeSnippet(parsed.data.transcriptSnippet)
  const snapshot = buildQualificationSnapshot(parsed.data.leadProfilePatch ?? {})

  const outboundPayload = {
    requestId,
    sessionId: parsed.data.sessionId,
    sessionHash,
    sourcePage: parsed.data.sourcePage,
    eventName: parsed.data.eventName,
    eventTs,
    stateTransition: parsed.data.stateTransition,
    transcriptSnippet,
    qualificationSnapshot: snapshot,
    leadProfilePatch: parsed.data.leadProfilePatch,
    metadata: parsed.data.metadata,
  }

  const outboundBody = JSON.stringify(outboundPayload)

  void Promise.allSettled([
    sendWebhook(outboundBody),
    persistOptionalSupabaseEvent({
      eventName: parsed.data.eventName,
      sessionHash,
      sourcePage: parsed.data.sourcePage,
      snippet: transcriptSnippet,
      snapshot,
      stateTransition: parsed.data.stateTransition,
      leadProfilePatch: parsed.data.leadProfilePatch,
    }),
  ])

  console.log("[sales-chat][event]", {
    requestId,
    sessionHash,
    sourcePage: parsed.data.sourcePage,
    eventName: parsed.data.eventName,
    stateTransition: parsed.data.stateTransition,
  })

  return NextResponse.json({ accepted: true }, { status: 202 })
}
