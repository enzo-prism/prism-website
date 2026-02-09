import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { WebPageSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import Link from "next/link"
import ProofCTAs from "./ProofCTAs"

const PAGE_TITLE = "prism proof | testimonial engine for dentists"
const PAGE_DESCRIPTION =
  "capture authentic patient stories once and repurpose them into case studies, schema, reels, and google business profile posts that lift trust and acceptance."
const CANONICAL_URL = "https://www.design-prism.com/proof"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: CANONICAL_URL,
  },
}

export default function ProofPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="px-4 pt-10 pb-8 md:pt-14">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight lowercase sm:text-5xl md:text-6xl">prism proof</h1>
            <p className="mt-4 text-xl text-neutral-600 lowercase md:text-2xl">
              more trust. more patients. less friction.
            </p>
            <p className="mt-6 text-neutral-700 lowercase md:text-lg">
              real patient stories are the strongest growth lever you’re not pulling. prism proof turns quick, authentic
              testimonials into a compounding engine of social proof across your site, search, and social—without adding
              work to your day.
            </p>

            {/* Top CTAs (client-only) */}
            <ProofCTAs location="proof hero" className="mt-8" />
          </div>
        </section>

        {/* Body copy */}
        <section className="px-4 py-6">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <p><strong>TL;DR:</strong> We capture patient stories, turn them into high‑converting assets, and distribute them everywhere your next patient decides.</p>

              <hr />

              <h2>Why Prism Proof works</h2>
              <ul>
                <li><strong>Video beats everything.</strong> A 30–60s face‑to‑camera story has emotion, detail, and credibility. It converts.</li>
                <li><strong>One input → many assets.</strong> Each story becomes a website case study, quotable snippets, vertical clips, GBP post drafts, and structured data for richer search results.</li>
                <li><strong>Compounding proof.</strong> Every month you stack new stories. Your site gets stickier. Your brand gets safer to choose. Your conversion rate creeps up—and stays up.</li>
              </ul>

              <hr />

              <h2>What you get (standard)</h2>
              <ul>
                <li>
                  <strong>Done‑for‑you Patient Story Flow</strong><br />
                  Post‑visit text/email with a link to your private testimonial page—no apps to download, no logins.
                </li>
                <li>
                  <strong>Two capture paths (your page, not Google/Yelp)</strong>
                  <ul>
                    <li><strong>Quick Video (60s)</strong> – guided prompts, retakes allowed.</li>
                    <li><strong>Quick Form (90s)</strong> – punchy Q&amp;A for quotes and highlights.</li>
                  </ul>
                </li>
                <li>
                  <strong>Editing &amp; Packaging</strong><br />
                  We clean the clip, add captions and branding, pull the transcript, and extract 3–5 quotable lines.
                </li>
                <li>
                  <strong>Distribution Kit</strong>
                  <ul>
                    <li>On‑site <strong>Case Study</strong> block or page (with CTA)</li>
                    <li><strong>Review/Video</strong> schema markup for SEO</li>
                    <li><strong>Google Business Profile</strong> post draft</li>
                    <li><strong>Instagram</strong> reel + caption draft</li>
                    <li><strong>Email snippet</strong> for campaigns or autoresponders</li>
                  </ul>
                </li>
                <li>
                  <strong>Reporting</strong><br />
                  Dashboard tiles for capture rates, assets produced, pages upgraded, and conversion lift where social proof is added.
                </li>
              </ul>

              <hr />

              <h2>How it works (end‑to‑end)</h2>
              <ol>
                <li><strong>Invite</strong> – We trigger a friendly post‑appointment message with a link to your private Prism Proof page.</li>
                <li><strong>Capture</strong> – Patients record a short video or answer a few prompts. We include a clear consent step, so you’re covered.</li>
                <li><strong>Transform</strong> – We edit, transcribe, and structure the story into assets that actually sell.</li>
                <li><strong>Distribute</strong> – We publish to your site, prep social/search drafts, add schema, and slot the story into high‑intent pages.</li>
                <li><strong>Measure</strong> – We track engagement and conversion lift where Proof is present—and double down where it works best.</li>
              </ol>

              <hr />

              <h2>What makes it different</h2>
              <ul>
                <li><strong>Engineered for conversion, not vanity.</strong> Stories get placed on pages that matter (service pages, pricing, location pages), not buried on a testimonials island.</li>
                <li><strong>Built for repeatability.</strong> One link, one flow, zero staff time, consistent output every month.</li>
                <li><strong>Privacy &amp; compliance baked in.</strong> Clear consent capture. Sensible disclosures. No incentivizing public platform reviews.</li>
                <li><strong>Category‑agnostic.</strong> Designed for dentists. Effective for any local service with a waiting room and a happy customer.</li>
              </ul>

              <hr />

              <h2>Results you can expect</h2>
              <ul>
                <li><strong>Higher conversion rate</strong> on pages with Proof vs. without (typically +10–30% relative lift over time).</li>
                <li><strong>Richer search appearance</strong> via Review/Video schema on key pages.</li>
                <li><strong>Steady stream of on‑brand content</strong> that compounds monthly.</li>
              </ul>
              <blockquote>
                <p>Simple math: if Proof helps close even <strong>2–3 extra cases a month</strong>, it more than pays for itself.</p>
              </blockquote>

              <hr />

              <h2>Where we deploy Proof first</h2>
              <ul>
                <li><strong>Hero/Home “Trust Strip”</strong> – reel + headline quote above the fold.</li>
                <li><strong>Top Service Pages</strong> – one 60s clip + 2–3 high‑credibility quotes per page.</li>
                <li><strong>Location Pages</strong> – neighborhood‑specific stories to win local intent.</li>
                <li><strong>Booking Funnel</strong> – “Still deciding?” modal with a 30s patient clip to nudge the conversion.</li>
              </ul>

              <hr />

              <h2>Patient prompts that pull real stories</h2>
              <ul>
                <li>What brought you in?</li>
                <li>What were you worried about before?</li>
                <li>How did the team make it easy?</li>
                <li>What’s better now?</li>
                <li>Would you recommend us? Why?</li>
              </ul>
              <p>(Short, natural, zero scripts—so it sounds like a human, not a commercial.)</p>

              <hr />

              <h2>Compliance notes (the boring, important part)</h2>
              <ul>
                <li><strong>We do not incentivize Google/Yelp reviews.</strong> Rewards—if used—apply only to your private submission page.</li>
                <li><strong>Clear consent.</strong> Every testimonial includes written authorization before publishing.</li>
                <li><strong>Transparent disclosure.</strong> If a thank‑you is provided, we disclose it wherever the story appears.</li>
              </ul>
              <p><em>(We set this up once. You sleep better forever.)</em></p>

              <hr />

              <h2>Plans</h2>
              <ul>
                <li><strong>Proof Lite</strong> – Form‑only stories, monthly quotes &amp; on‑site updates.</li>
                <li><strong>Proof Core</strong> – Video + form, editing, case studies, schema, social drafts, reporting.</li>
                <li><strong>Proof Plus</strong> – Everything in Core + multi‑format video kit, deeper placement testing, monthly highlights deck.</li>
              </ul>
              <blockquote>
                <p>Already on Prism Core/Plus? <strong>Proof</strong> slots right in.</p>
              </blockquote>

              <hr />

              <h2>How Proof fits the Prism Flywheel</h2>
              <ul>
                <li><strong>Research &amp; Ideation</strong> – Identify post‑appointment timing and prompts that pull authentic stories.</li>
                <li><strong>Creation &amp; Remixing</strong> – Capture a 60s video or quick form, then edit, transcribe, and package into multi‑format assets.</li>
                <li><strong>Optimization &amp; Analysis</strong> – Place Proof on high‑intent pages, track engagement and conversion lift, refine monthly.</li>
                <li><strong>Monetization &amp; Scaling</strong> – Distribute to site, search, and social; stack new stories each month to compound results.</li>
              </ul>
              <p>
                Want the bigger picture? <Link href="/prism-flywheel">Explore the Prism Flywheel</Link>.
              </p>

              <h2>FAQ</h2>
              <p><strong>How much time does my team spend?</strong><br />
              Close to zero. We install the flow, you approve assets, we publish.</p>
              <p><strong>Do patients actually submit?</strong><br />
              Yes—when the ask is easy and timely. Our flows are mobile‑first and take ~60–120 seconds.</p>
              <p><strong>What if a patient shares PHI?</strong><br />
              We review every submission and only publish what’s authorized.</p>
              <p><strong>Can we run this in multiple locations?</strong><br />
              Absolutely. Proof scales cleanly across multi‑location practices.</p>

              <hr />

              <h2>Ready to turn patient moments into momentum?</h2>
              <p><strong>Add Prism Proof</strong> to your plan and start compounding trust this month.</p>
              <p>Primary CTA: <strong>Get Prism Proof</strong><br />
              Secondary CTA: <strong>See sample assets</strong></p>
            </article>

            {/* Bottom CTAs (client-only) */}
            <ProofCTAs location="proof bottom" className="mt-10" />
          </div>
        </section>
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
