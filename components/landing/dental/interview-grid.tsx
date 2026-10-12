import Image from 'next/image'
import { Play } from 'lucide-react'

import { VideoDialog } from '@/components/prism/video-dialog'
import { cn } from '@/lib/utils'

export type DentalInterview = {
  youtubeId: string
  name: string
  role: string
  /**
   * A frame from the interview itself (YouTube's auto-generated stills), not
   * the channel's illustrated cover art. Picked by eye so both faces smile.
   */
  frame: 'maxres2' | 'maxres3' | 'hq3'
}

/**
 * Dental interviews shown on /dental-website and
 * /why-dental-practices-love-prism. Former-client interviews
 * (lib/former-clients.ts) stay off these proof surfaces, so wCQrUajsnk8 is
 * intentionally omitted.
 */
export const DENTAL_INTERVIEWS: readonly DentalInterview[] = [
  {
    youtubeId: 'HrksJeYb02Q',
    name: 'Dr. Christopher Wong',
    role: 'Practice owner, Palo Alto',
    frame: 'maxres3',
  },
  {
    youtubeId: 'WIWxwdZflzo',
    name: 'Dr. Ahmed Mataria',
    role: 'Mataria Dental Group',
    frame: 'maxres3',
  },
  {
    youtubeId: 'FxuzACT-o2Q',
    name: 'Dr. Katie Lee',
    role: 'Family dentist',
    frame: 'hq3',
  },
  {
    youtubeId: 'jE6YAimUxMQ',
    name: 'Melissa',
    role: 'Front desk lead',
    frame: 'hq3',
  },
  {
    youtubeId: '5eB4Y27zkE8',
    name: 'Ludmila',
    role: 'Office manager',
    frame: 'maxres2',
  },
]

type InterviewGridProps = {
  interviews: readonly DentalInterview[]
  location: string
}

/**
 * Bento of real interview stills: the first conversation leads at double
 * size, the rest sit in a 2x2. Each tile opens the interview in a dialog, so
 * nothing loads from YouTube until a visitor presses play.
 */
export function InterviewGrid({ interviews, location }: InterviewGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {interviews.map((interview, index) => {
        const featured = index === 0
        return (
          <li
            key={interview.youtubeId}
            className={cn(featured && 'col-span-2 lg:row-span-2')}
          >
            <VideoDialog
              youtubeId={interview.youtubeId}
              title={`${interview.name} interview`}
              description={`${interview.name}, ${interview.role}, in conversation with Enzo.`}
              location={location}
              triggerClassName="group/play relative block h-full w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card text-left text-foreground hover:text-foreground"
            >
              <span
                className={cn(
                  'relative block h-full w-full',
                  featured
                    ? 'aspect-video lg:aspect-auto lg:min-h-full'
                    : 'aspect-video',
                )}
              >
                <Image
                  src={`https://i.ytimg.com/vi/${interview.youtubeId}/${interview.frame}.jpg`}
                  alt=""
                  fill
                  unoptimized
                  sizes={
                    featured
                      ? '(min-width: 1024px) 600px, 92vw'
                      : '(min-width: 1024px) 300px, 46vw'
                  }
                  className="object-cover opacity-90 transition-[opacity,transform] duration-500 group-hover/play:scale-[1.02] group-hover/play:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,oklch(0_0_0/82%))]"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute grid place-items-center rounded-full border border-white/25 bg-black/55 text-foreground backdrop-blur-md transition-transform duration-200 group-hover/play:scale-105',
                    featured
                      ? 'right-4 top-4 size-12 sm:right-5 sm:top-5 sm:size-14'
                      : 'right-3 top-3 size-9',
                  )}
                >
                  <Play
                    className={cn(
                      'translate-x-px fill-current',
                      featured ? 'size-5' : 'size-3.5',
                    )}
                  />
                </span>
                <span
                  className={cn(
                    'absolute inset-x-0 bottom-0 flex flex-col gap-0.5',
                    featured ? 'p-5 sm:p-7' : 'p-3 sm:p-4',
                  )}
                >
                  <span
                    className={cn(
                      'font-semibold tracking-[-0.02em] text-foreground',
                      featured
                        ? 'text-xl sm:text-2xl'
                        : 'text-[13px] sm:text-[15px]',
                    )}
                  >
                    {interview.name}
                  </span>
                  <span
                    className={cn(
                      'text-white/70',
                      featured
                        ? 'text-sm sm:text-[15px]'
                        : 'hidden text-[13px] sm:block',
                    )}
                  >
                    {interview.role}
                  </span>
                </span>
              </span>
            </VideoDialog>
          </li>
        )
      })}
    </ul>
  )
}

export default InterviewGrid
