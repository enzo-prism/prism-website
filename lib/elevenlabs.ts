// Production currently uses the stock ElevenLabs widget. The public agent/link helpers below are active,
// while the richer client-tool utilities remain in the repo for legacy tests and future SDK experiments.
const DEFAULT_PRISM_SALES_AGENT_ID = "agent_4701kkcyc4efefkv5x4awhysjyrh"
const DEFAULT_PUBLIC_BOOKING_URL = "/get-started#book-call"
const DEFAULT_MARKDOWN_LINK_ALLOWED_HOSTS = [
  "calendar.notion.so",
  "notion.so",
  "www.notion.so",
  "cal.com",
  "www.cal.com",
  "design-prism.com",
  "www.design-prism.com",
] as const
const ENABLED_ENV_VALUES = new Set(["1", "true", "yes", "on"])

declare global {
  interface Window {
    __PRISM_DISABLE_ELEVENLABS_WIDGET__?: boolean
  }
}

type ElevenLabsLinkToolParams = {
  href?: string
  label?: string
  openInNewTab?: boolean
  shouldOpen?: boolean
  text?: string
  url?: string
}

type ElevenLabsClientToolResult = string | number | void | Promise<string | number | void>
type ElevenLabsClientTool = (params?: ElevenLabsLinkToolParams) => ElevenLabsClientToolResult
type ElevenLabsClientTools = Record<string, ElevenLabsClientTool>

type ElevenLabsSharedLinkPayload = {
  label: string
  url: string
}

type ElevenLabsCallEventDetail = {
  config?: {
    clientTools?: ElevenLabsClientTools
  }
}

type CreateElevenLabsClientToolsOptions = {
  allowedHosts?: string
  bookingUrl?: string
  onLinkReady?: (payload: ElevenLabsSharedLinkPayload) => void
}

function normalizeAllowedHosts(value: string): string[] {
  return value
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
}

function isTruthyEnvValue(value: string | undefined): boolean {
  return value ? ENABLED_ENV_VALUES.has(value.trim().toLowerCase()) : false
}

function normalizeHostname(hostname: string): string {
  return hostname.replace(/^www\./i, "").toLowerCase()
}

function buildSharedLinkMarkdown({ label, url }: ElevenLabsSharedLinkPayload): string {
  return `[${label}](${url})`
}

function normalizeSharedLinkLabel(params: ElevenLabsLinkToolParams, bookingUrl: string): string {
  const explicitLabel = params.label?.trim() || params.text?.trim()

  if (explicitLabel) {
    return explicitLabel
  }

  const nextUrl = params.url?.trim() || params.href?.trim()

  if (!nextUrl || nextUrl === bookingUrl) {
    return "Book a 30-min demo"
  }

  return "Open link"
}

export function getPublicElevenLabsAgentId(env: NodeJS.ProcessEnv = process.env): string {
  const configuredAgentId = env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim()

  if (configuredAgentId && configuredAgentId.length > 0) {
    return configuredAgentId
  }

  return DEFAULT_PRISM_SALES_AGENT_ID
}

export function getPublicElevenLabsMarkdownLinkAllowedHosts(
  env: NodeJS.ProcessEnv = process.env,
): string {
  const configuredAllowedHosts = env.NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS?.trim()

  if (configuredAllowedHosts) {
    const normalizedConfiguredHosts = normalizeAllowedHosts(configuredAllowedHosts)

    if (normalizedConfiguredHosts.length > 0) {
      return normalizedConfiguredHosts.join(",")
    }
  }

  return DEFAULT_MARKDOWN_LINK_ALLOWED_HOSTS.join(",")
}

export function getPublicElevenLabsBookingUrl(env: NodeJS.ProcessEnv = process.env): string {
  const configuredBookingUrl = env.NEXT_PUBLIC_ELEVENLABS_BOOKING_URL?.trim()

  if (configuredBookingUrl && configuredBookingUrl.length > 0) {
    return configuredBookingUrl
  }

  return DEFAULT_PUBLIC_BOOKING_URL
}

export function isPublicElevenLabsWidgetEnabled(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  if (typeof window !== "undefined" && window.__PRISM_DISABLE_ELEVENLABS_WIDGET__ === true) {
    return false
  }

  const disabledValue =
    env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED ??
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED

  return !isTruthyEnvValue(disabledValue)
}

export function isAllowedElevenLabsExternalUrl(
  urlString: string,
  allowedHosts = getPublicElevenLabsMarkdownLinkAllowedHosts(),
): boolean {
  let parsedUrl: URL

  try {
    parsedUrl = new URL(urlString)
  } catch {
    return false
  }

  if (parsedUrl.protocol !== "https:") {
    return false
  }

  const normalizedAllowedHosts = normalizeAllowedHosts(allowedHosts)

  if (normalizedAllowedHosts.includes("*")) {
    return true
  }

  const normalizedHostname = normalizeHostname(parsedUrl.hostname)

  return normalizedAllowedHosts.some((allowedHost) => {
    return normalizeHostname(allowedHost) === normalizedHostname
  })
}

export function resolveElevenLabsConversationUrl(
  urlString: string | undefined,
  options: Pick<CreateElevenLabsClientToolsOptions, "allowedHosts" | "bookingUrl"> = {},
): string | null {
  const bookingUrl = options.bookingUrl ?? getPublicElevenLabsBookingUrl()
  const allowedHosts = options.allowedHosts ?? getPublicElevenLabsMarkdownLinkAllowedHosts()
  const trimmedUrl = urlString?.trim()

  if (!trimmedUrl || trimmedUrl === "#" || trimmedUrl === "#book-call") {
    return bookingUrl
  }

  if (
    trimmedUrl.toLowerCase() === "book-call"
    || trimmedUrl.toLowerCase() === "/book-call"
    || trimmedUrl.startsWith("#")
  ) {
    return bookingUrl
  }

  if (trimmedUrl.startsWith("/")) {
    return trimmedUrl
  }

  return isAllowedElevenLabsExternalUrl(trimmedUrl, allowedHosts) ? trimmedUrl : null
}

export function createElevenLabsClientTools(
  options: CreateElevenLabsClientToolsOptions = {},
): ElevenLabsClientTools {
  const allowedHosts = options.allowedHosts ?? getPublicElevenLabsMarkdownLinkAllowedHosts()
  const bookingUrl = options.bookingUrl ?? getPublicElevenLabsBookingUrl()
  const onLinkReady = options.onLinkReady

  const shareLink = (params: ElevenLabsLinkToolParams = {}): ElevenLabsSharedLinkPayload | null => {
    const resolvedUrl = resolveElevenLabsConversationUrl(params.url ?? params.href, {
      allowedHosts,
      bookingUrl,
    })

    if (!resolvedUrl) {
      return null
    }

    const payload = {
      label: normalizeSharedLinkLabel(params, bookingUrl),
      url: resolvedUrl,
    }

    onLinkReady?.(payload)

    if (
      typeof window !== "undefined"
      && (params.shouldOpen === true || params.openInNewTab === true || !onLinkReady)
    ) {
      window.open(payload.url, "_blank", "noopener,noreferrer")
    }

    return payload
  }

  return {
    redirectToExternalURL: (params: ElevenLabsLinkToolParams = {}) => {
      const payload = shareLink(params)

      if (!payload) {
        return "Unable to share that link."
      }

      return onLinkReady
        ? `Shared ${buildSharedLinkMarkdown(payload)} in the chat.`
        : `Opened ${payload.url}.`
    },
    shareBookingLink: (params: ElevenLabsLinkToolParams = {}) => {
      const payload = shareLink({
        ...params,
        label: params.label ?? "Book a 30-min demo",
        url: params.url ?? params.href ?? bookingUrl,
      })

      if (!payload) {
        return "Unable to share the booking link."
      }

      return `Shared ${buildSharedLinkMarkdown(payload)} in the chat.`
    },
    share_booking_link: (params: ElevenLabsLinkToolParams = {}) => {
      return shareLink({
        ...params,
        label: params.label ?? "Book a 30-min demo",
        url: params.url ?? params.href ?? bookingUrl,
      })
        ? "Booking link shared."
        : "Unable to share the booking link."
    },
    postLinkToChat: (params: ElevenLabsLinkToolParams = {}) => {
      return shareLink(params) ? "Link shared in chat." : "Unable to share that link."
    },
  }
}

export function registerElevenLabsClientTools(
  widget: HTMLElement,
  allowedHosts = getPublicElevenLabsMarkdownLinkAllowedHosts(),
  onLinkReady?: (payload: ElevenLabsSharedLinkPayload) => void,
): () => void {
  const handleCall = (event: Event) => {
    const customEvent = event as CustomEvent<ElevenLabsCallEventDetail>
    const detail = customEvent.detail

    if (!detail) {
      return
    }

    const existingClientTools = detail.config?.clientTools ?? {}
    const clientTools = createElevenLabsClientTools({
      allowedHosts,
      onLinkReady,
    })

    detail.config = {
      ...(detail.config ?? {}),
      clientTools: {
        ...existingClientTools,
        ...clientTools,
      },
    }
  }

  widget.addEventListener("elevenlabs-convai:call", handleCall as EventListener)

  return () => {
    widget.removeEventListener("elevenlabs-convai:call", handleCall as EventListener)
  }
}

export function publishPrismWidgetExpandedState(expanded: boolean): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return
  }

  const root = document.documentElement

  if (expanded) {
    root.dataset.prismWidgetExpanded = "true"
  } else {
    delete root.dataset.prismWidgetExpanded
  }

  window.dispatchEvent(
    new CustomEvent("prism-widget-expanded-change", {
      detail: { expanded },
    }),
  )
}
