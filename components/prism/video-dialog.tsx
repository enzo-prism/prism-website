'use client'

import { useState, type ReactNode } from 'react'
import { Play, X } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { trackCTAClick } from '@/utils/analytics'
import { cn } from '@/lib/utils'

type VideoDialogProps = {
  /** YouTube video id, e.g. "HrksJeYb02Q". */
  youtubeId: string
  /** Accessible title for the dialog and the iframe. */
  title: string
  /** Short line under the player. */
  description?: string
  /** Analytics location for the open event. */
  location: string
  /** Custom trigger content; defaults to a play pill with the title. */
  children?: ReactNode
  triggerClassName?: string
}

/**
 * Plays a YouTube interview in place, in a shadcn Dialog. The iframe only
 * mounts while the dialog is open (nothing loads from YouTube until a click),
 * and it unmounts on close so playback stops.
 */
export function VideoDialog({
  youtubeId,
  title,
  description,
  location,
  children,
  triggerClassName,
}: VideoDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) trackCTAClick(`play ${title}`, location)
        setOpen(next)
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            'group/play inline-flex h-10 items-center gap-2.5 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50',
            triggerClassName,
          )}
        >
          {children ?? (
            <>
              <span className="grid size-8 place-items-center rounded-full border border-white/15 bg-white/[0.04] transition-colors group-hover/play:border-white/30 group-hover/play:bg-white/[0.08]">
                <Play
                  aria-hidden="true"
                  className="size-3 translate-x-px fill-current"
                />
              </span>
              {title}
            </>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="top-1/2 w-[calc(100vw-2rem)] max-w-4xl -translate-y-1/2 gap-4 overflow-visible border-white/10 bg-background p-3 sm:p-4">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {/* Visible close: once the player autoplays, focus lives inside the
            YouTube iframe and Escape no longer reaches the dialog. */}
        <DialogClose
          aria-label="Close video"
          className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full border border-white/15 bg-background/80 text-foreground backdrop-blur-md transition-colors hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <X aria-hidden="true" className="size-4" />
        </DialogClose>
        {description ? (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        ) : null}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
          {open ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}
        </div>
        {description ? (
          <p aria-hidden="true" className="px-1 pb-1 text-[13px] text-subtle">
            {description}
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

export default VideoDialog
