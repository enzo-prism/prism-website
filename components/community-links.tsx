import { trackExternalLinkClick } from "@/utils/analytics"
import { ArrowUpRight } from "lucide-react"
import clsx from "clsx"

type CommunityLink = {
  label: string
  href: string
}

const COMMUNITY_LINKS: CommunityLink[] = [
  {
    label: "view instagram community",
    href: "https://www.instagram.com/the_design_prism/?hl=en",
  },
  {
    label: "view tiktok community",
    href: "https://www.tiktok.com/@the_design_prism",
  },
  {
    label: "view youtube community",
    href: "https://www.youtube.com/@the_design_prism",
  },
]

export default function CommunityLinks({ className }: { className?: string }) {
  return (
    <div className={clsx("grid gap-2 sm:grid-cols-3", className)}>
      {COMMUNITY_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackExternalLinkClick(link.href, link.label)}
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold lowercase text-neutral-900 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-md"
        >
          {link.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ))}
    </div>
  )
}
