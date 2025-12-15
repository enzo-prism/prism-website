"use client"

import Footer from "@/components/footer"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import { Button } from "@/components/ui/button"
import YouTubeVideoEmbed from "@/components/youtube-video-embed"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { trackCTAClick } from "@/utils/analytics"
import { ArrowLeft, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ReactNode, useEffect } from "react"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const HERO_VIDEO_ID = "HrksJeYb02Q"

const cs = CASE_STUDIES.find((item) => item.slug === "dr-christopher-wong")

type ListItem = {
  title: string
  description: ReactNode
}

type StackItem = {
  heading: string
  body: ReactNode
  bullets?: ReactNode[]
}

type StoryStep = {
  id: string
  title: string
  content: ReactNode
}

const quickFacts = [
  { label: "Location", value: "Palo Alto, CA" },
  { label: "Focus", value: "Dental M&A handoff" },
  { label: "Practice", value: "Dr. Christopher B. Wong" },
  { label: "Scope", value: "Website, SEO, ads, AI stack" },
]

const jumpLinks = [
  { id: "products", label: "Products & Services" },
  { id: "technology", label: "Technology" },
  { id: "story", label: "Story" },
  { id: "outcomes", label: "Outcomes" },
  { id: "meaning", label: "What This Means" },
  { id: "cta", label: "CTA" },
]

const designServices: ListItem[] = [
  {
    title: "Founder interview & story development",
    description: (
      <>
        1-hour on-camera interview with Dr. Wong to tell the transition story and humanize the new owner. Supports{" "}
        <Link href="/story" className="font-medium text-neutral-900 underline underline-offset-4">
          story-driven marketing
        </Link>{" "}
        and{" "}
        <Link href="/case-studies" className="font-medium text-neutral-900 underline underline-offset-4">
          case studies
        </Link>
        .
      </>
    ),
  },
  {
    title: "In-person dental photography",
    description: (
      <>
        On-site shoot in Palo Alto capturing Dr. Wong, the team, and key touchpoints in the practice, feeding into the{" "}
        <Link href="/dental-photography" className="font-medium text-neutral-900 underline underline-offset-4">
          dental photography system
        </Link>
        .
      </>
    ),
  },
  {
    title: "Brand design & custom logo",
    description: (
      <>
        New logo and visual system for digital, signage, sponsorships, and print collateral (
        <Link href="/designs" className="font-medium text-neutral-900 underline underline-offset-4">
          design work
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Video editing & content creation",
    description: (
      <>
        Editing the founder interview and practice footage into website hero video, social content, and map-listing media (
        <Link href="/youtube" className="font-medium text-neutral-900 underline underline-offset-4">
          YouTube
        </Link>
        ,{" "}
        <Link href="/tiktok" className="font-medium text-neutral-900 underline underline-offset-4">
          TikTok
        </Link>
        ,{" "}
        <Link href="/ig" className="font-medium text-neutral-900 underline underline-offset-4">
          IG
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Pro photo editing & asset prep",
    description: (
      <>
        Cleaning, grading, and exporting assets for use across the{" "}
        <Link href="/websites" className="font-medium text-neutral-900 underline underline-offset-4">
          website
        </Link>
        , ads, and event materials.
      </>
    ),
  },
]

const engineeringServices: ListItem[] = [
  {
    title: "Full website rebuild & migration",
    description: (
      <>
        From an outdated legacy site to a modern, responsive{" "}
        <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
          dental website
        </Link>
        , improving speed, UX, and long-term maintainability.
      </>
    ),
  },
  {
    title: "SEO audit & implementation",
    description: (
      <>
        Deep{" "}
        <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
          SEO
        </Link>{" "}
        cleanup including structure, content, and technical fixes across robots.txt, sitemap.xml, title tags, meta descriptions, and more.
      </>
    ),
  },
  {
    title: "Local listings optimization",
    description: (
      <>
        Updating all NAP data and branding across{" "}
        <Link href="/local-listings" className="font-medium text-neutral-900 underline underline-offset-4">
          Google Business Profile, Apple Maps, Yelp, and other local listings
        </Link>{" "}
        to reflect Dr. Wong as the new owner.
      </>
    ),
  },
  {
    title: "Review-generation system",
    description: (
      <>
        Deploying in-office tap-to-review placards to drive new Google reviews mentioning "Dr. Wong" and support the practice&apos;s{" "}
        <Link href="/proof" className="font-medium text-neutral-900 underline underline-offset-4">
          proof engine
        </Link>{" "}
        and{" "}
        <Link href="/wall-of-love" className="font-medium text-neutral-900 underline underline-offset-4">
          wall of love
        </Link>
        .
      </>
    ),
  },
  {
    title: "Google Ads & Meta Ads management",
    description: (
      <>
        Launching and optimizing campaigns across{" "}
        <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
          Google Ads
        </Link>{" "}
        and{" "}
        <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
          Meta platforms
        </Link>{" "}
        (Facebook + Instagram) to drive new-patient inquiries.
      </>
    ),
  },
  {
    title: "Analytics & reporting",
    description: (
      <>
        Full analytics stack (Google Analytics, Google Search Console, Semrush) with ongoing{" "}
        <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
          executive-style reporting
        </Link>{" "}
        on what is working.
      </>
    ),
  },
  {
    title: "Patient forms & onboarding upgrade",
    description: (
      <>
        Replacing clunky legacy forms with mobile-first,{" "}
        <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
          Typeform-powered
        </Link>{" "}
        flows integrated into the site to improve patient onboarding UX.
      </>
    ),
  },
]

const productsDelivered: ListItem[] = [
  {
    title: "New practice website",
    description: (
      <>
        A modern, fast, SEO-ready{" "}
        <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
          dental website
        </Link>{" "}
        tailored for a post-M&A environment.
      </>
    ),
  },
  {
    title: "Custom logo & brand assets",
    description: (
      <>
        Visual identity and file kits ready for print and digital ({" "}
        <Link href="/designs" className="font-medium text-neutral-900 underline underline-offset-4">
          designs
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Tap-to-review placards",
    description: (
      <>
        Physical in-office review station linked into the practice&apos;s Google profile, supporting the broader{" "}
        <Link href="/proof" className="font-medium text-neutral-900 underline underline-offset-4">
          review strategy
        </Link>
        .
      </>
    ),
  },
  {
    title: "Custom video content",
    description: (
      <>
        Founder story video, practice walkthrough clips, and social-ready assets for{" "}
        <Link href="/youtube" className="font-medium text-neutral-900 underline underline-offset-4">
          YouTube
        </Link>
        ,{" "}
        <Link href="/tiktok" className="font-medium text-neutral-900 underline underline-offset-4">
          TikTok
        </Link>
        ,{" "}
        <Link href="/ig" className="font-medium text-neutral-900 underline underline-offset-4">
          IG
        </Link>
        , and map listings.
      </>
    ),
  },
  {
    title: "Ad creatives",
    description: (
      <>
        Static and motion ad assets aligned with the new brand for ongoing{" "}
        <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
          ads
        </Link>{" "}
        campaigns.
      </>
    ),
  },
]

const engineeringStack: StackItem[] = [
  {
    heading: "Initial build",
    body: (
      <>
        Figma + Relume &rarr; Webflow (early Prism stack for{" "}
        <Link href="/ai-website-launch" className="font-medium text-neutral-900 underline underline-offset-4">
          website launches
        </Link>
        ).
      </>
    ),
  },
  {
    heading: "Current build",
    body: (
      <>
        <Link href="/replit" className="font-medium text-neutral-900 underline underline-offset-4">
          Replit
        </Link>{" "}
        as the core development environment with:
      </>
    ),
    bullets: [
      (
        <>
          OpenAI Codex CLI ({" "}
          <Link href="/ai" className="font-medium text-neutral-900 underline underline-offset-4">
            AI
          </Link>
          ,{" "}
          <Link href="/openai" className="font-medium text-neutral-900 underline underline-offset-4">
            /openai
          </Link>
          )
        </>
      ),
      <>Anthropic Claude Code CLI</>,
      <>Gemini CLI</>,
      <>Git-based workflows for safe, reversible iteration</>,
    ],
  },
  {
    heading: "SEO & performance",
    body: (
      <>
        Semrush, Google Search Console, and Google Analytics feeding into the{" "}
        <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
          SEO system
        </Link>{" "}
        and{" "}
        <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
          growth engine
        </Link>
        .
      </>
    ),
  },
  {
    heading: "Ads & acquisition",
    body: (
      <>
        Google Ads + Gemini Pro 3 optimizations, Meta Business Suite, and ongoing campaign tuning via{" "}
        <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
          ads
        </Link>{" "}
        and{" "}
        <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
          /google
        </Link>
        .
      </>
    ),
  },
  {
    heading: "Local presence & forms",
    body: (
      <>
        Google Business Profile, Yelp for Business, Apple Maps, and Typeform for mobile-first onboarding flows (
        <Link href="/local-listings" className="font-medium text-neutral-900 underline underline-offset-4">
          local listings
        </Link>
        ,{" "}
        <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
          /apps
        </Link>
        ).
      </>
    ),
  },
]

const designStack: StackItem[] = [
  {
    heading: "Concept & layout",
    body: (
      <>
        Figma for UI/UX and design systems (
        <Link href="/designs" className="font-medium text-neutral-900 underline underline-offset-4">
          designs
        </Link>
        ).
      </>
    ),
  },
  {
    heading: "Asset generation",
    body: (
      <>
        MidJourney, Nano Banana (Gemini Pro 3), Sora and similar tools for concept exploration and visual ideation (
        <Link href="/ai" className="font-medium text-neutral-900 underline underline-offset-4">
          AI
        </Link>
        ).
      </>
    ),
  },
  {
    heading: "Polish & post-production",
    body: <>Photoshop and Wondershare Filmora for image cleanup and video editing.</>,
  },
  {
    heading: "Photography",
    body: (
      <>
        In-person dental shoot plugged into the{" "}
        <Link href="/dental-photography" className="font-medium text-neutral-900 underline underline-offset-4">
          dental photography pipeline
        </Link>
        .
      </>
    ),
  },
]

const storySteps: StoryStep[] = [
  {
    id: "story-1",
    title: '1. The M&A Challenge: "Will my dentist still be there?"',
    content: (
      <>
        <p className="text-neutral-700">
          Dr. Wong bought an existing Palo Alto practice from a long-established dentist, Dr. Hamamoto. For patients, this kind of transition is
          fragile:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>They are attached to the original dentist.</li>
          <li>They are skeptical of change.</li>
          <li>They are not actively looking to switch, but they will if the transition feels off.</li>
        </ul>
        <p className="text-neutral-700">The risk: losing long-time patients during the handoff.</p>
        <p className="text-neutral-700">
          Prism&apos;s mandate was clear: help Dr. Wong retain and grow the patient base while he took over the practice, starting with a new{" "}
          <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
            dental website
          </Link>{" "}
          and expanding into a full{" "}
          <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
            growth system
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "story-2",
    title: "2. Rebuilding the Website from the Ground Up",
    content: (
      <>
        <p className="text-neutral-700">The inherited website was:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Outdated in design</li>
          <li>Messy on the backend</li>
          <li>Running old tech with clunky patient forms and file handling</li>
        </ul>
        <p className="text-neutral-700">Phase 1 of the engagement was a complete rebuild:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Redesigning the site around Dr. Wong as the new face of the practice</li>
          <li>Cleaning up structure, navigation, and on-site copy</li>
          <li>
            Implementing technical{" "}
            <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
              SEO best practices
            </Link>{" "}
            (sitemap, robots.txt, titles, meta descriptions, etc.)
          </li>
          <li>
            Launching a modern, responsive, mobile-first{" "}
            <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
              dental website
            </Link>{" "}
            tailored for local patients
          </li>
        </ul>
        <p className="text-neutral-700">
          Initially, this was done using a Figma &rarr; Relume &rarr; Webflow stack - the early Prism method for{" "}
          <Link href="/ai-website-launch" className="font-medium text-neutral-900 underline underline-offset-4">
            AI-assisted website launches
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "story-3",
    title: "3. Humanizing the Transition: Founder Story & Content",
    content: (
      <>
        <p className="text-neutral-700">Simply swapping names on the door was not enough. Patients needed to:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>See who Dr. Wong is</li>
          <li>Understand why the transition is happening</li>
          <li>Feel confident they are in good hands</li>
        </ul>
        <p className="text-neutral-700">Prism built a story-first content layer:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>
            Conducted a 1-hour on-camera{" "}
            <Link href="/story" className="font-medium text-neutral-900 underline underline-offset-4">
              founder interview
            </Link>{" "}
            with Dr. Wong about his background, philosophy, and the M&A transition.
          </li>
          <li>
            Edited the footage into a hero video for the website, short clips for social (
            <Link href="/youtube" className="font-medium text-neutral-900 underline underline-offset-4">
              YouTube
            </Link>
            ,{" "}
            <Link href="/tiktok" className="font-medium text-neutral-900 underline underline-offset-4">
              TikTok
            </Link>
            ,{" "}
            <Link href="/ig" className="font-medium text-neutral-900 underline underline-offset-4">
              IG
            </Link>
            ), and media for map listings so people meet him before booking.
          </li>
          <li>Added team photos and bios as one of the most-visited sections on the site, backed by analytics.</li>
        </ul>
        <p className="text-neutral-700">
          This turned the transition from "my old dentist left" into "I get a new, younger dentist with modern tools and a forward-thinking approach."
        </p>
      </>
    ),
  },
  {
    id: "story-4",
    title: "4. Fixing the Local Ecosystem: Listings, Branding, and Reviews",
    content: (
      <>
        <p className="text-neutral-700">
          When practices change hands, online infrastructure lags behind. Old listings still said "Hamamoto," reviews referenced the previous dentist, and
          ownership data was stale.
        </p>
        <p className="text-neutral-700">Prism:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>
            Updated and optimized the practice&apos;s{" "}
            <Link href="/local-listings" className="font-medium text-neutral-900 underline underline-offset-4">
              Google Business Profile, Yelp, Apple Maps, and other local listings
            </Link>{" "}
            for Dr. Wong.
          </li>
          <li>
            Reframed the practice info, photos, and links to match the new brand and{" "}
            <Link href="/websites" className="font-medium text-neutral-900 underline underline-offset-4">
              website
            </Link>
            .
          </li>
          <li>
            Deployed tap-to-review placards in-office so patients could tap with their phone on the way out and leave a Google review mentioning Dr. Wong
            by name.
          </li>
        </ul>
        <p className="text-neutral-700">
          Result: the review profile began shifting from "great dentist, Dr. Hamamoto..." to "great experience with Dr. Wong...", signaling trust to both
          patients and the Google algorithm and feeding directly into Prism&apos;s{" "}
          <Link href="/proof" className="font-medium text-neutral-900 underline underline-offset-4">
            proof engine
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "story-5",
    title: "5. Turning On the Acquisition Engine: Meta Ads + Google Ads",
    content: (
      <>
        <p className="text-neutral-700">Once the new site and local foundation were live, Prism moved into acquisition:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>
            Launched{" "}
            <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
              Meta Ads
            </Link>{" "}
            (Instagram + Facebook) to showcase the new brand, Dr. Wong&apos;s story, and the updated practice visuals.
          </li>
          <li>
            Launched{" "}
            <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
              Google Ads
            </Link>{" "}
            in October 2024 focused on high-intent local search queries.
          </li>
          <li>
            Leveraged Google&apos;s Gemini Pro 3 integration for auto-optimization of:
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li>Headlines and ad copy variants</li>
              <li>Budget allocation</li>
              <li>Keyword targeting and bid strategy</li>
            </ul>
          </li>
        </ul>
        <p className="text-neutral-700">
          The campaigns have been consistently improving over time as Google&apos;s AI systems optimize toward better performance and Prism continues to
          refine landing pages and ad creative.
        </p>
      </>
    ),
  },
  {
    id: "story-6",
    title: "6. Upgrading Patient Experience: Forms and Onboarding",
    content: (
      <>
        <p className="text-neutral-700">Legacy patient forms were:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Hard to access</li>
          <li>Not mobile-friendly</li>
          <li>Friction-heavy for new patients</li>
        </ul>
        <p className="text-neutral-700">
          Prism integrated{" "}
          <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
            Typeform-based flows
          </Link>{" "}
          into the new{" "}
          <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
            dental website
          </Link>{" "}
          to:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Make onboarding mobile-first and smooth</li>
          <li>Reduce friction for new patients booking their first visit</li>
          <li>Give the front desk cleaner, more structured data</li>
        </ul>
        <p className="text-neutral-700">This improved patient-facing UX and staff experience in the office.</p>
      </>
    ),
  },
  {
    id: "story-7",
    title: "7. Evolving the Stack: From Webflow to Replit + AI CLI",
    content: (
      <>
        <p className="text-neutral-700">Around winter 2024, Prism fully changed how software for Dr. Wong&apos;s practice was built.</p>
        <p className="text-neutral-700">The team:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>
            Migrated the site&apos;s development to{" "}
            <Link href="/replit" className="font-medium text-neutral-900 underline underline-offset-4">
              Replit
            </Link>
            .
          </li>
          <li>
            Introduced an AI-first toolchain:
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li>
                OpenAI Codex CLI (
                <Link href="/ai" className="font-medium text-neutral-900 underline underline-offset-4">
                  AI
                </Link>
                ,{" "}
                <Link href="/openai" className="font-medium text-neutral-900 underline underline-offset-4">
                  /openai
                </Link>
                )
              </li>
              <li>Claude Code CLI</li>
              <li>Gemini CLI</li>
              <li>Git for version control</li>
            </ul>
          </li>
        </ul>
        <p className="text-neutral-700">This dramatically tightened the iteration loop:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Faster testing and implementation</li>
          <li>Less manual, fragile work</li>
          <li>Fewer critical SEO or UX-breaking bugs</li>
          <li>The ability to ship improvements weekly instead of in big, risky batches</li>
        </ul>
        <p className="text-neutral-700">
          For a long-term partner like Dr. Wong, this means the practice now runs on a stack closer to a modern tech company than a typical brick-and-mortar
          dental office.
        </p>
      </>
    ),
  },
  {
    id: "story-8",
    title: "8. Design & Brand Support Beyond the Screen",
    content: (
      <>
        <p className="text-neutral-700">Beyond digital, Prism supported Dr. Wong&apos;s offline presence:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Designed a custom logo and brand system aligned with the new positioning.</li>
          <li>Provided production-ready art files and guidance for local sponsorships (e.g., high school events) and community marketing.</li>
          <li>
            Ran an in-person{" "}
            <Link href="/dental-photography" className="font-medium text-neutral-900 underline underline-offset-4">
              dental photography
            </Link>{" "}
            shoot and integrated the imagery into the website, ads, and social content.
          </li>
        </ul>
        <p className="text-neutral-700">
          Most of the visual system was built with a combination of Figma, MidJourney, Gemini-based tools, Photoshop, and Filmora - reflecting Prism&apos;s
          hybrid{" "}
          <Link href="/ai" className="font-medium text-neutral-900 underline underline-offset-4">
            AI + design
          </Link>{" "}
          approach.
        </p>
      </>
    ),
  },
  {
    id: "story-9",
    title: "9. The Ongoing Partnership",
    content: (
      <>
        <p className="text-neutral-700">
          Dr. Wong is one of Prism&apos;s earliest and longest-running partners. Over time, the engagement has evolved from "rebuild our website" into:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>
            A continuous, AI-powered{" "}
            <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
              growth system
            </Link>
          </li>
          <li>A tight feedback loop between the practice and Prism on what is happening day-to-day</li>
          <li>A shared mindset: experiment, iterate, and adopt what works earliest</li>
        </ul>
        <p className="text-neutral-700">Prism acts as the "AI-native intermediary" between cutting-edge tools and a real-world dental practice:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>The practice team surfaces constraints, pain points, and bottlenecks.</li>
          <li>Prism maps those to what AI, engineering, and design can actually solve.</li>
          <li>Together they build and refine systems that improve patient experience, staff workflows, and growth.</li>
        </ul>
      </>
    ),
  },
]

const outcomes = [
  "The M&A transition was supported by a clear, story-driven online presence rather than leaving patients to guess what happened.",
  (
    <>
      The practice now runs on a modern{" "}
      <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
        dental website
      </Link>{" "}
      with strong{" "}
      <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
        SEO foundations
      </Link>{" "}
      and clean UX.
    </>
  ),
  "Local presence and review profiles now reflect Dr. Wong as the primary dentist, not just the previous owner.",
  (
    <>
      Acquisition has shifted from passive word-of-mouth to active, AI-optimized{" "}
      <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
        ads
      </Link>{" "}
      and{" "}
      <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
        Google
      </Link>{" "}
      campaigns.
    </>
  ),
  "The development and design stack is modern, AI-native, and capable of continuous improvement rather than one-off redesigns.",
]

const meaningBullets = [
  "Losing patients in the handoff",
  "Running on outdated tech and marketing",
  "Being invisible where new patients are searching",
]

const meaningList = [
  "De-risk an ownership transition",
  (
    <>
      Modernize your{" "}
      <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
        dental website
      </Link>{" "}
      and{" "}
      <Link href="/local-listings" className="font-medium text-neutral-900 underline underline-offset-4">
        local listings
      </Link>
    </>
  ),
  (
    <>
      Turn on always-on{" "}
      <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
        ads
      </Link>{" "}
      and{" "}
      <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
        SEO
      </Link>
    </>
  ),
  "Upgrade the day-to-day patient experience",
]

export default function ChristopherWongCaseStudy() {
  useEffect(() => {
    const hero = document.getElementById("static-dr-wong-hero")
    if (hero) {
      hero.setAttribute("data-hydrated-hidden", "true")
      hero.setAttribute("aria-hidden", "true")
      hero.style.display = "none"
    }
  }, [])

  const handleJump = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 90,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero / Video Block */}
        <section className="border-b bg-neutral-50 px-4 py-16 md:py-24">
          <div className="container mx-auto max-w-5xl space-y-12 px-4 md:px-6">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex w-fit items-center rounded-full bg-neutral-900 px-4 py-1 text-sm font-medium text-white">
                Case study
              </span>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Case Study: Dr. Wong - De-Risking a Dental M&A in Palo Alto with AI-Powered Marketing
              </h1>
              <p className="text-lg text-neutral-700">From ownership transition risk to a future-proof, AI-powered dental practice in Palo Alto.</p>
              <p className="text-neutral-700">
                Prism helped Dr. Chris Wong take over an established Palo Alto dental practice from Dr. Hamamoto, retain the patient base, and
                modernize the entire online experience with a new{" "}
                <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
                  dental website
                </Link>
                , local SEO, paid ads, and an AI-native development stack.
              </p>
              <p className="text-neutral-700">
                Watch Enzo&apos;s interview with Dr. Wong on how the handoff worked, what changed across the site and local presence, and how AI-first
                workflows now power the practice.
              </p>
              <p className="text-neutral-700">
                Visit the practice site at{" "}
                <Link href="https://www.chriswongdds.com" className="font-medium text-neutral-900 underline underline-offset-4" target="_blank" rel="noreferrer">
                  chriswongdds.com
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700">
                    <span className="font-medium text-neutral-900">{fact.label}:</span> {fact.value}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <YouTubeVideoEmbed videoId={HERO_VIDEO_ID} title="Dr. Christopher Wong Interview" className="w-full" />
              </div>
              <div className="space-y-4">
                <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
                  <p className="text-neutral-700">
                    Enzo interviews Dr. Chris Wong on taking over Dr. Hamamoto&apos;s practice, retaining patients, and modernizing the brand.
                  </p>
                  <p className="text-neutral-700">Short interview cut covering the transition story, new site, and growth stack.</p>
                </div>
                <p className="text-sm text-neutral-600">Scroll to see the products, services, and technology Prism deployed for Dr. Wong&apos;s practice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Jump Nav */}
        <div className="sticky top-14 z-10 border-b bg-white/95 px-4 backdrop-blur">
          <div className="container mx-auto max-w-5xl px-4 md:px-6">
            <div className="flex gap-2 overflow-x-auto py-3 text-sm">
              {jumpLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleJump(link.id)}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products & Services */}
        <section id="products" className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-10 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Products &amp; Services Delivered by Prism for Dr. Wong</h2>
              <p className="text-neutral-700">
                Dr. Wong&apos;s engagement started as a straightforward{" "}
                <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
                  dental website rebuild
                </Link>{" "}
                and evolved into a full-stack growth partnership. Below is everything Prism deployed to support the ownership transition and long-term
                growth of the practice.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-2xl font-semibold tracking-tight">Design Services</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {designServices.map((item) => (
                    <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-neutral-900">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-2xl font-semibold tracking-tight">Engineering Services</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {engineeringServices.map((item) => (
                    <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-neutral-900">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-2xl font-semibold tracking-tight">Products Delivered</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {productsDelivered.map((item) => (
                    <div key={item.title} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold text-neutral-900">{item.title}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Applied */}
        <section id="technology" className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Technology Applied</h2>
              <p className="text-neutral-700">
                Dr. Wong&apos;s practice is one of the deepest implementations of Prism&apos;s AI-native stack. Over the course of the engagement, the
                underlying technology evolved from a Webflow build to a Replit + AI CLI toolchain.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Engineering stack
                </div>
                <div className="space-y-4">
                  {engineeringStack.map((item) => (
                    <div key={item.heading} className="rounded-lg border border-neutral-100 bg-neutral-50/70 p-4">
                      <p className="font-semibold text-neutral-900">{item.heading}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.body}</p>
                      {item.bullets && (
                        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                          {item.bullets.map((bullet, idx) => (
                            <li key={`${item.heading}-${idx}`} className="flex gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
                  Design stack
                </div>
                <div className="space-y-4">
                  {designStack.map((item) => (
                    <div key={item.heading} className="rounded-lg border border-neutral-100 bg-neutral-50/70 p-4">
                      <p className="font-semibold text-neutral-900">{item.heading}</p>
                      <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{item.body}</p>
                      {item.bullets && (
                        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                          {item.bullets.map((bullet, idx) => (
                            <li key={`${item.heading}-${idx}`} className="flex gap-2">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section id="story" className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                The Story: How Prism Helped Dr. Wong Take Over an Established Practice Without Losing the Patient Base
              </h2>
            </div>
            <div className="relative space-y-8">
              <div className="absolute left-4 top-0 h-full w-px bg-neutral-200 md:left-6" aria-hidden="true" />
              {storySteps.map((step, idx) => (
                <div key={step.id} id={step.id} className="relative grid gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-[auto,1fr]">
                  <div className="relative flex h-full items-start justify-start">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight text-neutral-900">{step.title}</h3>
                    <div className="space-y-3 text-sm leading-relaxed">{step.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section id="outcomes" className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Outcomes &amp; Impact (Qualitative)</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {outcomes.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <p className="text-sm leading-relaxed text-neutral-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What This Means */}
        <section id="meaning" className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What This Means for Other Dental Practices</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-neutral-700">If you are a dentist buying or growing a practice, your risk is not just the deal terms - it is:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {meaningBullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-neutral-700">Prism&apos;s work with Dr. Wong shows how an AI-native partner can:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {meaningList.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / Next Steps */}
        <section id="cta" className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">CTA / Next Steps</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>
                  See more{" "}
                  <Link href="/case-studies" className="font-medium text-neutral-900 underline underline-offset-4">
                    case studies
                  </Link>{" "}
                  and{" "}
                  <Link href="/proof" className="font-medium text-neutral-900 underline underline-offset-4">
                    proof
                  </Link>
                  .
                </li>
                <li>
                  Learn{" "}
                  <Link href="/why-dental-practices-love-prism" className="font-medium text-neutral-900 underline underline-offset-4">
                    why dental practices love Prism
                  </Link>
                  .
                </li>
                <li>
                  Get a{" "}
                  <Link href="/free-analysis" className="font-medium text-neutral-900 underline underline-offset-4">
                    free analysis
                  </Link>{" "}
                  of your current website and local presence.
                </li>
                <li>
                  Or go straight to{" "}
                  <Link href="/get-started" className="font-medium text-neutral-900 underline underline-offset-4">
                    get started
                  </Link>{" "}
                  or{" "}
                  <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-4">
                    contact
                  </Link>{" "}
                  to talk about your practice.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-neutral-900">Ready to modernize your practice?</p>
                  <p className="text-sm text-neutral-700">Let&apos;s apply the same AI-powered playbook to your transition or growth plan.</p>
                  <p className="text-sm text-neutral-700">
                    Built with Prism’s{" "}
                    <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                      dental practice website system
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/get-started">
                    <Button className="rounded-full px-6 py-3 text-base" onClick={() => trackCTAClick(FREE_AUDIT_CTA_TEXT, "case study bottom")}>
                      {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="rounded-full px-6 py-3 text-base">
                      Talk with us <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/case-studies">
                  <Button variant="outline" className="rounded-full">
                    <ArrowLeft className="mr-2 h-4 w-4" /> All case studies
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button variant="ghost" className="rounded-full">
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CaseStudySchema
        title="Case Study: Dr. Wong - De-Risking a Dental M&A in Palo Alto with AI-Powered Marketing"
        description="Prism helped Dr. Chris Wong take over an established Palo Alto dental practice, retain the patient base, and modernize the online experience with a new dental website, local SEO, ads, and an AI-native stack."
        url={cs?.structured?.canonicalUrl ?? "https://www.design-prism.com/case-studies/dr-christopher-wong"}
        imageUrl={cs?.structured?.heroImage ?? "https://www.design-prism.com/dr-wong-polaroids.png"}
        datePublished={cs?.structured?.datePublished ?? "2025-01-15T00:00:00.000Z"}
        dateModified={cs?.structured?.dateModified ?? "2025-01-15T00:00:00.000Z"}
        clientName="Dr. Christopher B. Wong"
        outcome="AI-powered marketing, design, and engineering to de-risk a dental M&A and drive growth"
        breadcrumbs={[
          { name: "Home", url: "https://www.design-prism.com" },
          { name: "Case Studies", url: "https://www.design-prism.com/case-studies" },
          { name: "Dr. Christopher Wong", url: "https://www.design-prism.com/case-studies/dr-christopher-wong" },
        ]}
        organization={{
          name: "Prism",
          url: "https://www.design-prism.com",
          logo: "https://www.design-prism.com/logo.png",
          sameAs: [
            "https://www.linkedin.com/company/prism-digital",
            "https://www.youtube.com/@designprism",
          ],
        }}
        video={{
          name: "Dr. Christopher Wong Interview",
          description: "Enzo interviews Dr. Chris Wong on taking over Dr. Hamamoto's practice and modernizing the brand.",
          embedUrl: `https://www.youtube.com/embed/${HERO_VIDEO_ID}`,
          uploadDate: cs?.structured?.datePublished ?? "2025-01-15T00:00:00.000Z",
          thumbnailUrl: cs?.structured?.heroImage ?? "https://www.design-prism.com/dr-wong-polaroids.png",
        }}
        faq={[
          {
            question: "How did Prism de-risk Dr. Wong's practice transition?",
            answer:
              "By pairing a story-led website rebuild, local listings cleanup, review generation, and AI-powered acquisition so existing patients stayed while new patients found the practice.",
          },
          {
            question: "What technology stack powers Dr. Wong's practice now?",
            answer:
              "Replit-based development with AI CLIs (OpenAI, Claude, Gemini), Semrush/GA/GSC for SEO, and Google + Meta ads tuned with Gemini Pro optimizations.",
          },
          {
            question: "What services were delivered for Dr. Wong?",
            answer:
              "Full website rebuild, SEO, local listings optimization, review system, Google + Meta ads, analytics and reporting, Typeform-based onboarding, photography, video, and brand design.",
          },
          {
            question: "What outcomes were achieved?",
            answer:
              "A stable M&A transition with patient retention, stronger local presence and reviews, AI-optimized acquisition channels, and a modern, continuously improving digital stack.",
          },
        ]}
      />
      <div className="mt-12">
        <SocialShare
          url="https://www.design-prism.com/case-studies/dr-christopher-wong"
          imageUrl="https://www.design-prism.com/dr-wong-polaroids.png"
          title="Case Study: Dr. Wong - AI-Powered Dental M&A"
          description="How Prism de-risked a Palo Alto dental ownership transition with AI-driven marketing, design, and engineering."
        />
      </div>
    </div>
  )
}
