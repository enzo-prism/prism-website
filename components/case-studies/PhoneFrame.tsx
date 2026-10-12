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
 * Phone-shaped frame for the 780x1688 mobile captures in
 * public/case-studies/. Pairs with BrowserFrame on case study heroes.
 */
export function PhoneFrame({
  src,
  alt,
  className,
  sizes = '(min-width: 1024px) 240px, 28vw',
  priority = false,
}: PhoneFrameProps) {
  return (
    <figure
      className={cn(
        'relative rounded-[1.6rem] border border-white/[0.12] bg-popover p-[5px] shadow-[0_40px_80px_-24px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/8%)_inset] sm:rounded-[2.1rem] sm:p-[7px]',
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.25rem] bg-background sm:rounded-[1.65rem]">
        <Image
          src={src}
          alt={alt}
          width={780}
          height={1688}
          sizes={sizes}
          priority={priority}
          className="block aspect-[390/844] h-auto w-full object-cover object-top"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[1.6%] h-[2.6%] w-[30%] -translate-x-1/2 rounded-full bg-black/90"
        />
      </div>
    </figure>
  )
}

export default PhoneFrame
