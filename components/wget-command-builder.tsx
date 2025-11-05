"use client"

import { useState } from "react"

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
      <label htmlFor="wget-command-url" className="text-sm font-semibold text-neutral-800">
        Enter your website URL
      </label>
      <input
        id="wget-command-url"
        type="url"
        inputMode="url"
        placeholder={DEFAULT_URL}
        value={inputValue}
        onChange={(event) => setValue(event.target.value)}
        className="w-full rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
        aria-describedby="wget-command-helper"
      />
      <p id="wget-command-helper" className="text-xs text-neutral-500">
        The command below updates automatically with the URL you enter.
      </p>
      <pre className="overflow-x-auto rounded-xl bg-neutral-900 p-4 text-xs text-white sm:text-sm">
        <code>{`wget -r -l inf -p -E -k -nc ${resolvedCommandUrl}`}</code>
      </pre>
    </div>
  )
}
