import { CaseStudySectionNav } from "@/components/case-studies/CaseStudySectionNav"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { CaseStudySchema } from "@/components/schema-markup"
import SocialShare from "@/components/social-share"
import TrackedLink from "@/components/tracked-link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import YouTubeVideoEmbed from "@/components/youtube-video-embed"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { ArrowLeft, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ReactNode } from "react"

const FounderImpactGraph = dynamic(
  () => import("@/components/case-studies/FounderImpactGraph").then((m) => m.FounderImpactGraph),
  { loading: () => <Skeleton className="h-64 w-full rounded-2xl" /> }
)

const HERO_VIDEO_ID = "VIDEO_PLACEHOLDER"
const CLIENT_SITE = "https://www.matariadental.com"
const cs = CASE_STUDIES.find((item) => item.slug === "mataria-dental-group")

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
  { label: "Location", value: "Torrance, CA" },
  { label: "Focus", value: "Dental M&A launch" },
  { label: "Practice", value: "Mataria Dental Group" },
  { label: "Scope", value: "Website, listings, content, social ads, analytics" },
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
        1-hour on-camera{" "}
        <Link href="/story" className="font-medium text-neutral-900 underline underline-offset-4">
          founder interview
        </Link>{" "}
        with Dr. Mataria to explain the transition, his background, and his vision for the practice.
      </>
    ),
  },
  {
    title: "Team interview series",
    description: (
      <>Custom interview questions and sit-down recordings with the office manager, front desk, and multiple team members to show the human side of the practice.</>
    ),
  },
  {
    title: "Video editing & content creation",
    description: (
      <>
        Editing all interviews into website hero content, social clips, and ad-ready assets for{" "}
        <Link href="/ig" className="font-medium text-neutral-900 underline underline-offset-4">
          Instagram
        </Link>
        ,{" "}
        <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
          Facebook
        </Link>
        , and{" "}
        <Link href="/tiktok" className="font-medium text-neutral-900 underline underline-offset-4">
          TikTok
        </Link>
        .
      </>
    ),
  },
  {
    title: "Brand asset formatting",
    description: (
      <>
        Reformatting the existing logo and brand assets into favicons, open graph images for the{" "}
        <Link href="/websites" className="font-medium text-neutral-900 underline underline-offset-4">
          website
        </Link>
        , thumbnails for{" "}
        <Link href="/youtube" className="font-medium text-neutral-900 underline underline-offset-4">
          YouTube
        </Link>
        , and banners/profile images for new social channels.
      </>
    ),
  },
  {
    title: "Social content design",
    description: <>Consistent look and feel across new practice social accounts (IG, TikTok).</>,
  },
]

const engineeringServices: ListItem[] = [
  {
    title: "New practice website build",
    description: (
      <>
        Designing in Figma and building a new{" "}
        <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
          dental website
        </Link>{" "}
        in Webflow for the Torrance practice.
      </>
    ),
  },
  {
    title: "Website transfer & DNS",
    description: <>Migrating the domain from the old site to the new build and getting everything properly pointed and live.</>,
  },
  {
    title: "Local listings alignment",
    description: (
      <>
        Making sure Apple Maps, Google Maps, Yelp and other map listings were updated and consistent, tied into the new brand and{" "}
        <Link href="/local-listings" className="font-medium text-neutral-900 underline underline-offset-4">
          website
        </Link>
        .
      </>
    ),
  },
  {
    title: "Appointment + contact forms",
    description: (
      <>
        Implementing Typeform-based flows for appointment requests and contact forms, integrated into the new site ({" "}
        <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
          apps
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Analytics implementation",
    description: (
      <>
        Setting up Google Analytics, Google Search Console and Hotjar for a full view of traffic, SEO performance, and on-site behavior ({" "}
        <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
          seo
        </Link>
        ,{" "}
        <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
          growth
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Paid social + campaign execution",
    description: (
      <>
        Running{" "}
        <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
          Meta campaigns
        </Link>{" "}
        (Instagram + Facebook), including promotional campaigns like electric toothbrush giveaways during the holiday season.
      </>
    ),
  },
  {
    title: "Ongoing web management",
    description: <>Maintaining and iterating on the site inside Webflow as Mataria Dental Group scaled up marketing.</>,
  },
]

const productsDelivered: ListItem[] = [
  {
    title: "New website for Mataria Dental Group",
    description: (
      <>
        A modern, responsive{" "}
        <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
          dental website
        </Link>{" "}
        built to promote the Torrance practice post-acquisition.
      </>
    ),
  },
  {
    title: "Founder & team video series",
    description: (
      <>
        A library of videos introducing Dr. Mataria and his team, used across the site, ads, and social ({" "}
        <Link href="/story" className="font-medium text-neutral-900 underline underline-offset-4">
          story
        </Link>
        ,{" "}
        <Link href="/case-studies" className="font-medium text-neutral-900 underline underline-offset-4">
          case studies
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Social channels for the practice",
    description: (
      <>
        New Instagram and TikTok accounts for Mataria Dental Group, separate from Dr. Mataria&apos;s personal profile ({" "}
        <Link href="/ig" className="font-medium text-neutral-900 underline underline-offset-4">
          ig
        </Link>
        ,{" "}
        <Link href="/tiktok" className="font-medium text-neutral-900 underline underline-offset-4">
          tiktok
        </Link>
        ).
      </>
    ),
  },
  {
    title: "Campaign assets",
    description: (
      <>
        Creative and landing experiences for campaigns like electric toothbrush giveaways, integrated with{" "}
        <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
          ads
        </Link>{" "}
        and{" "}
        <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
          apps
        </Link>
        .
      </>
    ),
  },
]

const engineeringStack: StackItem[] = [
  {
    heading: "Design & build",
    body: (
      <>
        Figma for UX and layout; Relume for React-style component scaffolding; Webflow as the primary CMS + site builder ({" "}
        <Link href="/websites" className="font-medium text-neutral-900 underline underline-offset-4">
          websites
        </Link>
        ).
      </>
    ),
  },
  {
    heading: "Forms & data capture",
    body: (
      <>
        Typeform integrated into the website for appointments and contact ({" "}
        <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
          apps
        </Link>
        ).
      </>
    ),
  },
  {
    heading: "Analytics & behavior",
    body: (
      <>
        Google Analytics and Google Search Console ({" "}
        <Link href="/google" className="font-medium text-neutral-900 underline underline-offset-4">
          google
        </Link>
        ,{" "}
        <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
          seo
        </Link>
        ) plus Hotjar for on-site behavior and heatmaps.
      </>
    ),
  },
  {
    heading: "Meta ecosystem",
    body: (
      <>
        Meta Business Suite for connecting the website, Facebook page, and Instagram account, and running paid campaigns ({" "}
        <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
          ads
        </Link>
        ).
      </>
    ),
  },
]

const designStack: StackItem[] = [
  {
    heading: "Existing brand and logo system",
    body: <>Assets supplied by the practice, reorganized for web and social use.</>,
  },
  {
    heading: "Figma for identity application",
    body: <>Applying the visual identity to web components, thumbnails, banners, and profile images.</>,
  },
  {
    heading: "Editing tools",
    body: (
      <>Standard video and image prep feeding into content and social across channels ({" "}
      <Link href="/hottest-content" className="font-medium text-neutral-900 underline underline-offset-4">
        content + social
      </Link>
      ).</>
    ),
  },
]

const storySteps: StoryStep[] = [
  {
    id: "story-1",
    title: "1. Context: An Established Dentist, a New Practice, and Another M&A",
    content: (
      <>
        <p className="text-neutral-700">Dr. Mataria isn&apos;t just a local dentist:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>He&apos;s based between Los Angeles and Chicago.</li>
          <li>He runs seminars and workshops teaching other dental professionals how to place implants correctly.</li>
          <li>He has multiple practices across the US.</li>
        </ul>
        <p className="text-neutral-700">
          The specific project: Mataria Dental Group in Torrance, a recently acquired practice. Like any M&A in healthcare, the risk was clear:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>You don&apos;t want to lose the existing patient base during the transition.</li>
          <li>You need to communicate why the new dentist and team are an upgrade.</li>
          <li>You want to bring in a steady flow of new patients on top of retention.</li>
        </ul>
        <p className="text-neutral-700">Prism&apos;s job: build the digital and content engine that would make that happen.</p>
      </>
    ),
  },
  {
    id: "story-2",
    title: "2. Building the Digital Foundation: Website, Listings, and Infrastructure",
    content: (
      <>
        <p className="text-neutral-700">The first objective was to get the fundamentals right:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>
            <strong>New website:</strong> Prism designed the site in Figma and built it in Webflow - the early Prism stack before{" "}
            <Link href="/ai-website-launch" className="font-medium text-neutral-900 underline underline-offset-4">
              AI-native builds
            </Link>
            .
          </li>
          <li>
            <strong>Website transfer:</strong> Migrated the practice&apos;s domain away from the previous site and connected it cleanly to the new build.
          </li>
          <li>
            <strong>Local listings:</strong> Cleaned up and aligned all major map and listing platforms so they pointed to the new{" "}
            <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
              dental website
            </Link>{" "}
            and reflected the Mataria Dental Group brand ({" "}
            <Link href="/local-listings" className="font-medium text-neutral-900 underline underline-offset-4">
              local-listings
            </Link>
            ).
          </li>
          <li>
            <strong>Forms:</strong> Implemented Typeform for appointment requests and contact, wired directly into the site ({" "}
            <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
              apps
            </Link>
            ).
          </li>
          <li>
            <strong>Analytics:</strong> Deployed Google Analytics, Google Search Console and Hotjar so Prism and the practice could see how people found the site, what they did, and where drop-offs happened ({" "}
            <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
              seo
            </Link>
            ,{" "}
            <Link href="/growth" className="font-medium text-neutral-900 underline underline-offset-4">
              growth
            </Link>
            ).
          </li>
        </ul>
        <p className="text-neutral-700">This was the foundation layer: without it, any growth effort would just be guesswork.</p>
      </>
    ),
  },
  {
    id: "story-3",
    title: "3. Humanizing the Transition: Founder Story & Team Interview Series",
    content: (
      <>
        <p className="text-neutral-700">For patients, a practice changing hands is personal. Prism&apos;s answer: story-first content.</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>
            Ran a 1-hour{" "}
            <Link href="/story" className="font-medium text-neutral-900 underline underline-offset-4">
              founder interview
            </Link>{" "}
            with Dr. Mataria to talk about his background, why he acquired the Torrance practice, and what he wants long-term.
          </li>
          <li>Planned and executed a team-wide interview series: office manager, front desk, other key team members.</li>
          <li>
            Edited everything into hero content on the website, team and "meet the practice" sections, and social content for IG, Facebook, and TikTok ({" "}
            <Link href="/ig" className="font-medium text-neutral-900 underline underline-offset-4">
              ig
            </Link>
            ,{" "}
            <Link href="/tiktok" className="font-medium text-neutral-900 underline underline-offset-4">
              tiktok
            </Link>
            ,{" "}
            <Link href="/youtube" className="font-medium text-neutral-900 underline underline-offset-4">
              youtube
            </Link>
            ).
          </li>
        </ul>
        <p className="text-neutral-700">The goal: patients saw real people, faces, and a clear reason to stay.</p>
      </>
    ),
  },
  {
    id: "story-4",
    title: "4. Turning Content Into Growth: Social & Ad Campaigns",
    content: (
      <>
        <p className="text-neutral-700">Once the foundation and content library were in place, Prism shipped campaigns:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Launched and managed the practice&apos;s own Instagram and TikTok accounts.</li>
          <li>
            Ran paid social campaigns via Meta Business Suite (Instagram + Facebook), using the interview content and practice visuals ({" "}
            <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
              ads
            </Link>
            ).
          </li>
          <li>
            Built and executed seasonal campaigns, like electric toothbrush giveaways during the holidays, tying together ads, social posts, landing experiences, and forms ({" "}
            <Link href="/apps" className="font-medium text-neutral-900 underline underline-offset-4">
              apps
            </Link>
            ).
          </li>
        </ul>
        <p className="text-neutral-700">The aim: get more people to hear about Mataria Dental Group each month and convert into patients.</p>
      </>
    ),
  },
  {
    id: "story-5",
    title: "5. Design: Making an Existing Brand Work Everywhere",
    content: (
      <>
        <p className="text-neutral-700">Mataria Dental Group already had a logo and design assets. Prism made them usable everywhere.</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Reformatted assets for web favicons and open graph images.</li>
          <li>Created social avatars and cover images.</li>
          <li>Produced video thumbnails for YouTube and other platforms.</li>
          <li>Applied visuals across the website, ads, and social.</li>
        </ul>
        <p className="text-neutral-700">Outcome: a consistent visual identity without a full rebrand.</p>
      </>
    ),
  },
  {
    id: "story-6",
    title: "6. The Hard Part: Manual Execution Before the AI Wave",
    content: (
      <>
        <p className="text-neutral-700">Mataria Dental Group was Prism&apos;s first client - built before AI tooling.</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Domain and DNS transfer under M&A conditions.</li>
          <li>Managing everything in Webflow instead of an automated stack.</li>
          <li>Running website, listings, content, and campaigns without AI accelerants.</li>
        </ul>
        <p className="text-neutral-700">
          The manual work created scar tissue that shaped Prism&apos;s later AI-native systems and the current Prism flywheel.
        </p>
      </>
    ),
  },
  {
    id: "story-7",
    title: "7. Lessons: Ownership, Content, and Being \"The One\"",
    content: (
      <>
        <p className="text-neutral-700">Key insight: when content is everyone&apos;s job, it becomes no one&apos;s job.</p>
        <p className="text-neutral-700">Prism stepped in to be the one responsible party for production and publishing:</p>
        <ul className="list-disc space-y-2 pl-5 text-neutral-700">
          <li>Owning the digital + content + campaign engine.</li>
          <li>Interfacing with the team to gather stories, assets, and approvals.</li>
          <li>Keeping close communication so ideas turned into shipped content.</li>
        </ul>
        <p className="text-neutral-700">
          With Prism owning execution and the practice granting access, more content shipped consistently - and leveraged what was already happening inside the practice.
        </p>
      </>
    ),
  },
]

const outcomes = [
  "Mataria Dental Group relaunched with a modern dental website, aligned local listings, and structured analytics.",
  "Patients received a clear, human story about Dr. Mataria and why the transition is a good thing.",
  "The practice gained new channels (Instagram, TikTok) and campaigns powered by real video and team content.",
  "Prism captured scar tissue that later drove the move into AI-native builds and the current growth model.",
]

const meaningBullets = [
  "Everyone knows someone should own the website, social, and listings - but nobody inside the practice has the time.",
  "Without ownership, digital presence and content stall during an M&A or expansion.",
  "Patients need clear reasons to stay and new patients need clear reasons to try you.",
]

const meaningList = [
  "Prism owns your digital + content + campaign engine.",
  "Acts as the interface between your team and what ships online.",
  (
    <>
      Ensures your{" "}
      <Link href="/dental-website" className="font-medium text-neutral-900 underline underline-offset-4">
        dental website
      </Link>
      ,{" "}
      <Link href="/local-listings" className="font-medium text-neutral-900 underline underline-offset-4">
        local listings
      </Link>
      ,{" "}
      <Link href="/seo" className="font-medium text-neutral-900 underline underline-offset-4">
        SEO
      </Link>
      , and{" "}
      <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
        ads
      </Link>{" "}
      work together.
    </>
  ),
]

export default function MatariaDentalGroupCaseStudy() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
                Case Study: Mataria Dental Group - Launching an M&A Practice for a National Implant Educator
              </h1>
              <p className="text-lg text-neutral-700">Helping a nationally recognized implant educator relaunch a newly acquired LA practice.</p>
              <p className="text-neutral-700">
                Prism partnered with Dr. Mataria - a multi-location dentist and implant educator - to relaunch Mataria Dental Group in Torrance, retain the existing patient base, and spin up a modern web + content + social engine for growth.
              </p>
              <div>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={CLIENT_SITE} target="_blank" rel="noopener noreferrer">
                    visit matariadental.com
                  </Link>
                </Button>
              </div>
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
                <YouTubeVideoEmbed videoId={HERO_VIDEO_ID} title="Mataria Dental Group Overview" className="w-full" />
              </div>
              <div className="space-y-4">
                <div className="space-y-3 rounded-xl border bg-white p-6 shadow-sm">
                  <p className="text-neutral-700">30-60s overview video of Mataria Dental Group and Dr. Mataria&apos;s interview.</p>
                  <p className="text-neutral-700">See how Prism rebuilt the practice&apos;s online presence, content, and campaigns from the ground up.</p>
                </div>
                <p className="text-sm text-neutral-600">See how Prism rebuilt the practice&apos;s online presence, content, and campaigns from the ground up.</p>
              </div>
            </div>
          </div>
        </section>

        <CaseStudySectionNav sections={jumpLinks} containerClassName="max-w-5xl" ariaLabel="mataria dental group case study sections" />

        {/* Products & Services */}
        <section id="products" data-case-study-section className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-10 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Products &amp; Services Delivered by Prism for Mataria Dental Group</h2>
              <p className="text-neutral-700">
                Mataria Dental Group was one of Prism&apos;s earliest and most formative projects. We went from \"brand-new agency working for free\" to full-stack execution: website, content,{" "}
                <Link href="/ads" className="font-medium text-neutral-900 underline underline-offset-4">
                  social campaigns
                </Link>
                , and ongoing growth infrastructure.
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
        <section id="technology" data-case-study-section className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Technology Applied</h2>
              <p className="text-neutral-700">
                This project predates Prism&apos;s full AI-native stack. It was built in the manual era - which is exactly why it gave Prism so much scar tissue and process discipline.
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
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
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
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
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
        <section id="story" data-case-study-section className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3 max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">The Story: Relaunching a Newly Acquired Practice for a National Implant Educator</h2>
            </div>
            <div className="relative space-y-8">
              <div className="absolute left-4 top-0 h-full w-px bg-neutral-200 md:left-6" aria-hidden="true" />
              {storySteps.map((step, idx) => (
                <div key={step.id} id={step.id} className="relative grid gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-[auto_1fr]">
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
        <section id="outcomes" data-case-study-section className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Outcomes &amp; Impact (Qualitative)</h2>
            <FounderImpactGraph />
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
        <section id="meaning" data-case-study-section className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-6 px-4 md:px-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What This Means for Other Dental Practices</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-neutral-700">If you are acquiring or growing a practice, you probably recognize the pattern:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {meaningBullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-neutral-700">Prism steps in as:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {meaningList.map((item, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA / Next Steps */}
        <section id="cta" data-case-study-section className="border-t bg-neutral-50 px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">CTA / Next Steps</h2>
              <ul className="space-y-2 text-neutral-700">
                <li>
                  Explore more{" "}
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
                  See{" "}
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
                  of your current website, listings, and content engine.
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
                  <p className="text-lg font-semibold text-neutral-900">Ready to launch or relaunch your practice?</p>
                  <p className="text-sm text-neutral-700">Apply the Mataria Dental Group playbook to your next transition or growth push.</p>
                  <p className="text-sm text-neutral-700">
                    Built with Prism’s{" "}
                    <Link href="/dental-website" className="font-semibold text-neutral-900 underline underline-offset-4">
                      dental practice website system
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild className="rounded-full px-6 py-3 text-base">
                    <TrackedLink href="/get-started" label={FREE_AUDIT_CTA_TEXT} location="mataria case study cta">
                      {FREE_AUDIT_CTA_TEXT} <ArrowRight className="ml-2 h-4 w-4" />
                    </TrackedLink>
                  </Button>
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
        title="Case Study: Mataria Dental Group - Launching an M&A Practice for a National Implant Educator"
        description="Prism relaunched Mataria Dental Group in Torrance with a new dental website, listings alignment, content library, social campaigns, and analytics."
        url={cs?.structured?.canonicalUrl ?? "https://www.design-prism.com/case-studies/mataria-dental-group"}
        imageUrl={cs?.structured?.heroImage ?? "https://www.design-prism.com/mataria-hero.png"}
        datePublished={cs?.structured?.datePublished ?? "2025-02-01T00:00:00.000Z"}
        dateModified={cs?.structured?.dateModified ?? "2025-02-01T00:00:00.000Z"}
        clientName="Mataria Dental Group"
        outcome="Full-stack relaunch: website, listings, content, social campaigns, and analytics for a newly acquired practice."
        breadcrumbs={[
          { name: "Home", url: "https://www.design-prism.com" },
          { name: "Case Studies", url: "https://www.design-prism.com/case-studies" },
          { name: "Mataria Dental Group", url: "https://www.design-prism.com/case-studies/mataria-dental-group" },
        ]}
        organization={{
          name: "Prism",
          url: "https://www.design-prism.com",
          logo: "https://www.design-prism.com/logo.png",
          sameAs: ["https://www.linkedin.com/company/prism-digital", "https://www.youtube.com/@designprism"],
        }}
        video={{
          name: "Mataria Dental Group Overview",
          description: "Short overview of Mataria Dental Group and Dr. Mataria's transition story.",
          embedUrl: `https://www.youtube.com/embed/${HERO_VIDEO_ID}`,
          uploadDate: cs?.structured?.datePublished ?? "2025-02-01T00:00:00.000Z",
          thumbnailUrl: cs?.structured?.heroImage ?? "https://www.design-prism.com/mataria-hero.png",
        }}
        faq={[
          {
            question: "What did Prism deliver for Mataria Dental Group?",
            answer:
              "New Webflow site, listings alignment, Typeform flows, analytics, content library, social channels, and paid social campaigns including giveaways.",
          },
          {
            question: "What tech stack was used?",
            answer:
              "Figma, Relume, Webflow, Typeform, Google Analytics/Search Console, Hotjar, and Meta Business Suite for ads and social integration.",
          },
          {
            question: "How did Prism humanize the transition?",
            answer:
              "Founder and team interviews edited into hero content, team sections, and social clips so patients saw real people behind the new brand.",
          },
          {
            question: "What were the outcomes?",
            answer:
              "A modernized practice launch with clear patient story, aligned listings, active social channels, and campaigns that drove awareness and conversions.",
          },
        ]}
      />
      <div className="mt-12">
        <SocialShare
          url="https://www.design-prism.com/case-studies/mataria-dental-group"
          imageUrl={cs?.structured?.heroImage ?? "https://www.design-prism.com/mataria-hero.png"}
          title="Case Study: Mataria Dental Group"
          description="How Prism relaunched Mataria Dental Group with website, listings, content, social campaigns, and analytics."
        />
      </div>
    </div>
  )
}
