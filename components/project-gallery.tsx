"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { trackCTAClick } from "@/utils/analytics"
import { Button } from "@/components/ui/button"

export interface GalleryItem {
  id: string
  title: string
  image: string
  url: string
  category: string
}

interface ProjectGalleryProps {
  items: GalleryItem[]
  type: "websites" | "apps" | "designs"
}

export default function ProjectGallery({ items, type }: ProjectGalleryProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (itemId: string) => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
          <div
            className="relative aspect-[4/3] overflow-hidden"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Image
              src={
                imageErrors[item.id]
                  ? `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(item.title)}`
                  : item.image
              }
              alt={item.title}
              width={400}
              height={300}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => handleImageError(item.id)}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${btoa(
                `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="#f3f4f6" /></svg>`,
              )}`}
            />

            {/* Overlay that appears on hover */}
            <div
              className={`absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
                hoveredItem === item.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <h3 className="text-white text-xl font-medium lowercase mb-2">{item.title}</h3>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold lowercase mb-2">{item.title}</h3>
            <p className="text-neutral-600 lowercase mb-4">{item.category}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick(`open ${type} app`, item.title)}
              className="inline-block"
            >
              <Button className="rounded-full lowercase">
                open app <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
