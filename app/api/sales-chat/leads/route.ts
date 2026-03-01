import { createHmac, timingSafeEqual } from "node:crypto"

import { NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const baseSchema = z.object({
  source_page: z.string().min(1).max(200),
  timestamp: z.string().datetime(),
  routing: z.object({
    slackChannel: z.string().min(1).max(120),
    notionCategory: z.string().min(1).max(120),
    priority: z.enum(["high", "medium", "low"]),
    emailTarget: z.string().min(1).max(200),
  }),
})

const freeAuditSchema = baseSchema.extend({
  lead_type: z.literal("free_audit"),
  website_url: z.string().max(400),
  business_type: z.string().max(120),
  pain_point: z.string().max(500),
  email: z.string().max(160),
  also_booked_call: z.boolean(),
  chat_transcript_summary: z.string().max(1200),
})

const websiteOverhaulSchema = baseSchema.extend({
  lead_type: z.literal("website_overhaul_purchase"),
  payment_status: z.enum(["pending", "completed"]),
  has_existing_site: z.boolean(),
  existing_url: z.string().max(400),
  estimated_pages: z.string().max(120),
  primary_goal: z.string().max(300),
  business_name: z.string().max(160),
  brand_assets: z.string().max(400),
  email: z.string().max(160),
  chat_transcript_summary: z.string().max(1200),
})

const growthSchema = baseSchema.extend({
  lead_type: z.literal("growth_partnership"),
  action_taken: z.enum(["booked_call", "direct_signup"]),
  business_type: z.string().max(120),
  website_url: z.string().max(400),
  primary_goal: z.string().max(300),
  timeline: z.string().max(120),
  email: z.string().max(160),
  chat_transcript_summary: z.string().max(1200),
})

const leadPayloadSchema = z.discriminatedUnion("lead_type", [
  freeAuditSchema,
  websiteOverhaulSchema,
  growthSchema,
])

function hasValidSignature(serializedPayload: string, request: Request): boolean {
  const secret = process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET?.trim()
  // Skip signature enforcement when no secret is configured (primarily local/dev).
  if (!secret) return true

  const providedSignature = request.headers.get("x-sales-chat-signature")
  if (!providedSignature) return false

  const expected = createHmac("sha256", secret).update(serializedPayload).digest("hex")
  const expectedBuffer = Buffer.from(expected)
  const providedBuffer = Buffer.from(providedSignature)

  if (expectedBuffer.length !== providedBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, providedBuffer)
}

export async function POST(request: Request) {
  let payloadRaw: unknown
  try {
    payloadRaw = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  const serializedPayload = JSON.stringify(payloadRaw)
  if (!hasValidSignature(serializedPayload, request)) {
    return NextResponse.json({ error: "Invalid lead webhook signature." }, { status: 401 })
  }

  const parsed = leadPayloadSchema.safeParse(payloadRaw)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 })
  }

  console.log("[sales-chat][lead-webhook] accepted", {
    leadType: parsed.data.lead_type,
    sourcePage: parsed.data.source_page,
    priority: parsed.data.routing.priority,
  })

  return NextResponse.json({ accepted: true }, { status: 202 })
}
