import { createHmac } from "node:crypto"

import type { SalesChatLeadPayload } from "@/lib/sales-chat/lead-payloads"

function isFormspreeEndpoint(url: string): boolean {
  try {
    const parsed = new URL(url)
    const isFormspreeHost = /(^|\.)formspree\.io$/i.test(parsed.hostname)
    const isFormEndpoint = /^\/f\/[a-z0-9]+/i.test(parsed.pathname)
    return isFormspreeHost && isFormEndpoint
  } catch {
    return false
  }
}

function getLeadEmail(payload: SalesChatLeadPayload): string {
  return payload.email
}

function toFormspreePayload(payload: SalesChatLeadPayload): Record<string, string | boolean> {
  const base: Record<string, string | boolean> = {
    _subject: `Sales chat lead: ${payload.lead_type}`,
    lead_type: payload.lead_type,
    source_page: payload.source_page,
    timestamp: payload.timestamp,
    routing_priority: payload.routing.priority,
    routing_notion_category: payload.routing.notionCategory,
    routing_slack_channel: payload.routing.slackChannel,
    routing_email_target: payload.routing.emailTarget,
    chat_transcript_summary: payload.chat_transcript_summary,
  }

  const leadEmail = getLeadEmail(payload)
  if (leadEmail) {
    base.email = leadEmail
    base._replyto = leadEmail
  }

  if (payload.lead_type === "free_audit") {
    return {
      ...base,
      website_url: payload.website_url,
      business_type: payload.business_type,
      pain_point: payload.pain_point,
      also_booked_call: payload.also_booked_call,
    }
  }

  if (payload.lead_type === "website_overhaul_purchase") {
    return {
      ...base,
      payment_status: payload.payment_status,
      has_existing_site: payload.has_existing_site,
      existing_url: payload.existing_url,
      estimated_pages: payload.estimated_pages,
      primary_goal: payload.primary_goal,
      business_name: payload.business_name,
      brand_assets: payload.brand_assets,
    }
  }

  return {
    ...base,
    action_taken: payload.action_taken,
    business_type: payload.business_type,
    website_url: payload.website_url,
    primary_goal: payload.primary_goal,
    timeline: payload.timeline,
  }
}

export async function dispatchSalesChatLead(payload: SalesChatLeadPayload): Promise<void> {
  const webhookUrl = process.env.SALES_CHAT_LEADS_WEBHOOK_URL?.trim()
  const webhookSecret = process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET?.trim()

  if (!webhookUrl) {
    throw new Error("Sales chat lead webhook configuration is missing.")
  }

  const formspreeEndpoint = isFormspreeEndpoint(webhookUrl)
  if (!formspreeEndpoint && !webhookSecret) {
    throw new Error("Sales chat lead webhook secret is missing for non-Formspree endpoint.")
  }

  const outboundPayload = formspreeEndpoint ? toFormspreePayload(payload) : payload
  const body = JSON.stringify(outboundPayload)
  const signature = !formspreeEndpoint && webhookSecret
    ? createHmac("sha256", webhookSecret).update(body).digest("hex")
    : undefined

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(formspreeEndpoint ? { Accept: "application/json" } : {}),
      ...(signature ? { "x-sales-chat-signature": signature } : {}),
    },
    body,
  })

  if (!response.ok) {
    const responseBody = await response.text().catch(() => "")
    throw new Error(
      `Lead webhook failed (${response.status}): ${responseBody.slice(0, 240) || "no response body"}`,
    )
  }
}
