"use client"

import type { ImgHTMLAttributes } from "react"

type PixelishImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
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

export default function PixelishImg({
  src,
  alt,
  size = 20,
  invert = true,
  className,
  ...props
}: PixelishImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={["h-auto w-auto", invert ? "invert" : null, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
}

