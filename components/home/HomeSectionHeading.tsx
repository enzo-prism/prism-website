import { cn } from '@/lib/utils'

type HomeSectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export default function HomeSectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  id,
}: HomeSectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={cn('space-y-5', centered && 'mx-auto text-center', className)}
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(41,37,36,0.44)]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="max-w-[12ch] text-balance font-sans text-[clamp(2rem,4.1vw,3.3rem)] font-medium leading-[1] tracking-[-0.055em] text-[#171412]"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-[42rem] text-balance font-sans text-[1.02rem] leading-8 text-[rgba(41,37,36,0.66)] sm:text-[1.08rem]',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
