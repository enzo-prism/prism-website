export const CHATGPT_ADS_PATH = '/chatgpt-ads'
export const CHATGPT_ADS_COOKIE = 'prism_chatgpt_ads_invite'
export const CHATGPT_ADS_STORAGE_KEY = 'prism:chatgpt-ads:invite'
export const CHATGPT_ADS_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30

export type ChatGptAdsInvite = {
  partnerId: string
  invitedBy: string
}

export function normalizeInviteCode(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

export function serializeInviteSession(invite: ChatGptAdsInvite): string {
  return JSON.stringify({
    partnerId: invite.partnerId,
    invitedBy: invite.invitedBy,
  })
}

export function parseInviteSession(value: string | null | undefined): ChatGptAdsInvite | null {
  if (!value) return null

  try {
    const parsed = JSON.parse(value) as Partial<ChatGptAdsInvite>
    if (
      typeof parsed.partnerId === 'string' &&
      parsed.partnerId.trim().length > 0 &&
      typeof parsed.invitedBy === 'string' &&
      parsed.invitedBy.trim().length > 0
    ) {
      return {
        partnerId: parsed.partnerId.trim(),
        invitedBy: parsed.invitedBy.trim(),
      }
    }
  } catch {
    return null
  }

  return null
}
