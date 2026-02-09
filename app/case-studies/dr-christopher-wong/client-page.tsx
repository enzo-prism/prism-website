import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import Link from "next/link"
const linkClassName =
  "font-medium text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border"
const CASE_STUDY_TITLE = "case study: dr. wong — de-risking a dental m&a in palo alto with ai-powered marketing"
const CASE_STUDY_DESCRIPTION = "from ownership transition risk to a future-proof, ai-powered dental practice in palo alto."

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
              <strong>from ownership transition risk to a future-proof, ai-powered dental practice in palo alto.</strong>
            </p>
            <p>
              prism helped dr. chris wong take over an established palo alto dental practice from dr. hamamoto, retain the patient base, and modernize the
              entire online experience with a new{" "}
              <Link href="/dental-website" className={linkClassName}>
                dental website
              </Link>
              , local seo, paid ads, and an ai-native development stack.
            </p>
            <p>
              watch enzo’s interview with dr. wong on how the handoff worked, what changed across the site and local presence, and how ai-first workflows
              now power the practice.
            </p>
            <p>
              visit the practice site at <strong>chriswongdds.com</strong>.
            </p>
            <p>
              <strong>location:</strong> palo alto, ca
            </p>
            <p>
              <strong>focus:</strong> dental m&amp;a handoff
            </p>
            <p>
              <strong>practice:</strong> dr. christopher b. wong
            </p>
            <p>
              <strong>scope:</strong> website, seo, ads, ai stack
            </p>
            <hr />

            <h2>the problem: “patients don’t leave because the dentistry changed. they leave because trust got shaky.”</h2>
            <p>if you’ve ever bought a practice (or even considered it), you already know the quiet fear.</p>
            <p>you didn’t just buy chairs and equipment.</p>
            <p>
              you bought <strong>trust</strong>.
            </p>
            <p>and trust is fragile during a handoff.</p>
            <p>patients think things like:</p>
            <ul>
              <li>“is my dentist still here?”</li>
              <li>“did the team change?”</li>
              <li>“is this new doctor any good?”</li>
              <li>“is this place still the same… or is it about to become a mess?”</li>
            </ul>
            <p>most practice transitions lose people in one of two ways:</p>

            <h3>1) the online presence still looks like the <em>old</em> practice</h3>
            <p>
              google, apple maps, yelp, the website, even the reviews… everything still signals the previous owner.
              <br />
              so the patient doesn’t get reassurance. they get confusion.
            </p>
            <p>confusion kills trust.</p>

            <h3>2) the new owner looks invisible</h3>
            <p>
              even if dr. wong is excellent, patients can’t <em>feel</em> that online.
              <br />
              they don’t see the story. they don’t see the face. they don’t see the “why.”
            </p>
            <p>so they drift.</p>
            <p>and if a patient drifts, another dentist’s google business profile catches them.</p>
            <p>that was the risk with dr. wong’s transition.</p>
            <hr />

            <h2>prism’s job: remove uncertainty fast (without breaking what already works)</h2>
            <p>most agencies “rebrand” a handoff like a design project.</p>
            <p>we treat it like what it is:</p>
            <p>
              a <strong>trust transfer</strong>.
            </p>
            <p>our mandate was simple:</p>
            <ol>
              <li>
                <strong>make patients feel safe</strong> about the transition
              </li>
              <li>
                <strong>make new patients feel confident</strong> choosing dr. wong
              </li>
              <li>
                <strong>keep rankings + lead flow stable</strong> while modernizing everything
              </li>
              <li>
                <strong>build a system we can improve every month</strong> without fear
              </li>
            </ol>
            <hr />

            <h2>contents</h2>
            <ul>
              <li>products &amp; services</li>
              <li>technology</li>
              <li>story</li>
              <li>outcomes</li>
              <li>what this means</li>
              <li>cta</li>
            </ul>
            <hr />

            <h2>products &amp; services delivered by prism for dr. wong</h2>
            <p>this started as a “website rebuild.”</p>
            <p>it turned into a full-stack growth partnership — because during a handoff, the website is only one piece of the trust puzzle.</p>

            <h3>design services</h3>
            <p>
              <strong>founder interview + story development</strong>
              <br />
              we captured dr. wong’s transition story on camera and turned it into content that makes patients feel, “ok — i get it. i trust this.”
              <br />
              learn more:{" "}
              <Link href="/story" className={linkClassName}>
                story-driven marketing
              </Link>
            </p>
            <p>
              <strong>in-person dental photography</strong>
              <br />
              patients don’t trust stock photos. they trust real humans and real places.
              <br />
              we shot dr. wong, the team, and the practice so the brand feels local, modern, and real.
              <br />
              learn more:{" "}
              <Link href="/dental-photography" className={linkClassName}>
                dental photography
              </Link>
            </p>
            <p>
              <strong>brand design + logo</strong>
              <br />
              handoffs often inherit mismatched visuals. we built a clean identity system that works on the website, listings, ads, and print.
              <br />
              learn more:{" "}
              <Link href="/designs" className={linkClassName}>
                design work
              </Link>
            </p>
            <p>
              <strong>video editing + content creation</strong>
              <br />
              we cut the interview into a hero video + clips for social and local listings so people meet dr. wong before they ever call.
              <br />
              learn more:{" "}
              <Link href="/youtube" className={linkClassName}>
                youtube
              </Link>
              ,{" "}
              <Link href="/tiktok" className={linkClassName}>
                tiktok
              </Link>
              ,{" "}
              <Link href="/ig" className={linkClassName}>
                ig
              </Link>
            </p>
            <hr />

            <h3>engineering services</h3>
            <p>
              <strong>full website rebuild + migration</strong>
              <br />
              we rebuilt the practice site into a modern, fast, mobile-first{" "}
              <Link href="/dental-website" className={linkClassName}>
                dental website
              </Link>
              designed for trust, clarity, and conversion.
            </p>
            <p>
              <strong>seo audit + implementation</strong>
              <br />
              we cleaned up technical seo foundations (structure, indexability, metadata, sitemap/robots hygiene) so google can understand the new reality
              without losing stability.
              <br />
              learn more:{" "}
              <Link href="/seo" className={linkClassName}>
                seo
              </Link>
            </p>
            <p>
              <strong>local listings optimization</strong>
              <br />
              handoffs break listings constantly — wrong names, old owners, inconsistent data. we updated the local ecosystem so the practice signals match
              everywhere.
              <br />
              learn more:{" "}
              <Link href="/local-listings" className={linkClassName}>
                local listings
              </Link>
            </p>
            <p>
              <strong>review-generation system</strong>
              <br />
              we deployed tap-to-review placards so happy patients can leave reviews quickly — and so the public proof begins to reflect dr. wong.
              <br />
              learn more:{" "}
              <Link href="/proof" className={linkClassName}>
                proof engine
              </Link>
              {" "}and{" "}
              <Link href="/wall-of-love" className={linkClassName}>
                wall of love
              </Link>
            </p>
            <p>
              <strong>google ads + meta ads management</strong>
              <br />
              once the trust foundation was solid, we launched and tuned acquisition across google + meta to drive new patient inquiries.
              <br />
              learn more:{" "}
              <Link href="/google" className={linkClassName}>
                google ads
              </Link>
              {" "}and{" "}
              <Link href="/ads" className={linkClassName}>
                ads
              </Link>
            </p>
            <p>
              <strong>analytics + reporting</strong>
              <br />
              we implemented a real measurement stack so the practice can stop guessing what works.
              <br />
              learn more:{" "}
              <Link href="/growth" className={linkClassName}>
                growth reporting
              </Link>
            </p>
            <p>
              <strong>patient forms + onboarding upgrade</strong>
              <br />
              we replaced clunky patient intake with smooth, mobile-first flows integrated into the site.
              <br />
              learn more:{" "}
              <Link href="/apps" className={linkClassName}>
                apps
              </Link>
            </p>
            <hr />

            <h2>technology applied</h2>
            <p>most dental marketing “stacks” are fragile.</p>
            <p>they rely on disconnected tools and random scripts nobody owns.</p>
            <p>we built an ai-native workflow so improvements ship faster and break less.</p>

            <h3>engineering stack</h3>
            <p>
              <strong>development environment</strong>
              <br />
              we evolved the site and workflows into a modern dev setup using{" "}
              <Link href="/replit" className={linkClassName}>
                replit
              </Link>
              {" "}and an ai cli toolchain so iteration is safe, reversible, and fast.
            </p>
            <p>
              <strong>ai tools</strong>
              <br />
              we used an ai-native workflow (codex / claude / gemini + git discipline) to accelerate builds, catch issues earlier, and keep the system
              maintainable.
              <br />
              learn more:{" "}
              <Link href="/ai" className={linkClassName}>
                ai
              </Link>
              {" "}and{" "}
              <Link href="/openai" className={linkClassName}>
                openai
              </Link>
            </p>

            <h3>seo + performance</h3>
            <p>
              we used google search console + analytics + semrush-style monitoring to ensure the rebuild supported long-term organic growth.
              <br />
              learn more:{" "}
              <Link href="/seo" className={linkClassName}>
                seo
              </Link>
            </p>

            <h3>ads + acquisition</h3>
            <p>
              we ran campaigns on google + meta and continuously improved landing pages + creative based on performance data.
              <br />
              learn more:{" "}
              <Link href="/ads" className={linkClassName}>
                ads
              </Link>
            </p>

            <h3>local presence + forms</h3>
            <p>
              we connected google business profile, apple maps, yelp, and mobile-first onboarding flows so the entire patient journey feels consistent.
              <br />
              learn more:{" "}
              <Link href="/local-listings" className={linkClassName}>
                local listings
              </Link>
              {" "}and{" "}
              <Link href="/apps" className={linkClassName}>
                apps
              </Link>
            </p>
            <hr />

            <h2>the story: how dr. wong took over an established practice without losing the patient base</h2>

            <h3>1) the handoff risk: “are patients going to stay?”</h3>
            <p>patients don’t “evaluate the deal.”</p>
            <p>they evaluate the feeling.</p>
            <p>if the transition feels unclear, they quietly leave. they don’t announce it.</p>
            <p>
              so we made the transition <strong>obvious, human, and reassuring</strong> online.
            </p>

            <h3>2) the website: make the practice feel modern again</h3>
            <p>the inherited website didn’t do the job a handoff requires.</p>
            <p>a handoff website must:</p>
            <ul>
              <li>introduce the new owner clearly</li>
              <li>reduce questions, not create them</li>
              <li>work on mobile</li>
              <li>guide anxious patients toward the next step</li>
            </ul>
            <p>we rebuilt the site so it does that — and so it’s fast, clean, and easy to keep improving.</p>

            <h3>3) the missing piece: patients need to meet the dentist</h3>
            <p>people choose a dentist with emotion first — then logic.</p>
            <p>so we put dr. wong’s story front and center:</p>
            <ul>
              <li>who he is</li>
              <li>how he practices</li>
              <li>what patients should expect</li>
              <li>why the transition happened</li>
            </ul>
            <p>this is the part most practices skip.</p>
            <p>and it’s why patients feel uneasy during handoffs.</p>

            <h3>4) the local ecosystem: remove confusion signals</h3>
            <p>handoffs often fail on maps, not on the website.</p>
            <p>so we cleaned and aligned the presence across the platforms that actually send calls:</p>
            <ul>
              <li>google maps / google business profile</li>
              <li>apple maps</li>
              <li>yelp and other listings</li>
            </ul>
            <p>then we made it easy for happy patients to leave reviews, so public proof starts catching up to reality.</p>

            <h3>5) acquisition: turn on growth once the foundation is stable</h3>
            <p>after trust + clarity were in place, we layered in paid acquisition:</p>
            <ul>
              <li>google search intent</li>
              <li>meta discovery + retargeting</li>
              <li>creative that matches the new brand and story</li>
            </ul>
            <p>we didn’t lead with ads.</p>
            <p>we earned the right to scale.</p>

            <h3>6) measurement: stop guessing</h3>
            <p>the practice needed answers like:</p>
            <ul>
              <li>what channel actually drives booked patients?</li>
              <li>where do people drop off?</li>
              <li>what pages create trust vs confusion?</li>
            </ul>
            <p>so we implemented analytics and reporting that turns marketing from “vibes” into decisions.</p>
            <hr />

            <h2>outcomes</h2>
            <p>here’s the simplest way to explain the result:</p>
            <p>
              <strong>patients feel less uncertainty.</strong>
            </p>
            <p>
              <strong>the practice looks modern.</strong>
            </p>
            <p>
              <strong>the system becomes easier to improve.</strong>
            </p>
            <p>more specifically:</p>
            <ul>
              <li>the transition became a story patients can understand (instead of a mystery they worry about)</li>
              <li>the website now matches the quality of the in-office experience</li>
              <li>local listings and proof started reflecting dr. wong, not the past</li>
              <li>acquisition moved from passive to intentional (seo + ads working together)</li>
              <li>the tech stack now supports continuous improvement rather than “big risky rebuilds”</li>
            </ul>
            <hr />

            <h2>what this means for other dental practices</h2>
            <p>if you’re buying a practice, or you’re inheriting a legacy brand, your biggest risk isn’t clinical.</p>
            <p>
              it’s <strong>perception</strong>.
            </p>
            <p>you can be an amazing dentist and still lose patients if:</p>
            <ul>
              <li>your website feels outdated</li>
              <li>your listings are inconsistent</li>
              <li>your reviews don’t match the new reality</li>
              <li>patients don’t understand who you are</li>
              <li>your marketing is disconnected and unmeasured</li>
            </ul>
            <p>prism exists to fix that.</p>
            <p>we build systems that make patients feel:</p>
            <ul>
              <li>“this is real.”</li>
              <li>“this is modern.”</li>
              <li>“this is safe.”</li>
              <li>“this dentist knows what they’re doing.”</li>
            </ul>
            <p>and we prove it with:</p>
            <ul>
              <li>story</li>
              <li>design</li>
              <li>seo</li>
              <li>ads</li>
              <li>measurement</li>
            </ul>
            <p>
              see more:{" "}
              <Link href="/case-studies" className={linkClassName}>
                case studies
              </Link>
              {" "}and{" "}
              <Link href="/proof" className={linkClassName}>
                proof
              </Link>
            </p>
            <hr />

            <h2>cta / next steps</h2>
            <p>want to know what’s currently putting your practice at risk online?</p>
            <ul>
              <li>
                get a{" "}
                <Link href="/free-analysis" className={linkClassName}>
                  free analysis
                </Link>
                {" "}of your website + local presence
              </li>
              <li>
                see{" "}
                <Link href="/get-started" className={linkClassName}>
                  get started
                </Link>
              </li>
              <li>
                or{" "}
                <Link href="/contact" className={linkClassName}>
                  contact prism
                </Link>
              </li>
            </ul>
            <p>
              <strong>
                if you’re walking into a handoff (or you’re already in one), we’ll help you keep trust stable and turn the new chapter into growth.
              </strong>
            </p>
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
        dateModified="2025-01-15T00:00:00.000Z"
        clientName="Dr. Christopher B. Wong"
        outcome="patients feel less uncertainty, the practice looks modern, and the system becomes easier to improve"
      />
    </div>
  )
}
