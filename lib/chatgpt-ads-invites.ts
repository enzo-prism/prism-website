import 'server-only'

import {
  normalizeInviteCode,
  type ChatGptAdsInvite,
} from '@/lib/chatgpt-ads'

const INVITES: Record<string, ChatGptAdsInvite> = {
  michael: {
    partnerId: 'michael',
    invitedBy: 'Dr. Michael Njo',
  },
  njo: {
    partnerId: 'michael',
    invitedBy: 'Dr. Michael Njo',
  },
  neo: {
    partnerId: 'michael',
    invitedBy: 'Dr. Michael Njo',
  },
  prism: {
    partnerId: 'prism',
    invitedBy: 'Prism',
  },
}

export function verifyChatGptAdsInvite(code: string): ChatGptAdsInvite | null {
  const normalized = normalizeInviteCode(code)
  if (!normalized) return null
  return INVITES[normalized] ?? null
}
