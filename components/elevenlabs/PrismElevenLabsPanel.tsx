"use client"

import type { FormEvent, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

import { useConversation, type Status } from "@elevenlabs/react"
import { Loader2, Mic, MicOff, Phone, PhoneOff, Send } from "lucide-react"

import ElevenLabsOrbMark from "@/components/elevenlabs/ElevenLabsOrbMark"
import { Orb, type AgentState } from "@/components/ui/orb"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  createElevenLabsClientTools,
  getPublicElevenLabsAgentId,
  getPublicElevenLabsBookingUrl,
  getPublicElevenLabsMarkdownLinkAllowedHosts,
  resolveElevenLabsConversationUrl,
} from "@/lib/elevenlabs"
import { cn } from "@/lib/utils"

type ConversationSurface = "hero" | "dialog"

type PrismElevenLabsPanelProps = {
  className?: string
  surface?: ConversationSurface
  voiceLaunchToken?: number
}

type PrismConversationMode = "voice" | "text" | null

type PrismConversationMessage = {
  content: string
  id: string
  role: "assistant" | "user"
}

type PrismBookingLinkEventDetail = {
  label: string
  url: string
}

const PUBLIC_AGENT_ID = getPublicElevenLabsAgentId()
const PUBLIC_BOOKING_URL = getPublicElevenLabsBookingUrl()
const PUBLIC_ALLOWED_HOSTS = getPublicElevenLabsMarkdownLinkAllowedHosts()

const BOOKING_FLOW_ANCHOR = "#book-call"
const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g
const BARE_URL_PATTERN = /https?:\/\/[^\s<]+/g
const BOOKING_INTENT_PATTERN = /\b(book|booking|schedule|demo|meeting|call)\b/i
const CHAT_DELIVERY_PATTERN = /\b(link|calendar|slot|time|send|drop|chat)\b/i
const BOOKING_LINK_EVENT = "prism-elevenlabs-booking-link"

function pushTextLines(nodes: ReactNode[], value: string, keyPrefix: string): void {
  const lines = value.split("\n")

  lines.forEach((line, index) => {
    nodes.push(<span key={`${keyPrefix}-line-${index}`}>{line}</span>)

    if (index < lines.length - 1) {
      nodes.push(<br key={`${keyPrefix}-break-${index}`} />)
    }
  })
}

function renderAnchorNode(key: string, label: string, href: string): ReactNode {
  const isExternal = href.startsWith("https://")

  return (
    <a
      key={key}
      href={href}
      className="font-medium underline underline-offset-4"
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {label}
    </a>
  )
}

function renderPlainTextWithLinks(
  value: string,
  bookingUrl: string,
  keyPrefix: string,
): ReactNode[] {
  const nodes: ReactNode[] = []
  const bookingChunks = value.split(BOOKING_FLOW_ANCHOR)

  bookingChunks.forEach((bookingChunk, bookingIndex) => {
    let previousIndex = 0
    const bareUrls = [...bookingChunk.matchAll(BARE_URL_PATTERN)]

    if (bareUrls.length === 0) {
      pushTextLines(nodes, bookingChunk, `${keyPrefix}-text-${bookingIndex}`)
    } else {
      bareUrls.forEach((match, urlIndex) => {
        if (match.index === undefined) {
          return
        }

        if (match.index > previousIndex) {
          pushTextLines(
            nodes,
            bookingChunk.slice(previousIndex, match.index),
            `${keyPrefix}-text-${bookingIndex}-${urlIndex}`,
          )
        }

        const rawHref = match[0]
        const normalizedHref = resolveElevenLabsConversationUrl(rawHref, {
          allowedHosts: PUBLIC_ALLOWED_HOSTS,
          bookingUrl,
        })

        if (normalizedHref) {
          nodes.push(
            renderAnchorNode(
              `${keyPrefix}-url-${bookingIndex}-${urlIndex}`,
              rawHref,
              normalizedHref,
            ),
          )
        } else {
          pushTextLines(nodes, rawHref, `${keyPrefix}-unsafe-${bookingIndex}-${urlIndex}`)
        }

        previousIndex = match.index + rawHref.length
      })

      if (previousIndex < bookingChunk.length) {
        pushTextLines(
          nodes,
          bookingChunk.slice(previousIndex),
          `${keyPrefix}-tail-${bookingIndex}`,
        )
      }
    }

    if (bookingIndex < bookingChunks.length - 1) {
      nodes.push(renderAnchorNode(`${keyPrefix}-booking-${bookingIndex}`, "Book a call", bookingUrl))
    }
  })

  return nodes
}

function renderMessageContent(content: string, bookingUrl: string, keyPrefix: string): ReactNode[] {
  const tokens = [...content.matchAll(MARKDOWN_LINK_PATTERN)]

  if (tokens.length === 0) {
    return renderPlainTextWithLinks(content, bookingUrl, `${keyPrefix}-plain`)
  }

  const nodes: ReactNode[] = []
  let previousIndex = 0
  let tokenIndex = 0

  tokens.forEach((token) => {
    if (token.index === undefined) {
      return
    }

    const [fullMatch, label, rawHref] = token

    if (token.index > previousIndex) {
      nodes.push(
        ...renderPlainTextWithLinks(
          content.slice(previousIndex, token.index),
          bookingUrl,
          `${keyPrefix}-text-${tokenIndex}`,
        ),
      )
    }

    const normalizedHref = resolveElevenLabsConversationUrl(rawHref, {
      allowedHosts: PUBLIC_ALLOWED_HOSTS,
      bookingUrl,
    })

    if (normalizedHref) {
      nodes.push(renderAnchorNode(`${keyPrefix}-link-${tokenIndex}`, label, normalizedHref))
    } else {
      nodes.push(...renderPlainTextWithLinks(label, bookingUrl, `${keyPrefix}-label-${tokenIndex}`))
    }

    previousIndex = token.index + fullMatch.length
    tokenIndex += 1
  })

  if (previousIndex < content.length) {
    nodes.push(
      ...renderPlainTextWithLinks(content.slice(previousIndex), bookingUrl, `${keyPrefix}-tail`),
    )
  }

  return nodes
}

function hasLinkContent(value: string): boolean {
  return (
    value.includes(BOOKING_FLOW_ANCHOR)
    || /\[([^\]]+)\]\(([^)]+)\)/.test(value)
    || /https?:\/\/[^\s<]+/.test(value)
  )
}

function shouldAttachBookingFallback(value: string): boolean {
  if (hasLinkContent(value)) {
    return false
  }

  return BOOKING_INTENT_PATTERN.test(value) && CHAT_DELIVERY_PATTERN.test(value)
}

function createMessageId(prefix: string, index: number): string {
  return `${prefix}-${index}`
}

function createBookingMessage(label: string, url: string): string {
  return `[${label}](${url})`
}

function getStatusCopy(args: {
  conversationMode: PrismConversationMode
  errorMessage: string | null
  isMuted: boolean
  isSpeaking: boolean
  status: Status
}): string {
  if (args.errorMessage) {
    return args.errorMessage
  }

  if (args.status === "connecting") {
    return "Connecting to Prism..."
  }

  if (args.status === "connected" && args.conversationMode === "voice") {
    if (args.isMuted) {
      return "Microphone muted"
    }

    return args.isSpeaking ? "Prism is speaking" : "Listening for your next question"
  }

  if (args.status === "connected" && args.conversationMode === "text") {
    return "Text chat is live"
  }

  return "Talk or type to start"
}

function getConversationErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && error instanceof Error && error.message) {
    return error.message
  }

  if (typeof error === "string" && error.trim().length > 0) {
    return error
  }

  return fallback
}

export default function PrismElevenLabsPanel({
  className,
  surface = "hero",
  voiceLaunchToken,
}: PrismElevenLabsPanelProps) {
  const [conversationMode, setConversationMode] = useState<PrismConversationMode>(null)
  const [draft, setDraft] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isAwaitingAgent, setIsAwaitingAgent] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [messages, setMessages] = useState<PrismConversationMessage[]>([])

  const conversationModeRef = useRef<PrismConversationMode>(null)
  const messageIdRef = useRef(0)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const pendingTypedMessagesRef = useRef<string[]>([])
  const streamingMessageIdRef = useRef<string | null>(null)
  const lastVoiceLaunchTokenRef = useRef<number | null>(null)
  const [clientTools] = useState(() =>
    createElevenLabsClientTools({
      allowedHosts: PUBLIC_ALLOWED_HOSTS,
      bookingUrl: PUBLIC_BOOKING_URL,
      onLinkReady: ({ label, url }) => {
        window.dispatchEvent(
          new CustomEvent<PrismBookingLinkEventDetail>(BOOKING_LINK_EVENT, {
            detail: { label, url },
          }),
        )
      },
    }),
  )

  const appendMessage = (role: PrismConversationMessage["role"], content: string) => {
    const trimmedContent = content.trim()

    if (!trimmedContent) {
      return
    }

    setMessages((current) => [
      ...current,
      {
        content: trimmedContent,
        id: createMessageId(role, ++messageIdRef.current),
        role,
      },
    ])
  }

  const appendBookingMessage = (label: string, url: string) => {
    const content = createBookingMessage(label, url)

    setMessages((current) => {
      const lastMessage = current[current.length - 1]

      if (lastMessage?.role === "assistant" && lastMessage.content === content) {
        return current
      }

      return [
        ...current,
        {
          content,
          id: createMessageId("assistant", ++messageIdRef.current),
          role: "assistant",
        },
      ]
    })
  }

  useEffect(() => {
    const handleBookingLink = (event: Event) => {
      const detail = (event as CustomEvent<PrismBookingLinkEventDetail>).detail

      if (!detail?.label || !detail?.url) {
        return
      }

      appendBookingMessage(detail.label, detail.url)
    }

    window.addEventListener(BOOKING_LINK_EVENT, handleBookingLink)

    return () => {
      window.removeEventListener(BOOKING_LINK_EVENT, handleBookingLink)
    }
  }, [])

  const replaceStreamingMessage = (content: string) => {
    const streamingMessageId = streamingMessageIdRef.current
    const trimmedContent = content.trim()

    if (!streamingMessageId || !trimmedContent) {
      appendMessage("assistant", content)
      return
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === streamingMessageId ? { ...message, content: trimmedContent } : message,
      ),
    )

    streamingMessageIdRef.current = null
  }

  const conversation = useConversation({
    agentId: PUBLIC_AGENT_ID,
    clientTools,
    micMuted: isMuted,
    onAgentChatResponsePart: ({ text, type }) => {
      if (conversationModeRef.current !== "text") {
        return
      }

      if (type === "start") {
        const messageId = createMessageId("assistant", ++messageIdRef.current)
        streamingMessageIdRef.current = messageId
        setIsAwaitingAgent(true)
        setMessages((current) => [
          ...current,
          {
            content: "",
            id: messageId,
            role: "assistant",
          },
        ])
        return
      }

      if (type === "delta" && streamingMessageIdRef.current && text) {
        setMessages((current) =>
          current.map((message) =>
            message.id === streamingMessageIdRef.current
              ? { ...message, content: `${message.content}${text}` }
              : message,
          ),
        )
        return
      }

      if (type === "stop") {
        setIsAwaitingAgent(false)
      }
    },
    onDisconnect: ({ reason }) => {
      if (reason === "error") {
        setErrorMessage("The voice session dropped. You can still send a text message below.")
      }

      conversationModeRef.current = null
      streamingMessageIdRef.current = null
      setConversationMode(null)
      setIsAwaitingAgent(false)
      setIsMuted(false)
    },
    onError: (error) => {
      setErrorMessage(getConversationErrorMessage(error, "Unable to reach Prism right now."))
      setIsAwaitingAgent(false)
    },
    onMessage: ({ message, role }) => {
      if (typeof message !== "string" || message.trim().length === 0) {
        return
      }

      if (role === "agent") {
        setErrorMessage(null)
        setIsAwaitingAgent(false)
        replaceStreamingMessage(message)

        if (shouldAttachBookingFallback(message)) {
          appendBookingMessage("Book a 30-min demo", PUBLIC_BOOKING_URL)
        }

        return
      }

      if (role === "user") {
        const normalizedMessage = message.trim()
        const nextPendingMessage = pendingTypedMessagesRef.current[0]

        if (nextPendingMessage && nextPendingMessage === normalizedMessage) {
          pendingTypedMessagesRef.current.shift()
          return
        }

        appendMessage("user", normalizedMessage)
      }
    },
    onStatusChange: ({ status }) => {
      if (status === "connected") {
        setErrorMessage(null)
      }

      if (status === "disconnected") {
        setIsAwaitingAgent(false)
        setIsMuted(false)
      }
    },
  })

  const isConnected = conversation.status === "connected"
  const isConnecting = conversation.status === "connecting"
  const isVoiceSessionActive = isConnected && conversationMode === "voice"
  const isIdleState =
    !isConnected
    && !isConnecting
    && messages.length === 0
    && !isAwaitingAgent
    && !errorMessage
  const agentOrbState: AgentState = isConnecting
    ? "thinking"
    : isVoiceSessionActive
      ? conversation.isSpeaking
        ? "talking"
        : "listening"
      : isAwaitingAgent
        ? "thinking"
        : null
  const statusCopy = getStatusCopy({
    conversationMode,
    errorMessage,
    isMuted,
    isSpeaking: conversation.isSpeaking,
    status: conversation.status,
  })

  useEffect(() => {
    conversationModeRef.current = conversationMode
  }, [conversationMode])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isAwaitingAgent])

  useEffect(() => {
    if (!voiceLaunchToken || lastVoiceLaunchTokenRef.current === voiceLaunchToken) {
      return
    }

    lastVoiceLaunchTokenRef.current = voiceLaunchToken
    void handleStartVoiceSession()
  }, [voiceLaunchToken])

  const submitDraft = async () => {
    const nextMessage = draft.trim()

    if (!nextMessage) {
      return
    }

    setDraft("")
    setErrorMessage(null)
    setIsAwaitingAgent(true)
    pendingTypedMessagesRef.current.push(nextMessage)
    appendMessage("user", nextMessage)

    try {
      if (!isConnected) {
        setConversationMode("text")
        conversationModeRef.current = "text"

        await conversation.startSession({
          agentId: PUBLIC_AGENT_ID,
          connectionType: "websocket",
          overrides: {
            conversation: {
              textOnly: true,
            },
          },
          textOnly: true,
        })
      }

      conversation.sendUserMessage(nextMessage)
    } catch (error) {
      pendingTypedMessagesRef.current = pendingTypedMessagesRef.current.filter(
        (message) => message !== nextMessage,
      )
      setIsAwaitingAgent(false)
      setErrorMessage(getConversationErrorMessage(error, "Unable to send that message right now."))
    }
  }

  const handleStartVoiceSession = async () => {
    if (isConnecting) {
      return
    }

    setErrorMessage(null)
    setIsMuted(false)

    try {
      if (isConnected) {
        await conversation.endSession()
      }

      setConversationMode("voice")
      conversationModeRef.current = "voice"
      await conversation.startSession({
        agentId: PUBLIC_AGENT_ID,
        connectionType: "webrtc",
      })
    } catch (error) {
      conversationModeRef.current = null
      setConversationMode(null)
      setErrorMessage(getConversationErrorMessage(error, "Unable to start the voice session."))
    }
  }

  const handleEndSession = async () => {
    await conversation.endSession()
    conversationModeRef.current = null
    setConversationMode(null)
    setIsMuted(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await submitDraft()
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full flex-col overflow-hidden rounded-[24px] border border-black/[0.04] font-sans text-slate-950",
        surface === "dialog" ? "h-[34.375rem] max-w-[25rem]" : "h-[34.375rem] max-w-[22.25rem]",
        className,
      )}
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 40px 1px rgba(0, 0, 0, 0.12)",
      }}
    >
      {(!isIdleState || isVoiceSessionActive || isConnecting || errorMessage) ? (
        <div className="absolute inset-x-0 top-0 z-10 flex h-16 items-center justify-between bg-white/95 px-4 backdrop-blur-[2px]">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#e5e7eb]">
              <Orb className="h-full w-full" agentState={agentOrbState} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-950">Prism Sales AI</p>
              <p className="truncate text-sm text-slate-500">{statusCopy}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isVoiceSessionActive ? (
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-slate-600 transition hover:bg-slate-100"
                onClick={() => setIsMuted((current) => !current)}
                aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
              >
                {isMuted ? <MicOff className="h-4 w-4" aria-hidden /> : <Mic className="h-4 w-4" aria-hidden />}
              </button>
            ) : null}

            <button
              type="button"
              className={cn(
                "flex h-9 items-center justify-center rounded-full px-3 text-sm font-medium transition",
                isVoiceSessionActive
                  ? "bg-black text-white hover:bg-black/90"
                  : "border border-black/10 bg-white text-slate-700 hover:bg-slate-100",
              )}
              onClick={isVoiceSessionActive ? handleEndSession : handleStartVoiceSession}
              disabled={isConnecting}
              aria-label={isVoiceSessionActive ? "End voice" : "Start voice"}
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : isVoiceSessionActive ? (
                <PhoneOff className="h-4 w-4" aria-hidden />
              ) : (
                <Phone className="h-4 w-4" aria-hidden />
              )}
            </button>
          </div>
        </div>
      ) : null}

      <div className="relative flex-1 overflow-hidden">
        <ScrollArea
          className="h-full"
          role="log"
          aria-live="polite"
          aria-label="Prism conversation transcript"
        >
          <div
            className={cn(
              "relative px-4 pb-4",
              isIdleState ? "min-h-[27rem] pt-6" : "min-h-full pt-20",
            )}
          >
            {messages.length === 0 && !isAwaitingAgent ? (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative h-48 w-48">
                  <ElevenLabsOrbMark className="h-48 w-48" />

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[22px] bg-white p-1 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.35)]">
                    <button
                      type="button"
                      className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-black text-white transition hover:bg-black/90"
                      onClick={isVoiceSessionActive ? handleEndSession : handleStartVoiceSession}
                      disabled={isConnecting}
                      aria-label={isVoiceSessionActive ? "End voice" : "Start voice"}
                    >
                      {isConnecting ? (
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      ) : isVoiceSessionActive ? (
                        <PhoneOff className="h-5 w-5" aria-hidden />
                      ) : (
                        <Phone className="h-5 w-5" aria-hidden />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {(messages.length > 0 || isAwaitingAgent) ? (
              <div className="flex flex-col gap-3 pb-4">
                {messages.map((message) => {
                  const isUser = message.role === "user"

                  return (
                    <div
                      key={message.id}
                      className={cn("flex", isUser ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[82%] rounded-[20px] px-4 py-3 text-[15px] leading-6",
                          isUser
                            ? "bg-black text-white"
                            : "bg-[#f3f4f6] text-slate-700",
                        )}
                      >
                        <div
                          className={cn(
                            "[&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4",
                            isUser ? "[&_a]:text-white" : "[&_a]:text-slate-900",
                          )}
                        >
                          {renderMessageContent(message.content, PUBLIC_BOOKING_URL, message.id)}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {isAwaitingAgent ? (
                  <div className="flex justify-start">
                    <div className="rounded-[20px] bg-[#f3f4f6] px-4 py-3 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-slate-300 motion-safe:animate-pulse" />
                        <span className="h-2 w-2 rounded-full bg-slate-300 motion-safe:animate-pulse [animation-delay:120ms]" />
                        <span className="h-2 w-2 rounded-full bg-slate-300 motion-safe:animate-pulse [animation-delay:240ms]" />
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="relative z-10 w-full px-3 pb-3">
        <form onSubmit={handleSubmit}>
          <div className="relative overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white">
            <textarea
              rows={3}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)

                if (isConnected) {
                  conversation.sendUserActivity()
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  void submitDraft()
                }
              }}
              placeholder="Send a message..."
              className="h-[94px] w-full resize-none bg-transparent px-4 pt-4 pb-14 font-sans text-[15px] leading-5 tracking-normal text-slate-700 outline-none placeholder:text-slate-500"
              aria-label="Message Prism assistant"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 pb-3 pt-2">
              <div className="min-h-9">
                {isVoiceSessionActive ? (
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-slate-600 transition hover:bg-slate-100"
                    onClick={() => setIsMuted((current) => !current)}
                    aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" aria-hidden /> : <Mic className="h-4 w-4" aria-hidden />}
                  </button>
                ) : null}
              </div>

              <button
                type="submit"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition",
                  isConnecting || draft.trim().length === 0
                    ? "bg-[#a3a3a3] text-white"
                    : "bg-black text-white hover:bg-black/90",
                )}
                disabled={draft.trim().length === 0 || isConnecting}
                aria-label="Send message"
              >
                {isConnecting ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="h-4 w-4" aria-hidden />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
