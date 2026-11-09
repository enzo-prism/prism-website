import type { ReactNode } from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import styles from './app-page.module.css'

type AppPhoneProps = {
  /** A 780x1695 capture. Omit and pass children to stack several screens. */
  src?: string
  alt?: string
  sizes?: string
  priority?: boolean
  className?: string
  /** Adds the band of light that crosses the glass as the page scrolls. */
  glare?: boolean
  children?: ReactNode
}

/** iPhone drawn in CSS. Every dimension is relative to its own width. */
export function AppPhone({
  src,
  alt = '',
  sizes = '320px',
  priority = false,
  className,
  glare = false,
  children,
}: AppPhoneProps) {
  return (
    <figure className={cn(styles.phone, className)}>
      <div className={styles.phoneShell}>
        <span aria-hidden="true" className={styles.phoneButtonLeftTop} />
        <span aria-hidden="true" className={styles.phoneButtonLeftBottom} />
        <span aria-hidden="true" className={styles.phoneButtonRight} />
        <div className={styles.phoneBezel}>
          <div className={styles.phoneScreen}>
            {src ? (
              <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover object-top"
              />
            ) : (
              children
            )}
            <span aria-hidden="true" className={styles.phoneIsland} />
            {glare ? (
              <span aria-hidden="true" className={styles.phoneGlare} />
            ) : null}
          </div>
        </div>
      </div>
    </figure>
  )
}

export default AppPhone
