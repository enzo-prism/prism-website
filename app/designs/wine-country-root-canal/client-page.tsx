"use client"

import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { ArrowRight, CalendarDays, CheckCircle2, Circle, Clock3 } from "lucide-react"

import Footer from "@/components/footer"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const deliverables = [
  {
    title: "Homepage + hero treatments",
    phase: "approved",
    description:
      "Live hero narrative, sub-navigation, and CTA system aligning Dr. Anderson’s tone with the calming finish of the operatories.",
    image: "/Wine Country Root Canal.webp",
    reviewUrl: "/case-studies/wine-country-root-canal",
    notes: [
      "Strengthened trust badges + chairside photography to mirror sedation-first messaging.",
      "Clarified CTA structure (call + request visit) for anxious, high-intent referrals.",
    ],
  },
  {
    title: "Patient readiness guide",
    phase: "in QA",
    description:
      "Educational booklet + email capsules outlining the day-of experience for patients and referring dentists.",
    image: "/designs/journey-step.jpeg",
    notes: [
      "Needs final chairside photo inserts from Anderson team.",
      "Motion mockups ready for review inside Canva workspace.",
    ],
  },
  {
    title: "Referral-ready social tiles",
    phase: "drafting",
    description:
      "Square + story assets spotlighting advanced imaging, sedation comfort, and fast turnaround for Sonoma County GPs.",
    image: "/designs/the-way-is-training.png",
    notes: [
      "Copy cues pulled from Dr. Anderson + Dr. Van Tassell interviews.",
      "Awaiting final type approval before batching 12-count set.",
    ],
  },
]

const timelineMilestones = [
  {
    date: "Jan 24",
    label: "Kickoff + priorities",
    status: "complete",
    detail: "Kickoff with Dr. Anderson + Dr. Van Tassell on hero and referral priorities.",
  },
  {
    date: "Feb 07",
    label: "Website refresh locked",
    status: "complete",
    detail: "Homepage, nav, and analytics guardrails approved + deployed.",
  },
  {
    date: "Feb 18",
    label: "Patient education draft",
    status: "in-progress",
    detail: "Copy/layout in review. Need photo uploads + sedation notes.",
  },
  {
    date: "Feb 27",
    label: "Referral kit rollout",
    status: "up-next",
    detail: "GP kit + tiles lined up for late-Feb review.",
  },
]

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "complete") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden />
  }
  if (status === "in-progress" || status === "in-review") {
    return <Clock3 className="h-4 w-4 text-amber-500" aria-hidden />
  }
  return <Circle className="h-4 w-4 text-neutral-400" aria-hidden />
}

export default function WineCountryRootCanalDesignReview() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <PageViewTracker title="Wine Country Root Canal Design Review" />
      <Navbar />
      <main className="flex-1">
        <section className="bg-white px-4 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pt-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">design board</p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">wine country root canal</h1>
                <p className="text-base text-neutral-600 sm:text-lg">
                  One board for every deliverable—site polish, patient packets, and referral assets—so the team can react fast.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="rounded-full px-8 py-3 text-base">
                    <Link href="#deliverables">review files</Link>
                  </Button>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-neutral-200 bg-neutral-900 shadow-2xl shadow-black/20">
                <Image
                  src="/Wine Country Root Canal.webp"
                  alt="Wine Country Root Canal web concepts"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        <section id="deliverables" className="px-4 py-16">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">1 · deliverables</p>
              <h2 className="text-3xl font-semibold">current files</h2>
              <p className="text-base text-neutral-600 sm:text-lg">Latest draft + quick notes in each card.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {deliverables.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="inline-flex items-center rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-600">
                    {item.phase}
                  </div>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                    {item.notes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-neutral-400" aria-hidden />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                  {item.reviewUrl && (
                    <Link
                      href={item.reviewUrl}
                      target={item.reviewUrl.startsWith("http") ? "_blank" : undefined}
                      rel={item.reviewUrl.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-4 inline-flex items-center text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                    >
                      open latest <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="bg-neutral-900 px-4 py-16 text-white">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">2 · progress tracker</p>
              <h2 className="text-3xl font-semibold">timeline</h2>
              <p className="text-base text-white/80 sm:text-lg">Shipped · in motion · up next.</p>
            </div>
            <div className="space-y-6">
              {timelineMilestones.map((milestone) => (
                <div
                  key={milestone.label}
                  className="flex flex-col gap-3 rounded-3xl border border-white/15 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-white/70">
                    <CalendarDays className="h-4 w-4" aria-hidden />
                    {milestone.date}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-semibold">{milestone.label}</p>
                    <p className="mt-2 text-sm text-white/80">{milestone.detail}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-sm font-medium capitalize">
                    <StatusIcon status={milestone.status} />
                    {milestone.status.replace("-", " ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
