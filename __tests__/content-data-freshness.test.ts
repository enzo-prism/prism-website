import fs from 'node:fs'
import path from 'node:path'

import { quotesData, takeawaysData } from '@/content/wall-of-love-data'
import {
  CONNECTED_CLIENT_TRAFFIC,
  PROOF_METRICS_VERIFIED_AT,
  SOCIAL_PROOF,
} from '@/lib/proof-metrics'
import { CASE_STUDIES } from '@/lib/case-study-data'

const normalizeVoice = (author: string, text: string) =>
  `${author.replace(/^@+/, '').trim()}\u0000${text}`
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\p{P}\p{S}\s]+/gu, ' ')
    .trim()

describe('public content data freshness', () => {
  it('keeps platform and compliance claims current and qualified', () => {
    const read = (file: string) =>
      fs.readFileSync(path.join(process.cwd(), file), 'utf8')
    const dentalAds = read('app/google/dental-ads/page.tsx')
    const google = read('app/google/page.tsx')
    const dentalAgent = read('app/ai-agents/dental/page.tsx')
    const workspaceGuide = read('app/google/dental-patient-forms/page.tsx')

    expect(`${dentalAds}\n${google}`).not.toMatch(/Google Partner/i)
    expect(dentalAds).not.toMatch(/Call ads and call extensions/i)
    expect(dentalAds).toContain('Responsive search ads with call assets')
    expect(dentalAgent).toContain('executed ElevenLabs BAA')
    expect(dentalAgent).toContain('Zero Retention Mode')
    expect(workspaceGuide).toContain('irreversibly purge')
    expect(workspaceGuide).toContain(
      'Vault retention does not retain Admin console audit events',
    )
  })

  it('keeps the Wall of Love count tied to unique source voices', () => {
    const voices = [
      ...quotesData.map((quote) => normalizeVoice(quote.client, quote.text)),
      ...takeawaysData.map((takeaway) =>
        normalizeVoice(takeaway.handle, takeaway.text),
      ),
    ]

    expect(voices).toHaveLength(242)
    expect(new Set(voices).size).toBe(voices.length)
  })

  it('keeps the shared social snapshot aligned with the live profiles', () => {
    expect(PROOF_METRICS_VERIFIED_AT).toBe('October 4, 2026')
    expect(SOCIAL_PROOF.instagram.audience).toBe('37K')
    expect(SOCIAL_PROOF.tiktok.audience).toBe('11.7K')
    expect(SOCIAL_PROOF.youtube.audience).toBe('24.7K')
    expect(SOCIAL_PROOF.combinedAudience).toBe('73K+')
  })

  it('keeps the machine-readable proof snapshot synchronized', () => {
    const publicData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'public/ai-data.json'), 'utf8'),
    )

    expect(publicData.last_verified).toBe('2026-10-04')
    expect(publicData.verified_proof.social.instagram.followers).toBe(
      SOCIAL_PROOF.instagram.audience,
    )
    expect(publicData.verified_proof.social.tiktok.followers).toBe(
      SOCIAL_PROOF.tiktok.audience,
    )
    expect(publicData.verified_proof.social.combined_audience).toBe(
      SOCIAL_PROOF.combinedAudience,
    )
    expect(publicData.proof_inventory.community_voices).toBe(242)
    expect(publicData.verified_proof.connected_client_traffic).toMatchObject({
      new_users: CONNECTED_CLIENT_TRAFFIC.newUsers,
      connected_sites: CONNECTED_CLIENT_TRAFFIC.connectedSites,
      period: CONNECTED_CLIENT_TRAFFIC.month,
    })
    expect(
      publicData.verified_proof.social.instagram.posts.toLocaleString('en-US'),
    ).toBe(SOCIAL_PROOF.instagram.activity)
    expect(
      publicData.verified_proof.social.tiktok.likes,
    ).toBe(SOCIAL_PROOF.tiktok.activity)
    expect(publicData.verified_proof.social.tiktok).not.toHaveProperty(
      'views_last_60_days',
    )
    for (const publicStudy of publicData.case_studies) {
      const study = CASE_STUDIES.find(
        (item) => item.client === publicStudy.client,
      )
      expect(study).toBeDefined()
      for (const metric of study?.structured?.results ?? []) {
        expect(publicStudy.result).toContain(metric.value)
        expect(publicStudy.period).toContain(metric.dateRange)
      }
    }
  })
})
