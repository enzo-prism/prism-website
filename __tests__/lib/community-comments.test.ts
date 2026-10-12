import { getCommunityComments } from '@/components/services/community-comments'
import { quotesData, takeawaysData } from '@/content/wall-of-love-data'
import {
  allCommunityComments,
  curatedCommunityComments,
  emojiOnlyCommunityComments,
  getCommentCraftScore,
  getCommentExclusionReason,
  getRecordExclusionReason,
  isCuratedComment,
  isLowSignalComment,
  onBrandCommunityComments,
} from '@/lib/community-comments'

const textOf = (id: number) => {
  const quote = quotesData.find((item) => item.id === id)
  if (!quote) throw new Error(`missing quote ${id}`)
  return quote.text
}

const takeawayTextOf = (id: number) => {
  const takeaway = takeawaysData.find((item) => item.id === id)
  if (!takeaway) throw new Error(`missing takeaway ${id}`)
  return takeaway.text
}

const curatedTexts = curatedCommunityComments.map((record) => record.text)

describe('community comment curation rules', () => {
  it.each([
    ['Hormozi will always be my goat 🐐', 'named-person'],
    ['Yeah man alex said the same thing... If it\'s hard now then it will be nearly impossible later..', 'named-person'],
    ['Jesus in my Lord and King!!!', 'religious'],
    ['This is so true amen 🙏🏾', 'religious'],
    ['Dear God this reel is beautiful👏', 'religious'],
    ['مكتوب. It is written', 'religious'],
    ['Get rich or Regret Not Trying', 'hustle'],
    ['We have nothing to lose but have everything to gain.', 'hustle'],
    ['Worst case I get a 9-5 like everybody else my worst case is their best case.', 'hustle'],
    [
      'HOW ARE YOU SO RIGHT? WHY ARE YOU NOT MENTORING YOUNG MEN ALL OVER THE WORLD. YOU ARE BRILLIANT',
      'shouting',
    ],
    ['Wow so powerful GO AND DREAM', 'shouting'],
    ["'Nothing happens to any man that he is not formed by nature to bear' 🙌", 'quoted-line'],
    ['What do you think about this!', 'reply'],
    ['Like this comment to help remind me I need to hear this !!!', 'reply'],
    ['This kept me going, thanks, btw what’s the song name?', 'reply'],
    ['This hit different … I’m starting college again next week and I need to lock tf in.', 'profanity'],
  ])('excludes %p as %s', (text, reason) => {
    expect(getCommentExclusionReason(text)).toBe(reason)
  })

  it('treats a mention of anyone but Prism as a reply', () => {
    expect(getCommentExclusionReason('Look at this @someone_else')).toBe('reply')
    expect(getCommentExclusionReason('Great find @the_design_prism 🔥')).toBeNull()
  })

  it('drops off-brand handles even when the words are fine', () => {
    expect(getCommentExclusionReason('Just wow 👏', '@zorwealth')).toBe('off-brand-handle')
    expect(getCommentExclusionReason('facts🙌', '@ms_forexbro_')).toBe('off-brand-handle')
    expect(getCommentExclusionReason('Just wow 👏', '@spencer_kunkel')).toBeNull()
  })

  it('never lets a consent-gated item through', () => {
    expect(getCommentExclusionReason('Lovely', '', { requiresConsent: true })).toBe('consent')
    const gated = allCommunityComments.filter((record) => record.requiresConsent)
    expect(gated.length).toBeGreaterThan(0)
    for (const record of gated) {
      expect(getRecordExclusionReason(record)).toBe('consent')
      expect(onBrandCommunityComments).not.toContainEqual(record)
    }
  })

  it('marks emoji-only, one-word, and filler-only replies as low signal', () => {
    for (const text of ['🔥🔥🔥', 'Beautiful.', 'FYP!', 'Gladiator 🔥', 'Thank you', 'Thanks man.', '👏🏼 si!!!! Ty!!! Ty.']) {
      expect(isLowSignalComment(text)).toBe(true)
    }
    for (const text of ['This hits.', 'Wow. Just wow', 'Needed this🙏']) {
      expect(isLowSignalComment(text)).toBe(false)
    }
  })

  it('keeps the comments about the craft and impact, verbatim', () => {
    const keep = [
      textOf(186),
      takeawayTextOf(218),
      textOf(196),
      textOf(58),
      textOf(15),
    ]
    for (const text of keep) {
      expect(isCuratedComment(text)).toBe(true)
      expect(curatedTexts).toContain(text)
    }
    expect(getCommentCraftScore(textOf(186))).toBe(2)
    expect(getCommentCraftScore(takeawayTextOf(218))).toBe(2)
    expect(getCommentCraftScore(textOf(196))).toBe(2)
    expect(getCommentCraftScore(textOf(15))).toBe(1)
  })

  it('removes every reviewer-flagged example from the printable set', () => {
    for (const text of [
      textOf(210),
      textOf(195),
      textOf(162),
      textOf(163),
      takeawayTextOf(248),
    ]) {
      expect(curatedTexts).not.toContain(text)
    }
  })

  it('prints each wording once and never edits the source text', () => {
    const sourceTexts = new Set([
      ...quotesData.map((quote) => quote.text),
      ...takeawaysData.map((takeaway) => takeaway.text),
    ])
    const normalized = curatedTexts.map((text) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim())
    expect(new Set(normalized).size).toBe(normalized.length)
    for (const text of curatedTexts) expect(sourceTexts.has(text)).toBe(true)
    for (const record of emojiOnlyCommunityComments) {
      expect(sourceTexts.has(record.text)).toBe(true)
      expect(/\p{L}/u.test(record.text)).toBe(false)
    }
  })

  it('keeps the printable set within the em dash rule', () => {
    for (const text of curatedTexts) {
      expect(text).not.toContain(String.fromCharCode(0x2014))
    }
  })
})

describe('getCommunityComments (/content rails) uses the same rules', () => {
  it('keeps every comment the /content page currently picks', () => {
    const ids = [44, 14, 33, 11, 36, 19, 31, 39, 12, 18, 41, 25, 30, 15, 42, 32]
    expect(getCommunityComments(ids).map((comment) => comment.id)).toEqual(ids)
  })

  it('drops off-brand, low-signal, client, and consent-gated ids', () => {
    // 210 Hormozi, 195 religious, 20 emoji-only, 3 a named client, 83 consent.
    expect(getCommunityComments([210, 195, 20, 3, 83, 186])).toEqual([
      { id: 186, text: textOf(186), handle: '@ricardoprosperi' },
    ])
  })
})
