"use client"

import { Twitter, Linkedin, Facebook, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SocialShareProps {
  url: string
  title: string
  description?: string
  imageUrl?: string
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-neutral-50 rounded-lg">
      <h3 className="text-lg font-medium lowercase">share this case study</h3>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => window.open(shareUrls.twitter, "_blank")}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => window.open(shareUrls.linkedin, "_blank")}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => window.open(shareUrls.facebook, "_blank")}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>
      {copied && (
        <p className="text-sm text-green-600 lowercase">link copied to clipboard!</p>
      )}
    </div>
  )
}