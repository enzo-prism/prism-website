import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ScrollManager from "@/components/scroll-manager"
// Import the schema components
import { OrganizationSchema, WebsiteSchema } from "@/components/schema-markup"
import HotjarScript from "@/components/hotjar-script"

export const metadata: Metadata = {
  title: {
    template: "%s | prism",
    default: "prism",
  },
  description: "digital agency creating websites, apps, and designs that shatter revenue goals and delight customers.",
  openGraph: {
    title: "prism",
    description:
      "digital agency creating websites, apps, and designs that shatter revenue goals and delight customers.",
    url: "https://prism.agency",
    siteName: "prism",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "prism - digital agency creating websites, apps, and designs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "prism",
    description:
      "digital agency creating websites, apps, and designs that shatter revenue goals and delight customers.",
    images: ["/prism-opengraph.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon-small.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-large.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon-large.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        {/* Add mobile-specific meta tags for better scrolling */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#ffffff" />
        {/* <!-- Google tag (gtag.js) --> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9B141WTH4R"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9B141WTH4R');
      `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <OrganizationSchema />
        <WebsiteSchema />
        <ScrollManager />
        <HotjarScript />
        {/* existing components */}
        {children}
      </body>
    </html>
  )
}
