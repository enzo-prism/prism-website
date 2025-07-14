"use client"

import React from 'react';
import { useState } from "react"
import Image from "next/image"
import { Play, AlertCircle } from "lucide-react"

interface YouTubeVideoEmbedProps {
  videoId: string
  title: string
  className?: string
  showThumbnail?: boolean
}

export default function YouTubeVideoEmbed({ 
  videoId, 
  title, 
  className = "", 
  showThumbnail = true 
}: YouTubeVideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false);

  const handlePlayClick = () => {
    setIsLoaded(true);
    // Force reload if needed
    setTimeout(() => {
      const iframe = document.getElementById(`youtube-${videoId}`) as HTMLIFrameElement | null;
      if (!iframe?.contentWindow) {
        setHasError(true);
      }
    }, 2000);
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  if (hasError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <AlertCircle className="inline-block mr-2" />
        <span>Video failed to load. Watch it on <a href={`https://youtu.be/${videoId}`} target="_blank" rel="noopener noreferrer" className="underline">YouTube</a>.</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md ${className}`}
      style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}
    >
      {showThumbnail && !isLoaded ? (
        <>
          {/* Thumbnail with play button overlay */}
          <div className="absolute inset-0 cursor-pointer" onClick={handlePlayClick}>
            <Image
              src={thumbnailUrl}
              alt={`${title} - Video thumbnail`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity hover:bg-opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-red-600 bg-opacity-90 p-4 shadow-lg transition-transform hover:scale-110">
                <Play className="h-8 w-8 text-white ml-1" fill="white" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <iframe
          id={`youtube-${videoId}`}
          className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
