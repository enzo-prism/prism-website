import type { Metadata } from 'next'
import FAQSection from '@/components/faq-section'
import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Practice Transitions Institute case study',
  description:
    'How Prism built authority infrastructure for Practice Transitions Institute, a San Mateo dental transition consultancy with a proven process.',
  path: '/case-studies/practice-transitions-institute',
  ogImage: '/case-studies/practice-transitions-institute-home-desktop.jpg',
})

// Answers long Search Console queries from dentists researching transitions.
// Facts come from the published case study and PTI's own site only.
const PTI_FAQ = [
  {
    question: 'where can i find testimonials from practice transitions institute clients?',
    answer:
      'pti publishes client testimonials at practicetransitionsinstitute.com/testimonials. prism built that site around pti’s six-stage process so dentists researching a practice transition can see real client stories before a first conversation.',
  },
  {
    question: 'what is pti’s practice transition process?',
    answer:
      'pti guides dentists through six stages: discovery, valuation, deal navigation, transition support, protection, and next moves.',
  },
  {
    question: 'who leads practice transitions institute?',
    answer:
      'dr. michael njo leads pti, a dental practice transition consultancy based in san mateo, california.',
  },
]

export default function PracticeTransitionsInstituteCaseStudyPage() {
  return (
    <MinimalCaseStudyPage
      slug="practice-transitions-institute"
      afterStory={<FAQSection variant="compact" title="questions, answered." items={PTI_FAQ} />}
    />
  )
}
