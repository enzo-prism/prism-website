import Image from "next/image"
import type { ComponentProps } from "react"

type PixelishIconProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "alt" | "width" | "height"
> & {
  src: string
  alt: string
  size?: number
  /**
   * Pixelish SVGs ship with black fills. Invert them for our dark UI.
   * Set `invert={false}` when rendering on a light surface.
   */
  invert?: boolean
}

export default function PixelishIcon({
  src,
  alt,
  size = 20,
  invert = true,
  className,
  unoptimized = true,
  ...props
}: PixelishIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized={unoptimized}
      className={["h-auto w-auto", invert ? "invert" : null, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}

