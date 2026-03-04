"use client"

import type { FormEvent, KeyboardEvent, ReactNode } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import BookDemoEmbed from "@/components/BookDemoEmbed"
import SalesChatComposer from "@/components/sales-chat/SalesChatComposer"
import {
  DEFAULT_FALLBACK_MESSAGE,
  HANDOFF_FALLBACK_MESSAGE,
  MAX_MESSAGE_CHARS,
  REQUEST_TIMEOUT_MS,
  SALES_CHAT_VISUAL_TOKENS,
} from "@/components/sales-chat/constants"
import SalesChatFullscreen from "@/components/sales-chat/SalesChatFullscreen"
import SalesChatHeader from "@/components/sales-chat/SalesChatHeader"
import SalesChatLauncher from "@/components/sales-chat/SalesChatLauncher"
import SalesChatMessages from "@/components/sales-chat/SalesChatMessages"
import type {
  RenderMessageContent,
  SalesChatApiResponse,
  SalesChatMessage,
  SalesChatQuickReply,
  SalesChatVisualStyle,
} from "@/components/sales-chat/types"
import SalesChatWindow from "@/components/sales-chat/SalesChatWindow"
import { Button } from "@/components/ui/button"
import type { SalesChatConversationState } from "@/lib/sales-chat/spec-v1-types"
import type { SalesChatEventName, SalesChatState } from "@/lib/sales-chat/types"
import {
  trackSalesChatAiResponseRejected,
  trackSalesChatAiResponseUsed,
  trackSalesChatCalendarOpened,
  trackSalesChatDemoCtaClicked,
  trackSalesChatDemoCtaShown,
  trackSalesChatError,
  trackSalesChatLauncherClick,
  trackSalesChatLeadPayloadAttempted,
  trackSalesChatLeadPayloadEmitted,
  trackSalesChatLeadPayloadFailed,
  trackSalesChatMessageSent,
  trackSalesChatOfferRecommended,
  trackSalesChatOpen,
  trackSalesChatOpenMode,
  trackSalesChatQuickReplyClicked,
  trackSalesChatSpecNodeEntered,
  trackSalesChatWelcomeSeen,
  type SalesChatOpenMode,
} from "@/utils/analytics"

type SalesChatShellProps = {
  sourcePage: string
  bookingHref?: string
  fullscreenBreakpoint?: number
  desktopAutoOpenSessionKey?: string
  inlineBookingEnabled?: boolean
  visualStyle?: SalesChatVisualStyle
}

type ChatErrorPayload = {
  error?: string
  message?: string
  fallbackToHuman?: boolean
  errorType?: string
  quickReplies?: SalesChatQuickReply[]
  conversationState?: SalesChatConversationState
}

const BOOKING_FLOW_ANCHOR = "#book-call"
const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

function pushTextLines(nodes: ReactNode[], value: string, keyPrefix: string): void {
  const lines = value.split("\n")
  lines.forEach((line, index) => {
    nodes.push(<span key={`${keyPrefix}-line-${index}`}>{line}</span>)
    if (index < lines.length - 1) {
      nodes.push(<br key={`${keyPrefix}-break-${index}`} />)
    }
  })
}

function normalizeBookingHref(rawHref: string, bookingHref: string): string {
  const trimmed = rawHref.trim()
  const normalizedBooking = bookingHref.trim() || BOOKING_FLOW_ANCHOR

  if (
    trimmed === "#"
    || trimmed === ""
    || trimmed.toLowerCase() === "book-call"
    || trimmed.toLowerCase() === "/book-call"
  ) {
    return normalizedBooking
  }

  if (trimmed.startsWith("#")) {
    return normalizedBooking
  }

  return trimmed
}

function renderPlainTextWithBookingAnchor(
  value: string,
  bookingHref: string,
  keyPrefix: string,
): ReactNode[] {
  const nodes: ReactNode[] = []
  const chunks = value.split(BOOKING_FLOW_ANCHOR)

  chunks.forEach((chunk, index) => {
    pushTextLines(nodes, chunk, `${keyPrefix}-text-${index}`)
    if (index < chunks.length - 1) {
      nodes.push(
        <a
          key={`anchor-${keyPrefix}-${index}`}
          href={bookingHref}
          className="underline underline-offset-2"
        >
          Book a call
        </a>,
      )
    }
  })

  return nodes
}

function createRenderMessageContent(bookingHref: string): RenderMessageContent {
  return (content, keyPrefix) => {
    const tokens = [...content.matchAll(MARKDOWN_LINK_PATTERN)]
    if (tokens.length === 0) {
      return renderPlainTextWithBookingAnchor(content, bookingHref, `${keyPrefix}-plain`)
    }

    const nodes: ReactNode[] = []
    let previousIndex = 0
    let tokenIndex = 0

    for (const token of tokens) {
      if (token === null || token.index === undefined) {
        continue
      }

      const [fullMatch, label, rawHref] = token
      if (token.index > previousIndex) {
        const textBefore = content.slice(previousIndex, token.index)
        nodes.push(
          ...renderPlainTextWithBookingAnchor(textBefore, bookingHref, `${keyPrefix}-text-${tokenIndex}`),
        )
      }

      const href = normalizeBookingHref(rawHref, bookingHref)
      nodes.push(
        <a key={`${keyPrefix}-link-${tokenIndex++}`} href={href} className="underline underline-offset-2">
          {label}
        </a>,
      )
      previousIndex = token.index + fullMatch.length
    }

    const finalText = content.slice(previousIndex)
    if (finalText.length > 0) {
      nodes.push(
        ...renderPlainTextWithBookingAnchor(finalText, bookingHref, `${keyPrefix}-text-${tokenIndex}`),
      )
    }

    return nodes
  }
}

function buildSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }
  return `sales-chat-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function parseViewportMode(fullscreenBreakpoint: number): SalesChatOpenMode {
  if (typeof window === "undefined") {
    return "desktop-popup"
  }
  return window.innerWidth <= fullscreenBreakpoint ? "fullscreen" : "desktop-popup"
}

function createMessageId(prefix: string, index: number): string {
  return `${prefix}-${index}`
}

function isHandledErrorPayload(value: unknown): value is ChatErrorPayload {
  if (!value || typeof value !== "object") {
    return false
  }
  return "error" in value || "message" in value || "fallbackToHuman" in value
}

function shouldAutoOpenInlineBooking(args: {
  fallbackToHuman: boolean
  exchangeCount: number
}): boolean {
  if (args.fallbackToHuman) {
    return true
  }
  return args.exchangeCount >= 2
}

export default function SalesChatShell({
  sourcePage,
  bookingHref = BOOKING_FLOW_ANCHOR,
  fullscreenBreakpoint = 1024,
  desktopAutoOpenSessionKey = "sales-chat-v2-opened",
  inlineBookingEnabled = true,
  visualStyle = "minimal-glass",
}: SalesChatShellProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<SalesChatOpenMode>("desktop-popup")
  const [draft, setDraft] = useState("")
  const [messages, setMessages] = useState<SalesChatMessage[]>([])
  const [quickReplies, setQuickReplies] = useState<SalesChatQuickReply[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fallbackToHuman, setFallbackToHuman] = useState(false)
  const [isInlineBookingOpen, setIsInlineBookingOpen] = useState(false)
  const [conversationState, setConversationState] = useState<SalesChatConversationState | null>(null)

  const launcherButtonRef = useRef<HTMLButtonElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const sessionIdRef = useRef<string>("")
  const hasTrackedOpenRef = useRef(false)
  const hasTrackedWelcomeRef = useRef(false)
  const hasTrackedDemoCtaRef = useRef(false)
  const hasRequestedWelcomeRef = useRef(false)
  const messageIdRef = useRef(0)

  const resolvedBookingHref = bookingHref.trim().length > 0 ? bookingHref : BOOKING_FLOW_ANCHOR
  const tokens = SALES_CHAT_VISUAL_TOKENS[visualStyle]
  const renderMessageContent = useMemo(
    () => createRenderMessageContent(resolvedBookingHref),
    [resolvedBookingHref],
  )

  const textLength = draft.trim().length
  const hasOversizeMessage = textLength > MAX_MESSAGE_CHARS
  const canSubmit = Boolean(textLength > 0 && !hasOversizeMessage && !isSubmitting)
  const userMessageCount = useMemo(
    () => messages.filter((message) => message.role === "user").length,
    [messages],
  )
  const shouldShowBookingPrimary = fallbackToHuman || (conversationState?.exchangeCount ?? 0) >= 2

  useEffect(() => {
    setIsMounted(true)

    const handleViewport = () => {
      setMode(parseViewportMode(fullscreenBreakpoint))
    }

    handleViewport()
    window.addEventListener("resize", handleViewport)

    if (window.innerWidth > fullscreenBreakpoint) {
      try {
        const hasOpened = window.sessionStorage.getItem(desktopAutoOpenSessionKey)
        if (hasOpened !== "1") {
          window.sessionStorage.setItem(desktopAutoOpenSessionKey, "1")
          setIsOpen(true)
        }
      } catch {
        setIsOpen(true)
      }
    }

    return () => {
      window.removeEventListener("resize", handleViewport)
    }
  }, [desktopAutoOpenSessionKey, fullscreenBreakpoint])

  useEffect(() => {
    if (!isOpen) {
      hasTrackedOpenRef.current = false
      return
    }

    if (hasTrackedOpenRef.current) {
      return
    }

    trackSalesChatOpen({ sourcePage })
    trackSalesChatOpenMode({ sourcePage, mode })
    hasTrackedOpenRef.current = true
  }, [isOpen, mode, sourcePage])

  useEffect(() => {
    if (!isOpen || hasTrackedWelcomeRef.current) {
      return
    }

    trackSalesChatWelcomeSeen({ sourcePage })
    hasTrackedWelcomeRef.current = true
  }, [isOpen, sourcePage])

  useEffect(() => {
    if (typeof messagesEndRef.current?.scrollIntoView === "function") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages, quickReplies, isTyping, isInlineBookingOpen])

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) {
      return
    }

    textarea.style.height = "0px"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }, [draft, isOpen])

  useEffect(() => {
    if (!isOpen || !shouldShowBookingPrimary || hasTrackedDemoCtaRef.current) {
      return
    }

    const sessionId = ensureSessionId()
    trackSalesChatDemoCtaShown({ sourcePage, sessionId })
    hasTrackedDemoCtaRef.current = true
    void emitServerEvent("sales_chat_demo_cta_shown")
  }, [isOpen, shouldShowBookingPrimary, sourcePage])

  useEffect(() => {
    if (!isMounted) {
      return
    }

    const className = "sales-chat-open"
    if (isOpen) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }

    return () => {
      document.body.classList.remove(className)
    }
  }, [isMounted, isOpen])

  const ensureSessionId = () => {
    if (sessionIdRef.current.length === 0) {
      sessionIdRef.current = buildSessionId()
    }
    return sessionIdRef.current
  }

  const nextMessageId = (prefix: "user" | "assistant") => {
    messageIdRef.current += 1
    return createMessageId(prefix, messageIdRef.current)
  }

  const appendMessage = (message: SalesChatMessage) => {
    setMessages((current) => [...current, message])
  }

  const appendAssistantMessageUnique = (content: string) => {
    const normalized = content.trim()
    if (!normalized) {
      return
    }

    setMessages((current) => {
      const lastAssistant = [...current].reverse().find((message) => message.role === "assistant")
      if (lastAssistant?.content.trim() === normalized) {
        return current
      }
      return [
        ...current,
        {
          id: nextMessageId("assistant"),
          role: "assistant",
          content: normalized,
          isNew: true,
        },
      ]
    })
  }

  const buildConversationHistoryWindow = (args: {
    inputValue: string
    appendUserMessage?: boolean
  }) => {
    const history = messages
      .slice(-6)
      .map((message) => ({
        role: message.role,
        content: message.content.trim(),
      }))
      .filter((turn) => turn.content.length > 0)

    if (args.appendUserMessage !== false) {
      const trimmed = args.inputValue.trim()
      if (trimmed.length > 0) {
        history.push({
          role: "user",
          content: trimmed,
        })
      }
    }

    return history.slice(-6)
  }

  const emitServerEvent = async (
    eventName: SalesChatEventName,
    options?: {
      stateTransition?: SalesChatState
      transcriptSnippet?: string
      metadata?: Record<string, unknown>
    },
  ) => {
    const sessionId = ensureSessionId()
    try {
      await fetch("/api/sales-chat/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          sourcePage,
          eventName,
          eventTs: new Date().toISOString(),
          stateTransition: options?.stateTransition,
          transcriptSnippet: options?.transcriptSnippet,
          metadata: options?.metadata,
        }),
      })
    } catch {
      // no-op
    }
  }

  const parseJsonResponse = async (response: Response): Promise<unknown> => {
    const contentType = response.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) {
      return null
    }

    try {
      return await response.json()
    } catch {
      return null
    }
  }

  const openInlineBooking = (trigger: "cta" | "preset" | "summary") => {
    if (!inlineBookingEnabled) {
      return
    }

    const sessionId = ensureSessionId()
    setIsInlineBookingOpen(true)

    trackSalesChatDemoCtaClicked({ sourcePage, sessionId, trigger })
    trackSalesChatCalendarOpened({ sourcePage, sessionId, trigger })

    void emitServerEvent("sales_chat_demo_cta_clicked", {
      metadata: { trigger },
    })
    void emitServerEvent("sales_chat_calendar_opened", {
      metadata: { trigger },
    })
  }

  const sendToEngine = async (args: {
    inputType: "text" | "button"
    inputValue: string
    buttonId?: string
    appendUserMessage?: boolean
  }) => {
    const sessionId = ensureSessionId()
    const trimmedInput = args.inputValue.trim()
    const conversationHistory = buildConversationHistoryWindow({
      inputValue: args.inputValue,
      appendUserMessage: args.appendUserMessage,
    })

    if (args.appendUserMessage !== false && trimmedInput) {
      appendMessage({
        id: nextMessageId("user"),
        role: "user",
        content: trimmedInput,
      })
      trackSalesChatMessageSent({
        sourcePage,
        messageLength: trimmedInput.length,
        sessionId,
      })
    }

    setIsSubmitting(true)
    setIsTyping(true)
    setErrorMessage(null)

    let requestTimeout: ReturnType<typeof setTimeout> | undefined

    try {
      const controller = new AbortController()
      requestTimeout = setTimeout(() => {
        controller.abort()
      }, REQUEST_TIMEOUT_MS)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          sessionId,
          sourcePage,
          inputType: args.inputType,
          inputValue: args.inputValue,
          buttonId: args.buttonId,
          conversationState: conversationState ?? undefined,
          conversationHistory: conversationHistory.length > 0 ? conversationHistory : undefined,
        }),
      })

      const parsedPayload = await parseJsonResponse(response)

      if (!response.ok) {
        const payload = isHandledErrorPayload(parsedPayload) ? parsedPayload : null
        const isHandledHandoff = payload?.fallbackToHuman ?? true
        const fallbackText = isHandledHandoff
          ? HANDOFF_FALLBACK_MESSAGE
          : payload?.message ?? payload?.error ?? DEFAULT_FALLBACK_MESSAGE

        appendAssistantMessageUnique(fallbackText)
        setFallbackToHuman(isHandledHandoff)
        setErrorMessage(null)

        if (payload?.conversationState) {
          setConversationState(payload.conversationState)
        }
        if (Array.isArray(payload?.quickReplies)) {
          setQuickReplies(payload.quickReplies)
        } else {
          setQuickReplies([])
        }

        if (
          isHandledHandoff
          && !isInlineBookingOpen
          && shouldAutoOpenInlineBooking({
            fallbackToHuman: true,
            exchangeCount: conversationState?.exchangeCount ?? userMessageCount,
          })
        ) {
          openInlineBooking("summary")
        }

        trackSalesChatError({
          errorType: payload?.errorType ?? "request_error",
          sourcePage,
          sessionId,
          details: { status: response.status },
        })

        void emitServerEvent("sales_chat_error", {
          metadata: { errorType: payload?.errorType ?? "request_error", status: response.status },
        })

        return
      }

      const payload = parsedPayload as SalesChatApiResponse | null
      if (!payload || typeof payload.assistantMessage !== "string") {
        throw new Error("Invalid chat response shape")
      }

      appendAssistantMessageUnique(payload.assistantMessage)
      setFallbackToHuman(Boolean(payload.fallbackToHuman))
      setQuickReplies(Array.isArray(payload.quickReplies) ? payload.quickReplies : [])
      setConversationState(payload.conversationState)
      setErrorMessage(null)
      const responseMode = payload.responseMode ?? "deterministic"

      trackSalesChatSpecNodeEntered({
        sourcePage,
        sessionId,
        nodeId: payload.nodeId,
        exchangeCount: payload.conversationState.exchangeCount,
      })
      void emitServerEvent("sales_chat_spec_node_entered", {
        metadata: {
          nodeId: payload.nodeId,
          exchangeCount: payload.conversationState.exchangeCount,
        },
      })

      if (payload.recommendedOffer) {
        trackSalesChatOfferRecommended({
          sourcePage,
          sessionId,
          nodeId: payload.nodeId,
          recommendedOffer: payload.recommendedOffer,
        })
        void emitServerEvent("sales_chat_offer_recommended", {
          metadata: {
            recommendedOffer: payload.recommendedOffer,
            nodeId: payload.nodeId,
          },
        })
      }

      if (responseMode === "ai_assisted") {
        trackSalesChatAiResponseUsed({
          sourcePage,
          sessionId,
          nodeId: payload.nodeId,
          responseMode,
          aiDecisionReason:
            payload.aiDecisionReason === "broad_mode"
            || payload.aiDecisionReason === "long_tail_trigger"
            || payload.aiDecisionReason === "repair_success"
              ? payload.aiDecisionReason
              : undefined,
          aiGuardrailCode: payload.aiGuardrailCode,
          aiModelUsed: payload.aiModelUsed,
          aiLatencyMs: payload.aiLatencyMs,
          aiLatencyBucket: payload.aiLatencyBucket,
          aiPromptVersion: payload.aiPromptVersion,
          aiRepairAttempted: payload.aiRepairAttempted,
          aiOrchestrationPath: payload.aiOrchestrationPath,
          aiFallbackReason: payload.aiFallbackReason,
          aiConfidence: payload.aiConfidence,
          aiIntentHint: payload.aiIntentHint,
        })
        void emitServerEvent("sales_chat_ai_response_used", {
          metadata: {
            nodeId: payload.nodeId,
            responseMode,
            aiDecisionReason: payload.aiDecisionReason,
            aiGuardrailCode: payload.aiGuardrailCode,
            aiModelUsed: payload.aiModelUsed,
            aiLatencyMs: payload.aiLatencyMs,
            aiLatencyBucket: payload.aiLatencyBucket,
            aiPromptVersion: payload.aiPromptVersion,
            aiRepairAttempted: payload.aiRepairAttempted,
            aiOrchestrationPath: payload.aiOrchestrationPath,
            aiFallbackReason: payload.aiFallbackReason,
            aiConfidence: payload.aiConfidence,
            aiIntentHint: payload.aiIntentHint,
          },
        })
      } else if (
        payload.aiDecisionReason === "guardrail_reject"
        || payload.aiDecisionReason === "gateway_error"
        || payload.aiDecisionReason === "disabled"
        || payload.aiDecisionReason === "canary_skip"
        || payload.aiDecisionReason === "banned_phrase_blocked"
      ) {
        trackSalesChatAiResponseRejected({
          sourcePage,
          sessionId,
          nodeId: payload.nodeId,
          responseMode,
          aiDecisionReason: payload.aiDecisionReason,
          aiGuardrailCode: payload.aiGuardrailCode,
          aiModelUsed: payload.aiModelUsed,
          aiLatencyMs: payload.aiLatencyMs,
          aiLatencyBucket: payload.aiLatencyBucket,
          aiPromptVersion: payload.aiPromptVersion,
          aiRepairAttempted: payload.aiRepairAttempted,
          aiOrchestrationPath: payload.aiOrchestrationPath,
          aiFallbackReason: payload.aiFallbackReason,
          aiConfidence: payload.aiConfidence,
          aiIntentHint: payload.aiIntentHint,
        })
        void emitServerEvent("sales_chat_ai_response_rejected", {
          metadata: {
            nodeId: payload.nodeId,
            responseMode,
            aiDecisionReason: payload.aiDecisionReason,
            aiGuardrailCode: payload.aiGuardrailCode,
            aiModelUsed: payload.aiModelUsed,
            aiLatencyMs: payload.aiLatencyMs,
            aiLatencyBucket: payload.aiLatencyBucket,
            aiPromptVersion: payload.aiPromptVersion,
            aiRepairAttempted: payload.aiRepairAttempted,
            aiOrchestrationPath: payload.aiOrchestrationPath,
            aiFallbackReason: payload.aiFallbackReason,
            aiConfidence: payload.aiConfidence,
            aiIntentHint: payload.aiIntentHint,
          },
        })
      }

      if (payload.terminalAction && payload.terminalAction !== "none") {
        const leadDispatchStatus = payload.leadDispatchStatus ?? "none"

        if (leadDispatchStatus !== "none") {
          trackSalesChatLeadPayloadAttempted({
            sourcePage,
            sessionId,
            terminalAction: payload.terminalAction,
            leadDispatchStatus,
            leadDispatchCode: payload.leadDispatchCode,
          })
          void emitServerEvent("sales_chat_lead_payload_attempted", {
            metadata: {
              terminalAction: payload.terminalAction,
              leadDispatchStatus,
              leadDispatchCode: payload.leadDispatchCode,
            },
          })
        }

        if (leadDispatchStatus === "succeeded") {
          trackSalesChatLeadPayloadEmitted({
            sourcePage,
            sessionId,
            terminalAction: payload.terminalAction,
          })
          void emitServerEvent("sales_chat_lead_payload_emitted", {
            metadata: {
              terminalAction: payload.terminalAction,
              leadDispatchStatus,
            },
          })
        }

        if (leadDispatchStatus === "failed") {
          trackSalesChatLeadPayloadFailed({
            sourcePage,
            sessionId,
            terminalAction: payload.terminalAction,
            leadDispatchCode: payload.leadDispatchCode,
          })
          void emitServerEvent("sales_chat_lead_payload_failed", {
            metadata: {
              terminalAction: payload.terminalAction,
              leadDispatchCode: payload.leadDispatchCode,
            },
          })
        }

        if (leadDispatchStatus === "failed") {
          trackSalesChatError({
            sourcePage,
            errorType: "lead_dispatch_failed",
            sessionId,
            details: {
              terminalAction: payload.terminalAction,
              leadDispatchCode: payload.leadDispatchCode,
            },
          })
        }
      }

      if (
        payload.fallbackToHuman
        && !isInlineBookingOpen
        && shouldAutoOpenInlineBooking({
          fallbackToHuman: true,
          exchangeCount: payload.conversationState.exchangeCount,
        })
      ) {
        openInlineBooking("summary")
      }
    } catch (error) {
      const parsedError =
        error instanceof Error && error.name === "AbortError"
          ? "Sales assistant response timed out. Use booking to reach a specialist."
          : "Unable to reach the sales assistant right now."

      setErrorMessage(parsedError)
      setFallbackToHuman(true)

      trackSalesChatError({
        errorType: error instanceof Error && error.name === "AbortError" ? "timeout" : "network",
        sourcePage,
        sessionId,
        details: {
          error: parsedError,
        },
      })
      void emitServerEvent("sales_chat_error", {
        metadata: {
          errorType: error instanceof Error && error.name === "AbortError" ? "timeout" : "network",
        },
      })
    } finally {
      if (requestTimeout !== undefined) {
        clearTimeout(requestTimeout)
      }

      setIsSubmitting(false)
      setIsTyping(false)
      textareaRef.current?.focus()
    }
  }

  useEffect(() => {
    if (!isOpen || hasRequestedWelcomeRef.current) {
      return
    }

    hasRequestedWelcomeRef.current = true
    void sendToEngine({
      inputType: "button",
      inputValue: "",
      buttonId: "__init__",
      appendUserMessage: false,
    })
  }, [isOpen])

  const handleQuickReply = (reply: SalesChatQuickReply) => {
    const sessionId = ensureSessionId()
    trackSalesChatQuickReplyClicked({
      sourcePage,
      sessionId,
      replyId: reply.id,
      replyLabel: reply.label,
      actionType: reply.actionType,
      nodeId: conversationState?.nodeId,
    })
    void emitServerEvent("sales_chat_quick_reply_clicked", {
      metadata: {
        replyId: reply.id,
        replyLabel: reply.label,
        actionType: reply.actionType,
        nodeId: conversationState?.nodeId,
      },
    })

    if (reply.actionType === "open_booking") {
      openInlineBooking("preset")
    }

    if (reply.actionType === "open_url" && reply.url) {
      if (reply.url.startsWith("#")) {
        window.location.hash = reply.url.slice(1)
      } else {
        window.open(reply.url, "_blank", "noopener,noreferrer")
      }
    }

    void sendToEngine({
      inputType: "button",
      inputValue: reply.label,
      buttonId: reply.id,
      appendUserMessage: true,
    })
  }

  const sendText = async (event?: FormEvent | KeyboardEvent) => {
    event?.preventDefault()
    if (!canSubmit) {
      return
    }

    const outboundMessage = draft.trim()
    setDraft("")

    await sendToEngine({
      inputType: "text",
      inputValue: outboundMessage,
      appendUserMessage: true,
    })
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen)
    if (!nextOpen) {
      setTimeout(() => {
        launcherButtonRef.current?.focus()
      }, 0)
    }
  }

  const openFromLauncher = () => {
    trackSalesChatLauncherClick({ sourcePage, mode })
    setIsOpen(true)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void sendText(event)
    }
  }

  const updateDraft = (value: string) => {
    setDraft(value)
    if (errorMessage) {
      setErrorMessage(null)
    }
  }

  const placeholder = fallbackToHuman
    ? "A specialist is ready. Share your details and we'll route you to booking."
    : "Type your message..."

  const panel = (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <div className={tokens.panelGlow} />
      <SalesChatHeader
        assistantStatusLabel={fallbackToHuman ? "Specialist ready" : "Online"}
        isFullscreen={mode === "fullscreen"}
        onClose={() => handleOpenChange(false)}
        visualStyle={visualStyle}
      />
      <div className="relative flex min-h-0 flex-1 flex-col gap-3 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        {shouldShowBookingPrimary ? (
          <div className="relative pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                className="rounded-full border border-white/20 bg-white/[0.05] text-xs tracking-[0.04em] text-zinc-100 hover:bg-white/[0.10]"
                onClick={() => openInlineBooking("cta")}
              >
                Book my 30-min demo
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
              </Button>
              <Button asChild type="button" variant="ghost" className="rounded-full text-xs text-zinc-300 hover:text-white">
                <Link href="/case-studies">Show similar case study first</Link>
              </Button>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full overflow-hidden">
              <svg
                className="h-full w-full origin-left text-white/30 motion-safe:animate-draw-line"
                preserveAspectRatio="none"
                aria-hidden
              >
                <rect width="100%" height="100%" fill="currentColor" />
              </svg>
            </div>
          </div>
        ) : null}

        <div className={tokens.transcriptFrame}>
          <SalesChatMessages
            isTyping={isTyping}
            messages={messages}
            messagesEndRef={messagesEndRef}
            onQuickReplyClick={handleQuickReply}
            quickReplies={quickReplies}
            renderMessageContent={renderMessageContent}
            visualStyle={visualStyle}
          />
        </div>

        {isInlineBookingOpen ? (
          <div className="space-y-3 rounded-2xl border border-white/12 bg-white/[0.02] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-zinc-100">Book your 30-min demo inside chat</p>
              <Button
                type="button"
                variant="ghost"
                className="h-8 rounded-full px-3 text-xs text-zinc-300 hover:text-white"
                onClick={() => setIsInlineBookingOpen(false)}
              >
                Close booking
              </Button>
            </div>
            <div className="flex justify-center">
              <svg
                className="h-5 w-2 text-white/35 origin-top motion-safe:animate-draw-line"
                preserveAspectRatio="none"
                aria-hidden
              >
                <rect width="100%" height="100%" fill="currentColor" />
              </svg>
            </div>

            <BookDemoEmbed className="w-full" variant="chat-inline" />

            <div className="flex flex-wrap items-center gap-2">
              <Link href={resolvedBookingHref} className="text-xs text-zinc-300 underline underline-offset-2 hover:text-white">
                Prefer full-page booking
              </Link>
            </div>
          </div>
        ) : null}

        <SalesChatComposer
          bookingHref={resolvedBookingHref}
          canSubmit={canSubmit}
          draft={draft}
          errorMessage={errorMessage}
          hasOversizeMessage={hasOversizeMessage}
          isSubmitting={isSubmitting}
          maxMessageChars={MAX_MESSAGE_CHARS}
          onDraftChange={updateDraft}
          onKeyDown={handleKeyDown}
          onSubmit={(event) => {
            void sendText(event)
          }}
          placeholder={placeholder}
          textLength={textLength}
          textareaRef={textareaRef}
          visualStyle={visualStyle}
        />
      </div>
    </div>
  )

  return (
    <>
      <SalesChatLauncher
        buttonRef={launcherButtonRef}
        isOpen={isOpen}
        onOpen={openFromLauncher}
        visualStyle={visualStyle}
      />
      {isMounted ? (
        mode === "fullscreen" ? (
          <SalesChatFullscreen open={isOpen} onOpenChange={handleOpenChange} visualStyle={visualStyle}>
            {panel}
          </SalesChatFullscreen>
        ) : (
          <SalesChatWindow open={isOpen} onOpenChange={handleOpenChange} visualStyle={visualStyle}>
            {panel}
          </SalesChatWindow>
        )
      ) : null}
    </>
  )
}
