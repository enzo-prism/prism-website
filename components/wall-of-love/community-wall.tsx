import { ChevronDown, Instagram } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { InitialsAvatar } from '@/components/wall-of-love/initials-avatar'
import {
  communityComments,
  emojiOnlyComments,
  getCommunitySpotlight,
  getCommunityWall,
  getHandleMonogram,
  getReactionCounts,
  type CommunityComment,
} from '@/components/wall-of-love/wall-of-love-feed'
import { cn } from '@/lib/utils'

/** Wall comments rendered before the "show all" disclosure (desktop / mobile). */
export const COMMUNITY_PREVIEW_COUNT = 36
export const COMMUNITY_MOBILE_PREVIEW_COUNT = 10

const REACTION_NAMES: Record<string, string> = {
  '🔥': 'fire',
  '💯': 'hundred points',
  '🙌': 'raised hands',
  '👏': 'clapping hands',
  '🙏': 'folded hands',
  '❤️': 'red heart',
}

function textClass(text: string) {
  if (text.length <= 28) return 'text-[1.3rem] font-medium leading-[1.25] tracking-[-0.025em]'
  if (text.length <= 90) return 'text-[1.05rem] leading-[1.5] tracking-[-0.012em]'
  return 'text-[15px] leading-[1.65]'
}

function CommentAttribution({ handle, className }: { handle: string; className?: string }) {
  return (
    <figcaption className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <InitialsAvatar initials={getHandleMonogram(handle)} size="md" />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[13px] font-medium text-foreground/90">{handle}</span>
        <span className="inline-flex items-center gap-1 text-xs text-subtle">
          <Instagram aria-hidden="true" className="size-3" />
          on Instagram
        </span>
      </span>
    </figcaption>
  )
}

function CommentCard({
  comment,
  className,
}: {
  comment: CommunityComment
  className?: string
}) {
  return (
    <figure
      className={cn(
        className,
        'mb-3 break-inside-avoid rounded-2xl border border-white/[0.08] bg-card p-4 sm:mb-4 sm:p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]',
        comment.featured && 'bg-[radial-gradient(120%_90%_at_0%_0%,oklch(1_0_0/5%),transparent_60%)]',
      )}
    >
      <blockquote className={cn('text-pretty text-foreground', textClass(comment.text))}>
        <p>&ldquo;{comment.text}&rdquo;</p>
      </blockquote>
      <CommentAttribution handle={comment.handle} className="mt-3.5 sm:mt-4" />
    </figure>
  )
}

/** The three comments about the edit itself, shown large above the wall. */
function Spotlight({ comments }: { comments: CommunityComment[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {comments.map((comment, index) => (
        <Reveal
          key={comment.key}
          delay={index * 70}
          className={cn('flex', index === 2 && 'sm:col-span-2 lg:col-span-1')}
        >
          <figure className="flex w-full flex-col justify-between gap-8 rounded-2xl border border-white/[0.1] bg-card bg-[radial-gradient(110%_90%_at_0%_0%,oklch(1_0_0/6%),transparent_62%)] p-6 shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-white/[0.18] sm:p-7">
            <blockquote className="text-pretty text-[1.3rem] font-medium leading-[1.3] tracking-[-0.025em] text-foreground sm:text-[1.45rem]">
              <p>&ldquo;{comment.text}&rdquo;</p>
            </blockquote>
            <CommentAttribution handle={comment.handle} />
          </figure>
        </Reveal>
      ))}
    </div>
  )
}

function Masonry({
  comments,
  itemClassName,
}: {
  comments: CommunityComment[]
  itemClassName?: (index: number) => string | undefined
}) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {comments.map((comment, index) => (
        <CommentCard
          key={comment.key}
          comment={comment}
          className={itemClassName?.(index)}
        />
      ))}
    </div>
  )
}

export function CommunityWall() {
  const spotlight = getCommunitySpotlight()
  const wall = getCommunityWall(communityComments, spotlight)
  const preview = wall.slice(0, COMMUNITY_PREVIEW_COUNT)
  // Phones get a shorter preview; the comments they skip open first inside
  // the disclosure (rendered there only below the sm breakpoint).
  const mobileOverflow = preview.slice(COMMUNITY_MOBILE_PREVIEW_COUNT)
  const rest = wall.slice(COMMUNITY_PREVIEW_COUNT)
  const reactions = getReactionCounts().slice(0, 5)

  return (
    <Section
      id="from-the-community"
      aria-labelledby="from-the-community-title"
      className="pt-8 sm:pt-12"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end">
        <SectionHeader
          id="from-the-community-title"
          eyebrow="from the community"
          title="the comment section."
          description={
            <>
              Prism posts short videos on Instagram. These are comments people
              left on them: reactions to our content, not client reviews.
            </>
          }
        />

        <figure className="rounded-2xl border border-white/[0.08] bg-card/70 p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]">
          <figcaption className="text-eyebrow text-subtle">
            emoji in the comments
          </figcaption>
          <ul className="mt-4 grid grid-cols-5 gap-2">
            {reactions.map((reaction) => (
              <li
                key={reaction.emoji}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] py-3"
              >
                <span role="img" aria-label={REACTION_NAMES[reaction.emoji] ?? reaction.emoji} className="text-2xl leading-none">
                  {reaction.emoji}
                </span>
                <span className="font-mono text-[13px] tabular-nums text-foreground">
                  {reaction.count}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-subtle">
            Counted across the {communityComments.length} comments below plus{' '}
            <span className="whitespace-nowrap">
              {emojiOnlyComments.length} emoji-only replies.
            </span>
          </p>
        </figure>
      </div>

      <div className="mt-12 sm:mt-16">
        <Spotlight comments={spotlight} />
      </div>

      <div className="group/wall mt-3 sm:mt-4">
        <div className="relative">
          <Masonry
            comments={preview}
            itemClassName={(index) =>
              index >= COMMUNITY_MOBILE_PREVIEW_COUNT ? 'max-sm:hidden' : undefined
            }
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/70 to-transparent group-has-open/wall:hidden"
          />
        </div>

        {wall.length > COMMUNITY_MOBILE_PREVIEW_COUNT ? (
          <details className="group/all relative mt-2">
            <summary className="relative mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-white/[0.03] px-6 py-3 text-[15px] font-medium text-foreground backdrop-blur-sm transition-colors outline-none hover:border-white/20 hover:bg-white/[0.07] focus-visible:ring-[3px] focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
              <span className="group-open/all:hidden">
                Show all {communityComments.length} comments
              </span>
              <span className="hidden group-open/all:inline">Show fewer</span>
              <ChevronDown
                aria-hidden="true"
                className="size-4 text-muted-foreground transition-transform duration-200 group-open/all:rotate-180"
              />
            </summary>
            <div className="mt-8">
              {mobileOverflow.length > 0 ? (
                <div className="sm:hidden">
                  <Masonry comments={mobileOverflow} />
                </div>
              ) : null}
              <Masonry comments={rest} />
            </div>
          </details>
        ) : null}
      </div>
    </Section>
  )
}

export default CommunityWall
