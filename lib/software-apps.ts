export type SoftwareApp = {
  title: string
  description: string
  platform?: string
  href: string
  hrefLabel: string
  icon: {
    src: string
    alt: string
    size: number
  }
}

export const PRISM_APPS: SoftwareApp[] = [
  {
    title: "Density",
    description: "Track posting frequency and learn from performance trends",
    platform: "YouTube",
    href: "https://density.report",
    hrefLabel: "density.report",
    icon: {
      src: "/pixelish/bar-chart-average.svg",
      alt: "Density app icon",
      size: 6,
    },
  },
  {
    title: "Hot Content",
    description: "Test how viral video ideas are BEFORE you start shooting.",
    platform: "YouTube",
    href: "https://hotcontent.app",
    hrefLabel: "hotcontent.app",
    icon: {
      src: "/pixelish/media-play.svg",
      alt: "Hot Content app icon",
      size: 6,
    },
  },
  {
    title: "Engineering Tracker",
    description: "Track new code Prism is publishing",
    href: "https://enzo.engineering",
    hrefLabel: "enzo.engineering",
    icon: {
      src: "/pixelish/command.svg",
      alt: "Engineering Tracker app icon",
      size: 6,
    },
  },
]
