import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"

export const metadata: Metadata = {
  title: "Case Studies: Dental & Local Business Growth Wins | Prism",
  description:
    "Discover how Prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies",
  },
}

export default function CaseStudies() {
  return (
    <>
      <SeoTextSection
        title="how we turn complex challenges into measurable wins"
        subtitle="dental groups, nonprofits, and local retailers rely on prism when they need to modernize digital experiences and prove ROI."
        variant="compact"
        showDivider={false}
      >
        <p>
          Each engagement pairs deep discovery with focused execution. We rebuild or optimize websites, align messaging, implement analytics, and set up retention loops so momentum keeps compounding. The studies below spotlight the specific problems we solved, the systems we shipped, and the outcomes teams continue to see months after launch.
        </p>
        <ul>
          <li><strong>Revenue levers:</strong> appointment funnels, membership conversions, and donor journeys.</li>
          <li><strong>Operational upgrades:</strong> CRM and phone integrations, automated follow-ups, and AI-ready content.</li>
          <li><strong>Creative systems:</strong> reusable design foundations, testimonial engines, and ongoing optimization rhythms.</li>
        </ul>
      </SeoTextSection>
      <CaseStudiesPage />
      <SeoTextSection title="case studies & outcomes">
        <p>
          our projects pair strategy, design, and engineering to solve specific business problems—
          retaining patients during a transition, launching a new brand, or rebuilding a site to recover
          traffic. each study highlights the decisions and systems that created lasting results.
        </p>
      </SeoTextSection>
    </>
  )
}
