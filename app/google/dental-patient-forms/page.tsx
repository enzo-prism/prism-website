import type { Metadata } from "next"
import Link from "next/link"
import clsx from "clsx"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Archive,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  FileSpreadsheet,
  FileWarning,
  Fingerprint,
  FolderLock,
  Layers,
  MailWarning,
  ShieldAlert,
  ShieldCheck,
  Table,
  Users,
} from "lucide-react"

import Footer from "@/components/footer"
import GuideTableOfContents from "@/components/guide-table-of-contents"
import InteractiveChecklist from "@/components/interactive-checklist"
import Navbar from "@/components/navbar"
import ScrollProgressBar from "@/components/scroll-progress-bar"
import ScrollToTop from "@/components/scroll-to-top"
import { WebPageSchema } from "@/components/schema-markup"
import { Button } from "@/components/ui/button"
import { buildRouteMetadata } from "@/lib/seo/metadata"

const GOOGLE_WORKSPACE_LINK =
  "https://c.gle/APy2Ad08G18tc2DVKTvFnIX7ZsIi8C_16CofJocN9aFYsQDXBJRKDAH3FRQb6BfrqNgPv1Buz5DypvRjWF8E2rqpEvohTLTUWmLF6UOh4oCinNkIBx-wbk3wUX2jqxqDYiPNn4cWz4pfBlfNZT7je1YO"

const accomplishments = [
  "Use Google Forms (part of Google Workspace) to collect ePHI from new patients.",
  "Store every response in a locked Shared Drive with strict permissions, retention, and auditing.",
  "Operate only within services covered by Google’s HIPAA Business Associate Amendment (BAA).",
  "Avoid landmines like emailing PHI, open-link sharing, or file-upload misconfigurations.",
]

const prerequisites = [
  "Paid Google Workspace tenant (Business or Enterprise) — free Gmail is out.",
  "Practice acknowledges it is a HIPAA Covered Entity/Business Associate handling PHI in Workspace.",
  "Workspace super admin available to configure security and compliance settings.",
  "Documented policies and training for staff handling PHI (minimum necessary, no PHI via email, etc.).",
  "Executed Google HIPAA BAA in the Admin console.",
]

type StepAccent =
  | "sky"
  | "violet"
  | "emerald"
  | "amber"
  | "indigo"
  | "purple"
  | "teal"
  | "rose"
  | "cyan"
  | "slate"
  | "blue"

const stepAccentStyles: Record<StepAccent, { icon: string; badge: string; number: string }> = {
  sky: {
    icon: "bg-sky-100 text-sky-600",
    badge: "border-sky-200 bg-sky-50 text-sky-800",
    number: "border-sky-200 bg-sky-50 text-sky-700",
  },
  violet: {
    icon: "bg-violet-100 text-violet-600",
    badge: "border-violet-200 bg-violet-50 text-violet-800",
    number: "border-violet-200 bg-violet-50 text-violet-700",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-800",
    number: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  amber: {
    icon: "bg-amber-100 text-amber-600",
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    number: "border-amber-200 bg-amber-50 text-amber-700",
  },
  indigo: {
    icon: "bg-indigo-100 text-indigo-600",
    badge: "border-indigo-200 bg-indigo-50 text-indigo-800",
    number: "border-indigo-200 bg-indigo-50 text-indigo-700",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    badge: "border-purple-200 bg-purple-50 text-purple-800",
    number: "border-purple-200 bg-purple-50 text-purple-700",
  },
  teal: {
    icon: "bg-teal-100 text-teal-600",
    badge: "border-teal-200 bg-teal-50 text-teal-800",
    number: "border-teal-200 bg-teal-50 text-teal-700",
  },
  rose: {
    icon: "bg-rose-100 text-rose-600",
    badge: "border-rose-200 bg-rose-50 text-rose-800",
    number: "border-rose-200 bg-rose-50 text-rose-700",
  },
  cyan: {
    icon: "bg-cyan-100 text-cyan-600",
    badge: "border-cyan-200 bg-cyan-50 text-cyan-800",
    number: "border-cyan-200 bg-cyan-50 text-cyan-700",
  },
  slate: {
    icon: "bg-slate-100 text-slate-600",
    badge: "border-slate-200 bg-slate-50 text-slate-800",
    number: "border-slate-200 bg-slate-50 text-slate-700",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600",
    badge: "border-blue-200 bg-blue-50 text-blue-800",
    number: "border-blue-200 bg-blue-50 text-blue-700",
  },
}

type StepDefinition = {
  id: string
  number: string
  title: string
  badge: string
  accent: StepAccent
  icon: LucideIcon
  content: ReactNode
}

const steps: StepDefinition[] = [
  {
    id: "step-1",
    number: "01",
    title: "Execute the Google Workspace HIPAA BAA",
    badge: "Compliance",
    accent: "sky",
    icon: ShieldCheck,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ol className="list-decimal space-y-3 pl-4 sm:pl-5">
          <li>
            Sign in to{" "}
            <Link href="https://admin.google.com" target="_blank" rel="noopener noreferrer" className="underline">
              admin.google.com
            </Link>{" "}
            as a super admin.
          </li>
          <li>
            Navigate to <span className="font-semibold">Account → Account settings → Legal &amp; compliance</span> and
            review/accept the HIPAA Business Associate Amendment (BAA).
          </li>
          <li>Download or screenshot the executed terms for your compliance binder.</li>
        </ol>
        <p className="text-sm text-neutral-500">
          Resources: Google Admin Help and Google HIPAA overview{" "}
          <Link href="https://support.google.com/a/answer/2888485?hl=en&utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
            [Google Help]
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-2",
    number: "02",
    title: "Scope the Included Functionality",
    badge: "Coverage Check",
    accent: "violet",
    icon: Layers,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <p>
          Confirm which Google services are covered under the BAA. As of September 30, 2025, Google lists Gmail, Drive (Docs,
          Sheets, Slides, Forms), Calendar, Chat, Meet, Sites, Keep, Vault, Voice (managed), Cloud Search, Admin, Apps Script,
          AppSheet, Gemini in Workspace, and more.
        </p>
        <p className="font-semibold text-neutral-800">
          Action: Keep PHI inside covered services only. Do not copy PHI into tools that are not on Google’s HIPAA list.
        </p>
        <p className="text-sm text-neutral-500">
          Reference:{" "}
          <Link href="https://workspace.google.com/terms/2015/1/hipaa_functionality/" target="_blank" rel="noopener noreferrer" className="underline">
            Google Workspace HIPAA Included Functionality
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-3",
    number: "03",
    title: "Create a Locked “PHI – Intake” Shared Drive",
    badge: "Drive Security",
    accent: "emerald",
    icon: FolderLock,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            In the Admin console go to <span className="font-semibold">Apps → Google Workspace → Drive and Docs</span>.
            Create a Shared Drive named <span className="italic">PHI – Intake</span>.
          </li>
          <li>Add only essential team members (e.g., office manager, doctor). Apply least-privilege membership.</li>
          <li>
            Configure sharing settings:
            <ul className="mt-2 list-disc space-y-2 pl-4 sm:pl-5">
              <li>Disable external sharing for the Shared Drive.</li>
              <li>Disable link sharing (“Anyone with the link”).</li>
              <li>Prevent download/print/copy for viewers when appropriate.</li>
            </ul>
          </li>
          <li>
            Apply a “PHI” Drive label and enable Drive DLP to block external sharing when identifiers (SSNs, insurance IDs)
            are detected.
          </li>
          <li>Ensure Drive audit logs are retained (tie into Vault in Step 5).</li>
        </ol>
        <p className="text-sm text-neutral-500">
          Implementation guidance:{" "}
          <Link href="https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
            Google Workspace HIPAA Implementation Guide
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-4",
    number: "04",
    title: "Enforce Identity and Device Security",
    badge: "Identity",
    accent: "amber",
    icon: Fingerprint,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Require 2-Step Verification for any staff with PHI access.</li>
          <li>Use Context-Aware Access (if your edition supports it) to limit PHI access to managed devices or trusted networks.</li>
          <li>Mandate strong passwords and enable suspicious login alerts.</li>
          <li>Use least-privilege admin roles; nobody should operate daily work as a super admin.</li>
        </ul>
        <p className="text-sm text-neutral-500">
          General Workspace HIPAA security practices:{" "}
          <Link href="https://spin.ai/blog/hipaa-compliance-google-workspace-administators/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
            Spin.AI HIPAA guidance
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-5",
    number: "05",
    title: "Configure Google Vault for Retention",
    badge: "Retention",
    accent: "indigo",
    icon: Archive,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Enable Google Vault (included in Business Plus and Enterprise plans).</li>
          <li>
            Create retention rules covering the <span className="italic">PHI – Intake</span> Shared Drive and relevant user
            accounts based on your record-retention policy.
          </li>
          <li>Set up matters/holds to support audits, legal requests, or disputes.</li>
        </ul>
        <p className="text-sm text-neutral-500">
          Reference:{" "}
          <Link href="https://workspace.google.com/terms/2015/1/hipaa_functionality/" target="_blank" rel="noopener noreferrer" className="underline">
            Google Workspace HIPAA Included Functionality
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-6",
    number: "06",
    title: "Build the HIPAA-Aligned Google Form",
    badge: "Google Forms",
    accent: "purple",
    icon: FileSpreadsheet,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ol className="list-decimal space-y-3 pl-4 sm:pl-5">
          <li>
            Create the form from a Workspace account; name it “New Patient Intake” and structure sections such as Contact,
            Medical History, Medications, Allergies, and Consent.
          </li>
          <li>
            In <span className="font-semibold">Settings → Responses</span>, link responses to a new Google Sheet stored inside
            the <span className="italic">PHI – Intake</span> Shared Drive.
          </li>
          <li>
            Notifications: if you rely on add-ons for alerts, only send a “new submission received” email. Do not include PHI
            in the message — link back to the secure Sheet instead.
          </li>
          <li>
            <span className="font-semibold">Settings → Presentation &amp; Defaults</span>:
            <ul className="mt-2 list-disc space-y-2 pl-4 sm:pl-5">
              <li>Avoid collecting patient email addresses unless disclosed and necessary.</li>
              <li>Do not “Limit to 1 response”; that forces Google sign-in and blocks most patients.</li>
              <li>Ensure the form is accessible to anyone with the link (patients are external) and not restricted to your domain.</li>
            </ul>
          </li>
        </ol>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-base leading-relaxed text-amber-900">
          <div className="flex items-center gap-2 font-semibold">
            <FileWarning className="h-5 w-5" aria-hidden />
            File uploads have major constraints
          </div>
          <p className="mt-2">
            Google Forms requires respondents to sign in with Google for file uploads. Many practices skip uploads in Forms and
            collect images or IDs in person or through a dedicated HIPAA intake product. Google continues to improve
            cross-domain settings, but sign-in remains standard for uploads.
          </p>
          <p className="mt-3 text-sm">
            References:{" "}
            <Link href="https://www.jotform.com/google-forms/google-form-file-upload-without-sign-in/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
              Jotform on Google Form uploads
            </Link>{" "}
            &amp;{" "}
            <Link href="https://workspaceupdates.googleblog.com/2022/06/dlp-file-uploads-to-external-forms.html?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
              Workspace Updates
            </Link>
            .
          </p>
        </div>
        <p className="text-sm text-neutral-500">
          Domain access guidance:{" "}
          <Link href="https://support.google.com/docs/answer/160166?hl=en&utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
            Google Forms sharing help
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-7",
    number: "07",
    title: "Lock Down the Linked Google Sheet",
    badge: "Sheets",
    accent: "teal",
    icon: Table,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Keep the response Sheet inside the <span className="italic">PHI – Intake</span> Shared Drive.</li>
          <li>Share only with the intake group; disable link sharing entirely.</li>
          <li>Protect sensitive ranges (e.g., calculated fields, internal notes) with sheet protections.</li>
          <li>Review File activity to confirm auditing captures viewers/editors (retained via Vault).</li>
        </ul>
        <p className="text-sm text-neutral-500">Refer back to Google’s HIPAA implementation whitepaper for Drive configuration patterns.</p>
      </div>
    ),
  },
  {
    id: "step-8",
    number: "08",
    title: "Put Guardrails on Email",
    badge: "Email Policy",
    accent: "rose",
    icon: MailWarning,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Never email PHI in plaintext.</li>
          <li>Submission alerts should be PHI-free (“new intake received — open the Sheet”).</li>
          <li>
            Enforce TLS for outbound mail; if you ever send PHI, configure S/MIME and document exceptions (safer approach: don’t
            email PHI).
          </li>
        </ul>
        <p className="text-sm text-neutral-500">
          Email posture recommendations:{" "}
          <Link href="https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
            Google HIPAA implementation guide
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-9",
    number: "09",
    title: "Deploy DLP and Alerting",
    badge: "DLP",
    accent: "cyan",
    icon: ShieldAlert,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>
            Create Drive DLP rules that flag PHI identifiers (SSN, insurance IDs, DOB) and block external sharing from the
            Shared Drive.
          </li>
          <li>Enable Alert Center notifications for mass downloads, sharing attempts, or DLP violations.</li>
        </ul>
        <p className="text-sm text-neutral-500">
          More detail:{" "}
          <Link href="https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline">
            Google HIPAA implementation guide
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: "step-10",
    number: "10",
    title: "Test Like an Auditor",
    badge: "Audit",
    accent: "slate",
    icon: ClipboardCheck,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Submit multiple dummy entries and confirm they land in the correct Sheet inside the Shared Drive.</li>
          <li>Attempt to access responses with a non-authorized account — access should be denied.</li>
          <li>Export audit logs and confirm activity appears in Admin reports and Vault.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "step-11",
    number: "11",
    title: "Train Front-Office Staff",
    badge: "Team Training",
    accent: "blue",
    icon: Users,
    content: (
      <div className="space-y-4 text-base leading-relaxed text-neutral-700">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Staff access PHI only inside the locked Shared Drive and Sheet.</li>
          <li>No copy/paste of PHI into email, chat, or non-covered tools.</li>
          <li>When patients request the intake form, send the secure form link — not a PDF attachment.</li>
        </ul>
      </div>
    ),
  },
]

const guideSections = [
  { id: "overview", label: "Overview", iconSrc: "/pixelish/document-letter.svg" },
  { id: "prerequisites", label: "Prerequisites", iconSrc: "/pixelish/checkmark.svg" },
  { id: "steps", label: "Step-by-step", iconSrc: "/pixelish/command.svg" },
  { id: "options", label: "Optional Paths", iconSrc: "/pixelish/lens-plus.svg" },
  { id: "truth-table", label: "Truth Table", iconSrc: "/pixelish/kanban.svg" },
  { id: "appendix", label: "Appendix", iconSrc: "/pixelish/folder.svg" },
  { id: "checklist", label: "Checklist", iconSrc: "/pixelish/circle-checkmark.svg" },
  { id: "references", label: "References", iconSrc: "/pixelish/copy.svg" },
]

const checklistItems = [
  "Workspace paid plan active; super admin assigned.",
  "Google HIPAA BAA executed (Admin → Legal & compliance).",
  "“PHI – Intake” Shared Drive created with restricted membership and external sharing disabled.",
  "2SV enforced; least-privilege roles; context-aware access in place if available.",
  "Vault retention configured for PHI Shared Drive and related accounts.",
  "Google Form intake built; responses linked to Sheet inside the PHI Shared Drive.",
  "No PHI sent via email; notifications are PHI-free.",
  "Drive DLP and Alert Center rules active.",
  "Test submissions verified; audit logs retained.",
  "Staff trained and policies documented.",
]

const referenceLinks = [
  {
    label: "HIPAA Included Functionality",
    description: "Lists covered Google Workspace apps (including Forms) as of Sept 30, 2025.",
    href: "https://workspace.google.com/terms/2015/1/hipaa_functionality/",
  },
  {
    label: "HIPAA Compliance with Google Workspace",
    description: "Overview of signing the BAA and Workspace obligations.",
    href: "https://support.google.com/a/answer/3407054?hl=en&utm_source=chatgpt.com",
  },
  {
    label: "Google Admin Help — Review & accept BAA",
    description: "Step-by-step instructions to execute the HIPAA BAA.",
    href: "https://support.google.com/a/answer/2888485?hl=en&utm_source=chatgpt.com",
  },
  {
    label: "Google Workspace & Cloud Identity HIPAA Implementation Guide",
    description: "Official whitepaper covering configuration, access, and DLP patterns.",
    href: "https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper?utm_source=chatgpt.com",
  },
  {
    label: "Spin.AI — HIPAA Compliance for Google Workspace Administrators",
    description: "Practical admin tips for tightening Workspace security posture.",
    href: "https://spin.ai/blog/hipaa-compliance-google-workspace-administators/?utm_source=chatgpt.com",
  },
  {
    label: "Google Forms access help",
    description: "How domain restrictions and sign-in requirements impact Form access.",
    href: "https://support.google.com/docs/answer/160166?hl=en&utm_source=chatgpt.com",
  },
  {
    label: "Jotform — Google Form file upload without sign-in",
    description: "Explains the Google account requirement for uploads and alternatives.",
    href: "https://www.jotform.com/google-forms/google-form-file-upload-without-sign-in/?utm_source=chatgpt.com",
  },
  {
    label: "Workspace Updates — DLP for file uploads",
    description: "Details on protecting file uploads to external forms with Drive DLP.",
    href: "https://workspaceupdates.googleblog.com/2022/06/dlp-file-uploads-to-external-forms.html?utm_source=chatgpt.com",
  },
]

const PAGE_TITLE = "secure google workspace patient forms for dentists | prism"
const PAGE_DESCRIPTION =
  "step-by-step hipaa guide for dentists using google workspace: secure shared drives, vault, compliant forms, and patient data safeguards."
const CANONICAL_URL = "https://www.design-prism.com/google/dental-patient-forms"

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/google/dental-patient-forms",
  ogImage: "/prism-opengraph.png",
})

export default function GoogleDentalPatientFormsGuide() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">
        <ScrollProgressBar />
        <section className="relative overflow-hidden rounded-b-[3rem] bg-neutral-950 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(0,0,0,0.88))]"
          />
          <div className="absolute inset-0 opacity-35 mix-blend-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.25),_rgba(15,23,42,0))]" />
          </div>
          <div className="relative">
            <div className="container mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center md:gap-8 md:px-6 md:py-32">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-white/70">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                HIPAA INTAKE PLAYBOOK
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Set Up Secure Electronic Patient Forms with Google Workspace
              </h1>
              <p className="text-base text-white/80 sm:text-lg">
                This zero-fluff guide shows dental teams how to collect new-patient intake data in Google Forms while staying
                inside HIPAA guardrails — from executing the BAA to locking down Shared Drives, Vault, DLP, and staff training.
              </p>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href="/contact">
                    Request a secure intake setup <ArrowRight className="h-5 w-5" aria-hidden />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline-inverted"
                  className="h-auto rounded-full px-8 py-4 text-base font-semibold"
                >
                  <Link href="#checklist">
                    Jump to checklist <ClipboardList className="ml-2 h-5 w-5" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="overview" className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,_320px)_minmax(0,_1fr)_minmax(0,_260px)] lg:items-start">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">What you’ll accomplish</p>
                <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                  Google Workspace Becomes a HIPAA-Safe Intake Hub
                </h2>
                <p className="text-base text-neutral-600">
                  Every section links back to the same locked Shared Drive so your team can configure, review, and ship the
                  intake flow without breaking compliance.
                </p>
              </div>
              <div className="space-y-6 text-base text-neutral-700">
                <ul className="grid gap-3 sm:gap-4">
                  {accomplishments.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm"
                    >
                      <span className="mt-1 rounded-full bg-emerald-400/20 p-1.5 text-emerald-500">
                        <CheckCircle2 className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="text-base text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-3xl border border-sky-200 bg-sky-50 p-6 text-base leading-relaxed text-sky-900 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Reality check</p>
                  <p className="mt-3">
                    As of September 30, 2025, Google confirms that Forms is part of the “Included Functionality” once the BAA
                    is signed and the Workspace tenant is configured correctly. Always verify the latest list before you launch.
                  </p>
                  <p className="mt-3 text-sm">
                    Source:{" "}
                    <Link href="https://workspace.google.com/terms/2015/1/hipaa_functionality/" target="_blank" rel="noopener noreferrer" className="underline">
                      Google Workspace HIPAA Included Functionality
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <GuideTableOfContents sections={guideSections} />
            </div>
          </div>
        </section>

        <section id="prerequisites" className="border-b border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">PREREQUISITES</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">Don’t Skip These Foundations</h2>
            </div>
            <div className="space-y-6">
              <ul className="grid gap-4">
                {prerequisites.map((item) => (
                  <li
                    key={item}
                    className="rounded-3xl border border-neutral-200 bg-white p-5 text-base leading-relaxed text-neutral-700 shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-base text-neutral-600">
                These steps anchor your compliance story — auditors will ask for proof of BAA execution, policies, and staff
                readiness before they even look at Forms.
              </p>
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">Need Google Workspace?</p>
                    <p className="text-base text-neutral-700">
                      We negotiated a partner discount so you can launch a covered Workspace edition and keep every intake workflow inside the HIPAA-ready toolset we outline below.
                    </p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-auto w-full rounded-full px-6 py-3 text-sm font-semibold sm:w-auto"
                  >
                    <Link href={GOOGLE_WORKSPACE_LINK} target="_blank" rel="noopener noreferrer">
                      Buy Google Workspace <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="steps" className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="flex flex-col gap-3 text-center">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">IMPLEMENTATION GUIDE</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">
                Follow Each Step; Document Every Change
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-neutral-600">
                Every configuration should be captured in your operations log. Screenshots, Admin audit entries, and Vault
                retention proofs make your compliance story defensible.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {steps.map((step) => {
                const accent = stepAccentStyles[step.accent]
                const Icon = step.icon
                return (
                  <article
                    key={step.id}
                    id={step.id}
                    className="group relative flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-lg sm:max-w-none"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={clsx(
                          "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold",
                          accent.number,
                        )}
                      >
                        {step.number}
                      </span>
                      <span
                        className={clsx(
                          "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
                          accent.badge,
                        )}
                      >
                        {step.badge}
                      </span>
                    </div>
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
                      <span
                        className={clsx(
                          "flex h-12 w-12 flex-none items-center justify-center rounded-2xl",
                          accent.icon,
                        )}
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="space-y-4 sm:flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
                        {step.content}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="options" className="border-b border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2 md:px-6 lg:py-24">
            <div className="space-y-4 rounded-3xl border border-white/60 bg-white p-6 text-neutral-700 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" aria-hidden />
                  Optional: AppSheet Intake
                </div>
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Optional
                </span>
              </div>
              <p className="mt-3 text-base leading-relaxed">
                AppSheet sits on the Included Functionality list. If you want conditional logic, a mobile app experience, or
                tighter workflows, build an app that writes to the same secure Shared Drive and Sheet. Apply the same DLP,
                Vault, and sharing controls — and still avoid emailing PHI.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-900 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <AlertTriangle className="h-5 w-5" aria-hidden />
                  If You Must Collect Files From Patients
                </div>
                <span className="inline-flex items-center rounded-full border border-rose-300 bg-white/60 px-3 py-1 text-xs font-semibold text-rose-800">
                  Heads-up
                </span>
              </div>
              <p className="mt-3 text-base leading-relaxed">
                Consider a dedicated HIPAA intake vendor (IntakeQ, Formstack HIPAA, Jotform HIPAA). They can notify your team
                without attaching PHI. If you insist on Google Forms uploads, patients must log in with Google — a non-starter
                for many.
              </p>
            </div>
          </div>
        </section>

        <section id="truth-table" className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">TRUTH TABLE</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">What This Setup Does — and Doesn’t</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
                <h3 className="text-base font-semibold">It Does</h3>
                <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
                  <li>Keep PHI inside covered Workspace apps and a locked Shared Drive.</li>
                  <li>Deliver auditability via Vault, Drive audit logs, and alerting.</li>
                  <li>Meet the technical and administrative expectations in Google’s HIPAA playbooks.</li>
                </ul>
              </div>
              <div className="space-y-4 rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
                <h3 className="text-base font-semibold">It Doesn’t</h3>
                <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
                  <li>Make email magically safe for PHI — never send PHI in plaintext.</li>
                  <li>Solve anonymous file uploads in Forms (that’s a platform limitation).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="appendix" className="border-b border-neutral-200 bg-neutral-50">
          <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">APPENDIX</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">Why Google Forms Works in 2025</h2>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-neutral-700">
              <p>
                Google’s HIPAA documentation explicitly includes Forms under Drive once you operate under the BAA. HIPAA is
                always about configuration and usage: Shared Drives, Vault, access controls, and policy training complete the
                story.
              </p>
              <p>
                Google publishes a Workspace + Cloud Identity HIPAA implementation guide — your admin should treat it as the
                playbook for structure, access, and data protection.
              </p>
            </div>
          </div>
        </section>

        <section id="checklist" className="border-b border-neutral-200 bg-white">
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-[minmax(0,_320px)_1fr] md:px-6 lg:py-24">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">ONE-PAGE CHECKLIST</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">Copy into Your Ops Doc</h2>
            </div>
            <InteractiveChecklist items={checklistItems} storageKey="dental-intake-checklist" />
          </div>
        </section>

        <section id="references" className="border-b border-neutral-200 bg-neutral-50">
          <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
            <div className="flex flex-col gap-3 text-center">
              <p className="text-xs font-semibold tracking-[0.28em] text-neutral-500">REFERENCES</p>
              <h2 className="text-3xl font-semibold text-neutral-900 md:text-4xl">Bookmark the Source Material</h2>
            </div>
            <ol className="mt-10 grid grid-cols-1 gap-4 list-none text-base leading-relaxed text-neutral-700 sm:grid-cols-2">
              {referenceLinks.map((ref) => (
                <li
                  key={ref.href}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">{ref.label}</span>
                      <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-500">
                        ref
                      </span>
                    </div>
                    <p className="text-base text-neutral-800 sm:min-h-[48px]">{ref.description}</p>
                    <Link
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words text-sm font-semibold text-sky-600 underline"
                    >
                      View {ref.label}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-950">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center text-white md:px-6 md:py-24">
            <h2 className="text-3xl font-semibold md:text-4xl">Ready for a Done-for-You Setup?</h2>
            <p className="max-w-2xl text-base text-white/80 sm:text-lg">
              Prism can stand up the entire HIPAA-aligned intake system, deliver staff training, and monitor changes so your
              practice stays compliant while patients get a frictionless onboarding experience.
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="inverted" className="h-auto rounded-full px-8 py-4 text-base font-semibold">
                <Link href="/get-started">
                  Talk to Prism <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline-inverted"
                className="h-auto rounded-full px-8 py-4 text-base font-semibold"
              >
                <Link href="/contact">
                  Ask a HIPAA Question <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop />
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
