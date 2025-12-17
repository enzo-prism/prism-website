"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const DEFAULT_URL = "https://example.com"

export const deriveCommandUrl = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return DEFAULT_URL
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

interface WgetCommandBuilderProps {
  value?: string
  onValueChange?: (value: string) => void
  commandUrl?: string
}

export default function WgetCommandBuilder({ value, onValueChange, commandUrl }: WgetCommandBuilderProps) {
  const [internalValue, setInternalValue] = useState("")

  const inputValue = value ?? internalValue
  const setValue = onValueChange ?? setInternalValue
  const resolvedCommandUrl = commandUrl ?? deriveCommandUrl(inputValue)

  return (
    <div className="mt-3 space-y-3">
      <Label htmlFor="wget-command-url" className="text-sm font-semibold text-neutral-800 sm:text-base">
        Enter your website URL
      </Label>
      <Input
        id="wget-command-url"
        type="url"
        inputMode="url"
        placeholder={DEFAULT_URL}
        value={inputValue}
        onChange={(event) => setValue(event.target.value)}
        className="h-auto w-full rounded-full border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-neutral-900 sm:text-base"
        aria-describedby="wget-command-helper"
      />
      <p id="wget-command-helper" className="text-xs text-neutral-500 sm:text-sm">
        The command below updates automatically with the URL you enter.
      </p>
      <pre className="overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:p-5 sm:text-sm lg:text-base">
        <code>{`wget -r -l inf -p -E -k -nc ${resolvedCommandUrl}`}</code>
      </pre>
    </div>
  )
}
