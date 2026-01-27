import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import Image from "next/image"
const EXQUISITE_SITE = "https://exquisitedentistryla.com/?utm_source=chatgpt.com"
const EXQUISITE_SITE_TITLE = "Exquisite Dentistry: Cosmetic Dentist Los Angeles | Dr. Aguil"
const linkClassName = "font-medium text-neutral-900 underline underline-offset-4"

export default function ExquisiteDentistryCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl py-16 md:py-24">
          <article className="prose prose-neutral max-w-none">
            <h1>Case Study: Exquisite Dentistry — Turning a Legacy Beverly Hills Brand Into a Modern, Trackable Growth Engine</h1>
            <p>
              <strong>High-end cosmetic dentistry</strong>
            </p>
            <p>
              <strong>Location:</strong> Beverly Hills / Los Angeles, CA{" "}
              (<a className={linkClassName} href={EXQUISITE_SITE} title={EXQUISITE_SITE_TITLE} target="_blank" rel="noreferrer">
                Exquisite Dentistry
              </a>)
            </p>
            <p>
              <strong>Practice:</strong> Exquisite Dentistry (Dr. Alexie Aguil){" "}
              (<a className={linkClassName} href={EXQUISITE_SITE} title={EXQUISITE_SITE_TITLE} target="_blank" rel="noreferrer">
                Exquisite Dentistry
              </a>)
            </p>
            <p>
              <strong>Scope:</strong> Website rebuild, SEO preservation + upgrades, local listings cleanup, funnel + forms rebuild, analytics + attribution, ongoing optimization
            </p>
            <hr />

            <h2>“We’re one of the best practices in the city… so why does our website look like it isn’t?”</h2>
            <p>
              Exquisite Dentistry is the kind of practice most dentists <em>wish</em> they had.
            </p>
            <p>
              They’ve been established for years. They’re known for elite cosmetic work. They have deep community trust. They attract a high-end patient base, including celebrity clientele. And their in-person experience feels premium.
            </p>
            <p>But online?</p>
            <p>The website told a different story.</p>
            <p>And that mismatch creates a specific kind of anxiety that practice owners know too well:</p>
            <ul>
              <li>
                <strong>“If someone finds us on Google for the first time, do we look as good as we actually are?”</strong>
              </li>
              <li>
                <strong>“Are we leaking high-value patients because the site feels old or confusing?”</strong>
              </li>
              <li>
                <strong>“Are we one plugin update away from the whole thing breaking?”</strong>
              </li>
              <li>
                <strong>“If we rebuild, will we destroy years of SEO and rankings?”</strong>
              </li>
            </ul>
            <p>That last one is the trap.</p>
            <p>
              Because when a practice <em>still</em> gets leads from search and maps, the website becomes a ticking time bomb:
              <br />
              <strong>bad enough to hold you back, but “working” enough that you’re scared to touch it.</strong>
            </p>
            <p>That was Exquisite Dentistry.</p>
            <hr />

            <h2>The Real Problem Wasn’t “A Bad Website.” It Was Compounding Scar Tissue.</h2>
            <p>Yes, the website was outdated.</p>
            <p>But the deeper issue was what we see constantly in established practices that have been online for a long time:</p>

            <h3>1) Years of vendor “patchwork” creates invisible technical debt</h3>
            <p>Over time, different vendors add different “fixes”:</p>
            <ul>
              <li>a scheduling widget here</li>
              <li>a form plugin there</li>
              <li>a theme change</li>
              <li>an SEO plugin migration</li>
              <li>tracking scripts piled on top of tracking scripts</li>
            </ul>
            <p>Eventually nobody can answer basic questions like:</p>
            <ul>
              <li>
                <strong>What forms are still active?</strong>
              </li>
              <li>
                <strong>Where does that lead go?</strong>
              </li>
              <li>
                <strong>What’s connected to what?</strong>
              </li>
              <li>
                <strong>Which phone number is <em>actually</em> being tracked?</strong>
              </li>
              <li>
                <strong>Which pages are indexed, and which are broken?</strong>
              </li>
            </ul>
            <p>On the surface it “runs.” Under the hood it becomes a maze.</p>

            <h3>2) The brand was strong… but the online presence wasn’t converting like it should</h3>
            <p>They had the reputation. They had the reviews. They had the results.</p>
            <p>But the online experience wasn’t doing their excellence justice:</p>
            <ul>
              <li>old design signals “average” when the practice is premium</li>
              <li>clunky mobile UX creates friction at the exact moment patients want ease</li>
              <li>
                generic copy doesn’t <em>match the sophistication</em> of the actual care
              </li>
            </ul>

            <h3>3) They couldn’t clearly see what was working</h3>
            <p>They were getting leads, but they didn’t have clean clarity on:</p>
            <ul>
              <li>
                <strong>Did this patient find us on Search, Maps, Apple Maps, Instagram, Facebook, or referrals?</strong>
              </li>
              <li>
                <strong>Which campaigns or pages are driving real consults (not just clicks)?</strong>
              </li>
              <li>
                <strong>Where are patients dropping off in the booking flow?</strong>
              </li>
            </ul>
            <p>When tracking is messy, you end up guessing.</p>
            <p>And guessing is expensive.</p>
            <figure className="not-prose my-6 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              <Image
                src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767372937/keyword-tracking-semrush_m3aql3.png"
                alt="Keyword tracking performance in Semrush for Exquisite Dentistry"
                width={1973}
                height={1235}
                className="h-auto w-full rounded-xl"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                keyword tracking momentum
              </figcaption>
            </figure>
            <hr />

            <h2>Competitor Analysis</h2>
            <p>We mapped the competitive landscape to understand what was outranking Exquisite Dentistry and why.</p>
            <p>That let us prioritize the fastest visibility gains without risking the legacy SEO equity.</p>
            <figure className="not-prose my-6 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              <Image
                src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767373072/seo-competitor-analysis_o3w4ks.png"
                alt="SEO competitor analysis for Exquisite Dentistry"
                width={1002}
                height={384}
                className="h-auto w-full rounded-xl"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                competitor visibility map
              </figcaption>
            </figure>
            <hr />

            <h2>Toxic Backlink Audit</h2>
            <p>We audited the backlink profile to isolate risky links and confirm which signals were safe to keep.</p>
            <p>This protects rankings while we build higher-quality authority over time.</p>
            <figure className="not-prose my-6 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              <Image
                src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767373231/seo-toxic-backlink-audit_audrut.webp"
                alt="Toxic backlink audit for Exquisite Dentistry"
                width={762}
                height={481}
                className="h-auto w-full rounded-xl"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
              <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                toxic backlink audit
              </figcaption>
            </figure>
            <hr />

            <h2>Prism’s Approach: Don’t Swing the Wrecking Ball First</h2>
            <p>Most agencies do the same thing:</p>
            <p>They walk in, trash the current system, rebuild everything, and call it “modern.”</p>
            <p>That’s how practices lose rankings.</p>
            <p>So we did the opposite:</p>

            <h3>Phase 1 — Understand the machine before you replace parts</h3>
            <p>Before we rebuilt anything, we spent the early phase:</p>
            <ul>
              <li>mapping the existing website + plugin ecosystem</li>
              <li>identifying technical debt and risk areas</li>
              <li>auditing indexation + crawlability</li>
              <li>cleaning up obvious low-hanging fruit in the local ecosystem</li>
            </ul>
            <p>This included syncing and tightening the practice’s presence across major local platforms:</p>
            <ul>
              <li>Google Business Profile</li>
              <li>Apple Business Connect</li>
              <li>
                Yelp for Business
                <br />
                (And related listings consistency)
                <br />
                Learn more: <strong>Local listings cleanup</strong> →{" "}
                <a className={linkClassName} href="https://www.design-prism.com/local-listings" target="_blank" rel="noreferrer">
                  local listings cleanup
                </a>
              </li>
            </ul>
            <p>This alone can reduce confusion signals (for patients and algorithms) and stabilize lead flow.</p>

            <h3>Phase 2 — Rebuild at the right moment, with SEO preservation as the #1 constraint</h3>
            <p>Only after we understood the existing system did we rebuild the website.</p>
            <p>The goal wasn’t “make it pretty.”</p>
            <p>The goal was:</p>
            <ul>
              <li>
                <strong>match the premium in-person experience</strong>
              </li>
              <li>
                <strong>remove technical debt</strong>
              </li>
              <li>
                <strong>improve mobile conversion</strong>
              </li>
              <li>
                <strong>preserve what already worked in SEO</strong>
              </li>
              <li>
                <strong>create a foundation we can iterate on without fear</strong>
              </li>
            </ul>
            <p>
              This is what our <strong>Dental Website System</strong> is built for:
              <br />
              <a className={linkClassName} href="https://www.design-prism.com/dental-website" target="_blank" rel="noreferrer">
                dental website system
              </a>
            </p>
            <hr />

            <h2>The Website Rebuild: A Modern Front-End + A Simpler Back-End</h2>
            <p>When we launched the new site, we focused on two things at once:</p>

            <h3>1) Front-end: premium clarity</h3>
            <p>Patients don’t “evaluate” your website consciously.</p>
            <p>
              They <em>feel it.</em>
            </p>
            <p>So we rebuilt the experience around:</p>
            <ul>
              <li>trust, polish, and calm confidence</li>
              <li>clear navigation for high-intent services</li>
              <li>mobile-first flow (because that’s where decisions happen)</li>
              <li>faster load times and better UX patterns</li>
            </ul>
            <p>
              In short: <strong>the site now looks like the practice feels.</strong>
            </p>

            <h3>2) Back-end: remove complexity so it can’t rot again</h3>
            <p>
              A huge part of the work was <em>subtracting</em>:
            </p>
            <ul>
              <li>removing brittle plugin dependencies</li>
              <li>simplifying workflows that no one understood</li>
              <li>standardizing tracking and event logic</li>
              <li>ensuring future edits don’t create new “scar tissue”</li>
            </ul>
            <p>The result: a site that’s easier to maintain, easier to improve, and far less likely to break.</p>
            <hr />

            <h2>The Hidden Win: Rebuilding the Funnel (Forms, Scheduling, Attribution)</h2>
            <p>A “new website” doesn’t matter if the booking flow still leaks.</p>
            <p>So we rebuilt the intake pipeline with two priorities:</p>
            <ol>
              <li>
                <strong>A smoother patient experience</strong> (especially on mobile)
              </li>
              <li>
                <strong>Clean attribution</strong> so the practice can finally see what’s working
              </li>
            </ol>
            <p>We upgraded:</p>
            <ul>
              <li>scheduling / consultation request flow</li>
              <li>form UX and structure</li>
              <li>lead routing + tagging</li>
              <li>attribution logic (where leads came from: Search vs Maps vs Social vs Ads)</li>
            </ul>
            <p>This is where practices start to feel relief.</p>
            <p>Because now you can answer questions like:</p>
            <ul>
              <li>“Are we getting cosmetic consults from Maps or Search?”</li>
              <li>“Are ads driving real appointments or just traffic?”</li>
              <li>“Which pages are producing the best patients?”</li>
            </ul>
            <p>
              This is the difference between marketing that <em>looks active</em> and marketing that <em>prints money</em>.
            </p>
            <p>
              Related: <strong>apps + forms systems</strong> →{" "}
              <a className={linkClassName} href="https://www.design-prism.com/apps" target="_blank" rel="noreferrer">
                prism apps + forms
              </a>
            </p>
            <hr />

            <h2>Analytics Overhaul: Stop Guessing, Start Knowing</h2>
            <p>We then rebuilt the measurement stack so the practice could see reality.</p>
            <p>That included:</p>
            <ul>
              <li>Google Analytics (clean setup + conversion structure)</li>
              <li>Google Search Console (indexation + query intelligence)</li>
              <li>SEMrush (competitive + technical monitoring)</li>
              <li>Hotjar (behavior, drop-off, friction discovery)</li>
            </ul>
            <p>This let us deeply analyze:</p>
            <ul>
              <li>SEO performance and technical crawl health</li>
              <li>site speed and mobile usability</li>
              <li>conversion bottlenecks</li>
              <li>how bots (search + AI discovery) interpret the practice</li>
            </ul>
            <p>
              Learn more:
              <br />
              <strong>SEO system</strong> →{" "}
              <a className={linkClassName} href="https://www.design-prism.com/seo" target="_blank" rel="noreferrer">
                prism seo
              </a>
              <br />
              <strong>Growth reporting</strong> →{" "}
              <a className={linkClassName} href="https://www.design-prism.com/growth" target="_blank" rel="noreferrer">
                prism growth reporting
              </a>
            </p>
            <hr />

            <h2>The Strategy: Make Platforms Confident Sending Patients Here</h2>
            <p>Here’s the part most agencies don’t say out loud:</p>
            <p>Google, Apple, and Meta are not “traffic sources.”</p>
            <p>They are gatekeepers.</p>
            <p>They decide who gets shown and who doesn’t.</p>
            <p>So the strategy is not “post more” or “run ads.”</p>
            <p>The strategy is:</p>
            <p>
              <strong>Send clear signals that:</strong>
            </p>
            <ul>
              <li>this is a real, trusted business</li>
              <li>patients have a great experience here</li>
              <li>the brand is consistent everywhere</li>
              <li>the website answers the intent behind the search</li>
              <li>the business is active and investable as a local entity</li>
            </ul>
            <p>That’s how you win over time.</p>
            <p>And it’s why we connect the full ecosystem:</p>
            <ul>
              <li>site + SEO</li>
              <li>listings + reviews</li>
              <li>ads + landing pages</li>
              <li>analytics + iteration loops</li>
            </ul>
            <p>
              Related:
              <br />
              <strong>Ads system</strong> →{" "}
              <a className={linkClassName} href="https://www.design-prism.com/ads" target="_blank" rel="noreferrer">
                prism ads
              </a>
              <br />
              <strong>Google Ads</strong> →{" "}
              <a className={linkClassName} href="https://www.design-prism.com/google" target="_blank" rel="noreferrer">
                prism × google
              </a>
              <br />
              <strong>Proof engine</strong> (reviews + trust) →{" "}
              <a className={linkClassName} href="https://www.design-prism.com/proof" target="_blank" rel="noreferrer">
                proof engine
              </a>
            </p>
            <hr />

            <h2>Outcomes (What Changed)</h2>
            <p>Exquisite Dentistry came out of this engagement with something most practices never get:</p>

            <h3>A premium digital presence that finally matches the real product</h3>
            <ul>
              <li>modern design that supports a luxury brand</li>
              <li>clearer service pathways</li>
              <li>stronger trust signals</li>
              <li>better mobile experience</li>
            </ul>

            <h3>A tech stack that can evolve without breaking</h3>
            <ul>
              <li>fewer fragile dependencies</li>
              <li>cleaner infrastructure</li>
              <li>easier iteration cycle</li>
              <li>safer updates</li>
            </ul>

            <h3>A measurable funnel</h3>
            <ul>
              <li>smoother scheduling + forms</li>
              <li>clearer attribution</li>
              <li>cleaner analytics</li>
              <li>better insight into what channels drive real consults</li>
            </ul>
            <hr />

            <h2>What This Means for Other Practice Owners</h2>
            <p>If you’re a dentist and any of this feels familiar, you’re not alone:</p>
            <ul>
              <li>You’ve been around long enough to accumulate website “scar tissue.”</li>
              <li>You’re afraid to rebuild because you might lose rankings.</li>
              <li>You know your practice is excellent—but your online presence doesn’t show it.</li>
              <li>You’re spending money (or time) on marketing without clean clarity on ROI.</li>
              <li>You want a system you can trust, not a fragile website you’re scared to touch.</li>
            </ul>
            <p>That’s exactly what Prism is built for.</p>
            <p>We don’t just “make it look better.”</p>
            <p>
              We build an <strong>AI-native growth stack</strong> that makes your practice easier to discover, easier to trust, and easier to choose.
            </p>
            <p>
              See more results:{" "}
              <a className={linkClassName} href="https://www.design-prism.com/case-studies" target="_blank" rel="noreferrer">
                case studies
              </a>
              <br />
              See why dentists work with Prism:{" "}
              <a className={linkClassName} href="https://www.design-prism.com/why-dental-practices-love-prism" target="_blank" rel="noreferrer">
                why dental practices love prism
              </a>
            </p>
            <hr />

            <h2>CTA</h2>
            <p>If you want to know what’s holding your practice back online — and what to fix first:</p>
            <ul>
              <li>
                Get a free analysis:{" "}
                <a className={linkClassName} href="https://www.design-prism.com/free-analysis" target="_blank" rel="noreferrer">
                  free analysis
                </a>
              </li>
              <li>
                Or go straight to get started:{" "}
                <a className={linkClassName} href="https://www.design-prism.com/get-started" target="_blank" rel="noreferrer">
                  get started
                </a>
              </li>
              <li>
                Or talk with us:{" "}
                <a className={linkClassName} href="https://www.design-prism.com/contact" target="_blank" rel="noreferrer">
                  contact prism
                </a>
              </li>
            </ul>
            <p>
              <strong>Ready to modernize your practice without risking what already works?</strong>
            </p>
            <p>Let’s build the system you’ll be proud to send patients to.</p>
          </article>
        </div>

        <div className="mt-12">
          <SocialShare
            url="https://www.design-prism.com/case-studies/exquisite-dentistry"
            imageUrl="https://www.design-prism.com/exquisite-dentistry-consultation.png"
            title="Case Study: Exquisite Dentistry — Turning a Legacy Beverly Hills Brand Into a Modern, Trackable Growth Engine"
            description="Turning a legacy Beverly Hills brand into a modern, trackable growth engine."
          />
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title="Case Study: Exquisite Dentistry — Turning a Legacy Beverly Hills Brand Into a Modern, Trackable Growth Engine"
        description="Turning a legacy Beverly Hills brand into a modern, trackable growth engine."
        url="https://www.design-prism.com/case-studies/exquisite-dentistry"
        imageUrl="https://www.design-prism.com/exquisite-dentistry-consultation.png"
        datePublished="2025-06-01T00:00:00.000Z"
        dateModified="2025-06-01T00:00:00.000Z"
        clientName="Exquisite Dentistry"
        outcome="premium digital presence, a tech stack that can evolve without breaking, and a measurable funnel"
      />
    </div>
  )
}
