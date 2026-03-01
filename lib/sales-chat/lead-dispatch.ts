import { createHmac } from "node:crypto"

import type { SalesChatLeadPayload } from "@/lib/sales-chat/lead-payloads"

export async function dispatchSalesChatLead(payload: SalesChatLeadPayload): Promise<void> {
  const webhookUrl = process.env.SALES_CHAT_LEADS_WEBHOOK_URL?.trim()
  const webhookSecret = process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET?.trim()

  if (!webhookUrl || !webhookSecret) {
    throw new Error("Sales chat lead webhook configuration is missing.")
  }

  const body = JSON.stringify(payload)
  const signature = createHmac("sha256", webhookSecret).update(body).digest("hex")

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-sales-chat-signature": signature,
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
