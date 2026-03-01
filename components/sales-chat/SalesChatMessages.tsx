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
        <div className="flex items-center gap-1.5 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:180ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:360ms]" />
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
                <ChatMessageContent className={cn(isUser ? tokens.userBubble : tokens.assistantBubble)}>
                  <p className="sr-only">{isUser ? "You" : "Sales assistant"}</p>
                  <p className="whitespace-pre-wrap leading-relaxed">
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
                  "h-auto min-h-10 w-full max-w-full items-start justify-between gap-2 px-3.5 py-2.5 text-left whitespace-normal leading-snug",
                )}
                onClick={() => onQuickReplyClick(reply)}
              >
                <span className="min-w-0 flex-1 break-words text-left leading-snug [overflow-wrap:anywhere]">
                  {reply.label}
                </span>
                {(reply.actionType === "open_url" || reply.actionType === "open_booking") ? (
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 self-start" aria-hidden />
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
