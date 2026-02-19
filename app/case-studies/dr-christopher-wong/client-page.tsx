import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const linkClassName =
  "font-medium text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border"

const CASE_STUDY_TITLE = "case study: dr. chris wong — rebuilding trust and growth after a practice handoff"
const CASE_STUDY_DESCRIPTION =
  "a before-and-after case study of how prism supported a dental practice transition with measurable, data-backed growth systems."
const CLIENT_SITE = "https://www.chriswongdds.com"

export default function ChristopherWongCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <p>case study</p>
            <h1>{CASE_STUDY_TITLE}</h1>
            <p>
              <strong>from handoff risk to measurable, scalable growth systems.</strong>
            </p>
            <p>
              dr. chris wong purchased a well-established palo alto dental practice and faced the hardest part of any ownership transition:
              keeping patients from feeling uncertainty while stabilizing the online business.
            </p>
            <p>
              prism partnered with dr. wong over time to rebuild the full growth system—website, local visibility, acquisition, and measurement—so the
              transition became clear to patients and easier to scale over time.
            </p>

            <div className="not-prose">
              <Button asChild variant="outline" className="rounded-full">
                <Link href={CLIENT_SITE} target="_blank" rel="noopener noreferrer">
                  visit chriswongdds.com
                </Link>
              </Button>
            </div>

            <p>
              <strong>industry:</strong> dentistry
            </p>
            <p>
              <strong>location:</strong> palo alto, ca
            </p>
            <p>
              <strong>scope:</strong> website, seo, local listings, ads, analytics
            </p>

            <hr />

            <h2>where chris wong was before prism helped</h2>
            <p>in transitions like this, one of these usually appears first:</p>
            <ul>
              <li>patients see mixed signals (old ownership signals + new ownership reality), creating uncertainty</li>
              <li>maps, reviews, and the website do not match, weakening trust at discovery</li>
              <li>ad and website decisions are based on assumptions, not shared data</li>
            </ul>
            <p>
              we validated this with a full handoff audit across website messaging, local profiles, call outcomes, and analytics instrumentation.
            </p>

            <h2>how prism structured the fix</h2>
            <h3>phase 1 — remove trust friction</h3>
            <p>we started with the part that affects retention first: clarity.</p>
            <ul>
              <li>reframed digital messaging to make dr. wong’s leadership explicit and easy to understand</li>
              <li>aligned maps/listings so local search didn’t confuse patients during the transition</li>
              <li>streamlined patient pathways with clearer next steps and conversion logic</li>
            </ul>

            <h3>phase 2 — rebuild the growth foundation</h3>
            <p>with trust signals stabilized, we rebuilt the core systems:</p>
            <ul>
              <li>modernized website architecture and mobile flows</li>
              <li>implemented technical SEO and indexability improvements</li>
              <li>put analytics and reporting in one place so decisions had owners and timelines</li>
            </ul>

            <h3>phase 3 — grow with proof, not guesses</h3>
            <p>we then reintroduced acquisition in a controlled order:</p>
            <ul>
              <li>google and social campaigns were aligned to the new messaging and landing experience</li>
              <li>creative and page-level optimization were tied to campaign and conversion signals</li>
              <li>every change was measured for quality of traffic and business relevance</li>
            </ul>

            <hr />

            <h2>the growth progression: what changed, with real numbers</h2>
            <p>
              <strong>measurement window:</strong> 2026-01-19 → 2026-02-17
            </p>
            <p>
              this is a truthful baseline check, not a “all metrics increased” story. the system is stronger, and we track exactly where momentum is
              highest.
            </p>

            <h3>website behavior</h3>
            <ul>
              <li>
                <strong>sessions:</strong> 258 (down 20.1% vs prior 30-day period)
              </li>
              <li>
                <strong>users:</strong> 221 (down 16.0%)
              </li>
              <li>
                <strong>pageviews:</strong> 431 (down 16.5%)
              </li>
              <li>
                <strong>bounce rate:</strong> 65.1% (+0.6% vs prior period)
              </li>
              <li>
                <strong>avg session duration:</strong> 94.4s (-3.1%)
              </li>
              <li>
                <strong>top landing pages:</strong> / (191), /schedule (58), /about (71)
              </li>
            </ul>
            <p>
              interpretation: traffic softness exists in this period, but the visit funnel is still concentrated on core pages that we can now optimize
              with higher confidence.
            </p>

            <h3>search visibility (google search console)</h3>
            <ul>
              <li>
                <strong>clicks:</strong> 48 (-4.0%)
              </li>
              <li>
                <strong>impressions:</strong> 2,740 (-6.3%)
              </li>
              <li>
                <strong>CTR:</strong> 1.75%
              </li>
              <li>
                <strong>avg position:</strong> 21.8
              </li>
              <li>
                <strong>top queries:</strong> christopher wong dds, chris wong dds, kris hamamoto
              </li>
            </ul>
            <p>
              interpretation: branded trust demand remains solid; the growth opportunity is clearer in service-intent and long-tail treatment pages.
            </p>

            <h3>paid acquisition (google ads)</h3>
            <ul>
              <li>
                <strong>Wong-DDS spend:</strong> $135.59
              </li>
              <li>
                <strong>conversions:</strong> 8
              </li>
              <li>
                <strong>cost per conversion:</strong> $16.95
              </li>
            </ul>
            <p>
              interpretation: this is a healthy baseline channel with room for controlled scale when call-quality controls and message relevance are strengthened.
            </p>

            <hr />

            <h2>truthful outcome summary</h2>
            <ul>
              <li>
                <strong>trust clarity improved:</strong> practice ownership and positioning are now consistent across the digital stack.
              </li>
              <li>
                <strong>decision making improved:</strong> the team can now act from one measurement framework instead of fragmented tools.
              </li>
              <li>
                <strong>growth foundation stabilized:</strong> the project is now structured for incremental, low-friction optimization.
              </li>
              <li>
                <strong>next-90-day growth edge:</strong> better local service-intent content and ad-message fit should drive higher quality demand before heavy
                spend increases.
              </li>
            </ul>

            <h2>what this means for other dental practices</h2>
            <p>
              if you’re buying a practice, the first growth lever is not just “more marketing.” it is reducing online uncertainty so patients know exactly who they
              are seeing and why.
            </p>
            <p>this is why we use a three-step growth rule on transition clients:</p>
            <ol>
              <li>make ownership messaging unmistakable in every public touchpoint</li>
              <li>stabilize local presence so discovery feels trustworthy</li>
              <li>optimize acquisition from measurable, reliable baseline data</li>
            </ol>

            <p>
              if you’re in a handoff right now, we can help you move from uncertainty to structured growth using the same sequence.
            </p>

            <hr />

            <h2>cta / next steps</h2>
            <p>want to know what’s currently helping your practice the most?</p>
            <ul>
              <li>
                get a <Link href="/free-analysis" className={linkClassName}>
                  free analysis
                </Link>{" "}
                of your website + local presence
              </li>
              <li>
                see <Link href="/get-started" className={linkClassName}>
                  get started
                </Link>
              </li>
              <li>
                or <Link href="/contact" className={linkClassName}>
                  contact prism
                </Link>
              </li>
            </ul>
          </article>
        </div>

        <div className="mt-12">
          <SocialShare
            url="https://www.design-prism.com/case-studies/dr-christopher-wong"
            imageUrl="https://www.design-prism.com/dr-wong-polaroids.png"
            title={CASE_STUDY_TITLE}
            description={CASE_STUDY_DESCRIPTION}
          />
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title={CASE_STUDY_TITLE}
        description={CASE_STUDY_DESCRIPTION}
        url="https://www.design-prism.com/case-studies/dr-christopher-wong"
        imageUrl="https://www.design-prism.com/dr-wong-polaroids.png"
        datePublished="2025-01-15T00:00:00.000Z"
        dateModified="2026-02-19T00:00:00.000Z"
        clientName="Dr. Christopher B. Wong"
        outcome="trusted handoff messaging, aligned local presence, and a data-driven growth baseline"
      />
    </div>
  )
}
