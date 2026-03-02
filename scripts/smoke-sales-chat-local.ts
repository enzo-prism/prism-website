type ConversationState = {
  nodeId: string
  exchangeCount: number
  memory: Record<string, unknown>
  convertedAction?: string
}

type ChatResponse = {
  assistantMessage: string
  nodeId: string
  quickReplies: Array<{ id: string; label: string; actionType: string }>
  terminalAction?: string
  leadDispatchStatus?: "none" | "attempted" | "succeeded" | "failed"
  leadDispatchCode?: string
  conversationState: ConversationState
}

type StepResult = {
  name: string
  status: number
  route: string
  body: ChatResponse
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

async function sendChatStep(baseUrl: string, payload: Record<string, unknown>): Promise<StepResult> {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  const route = response.headers.get("x-sales-chat-route") || ""
  const body = (await response.json()) as ChatResponse

  return {
    name: String(payload.buttonId || payload.inputType || "unknown"),
    status: response.status,
    route,
    body,
  }
}

async function main() {
  const baseUrl = process.env.SALES_CHAT_LOCAL_BASE_URL?.trim() || "http://localhost:3000"
  const sessionId = `local-smoke-${Date.now()}`
  const sourcePage = "/get-started"

  console.log(`[sales-chat smoke] Base URL: ${baseUrl}`)
  console.log(`[sales-chat smoke] Session: ${sessionId}`)

  let state: ConversationState | undefined

  const init = await sendChatStep(baseUrl, {
    sessionId,
    sourcePage,
    inputType: "button",
    inputValue: "",
    buttonId: "__init__",
  })

  assert(init.status === 200, `Expected init status 200, got ${init.status}`)
  assert(init.route === "success", `Expected x-sales-chat-route=success on init, got "${init.route}"`)
  assert(init.body.nodeId === "welcome", `Expected welcome node, got "${init.body.nodeId}"`)
  assert(Array.isArray(init.body.quickReplies) && init.body.quickReplies.length > 0, "Expected starter quick replies")
  state = init.body.conversationState

  const starter = await sendChatStep(baseUrl, {
    sessionId,
    sourcePage,
    inputType: "button",
    inputValue: "",
    buttonId: "starter_free_audit",
    conversationState: state,
  })
  assert(starter.status === 200, `Expected starter status 200, got ${starter.status}`)
  state = starter.body.conversationState

  const website = await sendChatStep(baseUrl, {
    sessionId,
    sourcePage,
    inputType: "text",
    inputValue: "https://example.com",
    conversationState: state,
  })
  assert(website.status === 200, `Expected website step status 200, got ${website.status}`)
  state = website.body.conversationState

  const businessReplyId = website.body.quickReplies[0]?.id
  assert(businessReplyId, "Expected business-type quick reply options")

  const businessType = await sendChatStep(baseUrl, {
    sessionId,
    sourcePage,
    inputType: "button",
    inputValue: "",
    buttonId: businessReplyId,
    conversationState: state,
  })
  assert(businessType.status === 200, `Expected business step status 200, got ${businessType.status}`)
  state = businessType.body.conversationState

  const pain = await sendChatStep(baseUrl, {
    sessionId,
    sourcePage,
    inputType: "text",
    inputValue: "Not enough qualified leads from search.",
    conversationState: state,
  })
  assert(pain.status === 200, `Expected pain-point step status 200, got ${pain.status}`)
  state = pain.body.conversationState

  const email = await sendChatStep(baseUrl, {
    sessionId,
    sourcePage,
    inputType: "text",
    inputValue: "localtest@example.com",
    conversationState: state,
  })
  assert(email.status === 200, `Expected email step status 200, got ${email.status}`)
  assert(email.route === "success", `Expected success route on terminal step, got "${email.route}"`)
  assert(email.body.terminalAction === "emit_free_audit", `Expected terminal action emit_free_audit, got "${email.body.terminalAction}"`)
  assert(
    email.body.leadDispatchStatus === "succeeded" || email.body.leadDispatchStatus === "attempted",
    `Expected lead dispatch to be attempted/succeeded, got "${email.body.leadDispatchStatus}" (${email.body.leadDispatchCode ?? "no code"})`,
  )

  console.log("[sales-chat smoke] PASS")
  console.log(
    JSON.stringify(
      {
        initNode: init.body.nodeId,
        terminalNode: email.body.nodeId,
        terminalAction: email.body.terminalAction,
        leadDispatchStatus: email.body.leadDispatchStatus,
        leadDispatchCode: email.body.leadDispatchCode ?? null,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error("[sales-chat smoke] FAIL")
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})

export {}
