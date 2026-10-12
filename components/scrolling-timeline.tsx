import {
  ArrowUpFromLine,
  ArrowUpRight,
  Briefcase,
  Car,
  CircleDollarSign,
  Clapperboard,
  Flag,
  GraduationCap,
  Laptop,
  Medal,
  Rocket,
  Signature,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react"

import CoreImage from "@/components/core-image"
import { Reveal } from "@/components/prism/reveal"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  icon: LucideIcon
  /** Prism milestones get the spectrum node. */
  highlight?: boolean
  image?: {
    src: string // Can be local path or absolute URL
    alt: string
    width: number
    height: number
    /** CSS object-position for the shared 4:3 crop. Defaults to center. */
    position?: string
    isExternal?: boolean // Flag to indicate if src is an external URL
  }
  /** A neutral icon tile in place of a photo (same frame as the photos). */
  tile?: {
    icon: LucideIcon
    caption: string
  }
  link?: {
    url: string
    text: string
  }
}

// Static timeline copy, hoisted to module scope. Image sizes are the files'
// real pixel dimensions so the frames reserve the right space before load.
const events: TimelineEvent[] = [
  {
    id: 14,
    year: "March 2009",
    title: "first track & field competition",
    description: "My favorite event at the time was high jump.",
    icon: Medal,
    image: {
      src: "/first-track-field-competition.jpeg",
      alt: "Young Enzo running in a blue and white uniform during his first track and field competition with spectators watching from the stands",
      width: 960,
      height: 642,
    },
  },
  {
    id: 13,
    year: "September 2010",
    title: "posted first review on YouTube",
    description: "New Super Mario Bros. on Wii.",
    icon: Clapperboard,
    image: {
      src: "/first-youtube-video.png",
      alt: "Young Enzo and his brother filming their first YouTube video review, wearing costumes and holding puppies with a video game on the table",
      width: 1298,
      height: 971,
    },
    link: {
      url: "https://www.youtube.com/watch?v=cFz_K56fACc",
      text: "Watch the original video",
    },
  },
  {
    id: 12,
    year: "June 2012",
    title: "makes first dollar from YouTube",
    description: "Changed the way I viewed the world forever.",
    icon: CircleDollarSign,
  },
  {
    id: 11,
    year: "March 2015",
    title: "first pole vault competition",
    description: "Spoiler… I didn't clear that bar lol",
    icon: ArrowUpFromLine,
    image: {
      src: "/first-pole-vault-competition.jpg",
      alt: "Young Enzo mid-air during a pole vault jump at his first competition with mountains in the background",
      width: 1179,
      height: 1222,
      position: "50% 30%",
    },
  },
  {
    id: 10,
    year: "November 2017",
    title: "goes D1 in track and field",
    description: "Barely made the team. Ended up having a great career at CP.",
    icon: Timer,
    image: {
      src: "/timeline/cal-poly-track.png",
      alt: "Enzo smiling in his Cal Poly Track and Field jacket after achieving Division 1 status.",
      width: 546,
      height: 767,
      position: "50% 12%",
    },
  },
  {
    id: 9,
    year: "June 2020",
    title: "first Apple internship",
    description:
      "Secured and completed first internship at Apple (worked on Find My, AirPlay, and some other cool products!)",
    icon: Laptop,
    image: {
      src: "/welcome-to-apple.jpeg",
      alt: "Enzo's Apple onboarding portal welcoming him to Apple",
      width: 1179,
      height: 1714,
      position: "50% 60%",
    },
  },
  {
    id: 8,
    year: "June 2021",
    title: "second Apple internship",
    description: "Completed a second internship at Apple.",
    icon: Laptop,
    image: {
      src: "/apple-gear-internship-2.png",
      alt: "Collection of Apple-branded merchandise including backpack, AirPods, water bottles, cap, and other swag items from Apple internship",
      width: 910,
      height: 1149,
    },
  },
  {
    id: 7,
    year: "June 2022",
    title: "graduates Cal Poly",
    description: "Earned a B.S. in engineering from California Polytechnic State University.",
    icon: GraduationCap,
    image: {
      src: "/timeline/cal-poly-grad.png",
      alt: "Enzo and a friend in green graduation gowns with their father/mentor at Cal Poly commencement ceremony",
      width: 737,
      height: 602,
      position: "50% 35%",
    },
  },
  {
    id: 6,
    year: "June 2022",
    title: "starts full-time product manager role",
    description: "At a venture-backed tech startup.",
    icon: Briefcase,
    image: {
      src: "/timeline/enzo-headshot.jpeg",
      alt: "Enzo's professional headshot, smiling in a collared shirt, marking his first full-time product manager role.",
      width: 800,
      height: 800,
      position: "50% 30%",
    },
  },
  {
    id: 5,
    year: "March 2023",
    title: "first Philippine National Track and Field Championship",
    description: "First time competing overseas!",
    icon: Flag,
    image: {
      src: "/timeline/philippines-championship.png",
      alt: "Enzo and fellow athletes holding the Philippine flag at the Philippine National Track and Field Championship.",
      width: 417,
      height: 279,
    },
  },
  {
    id: 4,
    year: "May 2023",
    title: "Enzo goes pro in track and field",
    description: "Signed the contract. Left full-time job. Moved out of SF. Burned the ships.",
    icon: Trophy,
    tile: { icon: Signature, caption: "contract signed" },
  },
  {
    id: 3,
    year: "May 2023",
    title: "Enzo starts driving for Uber",
    description: "Funding the dream.",
    icon: Car,
    image: {
      src: "/uber-driver-profile.jpeg",
      alt: "Enzo's Uber driver profile showing a perfect 5.00 star rating",
      width: 1179,
      height: 2004,
      position: "50% 0%",
    },
  },
  {
    id: 2,
    year: "May 2023",
    title: "Enzo starts Prism",
    description:
      '"I think there\'s a way to use what the tech industry taught me to help smaller businesses…"',
    icon: Rocket,
    highlight: true,
    image: {
      src: "/prism-logo.jpeg",
      alt: "Prism logo",
      width: 502,
      height: 502,
    },
  },
  {
    id: 1,
    year: "December 2023",
    title: "Prism makes its first dollar",
    description: '"Oh my gosh I think we\'re gonna make it…"',
    icon: CircleDollarSign,
    highlight: true,
  },
]

// One frame for every thumbnail: a 4:3 crop at a fixed size, so the right
// column reads as a single strip of photos. Phones get a wider frame under
// the text; desktop gets a fixed column beside it.
const FRAME_CLASS =
  "relative mt-5 aspect-[4/3] w-full max-w-[16rem] overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_24px_60px_-30px_oklch(0_0_0/90%)] md:mt-1 md:w-56 md:max-w-none md:shrink-0"

function TimelineTile({ tile }: { tile: NonNullable<TimelineEvent["tile"]> }) {
  const Icon = tile.icon
  return (
    <div aria-hidden="true" className={cn(FRAME_CLASS, "grid place-items-center bg-card")}>
      <div className="bg-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(55%_65%_at_50%_42%,color-mix(in_oklch,var(--spectrum-blue)_20%,transparent),transparent_72%)]" />
      <div className="relative flex flex-col items-center gap-3">
        <span className="grid size-14 place-items-center rounded-2xl border border-white/12 bg-background/70 text-foreground shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset,0_0_40px_-10px_color-mix(in_oklch,var(--spectrum-blue)_60%,transparent)]">
          <Icon className="size-6" />
        </span>
        <span className="font-mono text-[11px] text-subtle">{tile.caption}</span>
      </div>
    </div>
  )
}

function TimelineImage({ event }: { event: TimelineEvent }) {
  if (event.tile) return <TimelineTile tile={event.tile} />

  const image = event.image
  if (!image) return null
  const style = { objectPosition: image.position ?? "50% 50%" }

  return (
    <div className={FRAME_CLASS}>
      {event.id === 7 || image.isExternal ? (
        // Kept from the original timeline: this asset renders through a plain lazy img.
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="absolute inset-0 size-full object-cover"
          style={style}
          loading="lazy"
        />
      ) : (
        <CoreImage
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-full w-full object-cover"
          style={style}
          sizes="(max-width: 768px) 256px, 224px"
          quality={90}
          disableShadow
          trackingId={`timeline_image_${event.id}`}
        />
      )}
    </div>
  )
}

/**
 * Enzo's story as a vertical timeline (server component). The rail and nodes
 * are static; each entry reveals on scroll through the shared Reveal kit.
 */
export default function ScrollingTimeline() {
  return (
    <ol className="relative mx-auto max-w-4xl">
      {events.map((event, index) => {
        const Icon = event.icon
        const isLast = index === events.length - 1

        return (
          <li
            key={event.id}
            id={`timeline-${event.id}`}
            className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-5 md:grid-cols-[8.5rem_2.25rem_minmax(0,1fr)] md:gap-x-7"
          >
            <p className="hidden pt-2.5 text-right font-mono text-xs text-subtle md:block">
              {event.year}
            </p>

            <div className="relative flex justify-center" aria-hidden="true">
              {!isLast ? (
                <span className="absolute bottom-0 top-9 w-px bg-gradient-to-b from-white/15 to-white/[0.06]" />
              ) : null}
              {event.highlight ? (
                <span className="relative z-10 grid size-9 place-items-center rounded-full bg-spectrum p-px shadow-[0_0_24px_-4px_color-mix(in_oklch,var(--spectrum-blue)_60%,transparent)]">
                  <span className="grid size-full place-items-center rounded-full bg-background text-foreground">
                    <Icon className="size-4" />
                  </span>
                </span>
              ) : (
                <span className="relative z-10 grid size-9 place-items-center rounded-full border border-white/12 bg-background text-muted-foreground">
                  <Icon className="size-4" />
                </span>
              )}
            </div>

            <Reveal
              className={cn(
                "min-w-0 md:flex md:items-start md:justify-between md:gap-8",
                isLast ? "pb-0" : "pb-12 sm:pb-14",
              )}
            >
              <div className="min-w-0">
                <p className="font-mono text-xs text-subtle md:hidden">{event.year}</p>
                <h3 className="mt-1.5 text-pretty text-xl font-semibold tracking-[-0.025em] text-foreground">
                  {event.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                  {event.description}
                </p>

                {event.link ? (
                  <a
                    href={event.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {event.link.text}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                ) : null}
              </div>

              <TimelineImage event={event} />
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
