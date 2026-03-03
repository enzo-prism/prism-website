import {
  createInitialConversationState,
  runSalesChatSpecV1Engine,
} from "@/lib/sales-chat/spec-v1-engine"
import type {
  SalesChatConversationState,
  SalesChatResponseV2,
  SalesChatSpecNodeId,
} from "@/lib/sales-chat/spec-v1-types"
import { hasForwardPath } from "@/lib/sales-chat/spec-v1-validation"

const runtimeLinks = {
  bookingUrl: "https://cal.com/prism/demo",
  websiteOverhaulCheckoutUrl: "https://checkout.example.com/website",
  growthPartnershipSignupUrl: "https://checkout.example.com/growth",
}

type InputStep = {
  inputType: "text" | "button"
  inputValue: string
  buttonId?: string
}

const ALL_NODE_IDS: SalesChatSpecNodeId[] = [
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

function runStep(state: SalesChatConversationState, step: InputStep): SalesChatResponseV2 {
  return runSalesChatSpecV1Engine({
    request: {
      sessionId: "session-12345678",
      sourcePage: "/get-started",
      inputType: step.inputType,
      inputValue: step.inputValue,
      buttonId: step.buttonId,
      conversationState: state,
    },
    state,
    runtimeLinks,
    nowIso: "2026-03-01T00:00:00.000Z",
  })
}

function runSequence(steps: InputStep[]): SalesChatResponseV2[] {
  const responses: SalesChatResponseV2[] = []
  let state = createInitialConversationState()

  for (const step of steps) {
    const response = runStep(state, step)
    responses.push(response)
    state = response.conversationState
  }

  return responses
}

function runFromNode(nodeId: SalesChatSpecNodeId, step: InputStep): SalesChatResponseV2 {
  return runStep(
    {
      nodeId,
      exchangeCount: 2,
      memory: {},
    },
    step,
  )
}

function expectResponsePolicyInvariants(response: SalesChatResponseV2) {
  expect(response.responseMode).toBe("deterministic")
  expect(response.assistantMessage.trim().length).toBeGreaterThan(0)
  expect(response.quickReplies.length).toBeGreaterThanOrEqual(1)
  expect(response.quickReplies.length).toBeLessThanOrEqual(5)
  expect(hasForwardPath(response.assistantMessage, response.quickReplies)).toBe(true)
}

function createSeededRandom(seed: number): () => number {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 0xffffffff
  }
}

describe("spec v1 deterministic engine", () => {
  it("returns canonical starter state on init", () => {
    const response = runSequence([
      {
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      },
    ])[0]

    expect(response.nodeId).toBe("welcome")
    expect(response.quickReplies).toHaveLength(5)
    expect(response.quickReplies[0]?.id).toBe("starter_free_audit")
    expect(response.conversationState.exchangeCount).toBe(0)
    expectResponsePolicyInvariants(response)
  })

  it("reaches every deterministic node through scripted scenarios", () => {
    const scenarios: Array<{
      targetNode: SalesChatSpecNodeId
      steps: InputStep[]
    }> = [
      {
        targetNode: "welcome",
        steps: [{ inputType: "button", inputValue: "", buttonId: "__init__" }],
      },
      {
        targetNode: "intent_a_start",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Help me figure out what's best", buttonId: "starter_help_choose" },
        ],
      },
      {
        targetNode: "intent_a_has_site_followup",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Help me figure out what's best", buttonId: "starter_help_choose" },
          { inputType: "button", inputValue: "Yes, I have a site", buttonId: "a_has_site_yes" },
        ],
      },
      {
        targetNode: "intent_a_no_site_followup",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Help me figure out what's best", buttonId: "starter_help_choose" },
          { inputType: "button", inputValue: "No, I need one built", buttonId: "a_has_site_no" },
        ],
      },
      {
        targetNode: "intent_a_unsure_business_type",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Help me figure out what's best", buttonId: "starter_help_choose" },
          { inputType: "button", inputValue: "No, I need one built", buttonId: "a_has_site_no" },
          { inputType: "button", inputValue: "I'm not sure what I need yet", buttonId: "a_no_site_unsure" },
        ],
      },
      {
        targetNode: "intent_b_pitch",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Get a free audit of my website", buttonId: "starter_free_audit" },
        ],
      },
      {
        targetNode: "intent_b_collect_business_type",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Get a free audit of my website", buttonId: "starter_free_audit" },
          { inputType: "text", inputValue: "example.com" },
        ],
      },
      {
        targetNode: "intent_b_collect_pain",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Get a free audit of my website", buttonId: "starter_free_audit" },
          { inputType: "text", inputValue: "example.com" },
          { inputType: "button", inputValue: "Dental / medical", buttonId: "b_business_dental" },
        ],
      },
      {
        targetNode: "intent_b_collect_email",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Get a free audit of my website", buttonId: "starter_free_audit" },
          { inputType: "text", inputValue: "example.com" },
          { inputType: "button", inputValue: "Dental / medical", buttonId: "b_business_dental" },
          { inputType: "text", inputValue: "Need more patient leads" },
        ],
      },
      {
        targetNode: "intent_b_confirm",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "Get a free audit of my website", buttonId: "starter_free_audit" },
          { inputType: "text", inputValue: "example.com" },
          { inputType: "button", inputValue: "Dental / medical", buttonId: "b_business_dental" },
          { inputType: "text", inputValue: "Need more patient leads" },
          { inputType: "text", inputValue: "owner@example.com" },
        ],
      },
      {
        targetNode: "intent_c_pitch",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I need a new or better website", buttonId: "starter_website" },
        ],
      },
      {
        targetNode: "intent_c_examples",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I need a new or better website", buttonId: "starter_website" },
          { inputType: "button", inputValue: "Show me examples", buttonId: "c_examples" },
        ],
      },
      {
        targetNode: "intent_c_qualification",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I need a new or better website", buttonId: "starter_website" },
          { inputType: "button", inputValue: "I'm ready to get started", buttonId: "c_ready" },
        ],
      },
      {
        targetNode: "intent_c_close",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I need a new or better website", buttonId: "starter_website" },
          { inputType: "button", inputValue: "I'm ready to get started", buttonId: "c_ready" },
          { inputType: "text", inputValue: "6 pages, more qualified leads" },
        ],
      },
      {
        targetNode: "intent_c_pay_now",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I need a new or better website", buttonId: "starter_website" },
          { inputType: "button", inputValue: "I'm ready to get started", buttonId: "c_ready" },
          { inputType: "text", inputValue: "6 pages, more qualified leads" },
          { inputType: "button", inputValue: "Pay now & start immediately", buttonId: "c_pay_now" },
        ],
      },
      {
        targetNode: "intent_c_waiting_payment",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I need a new or better website", buttonId: "starter_website" },
          { inputType: "button", inputValue: "I'm ready to get started", buttonId: "c_ready" },
          { inputType: "text", inputValue: "6 pages, more qualified leads" },
          { inputType: "button", inputValue: "Pay now & start immediately", buttonId: "c_pay_now" },
          { inputType: "button", inputValue: "Payment received", buttonId: "c_payment_confirmed" },
        ],
      },
      {
        targetNode: "intent_d_pitch",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I want a growth partner ($2K/mo)", buttonId: "starter_growth_partner" },
        ],
      },
      {
        targetNode: "intent_d_scope",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I want a growth partner ($2K/mo)", buttonId: "starter_growth_partner" },
          { inputType: "button", inputValue: "What exactly do you handle?", buttonId: "d_scope" },
        ],
      },
      {
        targetNode: "intent_d_signup_choice",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I want a growth partner ($2K/mo)", buttonId: "starter_growth_partner" },
          { inputType: "button", inputValue: "I'm ready to sign up now", buttonId: "d_ready_signup" },
        ],
      },
      {
        targetNode: "intent_d_direct_signup",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I want a growth partner ($2K/mo)", buttonId: "starter_growth_partner" },
          { inputType: "button", inputValue: "I'm ready to sign up now", buttonId: "d_ready_signup" },
          { inputType: "button", inputValue: "Send me the signup link — I'm ready", buttonId: "d_direct_signup" },
        ],
      },
      {
        targetNode: "intent_d_book_call",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I want a growth partner ($2K/mo)", buttonId: "starter_growth_partner" },
          { inputType: "button", inputValue: "Book a 30-min strategy call", buttonId: "book_call" },
        ],
      },
      {
        targetNode: "intent_d_collect_qualification",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I want a growth partner ($2K/mo)", buttonId: "starter_growth_partner" },
          { inputType: "button", inputValue: "Book a 30-min strategy call", buttonId: "book_call" },
          { inputType: "button", inputValue: "Share qualification details", buttonId: "d_collect_qualification" },
        ],
      },
      {
        targetNode: "intent_d_big_commitment",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I want a growth partner ($2K/mo)", buttonId: "starter_growth_partner" },
          { inputType: "button", inputValue: "Tell me more about this option", buttonId: "d_big_commitment" },
        ],
      },
      {
        targetNode: "intent_e_router",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "button", inputValue: "I just have a question about Prism", buttonId: "starter_general_question" },
        ],
      },
      {
        targetNode: "intent_f_router",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "text", inputValue: "This is too expensive for me right now" },
        ],
      },
      {
        targetNode: "intent_g_router",
        steps: [
          { inputType: "button", inputValue: "", buttonId: "__init__" },
          { inputType: "text", inputValue: "Can I talk to a human?" },
        ],
      },
    ]

    const visited = new Set<SalesChatSpecNodeId>()

    for (const scenario of scenarios) {
      const responses = runSequence(scenario.steps)
      const lastResponse = responses[responses.length - 1]
      expect(lastResponse.nodeId).toBe(scenario.targetNode)
      visited.add(lastResponse.nodeId)
      expectResponsePolicyInvariants(lastResponse)
    }

    expect([...visited].sort()).toEqual([...ALL_NODE_IDS].sort())
  })

  it("follows deterministic legal transition matrix across intent groups", () => {
    const transitions: Array<{
      fromNode: SalesChatSpecNodeId
      step: InputStep
      expectedNode: SalesChatSpecNodeId
    }> = [
      { fromNode: "intent_a_start", step: { inputType: "button", inputValue: "Yes", buttonId: "a_has_site_yes" }, expectedNode: "intent_a_has_site_followup" },
      { fromNode: "intent_a_start", step: { inputType: "button", inputValue: "No", buttonId: "a_has_site_no" }, expectedNode: "intent_a_no_site_followup" },
      { fromNode: "intent_a_has_site_followup", step: { inputType: "button", inputValue: "Outdated", buttonId: "a_has_site_outdated" }, expectedNode: "intent_c_pitch" },
      { fromNode: "intent_a_has_site_followup", step: { inputType: "button", inputValue: "No leads", buttonId: "a_has_site_no_leads" }, expectedNode: "intent_d_pitch" },
      { fromNode: "intent_a_has_site_followup", step: { inputType: "button", inputValue: "Doing it all", buttonId: "a_has_site_doing_it_all" }, expectedNode: "intent_d_pitch" },
      { fromNode: "intent_a_has_site_followup", step: { inputType: "button", inputValue: "Tell me what to fix", buttonId: "a_has_site_tell_me_fix" }, expectedNode: "intent_b_pitch" },
      { fromNode: "intent_a_no_site_followup", step: { inputType: "button", inputValue: "Get up fast", buttonId: "a_no_site_fast" }, expectedNode: "intent_c_pitch" },
      { fromNode: "intent_a_no_site_followup", step: { inputType: "button", inputValue: "Full partner", buttonId: "a_no_site_full_partner" }, expectedNode: "intent_d_pitch" },
      { fromNode: "intent_a_no_site_followup", step: { inputType: "button", inputValue: "Unsure", buttonId: "a_no_site_unsure" }, expectedNode: "intent_a_unsure_business_type" },
      { fromNode: "intent_b_pitch", step: { inputType: "button", inputValue: "Skip", buttonId: "b_skip_url" }, expectedNode: "intent_b_collect_business_type" },
      { fromNode: "intent_b_pitch", step: { inputType: "text", inputValue: "example.com" }, expectedNode: "intent_b_collect_business_type" },
      { fromNode: "intent_b_collect_business_type", step: { inputType: "button", inputValue: "Dental", buttonId: "b_business_dental" }, expectedNode: "intent_b_collect_pain" },
      { fromNode: "intent_b_collect_pain", step: { inputType: "text", inputValue: "Need more leads" }, expectedNode: "intent_b_collect_email" },
      { fromNode: "intent_b_collect_email", step: { inputType: "text", inputValue: "owner@example.com" }, expectedNode: "intent_b_confirm" },
      { fromNode: "intent_b_confirm", step: { inputType: "button", inputValue: "Written only", buttonId: "b_written_only" }, expectedNode: "intent_b_confirm" },
      { fromNode: "intent_b_confirm", step: { inputType: "button", inputValue: "Book call", buttonId: "b_book_call_too" }, expectedNode: "intent_b_confirm" },
      { fromNode: "intent_c_pitch", step: { inputType: "button", inputValue: "Examples", buttonId: "c_examples" }, expectedNode: "intent_c_examples" },
      { fromNode: "intent_c_pitch", step: { inputType: "button", inputValue: "Ready", buttonId: "c_ready" }, expectedNode: "intent_c_qualification" },
      { fromNode: "intent_c_pitch", step: { inputType: "button", inputValue: "Questions", buttonId: "c_questions" }, expectedNode: "intent_e_router" },
      { fromNode: "intent_c_examples", step: { inputType: "button", inputValue: "Ready", buttonId: "c_ready" }, expectedNode: "intent_c_qualification" },
      { fromNode: "intent_c_examples", step: { inputType: "button", inputValue: "Timeline", buttonId: "e_website_timeline" }, expectedNode: "intent_e_router" },
      { fromNode: "intent_c_examples", step: { inputType: "button", inputValue: "Book call", buttonId: "book_call" }, expectedNode: "intent_c_close" },
      { fromNode: "intent_c_qualification", step: { inputType: "button", inputValue: "Has site", buttonId: "c_has_existing_site" }, expectedNode: "intent_c_qualification" },
      { fromNode: "intent_c_qualification", step: { inputType: "button", inputValue: "From scratch", buttonId: "c_from_scratch" }, expectedNode: "intent_c_qualification" },
      { fromNode: "intent_c_qualification", step: { inputType: "text", inputValue: "6 pages, more leads" }, expectedNode: "intent_c_close" },
      { fromNode: "intent_c_close", step: { inputType: "button", inputValue: "Pay now", buttonId: "c_pay_now" }, expectedNode: "intent_c_pay_now" },
      { fromNode: "intent_c_close", step: { inputType: "button", inputValue: "Book call", buttonId: "c_book_call" }, expectedNode: "intent_c_close" },
      { fromNode: "intent_c_close", step: { inputType: "button", inputValue: "Scope questions", buttonId: "c_scope_questions" }, expectedNode: "intent_c_pitch" },
      { fromNode: "intent_c_pay_now", step: { inputType: "button", inputValue: "Payment confirmed", buttonId: "c_payment_confirmed" }, expectedNode: "intent_c_waiting_payment" },
      { fromNode: "intent_d_pitch", step: { inputType: "button", inputValue: "Book call", buttonId: "book_call" }, expectedNode: "intent_d_book_call" },
      { fromNode: "intent_d_pitch", step: { inputType: "button", inputValue: "Scope", buttonId: "d_scope" }, expectedNode: "intent_d_scope" },
      { fromNode: "intent_d_pitch", step: { inputType: "button", inputValue: "Ready signup", buttonId: "d_ready_signup" }, expectedNode: "intent_d_signup_choice" },
      { fromNode: "intent_d_pitch", step: { inputType: "button", inputValue: "Tell me more", buttonId: "d_big_commitment" }, expectedNode: "intent_d_big_commitment" },
      { fromNode: "intent_d_scope", step: { inputType: "button", inputValue: "Results timeline", buttonId: "e_results_timeline" }, expectedNode: "intent_e_router" },
      { fromNode: "intent_d_scope", step: { inputType: "button", inputValue: "Business types", buttonId: "e_business_types" }, expectedNode: "intent_e_router" },
      { fromNode: "intent_d_signup_choice", step: { inputType: "button", inputValue: "Call first", buttonId: "d_book_strategy_call" }, expectedNode: "intent_d_book_call" },
      { fromNode: "intent_d_signup_choice", step: { inputType: "button", inputValue: "Direct signup", buttonId: "d_direct_signup" }, expectedNode: "intent_d_direct_signup" },
      { fromNode: "intent_d_direct_signup", step: { inputType: "button", inputValue: "Share qualification", buttonId: "d_collect_qualification" }, expectedNode: "intent_d_collect_qualification" },
      { fromNode: "intent_d_book_call", step: { inputType: "button", inputValue: "Share qualification", buttonId: "d_collect_qualification" }, expectedNode: "intent_d_collect_qualification" },
      { fromNode: "intent_d_book_call", step: { inputType: "button", inputValue: "Start free audit", buttonId: "b_start" }, expectedNode: "intent_b_pitch" },
      { fromNode: "intent_d_big_commitment", step: { inputType: "button", inputValue: "Start free audit", buttonId: "b_start" }, expectedNode: "intent_b_pitch" },
      { fromNode: "intent_d_big_commitment", step: { inputType: "button", inputValue: "Book call", buttonId: "book_call" }, expectedNode: "intent_d_book_call" },
      { fromNode: "intent_d_big_commitment", step: { inputType: "button", inputValue: "Scope", buttonId: "d_scope" }, expectedNode: "intent_d_scope" },
      { fromNode: "intent_d_collect_qualification", step: { inputType: "text", inputValue: "Dental practice, example.com, more calls" }, expectedNode: "intent_d_collect_qualification" },
      { fromNode: "intent_e_router", step: { inputType: "button", inputValue: "Audit", buttonId: "b_start" }, expectedNode: "intent_b_pitch" },
      { fromNode: "intent_e_router", step: { inputType: "button", inputValue: "Website", buttonId: "c_start" }, expectedNode: "intent_c_pitch" },
      { fromNode: "intent_e_router", step: { inputType: "button", inputValue: "Growth", buttonId: "d_start" }, expectedNode: "intent_d_pitch" },
      { fromNode: "intent_f_router", step: { inputType: "text", inputValue: "I need to think about this" }, expectedNode: "intent_f_router" },
      { fromNode: "intent_g_router", step: { inputType: "text", inputValue: "I am already a client" }, expectedNode: "intent_g_router" },
      { fromNode: "intent_c_waiting_payment", step: { inputType: "text", inputValue: "zzz-no-intent" }, expectedNode: "intent_c_waiting_payment" },
    ]

    for (const transition of transitions) {
      const response = runFromNode(transition.fromNode, transition.step)
      expect(response.nodeId).toBe(transition.expectedNode)
      expectResponsePolicyInvariants(response)
    }
  })

  it("handles invalid transitions by staying safe and preserving a forward path", () => {
    const invalidCases: Array<{
      fromNode: SalesChatSpecNodeId
      step: InputStep
      expectedNode: SalesChatSpecNodeId
      expectedMessageMatch?: RegExp
    }> = [
      {
        fromNode: "intent_b_pitch",
        step: { inputType: "text", inputValue: "this is not a url" },
        expectedNode: "intent_b_pitch",
        expectedMessageMatch: /valid website url/i,
      },
      {
        fromNode: "intent_b_collect_email",
        step: { inputType: "text", inputValue: "invalid-email" },
        expectedNode: "intent_b_collect_email",
        expectedMessageMatch: /valid email/i,
      },
      {
        fromNode: "intent_a_start",
        step: { inputType: "text", inputValue: "maybe" },
        expectedNode: "intent_a_start",
      },
      {
        fromNode: "intent_c_close",
        step: { inputType: "text", inputValue: "nonsense input" },
        expectedNode: "intent_c_close",
      },
      {
        fromNode: "intent_d_signup_choice",
        step: { inputType: "text", inputValue: "unrecognized-option" },
        expectedNode: "intent_d_signup_choice",
      },
    ]

    for (const invalidCase of invalidCases) {
      const response = runFromNode(invalidCase.fromNode, invalidCase.step)
      expect(response.nodeId).toBe(invalidCase.expectedNode)
      if (invalidCase.expectedMessageMatch) {
        expect(response.assistantMessage).toMatch(invalidCase.expectedMessageMatch)
      }
      expectResponsePolicyInvariants(response)
    }
  })

  it("keeps deterministic policy invariants stable under seeded randomized traversal", () => {
    const randomSeeds = [11, 29, 97]
    const freeTextInputs = [
      "What pricing do you offer?",
      "Can I get a free audit first?",
      "I need a better website",
      "I want faster growth this quarter",
      "How long does this take?",
      "owner@example.com",
      "example.com",
      "Need more qualified leads",
      "Can I talk to a human?",
    ]

    for (const seed of randomSeeds) {
      const random = createSeededRandom(seed)
      let state = createInitialConversationState()
      let currentQuickReplies: SalesChatResponseV2["quickReplies"] = []

      const initResponse = runStep(state, {
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      })
      expect(initResponse.nodeId).toBe("welcome")
      expectResponsePolicyInvariants(initResponse)
      state = initResponse.conversationState
      currentQuickReplies = initResponse.quickReplies

      for (let turn = 0; turn < 120; turn += 1) {
        const useQuickReply = currentQuickReplies.length > 0 && random() < 0.7
        let step: InputStep

        if (useQuickReply) {
          const index = Math.floor(random() * currentQuickReplies.length)
          const chosen = currentQuickReplies[index]
          step = {
            inputType: "button",
            inputValue: chosen.label,
            buttonId: chosen.id,
          }
        } else {
          const index = Math.floor(random() * freeTextInputs.length)
          step = {
            inputType: "text",
            inputValue: freeTextInputs[index],
          }
        }

        const response = runStep(state, step)
        expectResponsePolicyInvariants(response)
        state = response.conversationState
        currentQuickReplies = response.quickReplies
      }
    }
  })
})
