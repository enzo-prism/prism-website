const DEFAULT_PRISM_SALES_AGENT_ID = 'agent_4701kkcyc4efefkv5x4awhysjyrh'
const DEFAULT_MARKDOWN_LINK_ALLOWED_HOSTS = [
  'calendar.notion.so',
  'notion.so',
  'cal.com',
  'design-prism.com',
] as const
const ENABLED_ENV_VALUES = new Set(['1', 'true', 'yes', 'on'])
export const PUBLIC_ELEVENLABS_WIDGET_ALLOWED_PATHS = [
  '/pricing',
  '/contact',
] as const
const PUBLIC_ELEVENLABS_WIDGET_ALLOWED_PATH_SET = new Set<string>(
  PUBLIC_ELEVENLABS_WIDGET_ALLOWED_PATHS,
)
export const PUBLIC_ELEVENLABS_WIDGET_MOBILE_MAX_WIDTH_PX = 767
export const PUBLIC_ELEVENLABS_WIDGET_MOBILE_MEDIA_QUERY = `(max-width: ${PUBLIC_ELEVENLABS_WIDGET_MOBILE_MAX_WIDTH_PX}px)`
const PUBLIC_ELEVENLABS_WIDGET_WEBGL_CONTEXT_IDS = [
  'webgl2',
  'webgl',
  'experimental-webgl',
] as const

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

function normalizePublicWidgetPathname(
  pathname: string | null | undefined,
): string | null {
  if (!pathname) {
    return null
  }

  let nextPathname = pathname.trim()

  if (!nextPathname) {
    return null
  }

  if (/^https?:\/\//i.test(nextPathname)) {
    try {
      nextPathname = new URL(nextPathname).pathname
    } catch {
      return null
    }
  }

  nextPathname = nextPathname.split('#')[0]?.split('?')[0] ?? ''

  if (!nextPathname.startsWith('/')) {
    return null
  }

  return nextPathname.length > 1
    ? nextPathname.replace(/\/+$/, '')
    : nextPathname
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

export function shouldRenderPublicElevenLabsWidget(
  pathname: string | null | undefined,
): boolean {
  const normalizedPathname = normalizePublicWidgetPathname(pathname)

  if (!normalizedPathname) {
    return false
  }

  return PUBLIC_ELEVENLABS_WIDGET_ALLOWED_PATH_SET.has(normalizedPathname)
}

export function canCreatePublicElevenLabsWidgetWebGLContext(
  documentRef: Document | undefined = typeof document === 'undefined'
    ? undefined
    : document,
): boolean {
  if (!documentRef) {
    return false
  }

  const canvas = documentRef.createElement('canvas')
  const getContext = canvas.getContext.bind(canvas) as (
    contextId: string,
  ) => RenderingContext | null

  for (const contextId of PUBLIC_ELEVENLABS_WIDGET_WEBGL_CONTEXT_IDS) {
    try {
      const context = getContext(contextId)

      if (!context) {
        continue
      }

      if (
        'getExtension' in context &&
        typeof context.getExtension === 'function'
      ) {
        context.getExtension('WEBGL_lose_context')?.loseContext()
      }

      return true
    } catch {
      // Some browsers throw when WebGL is disabled by policy or graphics state.
    }
  }

  return false
}
