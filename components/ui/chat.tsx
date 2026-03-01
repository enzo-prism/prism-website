import * as React from "react"

import { cn } from "@/lib/utils"

type ChatMessageFrom = "user" | "assistant"

const Chat = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="chat"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  ),
)
Chat.displayName = "Chat"

const ChatMessages = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="chat-messages"
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
))
ChatMessages.displayName = "ChatMessages"

type ChatMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  from: ChatMessageFrom
}

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ className, from, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="chat-message"
      data-from={from}
      className={cn(
        "flex w-full items-end gap-2",
        from === "user" ? "justify-end" : "justify-start",
        className,
      )}
      {...props}
    />
  ),
)
ChatMessage.displayName = "ChatMessage"

const ChatMessageAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="chat-message-avatar"
    className={cn(
      "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
      className,
    )}
    {...props}
  />
))
ChatMessageAvatar.displayName = "ChatMessageAvatar"

const ChatMessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="chat-message-content"
    className={cn(
      "max-w-[86%] rounded-2xl border border-border/60 px-3 py-2 text-sm shadow-sm",
      className,
    )}
    {...props}
  />
))
ChatMessageContent.displayName = "ChatMessageContent"

export {
  Chat,
  ChatMessages,
  ChatMessage,
  ChatMessageAvatar,
  ChatMessageContent,
}
