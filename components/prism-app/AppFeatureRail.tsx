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

/**
 * What the app does, in its own words (lib/prism-app.ts FAQ and tour).
 * Icons stay neutral: on this site colour means change, and a feature list
 * is structure.
 */
const FEATURES: ReadonlyArray<{ icon: LucideIcon; label: string }> = [
  { icon: Mail, label: 'Forms submitted' },
  { icon: Bell, label: 'New form alerts' },
  { icon: FileText, label: 'Monthly reports' },
  { icon: Share, label: 'Share as PDF or text' },
  { icon: Search, label: 'Google search clicks' },
  { icon: Sparkles, label: 'Visits from AI assistants' },
  { icon: ChartColumn, label: 'Visits from Google Analytics' },
  { icon: LayoutGrid, label: 'Home Screen widgets' },
  { icon: Lock, label: 'Lock Screen widgets' },
  { icon: Mic, label: 'Ask Siri for your report' },
  { icon: UsersRound, label: 'View-only team access' },
  { icon: MessageCircleQuestion, label: 'Ask Prism' },
]

/** A slow rail of what's inside, between the hero and the demo. */
export function AppFeatureRail() {
  return (
    <div className="relative border-y border-white/[0.06] bg-white/[0.012] py-4">
      <Marquee label="What Prism Grow includes" duration={55} gap="0.75rem">
        {FEATURES.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/[0.08] bg-card px-4 py-2 text-[14px] text-foreground/85"
          >
            <Icon aria-hidden="true" className="size-4 text-foreground/70" />
            {label}
          </span>
        ))}
      </Marquee>
    </div>
  )
}

export default AppFeatureRail
