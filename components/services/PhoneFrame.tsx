import Image from 'next/image'

import { cn } from '@/lib/utils'

type PhoneFrameProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * A minimal phone shell around a real mobile capture. The captures in
 * public/case-studies/ are 780x1688 (a 390x844 viewport at 2x).
 */
export function PhoneFrame({
  src,
  alt,
  className,
  sizes = '(min-width: 1024px) 220px, 30vw',
  priority = false,
}: PhoneFrameProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-[2rem] border border-white/15 bg-popover p-[5px] shadow-[0_40px_90px_-30px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/10%)_inset]',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-background">
        <Image
          src={src}
          alt={alt}
          width={780}
          height={1688}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-[14px] w-[34%] -translate-x-1/2 rounded-full bg-black"
        />
      </div>
    </figure>
  )
}

export default PhoneFrame
