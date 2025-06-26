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
        url: "/favicon-rounded.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-rounded.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon-rounded.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  generator: "v0.dev",
  metadataBase: new URL("https://design-prism.com"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(
            function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M37LLWHV');`
          }}
        />
        {/* End Google Tag Manager */}
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
        {/* YouTube Embed Handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
      function initYouTubeEmbeds() {
        const thumbnails = document.querySelectorAll('[data-youtube-embed] .youtube-thumbnail');
        thumbnails.forEach(function(thumbnail) {
          // Remove any existing click listeners to prevent duplicates
          const newThumbnail = thumbnail.cloneNode(true);
          thumbnail.parentNode.replaceChild(newThumbnail, thumbnail);
          
          newThumbnail.addEventListener('click', function() {
            const container = this.parentElement;
            const videoId = container.getAttribute('data-youtube-embed');
            const videoTitle = container.getAttribute('data-youtube-title') || 'YouTube video';
            
            const iframe = document.createElement('iframe');
            iframe.className = 'absolute top-0 left-0 w-full h-full border-0 rounded-xl';
            iframe.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&autoplay=1';
            iframe.title = videoTitle;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            
            container.innerHTML = '';
            container.appendChild(iframe);
          });
        });
      }
      
      // Initialize on page load
      document.addEventListener('DOMContentLoaded', initYouTubeEmbeds);
      
      // Re-initialize when content changes (for dynamic content)
      if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
              // Delay to allow DOM to settle
              setTimeout(initYouTubeEmbeds, 100);
            }
          });
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    `,
          }}
        />
        {/* Preconnect to Vimeo for faster video loading */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
        <link rel="dns-prefetch" href="https://f.vimeocdn.com" />
        {/* Preconnect to YouTube for faster video loading */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
      </head>
      {/* You can also apply inter.className directly to body if preferred,
        but applying to html covers the entire document.
        The existing font-sans class from Tailwind will then use this font
        if tailwind.config.ts is updated accordingly.
    */}
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M37LLWHV" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
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
