import Link from "next/link"

import PixelishIcon from "@/components/pixelish/PixelishIcon"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { SoftwareApp } from "@/lib/software-apps"

type SoftwareAppCardsProps = {
  apps: SoftwareApp[]
  cardClassName?: string
  buttonClassName?: string
}

export default function SoftwareAppCards({
  apps,
  cardClassName = "",
  buttonClassName = "",
}: SoftwareAppCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:gap-7">
      {apps.map((app) => (
        <Card
          key={app.title}
          className={`group relative overflow-hidden border-border/60 bg-card/90 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl ${cardClassName}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_100%_at_0%_0%,hsl(var(--primary)/0.14)_0%,transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <CardHeader className="relative z-10 space-y-5 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/80 bg-background/95 shadow-sm ring-1 ring-border/50">
                <div className="absolute inset-1 rounded-xl border border-border/50 bg-muted/30" />
                <PixelishIcon
                  src={app.icon.src}
                  alt={app.icon.alt}
                  size={app.icon.size}
                  aria-hidden="true"
                  className="relative h-10 w-10 origin-center scale-[0.1] opacity-95"
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/80" aria-hidden="true" />
                {app.platform ?? "Prism app"}
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl tracking-tight text-foreground">{app.title}</CardTitle>
              <CardDescription className="max-w-[48ch] text-base leading-relaxed text-muted-foreground">
                {app.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="relative z-10 mt-auto pt-2">
            <Button
              asChild
              variant="outline"
              className={`w-full justify-between rounded-xl border-border/70 bg-background/80 px-4 text-sm font-medium transition-all duration-300 group-hover:border-primary/40 group-hover:bg-background ${buttonClassName}`}
            >
              <Link href={app.href} target="_blank" rel="noopener noreferrer">
                <span>{app.hrefLabel}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
