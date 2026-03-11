const DEFAULT_PRISM_SALES_AGENT_ID = "agent_4701kkcyc4efefkv5x4awhysjyrh"
const DEFAULT_MARKDOWN_LINK_ALLOWED_HOSTS = [
  "calendar.notion.so",
  "notion.so",
  "www.notion.so",
  "cal.com",
  "www.cal.com",
  "design-prism.com",
  "www.design-prism.com",
] as const

type RedirectToExternalURLParams = {
  url?: string
}

type ElevenLabsClientTools = Record<string, unknown>

type ElevenLabsCallEventDetail = {
  config?: {
    clientTools?: ElevenLabsClientTools
  }
}

function normalizeAllowedHosts(value: string): string[] {
  return value
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
}

function normalizeHostname(hostname: string): string {
  return hostname.replace(/^www\./i, "").toLowerCase()
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

export function registerElevenLabsClientTools(
  widget: HTMLElement,
  allowedHosts = getPublicElevenLabsMarkdownLinkAllowedHosts(),
): () => void {
  const handleCall = (event: Event) => {
    const customEvent = event as CustomEvent<ElevenLabsCallEventDetail>
    const detail = customEvent.detail

    if (!detail) {
      return
    }

    const existingClientTools = detail.config?.clientTools ?? {}

    const redirectToExternalURL =
      typeof existingClientTools.redirectToExternalURL === "function"
        ? existingClientTools.redirectToExternalURL
        : ({ url }: RedirectToExternalURLParams = {}) => {
            if (typeof window === "undefined" || typeof url !== "string") {
              return
            }

            if (!isAllowedElevenLabsExternalUrl(url, allowedHosts)) {
              return
            }

            window.open(url, "_blank", "noopener,noreferrer")
          }

    detail.config = {
      ...(detail.config ?? {}),
      clientTools: {
        ...existingClientTools,
        redirectToExternalURL,
      },
    }
  }

  widget.addEventListener("elevenlabs-convai:call", handleCall as EventListener)

  return () => {
    widget.removeEventListener("elevenlabs-convai:call", handleCall as EventListener)
  }
}
