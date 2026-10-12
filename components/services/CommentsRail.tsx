import BrandLogo from '@/components/brand-logo'
import { Marquee } from '@/components/prism/marquee'
import type { CommunityComment } from '@/components/services/community-comments'
import { cn } from '@/lib/utils'

function CommentCard({ comment }: { comment: CommunityComment }) {
  return (
    <figure
      className={cn(
        'flex shrink-0 flex-col justify-between gap-5 self-center rounded-2xl border border-white/[0.08] bg-card p-5',
        comment.text.length > 80
          ? 'w-[300px] sm:w-[420px]'
          : 'w-[230px] sm:w-[270px]',
      )}
    >
      <blockquote className="text-pretty text-[15px] leading-6 text-foreground/90">
        &ldquo;{comment.text}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-2 font-mono text-[11px] text-subtle">
        <BrandLogo brand="instagram" decorative className="size-3.5" />
        {comment.handle} · Instagram
      </figcaption>
    </figure>
  )
}

type CommentsRailProps = {
  rows: readonly (readonly CommunityComment[])[]
  label: string
}

/** Full-bleed rails of community comments on Prism's own content. */
export function CommentsRail({ rows, label }: CommentsRailProps) {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, index) => (
        <Marquee
          key={index}
          duration={60 + index * 12}
          gap="1rem"
          reverse={index % 2 === 1}
          label={index === 0 ? label : undefined}
        >
          {row.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Marquee>
      ))}
    </div>
  )
}

export default CommentsRail
