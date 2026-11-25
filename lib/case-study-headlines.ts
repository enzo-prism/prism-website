/*
 * Case study headlines: what changed for the client, in one lowercase line
 * (DESIGN.md "Case studies": the H1 states the outcome; the client name is
 * its eyebrow). Each line paraphrases the published title, description or
 * story result in lib/case-study-data.ts. None adds a claim, a number or a
 * quote, and none uses an em dash.
 */
export const CASE_STUDY_HEADLINES: Readonly<Record<string, string>> = {
  'mach-1': 'an ai agent company, told by its customers.',
  'dr-christopher-wong': 'a practice handoff patients could follow.',
  'exquisite-dentistry': 'luxury dentistry that feels like luxury online.',
  'olympic-bootworks': 'e-bikes riders can compare before they call.',
  'laguna-beach-dental-arts': 'a practice relaunch, measured from day one.',
  'family-first-smile-care': 'a family practice that is easy to book.',
  'town-centre-dental': 'a patient funnel the practice can finally see.',
  'grace-dental-santa-rosa': 'a post-merger relaunch built to scale.',
  'roseville-dental-academy':
    'from a stock godaddy site to an admissions engine.',
  'rebellious-aging': 'a movement that celebrates aging, loudly.',
  'wine-country-root-canal':
    'specialty care that feels calm from the first click.',
  'sr4-partners': 'a consulting presence that matches the work.',
  'infobell-it': 'complex ai engineering, made clear to buyers.',
  'canary-foundation': 'a mission donors can understand and trust.',
  'belize-kids-foundation': 'giving that feels immediate, not abstract.',
  'canary-cove': 'a private estate that feels like the stay itself.',
  'we-are-saplings': 'emotional learning, told through its characters.',
  'coast-periodontics-and-laser-surgery':
    'one site for anxious patients and referring dentists.',
  'practice-transitions-institute':
    'transition advice that earns trust before the first call.',
  'leadership-retreat': 'a leadership retreat that books like luxury travel.',
  'michael-njo-dds': 'a dental presence that matches the dentistry.',
  'saorsa-growth-partners': 'a focused consultancy with a clear front door.',
  'mataria-dental-group': 'a practice handoff told as a human story.',
  'waikiki-dental': 'anxiety-free dentistry, from the first screen.',
  'sacramento-dental-medicine': 'a calm, clinical front door for families.',
}

export function getCaseStudyHeadline(slug: string): string | undefined {
  return CASE_STUDY_HEADLINES[slug]
}
