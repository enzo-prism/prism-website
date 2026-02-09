import Image from "next/image"
import type { ComponentProps } from "react"

type AsciiIconProps = Omit<ComponentProps<typeof Image>, "src" | "alt" | "width" | "height"> & {
  src: string
  alt: string
  size?: number
}

export default function AsciiIcon({
  src,
  alt,
  size = 20,
  className,
  unoptimized = true,
  ...props
}: AsciiIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      // Pixel art looks worse when Next generates small resized variants
      // (anti-aliased edges). For ASCII/pixel icons, ship the original asset
      // and let the browser scale with `image-rendering: pixelated`.
      unoptimized={unoptimized}
      className={
        [
          "h-auto w-auto",
          // Keep ASCII/pixel art crisp at small sizes.
          "[image-rendering:pixelated]",
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
      {...props}
    />
  )
}
