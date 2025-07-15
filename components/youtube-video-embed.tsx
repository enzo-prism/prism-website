"use client"

import React from 'react';

interface YouTubeVideoEmbedProps {
  videoId: string
  title: string
  className?: string
}

export default function YouTubeVideoEmbed({ 
  videoId, 
  title, 
  className = "" 
}: YouTubeVideoEmbedProps) {
  return (
    <div 
      className={`relative w-full ${className}`} 
      style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl border-0"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}