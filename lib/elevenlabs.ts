const DEFAULT_PRISM_SALES_AGENT_ID = "agent_4701kkcyc4efefkv5x4awhysjyrh"

export function getPublicElevenLabsAgentId(env: NodeJS.ProcessEnv = process.env): string {
  const configuredAgentId = env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim()

  if (configuredAgentId && configuredAgentId.length > 0) {
    return configuredAgentId
  }

  return DEFAULT_PRISM_SALES_AGENT_ID
}

