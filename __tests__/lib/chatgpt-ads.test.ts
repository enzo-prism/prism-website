import { verifyChatGptAdsInvite } from '@/lib/chatgpt-ads-invites'
import {
  normalizeInviteCode,
  parseInviteSession,
  serializeInviteSession,
} from '@/lib/chatgpt-ads'
import { routeSurfaceForPath } from '@/lib/route-surface'

describe('ChatGPT ads invites', () => {
  it('accepts the Michael partner code without regard to case or spaces', () => {
    expect(normalizeInviteCode(' Michael ')).toBe('michael')
    expect(verifyChatGptAdsInvite('Michael')?.invitedBy).toBe('Dr. Michael Njo')
    expect(verifyChatGptAdsInvite('njo')?.partnerId).toBe('michael')
    expect(verifyChatGptAdsInvite('neo')?.partnerId).toBe('michael')
    expect(verifyChatGptAdsInvite('prism')?.invitedBy).toBe('Prism')
  })

  it('rejects unknown codes', () => {
    expect(verifyChatGptAdsInvite('')).toBeNull()
    expect(verifyChatGptAdsInvite('open-sesame')).toBeNull()
  })

  it('round-trips the invite session payload', () => {
    const invite = { partnerId: 'michael', invitedBy: 'Dr. Michael Njo' }
    expect(parseInviteSession(serializeInviteSession(invite))).toEqual(invite)
    expect(parseInviteSession('not-json')).toBeNull()
  })
})

describe('routeSurfaceForPath', () => {
  it('marks the ChatGPT ads landing as its own light surface', () => {
    expect(routeSurfaceForPath('/chatgpt-ads')).toBe('chatgpt-ads')
    expect(routeSurfaceForPath('/chatgpt-ads/')).toBe('chatgpt-ads')
    expect(routeSurfaceForPath('/')).toBe('home-black')
    expect(routeSurfaceForPath('/ads')).toBe('default')
  })
})
