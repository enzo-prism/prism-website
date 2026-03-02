"use client"

import type { RefObject } from "react"
import { ArrowUpRight } from "lucide-react"

import { SALES_CHAT_VISUAL_TOKENS } from "@/components/sales-chat/constants"
import type {
  RenderMessageContent,
  SalesChatMessage,
  SalesChatQuickReply,
  SalesChatVisualStyle,
} from "@/components/sales-chat/types"
import { Button } from "@/components/ui/button"
import {
  Chat,
  ChatMessage,
  ChatMessageContent,
  ChatMessages,
} from "@/components/ui/chat"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type SalesChatMessagesProps = {
  messages: SalesChatMessage[]
  isTyping: boolean
  messagesEndRef: RefObject<HTMLDivElement | null>
  renderMessageContent: RenderMessageContent
  quickReplies: SalesChatQuickReply[]
  onQuickReplyClick: (reply: SalesChatQuickReply) => void
  visualStyle: SalesChatVisualStyle
}

function TypingIndicator() {
  return (
    <ChatMessage from="assistant">
      <ChatMessageContent className="max-w-[112px] rounded-2xl border border-white/18 bg-white/[0.055] text-slate-100">
        <div className="h-5 w-12 py-0.5">
          <svg
            className="h-full w-full text-white/75"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect x="4" y="8" width="3" height="8" rx="1.5" className="origin-center motion-safe:animate-waveform-1" />
            <rect x="10.5" y="6" width="3" height="12" rx="1.5" className="origin-center motion-safe:animate-waveform-2" />
            <rect x="17" y="8" width="3" height="8" rx="1.5" className="origin-center motion-safe:animate-waveform-3" />
          </svg>
        </div>
      </ChatMessageContent>
    </ChatMessage>
  )
}

export default function SalesChatMessages({
  messages,
  isTyping,
  messagesEndRef,
  renderMessageContent,
  quickReplies,
  onQuickReplyClick,
  visualStyle,
}: SalesChatMessagesProps) {
  const tokens = SALES_CHAT_VISUAL_TOKENS[visualStyle]

  return (
    <ScrollArea
      className="h-full px-4 py-4"
      role="log"
      aria-live="polite"
      aria-label="Sales conversation transcript"
    >
      <Chat className="gap-3.5">
        <ChatMessages>
          {messages.map((message) => {
            const isUser = message.role === "user"
            return (
              <ChatMessage key={message.id} from={isUser ? "user" : "assistant"}>
                <ChatMessageContent
                  className={cn(
                    "relative overflow-hidden",
                    isUser ? tokens.userBubble : tokens.assistantBubble,
                    !isUser && message.isNew ? "motion-safe:animate-message-reveal" : undefined,
                  )}
                >
                  {!isUser && message.isNew ? (
                    <svg
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30 mix-blend-overlay motion-safe:animate-shimmer-sweep"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id={`chat-shimmer-${message.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="transparent" />
                          <stop offset="50%" stopColor="white" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#chat-shimmer-${message.id})`} />
                    </svg>
                  ) : null}
                  <p className="sr-only">{isUser ? "You" : "Sales assistant"}</p>
                  <p className="relative z-10 whitespace-pre-wrap leading-relaxed">
                    {message.content ? renderMessageContent(message.content, message.id) : "..."}
                  </p>
                </ChatMessageContent>
              </ChatMessage>
            )
          })}
          {isTyping ? <TypingIndicator /> : null}
        </ChatMessages>

        {quickReplies.length > 0 ? (
          <div className="grid items-start gap-2 sm:grid-cols-2" aria-label="Suggested replies">
            {quickReplies.map((reply) => (
              <Button
                key={reply.id}
                type="button"
                variant="ghost"
                className={cn(
                  tokens.promptChip,
                  "group h-auto min-h-10 w-full max-w-full items-start justify-between gap-2 px-3.5 py-2.5 text-left whitespace-normal leading-snug",
                )}
                onClick={() => onQuickReplyClick(reply)}
              >
                <span className="min-w-0 flex-1 break-words text-left leading-snug [overflow-wrap:anywhere]">
                  {reply.label}
                </span>
                {(reply.actionType === "open_url" || reply.actionType === "open_booking") ? (
                  <ArrowUpRight
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 self-start opacity-75 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                ) : null}
              </Button>
            ))}
          </div>
        ) : null}

        <div ref={messagesEndRef} />
      </Chat>
    </ScrollArea>
  )
}
