'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const DEFAULT_URL = 'https://example.com'

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

export default function WgetCommandBuilder({
  value,
  onValueChange,
  commandUrl,
}: WgetCommandBuilderProps) {
  const [internalValue, setInternalValue] = useState('')

  const inputValue = value ?? internalValue
  const setValue = onValueChange ?? setInternalValue
  const resolvedCommandUrl = commandUrl ?? deriveCommandUrl(inputValue)

  return (
    <div className="mt-3 space-y-3">
      <Label
        htmlFor="wget-command-url"
        className="text-sm font-medium text-foreground sm:text-base"
      >
        Enter your website URL
      </Label>
      <Input
        id="wget-command-url"
        type="url"
        inputMode="url"
        placeholder={DEFAULT_URL}
        value={inputValue}
        onChange={(event) => setValue(event.target.value)}
        className="h-11 w-full rounded-full border-white/[0.12] bg-background px-5 text-sm text-foreground placeholder:text-subtle sm:text-base"
        aria-describedby="wget-command-helper"
      />
      <p id="wget-command-helper" className="text-xs text-subtle sm:text-sm">
        The command below updates automatically with the URL you enter.
      </p>
      <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-background p-4 font-mono text-xs leading-relaxed text-foreground/90 sm:p-5 sm:text-sm">
        <code>{`wget -r -l inf -p -E -k -nc ${resolvedCommandUrl}`}</code>
      </pre>
    </div>
  )
}
