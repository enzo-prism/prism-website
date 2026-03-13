const DEFAULT_PRISM_SALES_AGENT_ID = 'agent_4701kkcyc4efefkv5x4awhysjyrh'
const DEFAULT_MARKDOWN_LINK_ALLOWED_HOSTS = [
  'calendar.notion.so',
  'notion.so',
  'cal.com',
  'design-prism.com',
] as const
const ENABLED_ENV_VALUES = new Set(['1', 'true', 'yes', 'on'])

declare global {
  interface Window {
    __PRISM_DISABLE_ELEVENLABS_WIDGET__?: boolean
  }
}

function normalizeAllowedHosts(value: string): string[] {
  return value
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
}

function isTruthyEnvValue(value: string | undefined): boolean {
  return value ? ENABLED_ENV_VALUES.has(value.trim().toLowerCase()) : false
}

export function getPublicElevenLabsAgentId(
  env: NodeJS.ProcessEnv = process.env,
): string {
  const configuredAgentId = env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim()

  if (configuredAgentId && configuredAgentId.length > 0) {
    return configuredAgentId
  }

  return DEFAULT_PRISM_SALES_AGENT_ID
}

export function getPublicElevenLabsMarkdownLinkAllowedHosts(
  env: NodeJS.ProcessEnv = process.env,
): string {
  const configuredAllowedHosts =
    env.NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS?.trim()

  if (configuredAllowedHosts) {
    const normalizedConfiguredHosts = normalizeAllowedHosts(
      configuredAllowedHosts,
    )

    if (normalizedConfiguredHosts.length > 0) {
      return normalizedConfiguredHosts.join(',')
    }
  }

  return DEFAULT_MARKDOWN_LINK_ALLOWED_HOSTS.join(',')
}

export function isPublicElevenLabsWidgetEnabled(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  if (
    typeof window !== 'undefined' &&
    window.__PRISM_DISABLE_ELEVENLABS_WIDGET__ === true
  ) {
    return false
  }

  const disabledValue =
    env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED ??
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED

  return !isTruthyEnvValue(disabledValue)
}
