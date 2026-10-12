import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Archive,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
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
} from 'lucide-react'

import Footer from '@/components/footer'
import GuideTableOfContents from '@/components/guide-table-of-contents'
import InteractiveChecklist from '@/components/interactive-checklist'
import { Callout, CheckList, TextLink } from '@/components/landing/dental/primitives'
import { LandingHero } from '@/components/landing/landing-hero'
import Navbar from '@/components/navbar'
import { FinalCta } from '@/components/prism/final-cta'
import { Eyebrow } from '@/components/prism/section'
import { WebPageSchema } from '@/components/schema-markup'
import ScrollProgressBar from '@/components/scroll-progress-bar'
import ScrollToTop from '@/components/scroll-to-top'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_CTA } from '@/lib/waitlist'

const GOOGLE_WORKSPACE_LINK =
  'https://c.gle/APy2Ad08G18tc2DVKTvFnIX7ZsIi8C_16CofJocN9aFYsQDXBJRKDAH3FRQb6BfrqNgPv1Buz5DypvRjWF8E2rqpEvohTLTUWmLF6UOh4oCinNkIBx-wbk3wUX2jqxqDYiPNn4cWz4pfBlfNZT7je1YO'

const accomplishments = [
  'Use Google Forms (part of Google Workspace) to collect ePHI from new patients.',
  'Store every response in a locked Shared Drive with strict permissions, retention, and auditing.',
  'Operate only within services covered by Google’s HIPAA Business Associate Amendment (BAA).',
  'Avoid landmines like emailing PHI, open-link sharing, or file-upload misconfigurations.',
]

const prerequisites = [
  'Paid Google Workspace tenant on an edition that includes every control you plan to use. Free Gmail is out.',
  'Practice acknowledges it is a HIPAA Covered Entity/Business Associate handling PHI in Workspace.',
  'Workspace super admin available to configure security and compliance settings.',
  'Documented policies and training for staff handling PHI (minimum necessary, no PHI via email, etc.).',
  'Executed Google HIPAA BAA in the Admin console.',
]

type StepAccent =
  | 'sky'
  | 'violet'
  | 'emerald'
  | 'amber'
  | 'indigo'
  | 'purple'
  | 'teal'
  | 'rose'
  | 'cyan'
  | 'slate'
  | 'blue'

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
    id: 'step-1',
    number: '01',
    title: 'Execute the Google Workspace HIPAA BAA',
    badge: 'Compliance',
    accent: 'sky',
    icon: ShieldCheck,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ol className="list-decimal space-y-3 pl-4 sm:pl-5">
          <li>
            Sign in to{' '}
            <Link
              href="https://admin.google.com"
              target="_blank"
              rel="noopener noreferrer"
              >
              admin.google.com
            </Link>{' '}
            as a super admin.
          </li>
          <li>
            Navigate to{' '}
            <span className="font-semibold">
              Account → Account settings → Legal &amp; compliance
            </span>{' '}
            and review/accept the HIPAA Business Associate Amendment (BAA).
          </li>
          <li>
            Download or screenshot the executed terms for your compliance
            binder.
          </li>
        </ol>
        <p className="text-[13px] leading-6 text-subtle">
          Resources: Google Admin Help and Google HIPAA overview{' '}
          <Link
            href="https://support.google.com/a/answer/2888485?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            [Google Help]
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Scope the Included Functionality',
    badge: 'Coverage Check',
    accent: 'violet',
    icon: Layers,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <p>
          Confirm which Google services are covered under the BAA. As of May 14,
          2026, Google lists Drive, including Docs, Forms, Sheets, Slides, and
          Vids, as Included Functionality. Google maintains the full current
          service list on the page linked below.
        </p>
        <p className="font-semibold text-foreground">
          Action: Keep PHI inside covered services only. Do not copy PHI into
          tools that are not on Google’s HIPAA list.
        </p>
        <p className="text-[13px] leading-6 text-subtle">
          Reference:{' '}
          <Link
            href="https://workspace.google.com/terms/2015/1/hipaa_functionality/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Workspace HIPAA Included Functionality
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Create a Locked “PHI – Intake” Shared Drive',
    badge: 'Drive Security',
    accent: 'emerald',
    icon: FolderLock,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            In the Admin console go to{' '}
            <span className="font-semibold">
              Apps → Google Workspace → Drive and Docs
            </span>
            . Create a Shared Drive named{' '}
            <span className="italic">PHI – Intake</span>.
          </li>
          <li>
            Add only essential team members (e.g., office manager, doctor).
            Apply least-privilege membership.
          </li>
          <li>
            Configure sharing settings:
            <ul className="mt-2 list-disc space-y-2 pl-4 sm:pl-5">
              <li>Disable external sharing for the Shared Drive.</li>
              <li>Disable link sharing (“Anyone with the link”).</li>
              <li>Prevent download/print/copy for viewers when appropriate.</li>
            </ul>
          </li>
          <li>
            If your edition includes Drive labels and DLP, configure rules to
            detect sensitive identifiers and restrict external sharing. Drive
            DLP is not included with every paid Workspace edition.
          </li>
          <li>
            Review Drive audit logs in the Admin console or your approved log
            export. Vault retention does not retain Admin console audit events.
          </li>
        </ol>
        <p className="text-[13px] leading-6 text-subtle">
          Implementation guidance:{' '}
          <Link
            href="https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Workspace HIPAA Implementation Guide
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Enforce Identity and Device Security',
    badge: 'Identity',
    accent: 'amber',
    icon: Fingerprint,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Require 2-Step Verification for any staff with PHI access.</li>
          <li>
            Use Context-Aware Access only if your edition supports it to limit
            PHI access to managed devices or trusted networks.
          </li>
          <li>Mandate strong passwords and enable suspicious login alerts.</li>
          <li>
            Use least-privilege admin roles; nobody should operate daily work as
            a super admin.
          </li>
        </ul>
        <p className="text-[13px] leading-6 text-subtle">
          Use Google&apos;s current Workspace HIPAA implementation guide for
          security and configuration practices.
        </p>
      </div>
    ),
  },
  {
    id: 'step-5',
    number: '05',
    title: 'Configure Google Vault for Retention',
    badge: 'Retention',
    accent: 'indigo',
    icon: Archive,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>
            Confirm Google Vault is included or licensed for your edition.
            Business Plus includes Vault; edition availability varies elsewhere.
          </li>
          <li>
            Create retention rules covering the{' '}
            <span className="italic">PHI – Intake</span> Shared Drive and
            relevant user accounts based on your record-retention policy.
          </li>
          <li>
            Set up matters/holds to support audits, legal requests, or disputes.
          </li>
        </ul>
        <p className="text-[13px] leading-6 text-subtle">
          Test retention rules on a small group first. A misconfigured rule can
          immediately and irreversibly purge covered data. Vault retains
          supported service content, not Admin console Drive audit events.
        </p>
        <p className="text-[13px] leading-6 text-subtle">
          Reference:{' '}
          <Link
            href="https://workspace.google.com/terms/2015/1/hipaa_functionality/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Workspace HIPAA Included Functionality
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'step-6',
    number: '06',
    title: 'Build the HIPAA-Aligned Google Form',
    badge: 'Google Forms',
    accent: 'purple',
    icon: FileSpreadsheet,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ol className="list-decimal space-y-3 pl-4 sm:pl-5">
          <li>
            Create the form from a Workspace account; name it “New Patient
            Intake” and structure sections such as Contact, Medical History,
            Medications, Allergies, and Consent.
          </li>
          <li>
            In <span className="font-semibold">Settings → Responses</span>, link
            responses to a new Google Sheet stored inside the{' '}
            <span className="italic">PHI – Intake</span> Shared Drive.
          </li>
          <li>
            Notifications: if you rely on add-ons for alerts, only send a “new
            submission received” email. Do not include PHI in the message. Link
            back to the secure Sheet instead.
          </li>
          <li>
            <span className="font-semibold">
              Settings → Presentation &amp; Defaults
            </span>
            :
            <ul className="mt-2 list-disc space-y-2 pl-4 sm:pl-5">
              <li>
                Avoid collecting patient email addresses unless disclosed and
                necessary.
              </li>
              <li>
                Do not “Limit to 1 response”; that forces Google sign-in and
                blocks most patients.
              </li>
              <li>
                Ensure the form is accessible to anyone with the link (patients
                are external) and not restricted to your domain.
              </li>
            </ul>
          </li>
        </ol>
        <div className="rounded-xl border border-white/[0.08] border-l-[3px] border-l-spectrum-orange/80 bg-white/[0.03] p-5 text-[15px] leading-7 text-muted-foreground">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <FileWarning className="h-5 w-5" aria-hidden />
            File uploads have major constraints
          </div>
          <p className="mt-2">
            Google Forms requires respondents to sign in with Google for file
            uploads. Many practices skip uploads in Forms and collect images or
            IDs in person or through a dedicated HIPAA intake product. Google
            continues to improve cross-domain settings, but sign-in remains
            standard for uploads.
          </p>
          <p className="mt-3 text-sm">
            References:{' '}
            <Link
              href="https://www.jotform.com/google-forms/google-form-file-upload-without-sign-in/"
              target="_blank"
              rel="noopener noreferrer"
              >
              Jotform on Google Form uploads
            </Link>{' '}
            &amp;{' '}
            <Link
              href="https://workspaceupdates.googleblog.com/2022/06/dlp-file-uploads-to-external-forms.html"
              target="_blank"
              rel="noopener noreferrer"
              >
              Workspace Updates
            </Link>
            .
          </p>
        </div>
        <p className="text-[13px] leading-6 text-subtle">
          Domain access guidance:{' '}
          <Link
            href="https://support.google.com/docs/answer/160166?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Forms sharing help
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'step-7',
    number: '07',
    title: 'Lock Down the Linked Google Sheet',
    badge: 'Sheets',
    accent: 'teal',
    icon: Table,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>
            Keep the response Sheet inside the{' '}
            <span className="italic">PHI – Intake</span> Shared Drive.
          </li>
          <li>
            Share only with the intake group; disable link sharing entirely.
          </li>
          <li>
            Protect sensitive ranges (e.g., calculated fields, internal notes)
            with sheet protections.
          </li>
          <li>
            Review File activity and Admin console Drive audit events to confirm
            auditing captures expected activity. Export logs separately if your
            retention policy requires longer availability.
          </li>
        </ul>
        <p className="text-[13px] leading-6 text-subtle">
          Refer back to Google’s HIPAA implementation whitepaper for Drive
          configuration patterns.
        </p>
      </div>
    ),
  },
  {
    id: 'step-8',
    number: '08',
    title: 'Put Guardrails on Email',
    badge: 'Email Policy',
    accent: 'rose',
    icon: MailWarning,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>Never email PHI in plaintext.</li>
          <li>
            Submission alerts should be PHI-free (“new intake received, open the
            Sheet”).
          </li>
          <li>
            Enforce TLS for outbound mail; if you ever send PHI, configure
            S/MIME and document exceptions (safer approach: don’t email PHI).
          </li>
        </ul>
        <p className="text-[13px] leading-6 text-subtle">
          Email posture recommendations:{' '}
          <Link
            href="https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google HIPAA implementation guide
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'step-9',
    number: '09',
    title: 'Deploy DLP and Alerting',
    badge: 'DLP',
    accent: 'cyan',
    icon: ShieldAlert,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>
            Create Drive DLP rules that flag PHI identifiers (SSN, insurance
            IDs, DOB) and block external sharing from the Shared Drive.
          </li>
          <li>
            Enable Alert Center notifications for mass downloads, sharing
            attempts, or DLP violations.
          </li>
        </ul>
        <p className="text-[13px] leading-6 text-subtle">
          More detail:{' '}
          <Link
            href="https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google HIPAA implementation guide
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    id: 'step-10',
    number: '10',
    title: 'Test Like an Auditor',
    badge: 'Audit',
    accent: 'slate',
    icon: ClipboardCheck,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>
            Submit multiple dummy entries and confirm they land in the correct
            Sheet inside the Shared Drive.
          </li>
          <li>
            Attempt to access responses with a non-authorized account. Access
            should be denied.
          </li>
          <li>
            Export audit logs and confirm activity appears in Admin reports and
            Vault.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'step-11',
    number: '11',
    title: 'Train Front-Office Staff',
    badge: 'Team Training',
    accent: 'blue',
    icon: Users,
    content: (
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">
        <ul className="list-disc space-y-2 pl-4 sm:pl-5">
          <li>
            Staff access PHI only inside the locked Shared Drive and Sheet.
          </li>
          <li>No copy/paste of PHI into email, chat, or non-covered tools.</li>
          <li>
            When patients request the intake form, send the secure form link,
            not a PDF attachment.
          </li>
        </ul>
      </div>
    ),
  },
]

const guideSections = [
  {
    id: 'overview',
    label: 'Overview',
    iconSrc: '/pixelish/document-letter.svg',
  },
  {
    id: 'prerequisites',
    label: 'Prerequisites',
    iconSrc: '/pixelish/checkmark.svg',
  },
  { id: 'steps', label: 'Step-by-step', iconSrc: '/pixelish/command.svg' },
  {
    id: 'options',
    label: 'Optional Paths',
    iconSrc: '/pixelish/lens-plus.svg',
  },
  { id: 'truth-table', label: 'Truth Table', iconSrc: '/pixelish/kanban.svg' },
  { id: 'appendix', label: 'Appendix', iconSrc: '/pixelish/folder.svg' },
  {
    id: 'checklist',
    label: 'Checklist',
    iconSrc: '/pixelish/circle-checkmark.svg',
  },
  { id: 'references', label: 'References', iconSrc: '/pixelish/copy.svg' },
]

const checklistItems = [
  'Workspace paid plan and required edition features confirmed; super admin assigned.',
  'Google HIPAA BAA executed (Admin → Legal & compliance).',
  '“PHI – Intake” Shared Drive created with restricted membership and external sharing disabled.',
  '2SV enforced; least-privilege roles; context-aware access in place if available.',
  'Vault retention configured for PHI Shared Drive and related accounts.',
  'Google Form intake built; responses linked to Sheet inside the PHI Shared Drive.',
  'No PHI sent via email; notifications are PHI-free.',
  'Drive DLP and Alert Center rules active only where the selected edition supports them.',
  'Test submissions verified; audit-log retention/export requirements confirmed separately from Vault.',
  'Staff trained and policies documented.',
]

const referenceLinks = [
  {
    label: 'HIPAA Included Functionality',
    description:
      'Lists covered Google Workspace apps (including Forms) as of May 14, 2026.',
    href: 'https://workspace.google.com/terms/2015/1/hipaa_functionality/',
  },
  {
    label: 'HIPAA Compliance with Google Workspace',
    description: 'Overview of signing the BAA and Workspace obligations.',
    href: 'https://support.google.com/a/answer/3407054?hl=en',
  },
  {
    label: 'Google Admin Help: Review & accept BAA',
    description: 'Step-by-step instructions to execute the HIPAA BAA.',
    href: 'https://support.google.com/a/answer/2888485?hl=en',
  },
  {
    label: 'Google Workspace & Cloud Identity HIPAA Implementation Guide',
    description:
      'Official whitepaper covering configuration, access, and DLP patterns.',
    href: 'https://cloud.google.com/security/compliance/workspace_cloud_identity_hipaa_implementation_guide_workspace_whitepaper',
  },
  {
    label: 'Google Forms access help',
    description:
      'How domain restrictions and sign-in requirements impact Form access.',
    href: 'https://support.google.com/docs/answer/160166?hl=en',
  },
  {
    label: 'Jotform: Google Form file upload without sign-in',
    description:
      'Explains the Google account requirement for uploads and alternatives.',
    href: 'https://www.jotform.com/google-forms/google-form-file-upload-without-sign-in/',
  },
  {
    label: 'Workspace Updates: DLP for file uploads',
    description:
      'Details on protecting file uploads to external forms with Drive DLP.',
    href: 'https://workspaceupdates.googleblog.com/2022/06/dlp-file-uploads-to-external-forms.html',
  },
  {
    label: 'Google Admin Help: Drive DLP availability',
    description:
      'Lists the Workspace editions that support Drive data loss prevention.',
    href: 'https://support.google.com/a/answer/9646351?hl=en',
  },
  {
    label: 'Google Vault retention rules',
    description:
      'Explains retention behavior and the risk of immediate, irreversible purging.',
    href: 'https://support.google.com/vault/answer/2990828?hl=en',
  },
]

const PAGE_TITLE = 'Dental forms in Google Workspace'
const PAGE_DESCRIPTION =
  'A practical guide to secure dental forms, shared drives, Vault, and patient-data safeguards in Google Workspace.'
const CANONICAL_URL = 'https://www.design-prism.com/google/dental-patient-forms'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/google/dental-patient-forms',
  ogImage: '/prism-opengraph.png',
})

function GuideSection({
  id,
  eyebrow,
  title,
  children,
  description,
}: {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-white/[0.08] py-14 first:border-t-0 first:pt-0 sm:py-20"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={`${id}-title`}
        className="mt-5 max-w-[22ch] text-balance pb-1 text-[clamp(1.85rem,1.4rem+1.6vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-gradient"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-[62ch] text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
      <div className="mt-10">{children}</div>
    </section>
  )
}

export default function GoogleDentalPatientFormsGuide() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <ScrollProgressBar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <LandingHero
          eyebrow={
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-3.5" aria-hidden />
              HIPAA intake playbook
            </span>
          }
          title="set up secure electronic patient forms with Google Workspace."
          description="This zero-fluff guide shows dental teams how to collect new-patient intake data in Google Forms while staying inside HIPAA guardrails, from executing the BAA to locking down Shared Drives, Vault, DLP, and staff training."
          location="dental patient forms hero"
          ctaHref={WAITLIST_CTA.href}
          ctaLabel={WAITLIST_CTA.label}
          secondary={{ label: 'Jump to checklist', href: '#checklist' }}
          showStatus={false}
          glow="green"
          titleClassName="max-w-[18ch]"
        />

        <div className="prism-container pb-10 sm:pb-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
            <div className="min-w-0 lg:order-2">
              <GuideTableOfContents sections={guideSections} />
            </div>

            <div className="min-w-0 lg:order-1">
              <GuideSection
                id="overview"
                eyebrow="What you’ll accomplish"
                title="build a HIPAA-aligned intake hub in Google Workspace."
                description="Every section links back to the same locked Shared Drive so your team can configure and review the intake flow against your documented privacy and compliance requirements."
              >
                <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2">
                  {accomplishments.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-card p-5">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-foreground" aria-hidden />
                      <span className="text-[15px] leading-7 text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Callout className="mt-4" title="Reality check" tone="note">
                  <p>
                    As of May 14, 2026, Google lists Forms under Drive in its
                    HIPAA “Included Functionality.” A signed BAA and correctly
                    configured Workspace tenant still matter, and practices
                    should verify the live list before launch.
                  </p>
                  <p className="mt-3 text-[13px] text-subtle">
                    Source:{' '}
                    <TextLink href="https://workspace.google.com/terms/2015/1/hipaa_functionality/">
                      Google Workspace HIPAA Included Functionality
                    </TextLink>
                    .
                  </p>
                </Callout>
              </GuideSection>

              <GuideSection id="prerequisites" eyebrow="Prerequisites" title="don’t skip these foundations.">
                <ol className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
                  {prerequisites.map((item, index) => (
                    <li key={item} className="flex gap-5 p-5 sm:p-6">
                      <span className="font-mono text-[11px] leading-7 tracking-[0.18em] text-subtle">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[15px] leading-7 text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 max-w-[62ch] text-[15px] leading-7 text-muted-foreground">
                  These steps anchor your compliance story. Auditors will ask for
                  proof of BAA execution, policies, and staff readiness before
                  they even look at Forms.
                </p>
                <Card className="mt-6 flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <p className="text-eyebrow text-subtle">Need Google Workspace?</p>
                    <p className="max-w-[56ch] text-[15px] leading-7 text-muted-foreground">
                      Eligible new Workspace customers can use our referral link
                      for the available discount, then configure intake inside
                      the covered services outlined below.
                    </p>
                  </div>
                  <Button asChild variant="outline" className="shrink-0">
                    <Link href={GOOGLE_WORKSPACE_LINK} target="_blank" rel="noopener noreferrer">
                      Buy Google Workspace
                      <ArrowUpRight aria-hidden />
                    </Link>
                  </Button>
                </Card>
              </GuideSection>

              <GuideSection
                id="steps"
                eyebrow="Implementation guide"
                title="follow each step; document every change."
                description="Every configuration should be captured in your operations log. Screenshots, Admin audit entries, and Vault retention proofs make your compliance story defensible."
              >
                <ol className="relative space-y-4 before:absolute before:bottom-8 before:left-[19px] before:top-8 before:hidden before:w-px before:bg-white/10 sm:before:block">
                  {steps.map((step) => {
                    const Icon = step.icon
                    return (
                      <li key={step.id} id={step.id} className="relative scroll-mt-24 sm:pl-16">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-6 z-10 hidden size-10 place-items-center rounded-full border border-white/10 bg-card font-mono text-[12px] text-foreground sm:grid"
                        >
                          {step.number}
                        </span>
                        <article className="rounded-2xl border border-white/[0.08] bg-card p-5 sm:p-7">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                              <Icon className="size-4 text-foreground" aria-hidden />
                            </span>
                            <span className="font-mono text-[11px] tracking-[0.18em] text-subtle sm:hidden">
                              {step.number}
                            </span>
                            <Badge variant="outline">{step.badge}</Badge>
                          </div>
                          <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-foreground">
                            {step.title}
                          </h3>
                          <div className="mt-4 [&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:decoration-white/25 [&_a]:underline-offset-[5px] [&_a:hover]:decoration-white/70 [&_li::marker]:text-subtle">
                            {step.content}
                          </div>
                        </article>
                      </li>
                    )
                  })}
                </ol>
              </GuideSection>

              <GuideSection id="options" eyebrow="Optional paths" title="when forms alone aren’t enough.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Callout
                    tone="good"
                    title="Optional: AppSheet Intake"
                    icon={<ShieldCheck className="size-4" aria-hidden />}
                    className="h-full"
                  >
                    <p>
                      AppSheet sits on the Included Functionality list. If you want
                      conditional logic, a mobile app experience, or tighter
                      workflows, build an app that writes to the same secure Shared
                      Drive and Sheet. Apply the same DLP, Vault, and sharing
                      controls, and still avoid emailing PHI.
                    </p>
                  </Callout>
                  <Callout
                    tone="warn"
                    title="If You Must Collect Files From Patients"
                    icon={<AlertTriangle className="size-4" aria-hidden />}
                    className="h-full"
                  >
                    <p>
                      Consider a dedicated HIPAA intake vendor (IntakeQ, Formstack
                      HIPAA, Jotform HIPAA). They can notify your team without
                      attaching PHI. If you insist on Google Forms uploads, patients
                      must log in with Google, a non-starter for many.
                    </p>
                  </Callout>
                </div>
              </GuideSection>

              <GuideSection id="truth-table" eyebrow="Truth table" title="what this setup does, and doesn’t.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-6">
                    <h3 className="flex items-center gap-2 text-[17px] font-semibold text-foreground">
                      <CheckCircle2 className="size-4" aria-hidden />
                      It Does
                    </h3>
                    <CheckList
                      className="mt-4"
                      items={[
                        'Keep PHI inside covered Workspace apps and a locked Shared Drive.',
                        'Support auditability through Vault for supported content, plus separate Drive audit logs and alerting.',
                        'Provide a starting configuration aligned with Google’s HIPAA guidance when the required editions and controls are in place.',
                      ]}
                    />
                  </Card>
                  <Card className="p-6">
                    <h3 className="flex items-center gap-2 text-[17px] font-semibold text-foreground">
                      <ShieldAlert className="size-4" aria-hidden />
                      It Doesn’t
                    </h3>
                    <CheckList
                      marker="dot"
                      className="mt-4"
                      items={[
                        'Make email magically safe for PHI. Never send PHI in plaintext.',
                        'Solve anonymous file uploads in Forms (that’s a platform limitation).',
                      ]}
                    />
                  </Card>
                </div>
              </GuideSection>

              <GuideSection id="appendix" eyebrow="Appendix" title="why Google Forms works in 2026.">
                <div className="max-w-[64ch] space-y-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  <p>
                    Google’s HIPAA documentation explicitly includes Forms under
                    Drive once you operate under the BAA. HIPAA is always about
                    configuration and usage: Shared Drives, Vault, access controls,
                    and policy training complete the story.
                  </p>
                  <p>
                    Google publishes a Workspace + Cloud Identity HIPAA
                    implementation guide. Your admin should treat it as the playbook
                    for structure, access, and data protection.
                  </p>
                </div>
              </GuideSection>

              <GuideSection id="checklist" eyebrow="One-page checklist" title="copy into your ops doc.">
                <InteractiveChecklist items={checklistItems} storageKey="dental-intake-checklist" />
              </GuideSection>

              <GuideSection id="references" eyebrow="References" title="bookmark the source material.">
                <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2">
                  {referenceLinks.map((ref) => (
                    <li key={ref.href} className="bg-card sm:[&:last-child:nth-child(odd)]:col-span-2">
                      <Link
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/ref flex h-full flex-col gap-2 p-5 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:p-6"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-[15px] font-semibold leading-snug text-foreground">{ref.label}</span>
                          <ArrowUpRight
                            className="mt-0.5 size-4 shrink-0 text-subtle transition-[color,transform] duration-200 group-hover/ref:-translate-y-0.5 group-hover/ref:translate-x-0.5 group-hover/ref:text-foreground"
                            aria-hidden
                          />
                        </span>
                        <span className="text-[14px] leading-6 text-muted-foreground">{ref.description}</span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-[14px] text-subtle">
                  Questions about this guide? Email{' '}
                  <TextLink href="mailto:support@design-prism.com">support@design-prism.com</TextLink>.
                </p>
              </GuideSection>
            </div>
          </div>
        </div>

        <FinalCta
          location="dental patient forms final cta"
          title="want a done-for-you setup."
          description="Prism can configure a HIPAA-aligned intake system, document the setup, and train staff. Your practice and compliance advisers remain responsible for policies, risk assessment, and ongoing compliance."
        />
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
    </div>
  )
}
