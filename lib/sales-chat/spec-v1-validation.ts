import type { QuickReply } from "@/lib/sales-chat/spec-v1-types"

const MAX_BUTTONS = 5

export function normalizeInput(value: string): string {
  return value.trim().toLowerCase()
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isLikelyWebsiteUrl(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (/^https?:\/\//i.test(trimmed)) return true
  return /^[a-z0-9][a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)
}

export function normalizeWebsiteUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function enforceButtonPolicy(buttons: QuickReply[]): QuickReply[] {
  if (buttons.length <= MAX_BUTTONS) {
    return buttons
  }
  return buttons.slice(0, MAX_BUTTONS)
}

export function hasForwardPath(message: string, buttons: QuickReply[]): boolean {
  if (buttons.length > 0) {
    return true
  }

  return /\?/.test(message) || /book|audit|get started|next step|ready/i.test(message)
}

export function isKnownBusinessType(value: string): boolean {
  const normalized = normalizeInput(value)
  return [
    "dental / medical",
    "dental / medical practice",
    "local retail / shop",
    "consulting / services",
    "online community",
    "nonprofit / education",
    "other",
    "dental / medical practice",
    "local retail or service business",
    "consulting or professional services",
    "online community or membership",
    "something else",
  ].includes(normalized)
}
