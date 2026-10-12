import { Instagram } from 'lucide-react'

import { InitialsAvatar } from '@/components/wall-of-love/initials-avatar'
import {
  getHandleMonogram,
  type CommunityComment,
} from '@/components/wall-of-love/wall-of-love-feed'

/** One short Instagram comment, sized for a marquee rail. */
export function CommentChip({ comment }: { comment: CommunityComment }) {
  return (
    <figure className="flex shrink-0 items-center gap-3 rounded-full border border-white/[0.08] bg-card/90 py-1.5 pl-1.5 pr-4 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:py-2 sm:pl-2 sm:pr-5">
      <InitialsAvatar initials={getHandleMonogram(comment.handle)} size="sm" />
      <blockquote className="whitespace-nowrap text-[14px] font-medium tracking-[-0.01em] text-foreground sm:text-[15px]">
        &ldquo;{comment.text}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-1.5 whitespace-nowrap text-[13px] text-subtle">
        {comment.handle}
        <Instagram aria-hidden="true" className="size-3.5" />
        <span className="sr-only">on Instagram</span>
      </figcaption>
    </figure>
  )
}

export default CommentChip
