import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import Image from "next/image"
import Link from "next/link"

const linkClassName = "font-medium text-neutral-900 underline underline-offset-4"
const CASE_STUDY_TITLE = "Olympic Bootworks: the Tahoe shop that finally sells online"
const CASE_STUDY_DESCRIPTION =
  "Olympic Bootworks already had the hard part: a legendary reputation, Olympians in the fitting room, and customers who drive hours to get it done right."

export default function OlympicBootworksCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
          <article className="prose prose-neutral max-w-none">
            <p>Case Study</p>
            <h1>{CASE_STUDY_TITLE}</h1>
            <p>
              Olympic Bootworks already had the hard part: a legendary reputation, Olympians in the fitting room, and customers who drive hours to get it
              done right.
            </p>
            <p>
              Online, they had the opposite: a basic Squarespace page, weak local discovery, and no clean way to move high‑ticket inventory (Fantic e‑bikes)
              without relying on walk‑ins.
            </p>
            <p>
              Prism rebuilt Olympic Bootworks into a two‑site ecommerce system—POS‑linked inventory, a dedicated Fantic Warehouse microsite, and an owned
              Google + email stack—so the shop can sell while the team stays focused on bootfitting.
            </p>
            <p>
              <strong>Location:</strong> Tahoe, CA
              <br />
              <strong>Focus:</strong> Ecommerce + multi‑site launch
              <br />
              <strong>Client:</strong> Olympic Bootworks
              <br />
              <strong>Scope:</strong> Website rebuild, POS‑linked ecommerce catalog, multi‑site, analytics + SEO, Workspace + DNS cleanup
            </p>
            <p>
              <strong>Explore:</strong>{" "}
              <Link href="/case-studies" className={linkClassName}>
                Case studies
              </Link>{" "}
              •{" "}
              <Link href="/wall-of-love" className={linkClassName}>
                Wall of love
              </Link>{" "}
              •{" "}
              <Link href="/get-started" className={linkClassName}>
                Get started
              </Link>
            </p>
            <hr />

            <h2>Snapshot</h2>
            <p>
              <strong>What you’re looking at:</strong>
              <br />
              A modern Olympic Bootworks experience (brand + services + bootfitting tech) <strong>plus</strong> a dedicated “Fantic Warehouse” shopping
              experience built to sell bikes online.
            </p>
            <p>Scroll for the build, the stack, the story, and what changed.</p>
            <hr />

            <h2>Contents</h2>
            <ul>
              <li>
                <Link href="/case-studies/olympic-bootworks#what-we-built" className={linkClassName}>
                  What we built
                </Link>
              </li>
              <li>
                <Link href="/case-studies/olympic-bootworks#how-we-built-it" className={linkClassName}>
                  How we built it (the stack)
                </Link>
              </li>
              <li>
                <Link href="/case-studies/olympic-bootworks#the-story" className={linkClassName}>
                  The story (7 steps)
                </Link>
              </li>
              <li>
                <Link href="/case-studies/olympic-bootworks#outcomes" className={linkClassName}>
                  Outcomes
                </Link>
              </li>
              <li>
                <Link href="/case-studies/olympic-bootworks#lessons" className={linkClassName}>
                  Lessons for specialty shops
                </Link>
              </li>
              <li>
                <Link href="/case-studies/olympic-bootworks#next-steps" className={linkClassName}>
                  Next steps
                </Link>
              </li>
            </ul>
            <hr />

            <a id="what-we-built" />
            <h2>What we built</h2>

            <h3>The problem (in plain language)</h3>
            <p>If you’re a specialty shop owner, you know this pattern:</p>
            <ul>
              <li>Offline, you’re busy. People trust you.</li>
              <li>Online, you’re hard to find—and your inventory doesn’t move the way it should.</li>
              <li>Your domain, email, and “random vendor stack” turns into a slow leak… until it becomes a fire.</li>
            </ul>
            <p>That was Olympic Bootworks.</p>
            <p>
              So the goal wasn’t “make a pretty website.”
              <br />
              The goal was: <strong>turn the website into a sales channel and an ops asset.</strong>
            </p>
            <hr />

            <h3>1) A new Olympic Bootworks website (brand + services + credibility)</h3>
            <p>
              We rebuilt the legacy Squarespace site into a modern, mobile‑first{" "}
              <Link href="/websites" className={linkClassName}>
                website
              </Link>{" "}
              that does three jobs:
            </p>
            <ul>
              <li>Explains what makes Olympic Bootworks different (and why serious skiers trust them)</li>
              <li>Showcases their heel‑lock bootfitting technology in a way that’s easy to understand</li>
              <li>Captures leads and demand from local search</li>
            </ul>
            <p>
              This is the kind of build Prism does for SMBs that want a real engine—not a brochure ({" "}
              <Link href="/smb" className={linkClassName}>
                SMB websites
              </Link>
              ).
            </p>
            <hr />

            <h3>2) A dedicated “Fantic Warehouse” microsite (inventory + conversion)</h3>
            <p>Fantic inventory needed its own lane.</p>
            <p>
              We launched a second site—Fantic Warehouse—built for one thing: <strong>help the right buyer find the right bike and buy confidently online.</strong>
            </p>
            <p>Why split it?</p>
            <p>Because “bootfitting + services” and “high‑ticket ecommerce” are two different user journeys. Two different intents. Two different conversion paths.</p>
            <p>Multi‑site architecture let Olympic Bootworks do both—without compromise.</p>
            <hr />

            <h3>3) POS‑linked ecommerce integration (non‑Shopify, real constraints)</h3>
            <p>This wasn’t a clean Shopify replatform.</p>
            <p>Olympic Bootworks already had a POS‑linked ecommerce provider (non‑Shopify). We integrated it into the new experience:</p>
            <ul>
              <li>Catalog + SKU structure</li>
              <li>Inventory syncing with in‑store sales</li>
              <li>Purchasing flow that doesn’t feel bolted on</li>
            </ul>
            <p>If you’ve ever tried to make a “clunky vendor layer” feel premium, you know why this matters.</p>
            <hr />

            <h3>4) Content that actually helps sell (not just “branding”)</h3>
            <p>We packaged and edited video content into assets that work across the site:</p>
            <ul>
              <li>Hero story moments</li>
              <li>Athlete testimonials</li>
              <li>Product promos</li>
            </ul>
            <p>
              This is the same content system we build for high‑leverage marketing libraries ({" "}
              <Link href="/hottest-content" className={linkClassName}>
                hottest content
              </Link>
              ,{" "}
              <Link href="/youtube" className={linkClassName}>
                YouTube
              </Link>
              ).
            </p>
            <hr />

            <h3>5) A clean Google + email foundation (owned, stable, no lock‑in)</h3>
            <p>Part of the job was invisible—but critical:</p>
            <ul>
              <li>Google Workspace stood up and owned cleanly</li>
              <li>DNS rebuilt correctly (after legacy provider chaos)</li>
              <li>Custom email stabilized so it doesn’t break after a grace period</li>
            </ul>
            <p>
              That’s the unsexy stuff that saves founders weeks of pain later ({" "}
              <Link href="/google" className={linkClassName}>
                Google
              </Link>
              ).
            </p>
            <hr />

            <a id="how-we-built-it" />
            <h2>How we built it (the stack)</h2>
            <p>This project is where Prism got real reps in ecommerce under constraint: POS‑linked inventory, multi‑site decisions, and shipping fast without breaking things.</p>

            <h3>Stack evolution (3 phases)</h3>
            <p>
              <strong>Phase 1 — From Squarespace to “first real upgrade”</strong>
              <br />
              We moved off a basic Squarespace presence and stood up an early AI‑assisted build (Vercel v0) as a fast first step ({" "}
              <Link href="/ai-website-launch" className={linkClassName}>
                AI website launch
              </Link>
              ).
            </p>
            <p>
              <strong>Phase 2 — Multi‑site + POS‑linked ecommerce</strong>
              <br />
              We wired the third‑party ecommerce layer into a modern UX while keeping inventory in sync with the POS (non‑Shopify).
            </p>
            <p>
              <strong>Phase 3 — Replit + AI shipping cadence</strong>
              <br />
              We migrated both sites onto{" "}
              <Link href="/replit" className={linkClassName}>
                Replit
              </Link>
              , standardized on Git, and used AI CLIs as accelerants (Codex / Claude Code / Cursor) to ship faster and iterate safely ({" "}
              <Link href="/ai" className={linkClassName}>
                AI
              </Link>
              ,{" "}
              <Link href="/openai" className={linkClassName}>
                OpenAI
              </Link>
              ).
            </p>
            <hr />

            <h3>Analytics + SEO (so the site compounds)</h3>
            <p>We implemented an analytics + SEO stack that Prism uses to compound results over time:</p>
            <ul>
              <li>Google Analytics</li>
              <li>Google Search Console</li>
              <li>Semrush</li>
              <li>Hotjar</li>
            </ul>
            <p>
              That data feeds directly into ongoing improvements via{" "}
              <Link href="/seo" className={linkClassName}>
                SEO
              </Link>
              {" "}+{" "}
              <Link href="/growth" className={linkClassName}>
                growth
              </Link>
              .
            </p>
            <hr />

            <h3>Forms + lead capture</h3>
            <p>For structured forms that work on mobile and don’t feel like 2008:</p>
            <ul>
              <li>
                Typeform integrated across both sites ({" "}
                <Link href="/apps" className={linkClassName}>
                  apps
                </Link>
                )
              </li>
            </ul>
            <hr />

            <a id="the-story" />
            <h2>The story (7 steps)</h2>

            <h3>1) Legendary offline. Weak online.</h3>
            <p>Olympic Bootworks is not a typical local shop:</p>
            <ul>
              <li>Two locations in Tahoe</li>
              <li>Famous in the Bay Area among serious skiers</li>
              <li>Serves Olympians and elite winter‑sport athletes</li>
              <li>Led by Buck Brown, an engineer and inventor</li>
            </ul>
            <p>
              Offline: trusted.
              <br />
              Online: basic Squarespace + one contact form + little local optimization.
            </p>
            <p>Meanwhile, Buck had a warehouse full of Fantic e‑bikes that needed a real online channel.</p>
            <p>That gap became the mission.</p>
            <hr />

            <h3>2) Build the first ecommerce experience (fast, credible, mobile‑first)</h3>
            <p>
              The mandate was simple: <strong>sell high‑end Fantic e‑bikes online.</strong>
            </p>
            <p>So we built an experience that matched the brand:</p>
            <ul>
              <li>Clear product discovery</li>
              <li>Mobile‑first UX</li>
              <li>Search‑aware structure</li>
              <li>A checkout flow that doesn’t feel patched together</li>
            </ul>
            <p>This was Prism’s first true “inventory + fulfillment + POS sync” ecommerce build—and it forced us to get real about the details.</p>
            <hr />

            <h3>3) Work inside constraints (because that’s real life)</h3>
            <p>The constraint set was classic:</p>
            <ul>
              <li>Non‑Shopify, POS‑linked ecommerce</li>
              <li>Clunky admin tools</li>
              <li>Early Vercel v0 integration friction</li>
            </ul>
            <p>We used early AI tooling to navigate the vendor dashboard, inventory syncing, and product configuration without breaking the customer experience.</p>
            <p>Where the vendor layer limited implementation, we made smart design compromises and protected the user journey.</p>
            <hr />

            <h3>4) Split the experience: Olympic Bootworks + Fantic Warehouse</h3>
            <p>Fantic deserved its own experience.</p>
            <p>
              So we launched a second site: <strong>Fantic Warehouse</strong>.
            </p>
            <ul>
              <li>Built for buyers searching specifically for e‑bikes in Tahoe</li>
              <li>Optimized for inventory turnover</li>
              <li>Kept the Olympic Bootworks site focused on bootfitting, services, and brand trust</li>
            </ul>
            <p>Two sites. Two intents. One system.</p>
            <hr />

            <h3>5) Migrate to Replit + AI for weekly shipping</h3>
            <p>We moved the main site off Vercel v0 and onto Replit, and kept Fantic Warehouse on Replit.</p>
            <p>Then we standardized how we ship:</p>
            <ul>
              <li>Git workflow</li>
              <li>AI CLIs for faster iteration</li>
              <li>“Fix it, ship it, improve it” cadence</li>
            </ul>
            <p>Result: faster edits, fewer lingering bugs, a maintainable codebase, and weekly shipping.</p>
            <hr />

            <h3>6) The DNS/email fire (and the fix)</h3>
            <p>The domain lived in an old GoDaddy setup, then moved into a founder‑owned Squarespace domain.</p>
            <p>Hidden DNS records powered email. After a grace period, things broke.</p>
            <p>Prism reverse‑engineered the DNS stack, coordinated with the old provider, rebuilt records, and stood up Google Workspace with stable custom email.</p>
            <p>Outcome: owned infrastructure, modern email, no legacy lock‑in.</p>
            <hr />

            <h3>7) AI as a co‑pilot (not a replacement)</h3>
            <p>We used AI where it actually helps:</p>
            <ul>
              <li>Navigate confusing admin dashboards and vendor docs</li>
              <li>Implement and refactor code safely</li>
              <li>Use analytics + Semrush to guide SEO and content iteration</li>
            </ul>
            <p>The pattern: <strong>human judgment + AI accelerants + tight client collaboration.</strong></p>
            <hr />

            <a id="outcomes" />
            <h2>Outcomes</h2>
            <p>This is a qualitative case study, but the directional impact is clear:</p>
            <div className="not-prose my-6 rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
              <Image
                src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1767372608/search-console-details_omzokl.webp"
                alt="Search Console performance detail for Olympic Bootworks"
                width={1975}
                height={1237}
                className="h-auto w-full rounded-xl"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
                search console performance snapshot
              </p>
            </div>
            <ul>
              <li>
                <strong>Traffic, search impressions, and online engagement compounded over time</strong>
              </li>
              <li>
                Olympic Bootworks went from “great store, weak website” to <strong>a two‑site system built for brand + ecommerce</strong>
              </li>
              <li>Fantic inventory gained a real online sales channel instead of relying on walk‑ins</li>
              <li>The business escaped website + email technical debt and moved to owned infrastructure</li>
              <li>Prism gained deep ecommerce + POS integration reps that now power the broader Prism flywheel</li>
            </ul>
            <p>If you’re a local or specialty shop with real demand and no bandwidth, this is the playbook.</p>
            <hr />

            <a id="lessons" />
            <h2>Lessons for specialty shops &amp; local SMBs</h2>
            <p>If you have product‑market fit but limited time for digital, you don’t need 47 tools.</p>
            <p>You need a system.</p>
            <p>Here’s what this project reinforced:</p>
            <ul>
              <li>
                <strong>Your offline reputation does not automatically transfer online.</strong> You have to translate it.
              </li>
              <li>
                <strong>Inventory wants its own journey.</strong> Don’t cram “services + high‑ticket products” into one funnel.
              </li>
              <li>
                <strong>Vendor constraints are normal.</strong> The job is making them invisible to customers.
              </li>
              <li>
                <strong>If you don’t own your domain + DNS, you don’t own your business.</strong> Fix this early.
              </li>
            </ul>
            <p>Prism’s role is to own the full engine:</p>
            <ul>
              <li>
                <Link href="/websites" className={linkClassName}>
                  Website
                </Link>{" "}
                +{" "}
                <Link href="/designs" className={linkClassName}>
                  design
                </Link>
              </li>
              <li>
                <Link href="/seo" className={linkClassName}>
                  SEO
                </Link>{" "}
                +{" "}
                <Link href="/growth" className={linkClassName}>
                  growth
                </Link>
              </li>
              <li>
                <Link href="/google" className={linkClassName}>
                  Google + Workspace
                </Link>
              </li>
              <li>
                Integrations via{" "}
                <Link href="/apps" className={linkClassName}>
                  apps
                </Link>
              </li>
              <li>
                And when it makes sense:{" "}
                <Link href="/ads" className={linkClassName}>
                  ads
                </Link>
              </li>
            </ul>
            <p>
              This is why local shop owners keep Prism around ({" "}
              <Link href="/why-local-shop-owners-love-prism" className={linkClassName}>
                why local shop owners love Prism
              </Link>
              ).
            </p>
            <hr />

            <a id="next-steps" />
            <h2>Next steps</h2>
            <p>Want the same outcome—without spending your weekends in DNS settings and ecommerce dashboards?</p>
            <ul>
              <li>
                Get a{" "}
                <Link href="/free-analysis" className={linkClassName}>
                  free analysis
                </Link>{" "}
                of your website, ecommerce setup, and local presence
              </li>
              <li>
                Review{" "}
                <Link href="/get-started" className={linkClassName}>
                  get started
                </Link>{" "}
                (if you already know you want Prism)
              </li>
              <li>
                Or{" "}
                <Link href="/contact" className={linkClassName}>
                  talk with us
                </Link>{" "}
                and we’ll map the fastest path
              </li>
            </ul>
            <p>
              <strong>More proof:</strong>{" "}
              <Link href="/case-studies" className={linkClassName}>
                Case studies
              </Link>{" "}
              •{" "}
              <Link href="/wall-of-love" className={linkClassName}>
                Wall of love
              </Link>{" "}
              •{" "}
              <Link href="/proof" className={linkClassName}>
                Proof
              </Link>
            </p>
            <p>Ready to upgrade your shop’s online engine?</p>
            <p>
              <Link href="/get-started" className={linkClassName}>
                Get started
              </Link>
            </p>
          </article>
        </div>

        <div className="mt-12">
          <SocialShare
            url="https://www.design-prism.com/case-studies/olympic-bootworks"
            imageUrl="https://www.design-prism.com/olympic-bootworks-hero.png"
            title={CASE_STUDY_TITLE}
            description={CASE_STUDY_DESCRIPTION}
          />
        </div>
      </main>
      <Footer />
      <CaseStudySchema
        title={CASE_STUDY_TITLE}
        description={CASE_STUDY_DESCRIPTION}
        url="https://www.design-prism.com/case-studies/olympic-bootworks"
        imageUrl="https://www.design-prism.com/olympic-bootworks-hero.png"
        datePublished="2025-02-15T00:00:00.000Z"
        dateModified="2025-02-15T00:00:00.000Z"
        clientName="Olympic Bootworks"
        outcome="a two‑site ecommerce system with POS‑linked inventory, owned infrastructure, and compounding search visibility"
      />
    </div>
  )
}
