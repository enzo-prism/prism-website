import {
  Bell,
  ChartColumn,
  FileText,
  LayoutGrid,
  Lock,
  Mail,
  MessageCircleQuestion,
  Mic,
  Search,
  Share,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

import { Marquee } from '@/components/prism/marquee'

/** What the app does, in its own words (lib/prism-app.ts FAQ and tour). */
const FEATURES: ReadonlyArray<{ icon: LucideIcon; label: string; tone: string }> = [
  { icon: Mail, label: 'Forms submitted', tone: 'text-spectrum-green' },
  { icon: Bell, label: 'New form alerts', tone: 'text-spectrum-green' },
  { icon: FileText, label: 'Monthly reports', tone: 'text-spectrum-blue' },
  { icon: Share, label: 'Share as PDF or text', tone: 'text-spectrum-blue' },
  { icon: Search, label: 'Google search clicks', tone: 'text-spectrum-orange' },
  { icon: Sparkles, label: 'Visits from AI assistants', tone: 'text-spectrum-violet' },
  { icon: ChartColumn, label: 'Visits from Google Analytics', tone: 'text-spectrum-blue' },
  { icon: LayoutGrid, label: 'Home Screen widgets', tone: 'text-spectrum-yellow' },
  { icon: Lock, label: 'Lock Screen widgets', tone: 'text-spectrum-yellow' },
  { icon: Mic, label: 'Ask Siri for your report', tone: 'text-spectrum-red' },
  { icon: UsersRound, label: 'View-only team access', tone: 'text-spectrum-green' },
  { icon: MessageCircleQuestion, label: 'Ask Prism', tone: 'text-spectrum-violet' },
]

/** A slow rail of what's inside, between the hero and the demo. */
export function AppFeatureRail() {
  return (
    <div className="relative border-y border-white/[0.06] bg-white/[0.012] py-4">
      <Marquee label="What Prism Grow includes" duration={55} gap="0.75rem">
        {FEATURES.map(({ icon: Icon, label, tone }) => (
          <span
            key={label}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-card px-4 py-2 text-[14px] text-foreground/85"
          >
            <Icon aria-hidden="true" className={`size-4 ${tone}`} />
            {label}
          </span>
        ))}
      </Marquee>
    </div>
  )
}

export default AppFeatureRail
