"use client"

import type { FormEvent, KeyboardEvent, RefObject } from "react"
import Link from "next/link"
import { CalendarPlus2, SendHorizontal } from "lucide-react"

import { SALES_CHAT_VISUAL_TOKENS } from "@/components/sales-chat/constants"
import type { SalesChatVisualStyle } from "@/components/sales-chat/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type SalesChatComposerProps = {
  bookingHref: string
  canSubmit: boolean
  draft: string
  errorMessage: string | null
  hasOversizeMessage: boolean
  isSubmitting: boolean
  maxMessageChars: number
  onDraftChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  placeholder: string
  textLength: number
  textareaRef: RefObject<HTMLTextAreaElement | null>
  visualStyle: SalesChatVisualStyle
}

export default function SalesChatComposer({
  bookingHref,
  canSubmit,
  draft,
  errorMessage,
  hasOversizeMessage,
  isSubmitting,
  maxMessageChars,
  onDraftChange,
  onKeyDown,
  onSubmit,
  placeholder,
  textLength,
  textareaRef,
  visualStyle,
}: SalesChatComposerProps) {
  const tokens = SALES_CHAT_VISUAL_TOKENS[visualStyle]
  const showCounter = textLength > 0 || hasOversizeMessage

  return (
    <div className="space-y-2.5">
      {errorMessage ? (
        <Alert className="border-red-300/35 bg-red-400/10 text-red-100">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      <form
        onSubmit={onSubmit}
        aria-label="Sales chat form"
        className={tokens.composerFrame}
      >
        <Label htmlFor="sales-chat-message" className="sr-only">
          Message sales assistant
        </Label>
        <div className="relative">
          <Textarea
            ref={textareaRef}
            id="sales-chat-message"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            maxLength={maxMessageChars}
            aria-invalid={hasOversizeMessage}
            className={tokens.composerInput}
            placeholder={placeholder}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!canSubmit}
            aria-label="Send message"
            className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border border-white/25 bg-white/8 text-white hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden />
            <span className="sr-only">{isSubmitting ? "Sending message" : "Send message"}</span>
          </Button>
        </div>
        {showCounter ? (
          <div className="mt-1 flex items-center justify-end px-2 pb-1">
            <p className={cn(tokens.composerCount, hasOversizeMessage && "text-red-200")}>
              {textLength}/{maxMessageChars}
            </p>
          </div>
        ) : null}
      </form>

      <p className={tokens.bookingText}>
        Prefer a live human conversation?{" "}
        <Link
          href={bookingHref}
          className="inline-flex items-center gap-1 underline underline-offset-2 transition-colors hover:text-white/95"
        >
          <CalendarPlus2 className="h-3.5 w-3.5" aria-hidden />
          Open booking
        </Link>
      </p>
    </div>
  )
}
