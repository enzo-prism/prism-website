// This module is server-side only, responsible for fetching and parsing blog content.
import "server-only" // Ensures this module only runs on the server
import React from "react"
import fs from "fs/promises" // Node.js file system module for server-side operations
import path from "path" // Node.js path module for server-side path manipulation
import matter from "gray-matter" // For parsing frontmatter from .mdx files
import { MDXRemote } from "next-mdx-remote"

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  category: string
  image: string
  gradientClass: string
  openGraph?: Record<string, any>
  twitter?: Record<string, any>
  canonical?: string
}

const BLOG_PATH = "content/blog" // Relative path to blog content

/**
 * Fetches and parses a single blog post by its slug. Server-side only.
 */
async function _getPost(slug: string): Promise<{ frontmatter: BlogFrontmatter; content: string } | null> {
  // Construct the full path to the .mdx file on the server
  const filePath = path.join(BLOG_PATH, `${slug}.mdx`)
  try {
    // Read the file content using fs.readFile (server-side)
    const rawFileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(rawFileContent)
    return { frontmatter: data as BlogFrontmatter, content }
  } catch (error) {
    console.error(`[MDXLib] Failed to get post "${slug}" from "${filePath}":`, error)
    return null
  }
}

/**
 * Fetches and parses all blog posts. Server-side only.
 */
async function _getAllPosts(): Promise<Array<{ slug: string } & BlogFrontmatter> | null> {
  try {
    // Read the list of files in the blog directory (server-side)
    const files = await fs.readdir(BLOG_PATH)
    const mdxFiles = files.filter((fileName) => fileName.endsWith(".mdx"))

    if (mdxFiles.length === 0) {
      console.warn(`[MDXLib] No .mdx files found in ${BLOG_PATH}`)
      return []
    }

    const postsData = await Promise.all(
      mdxFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "")
        const post = await getPost(slug) // Uses the un-cached version
        return post ? { slug, ...post.frontmatter } : null
      }),
    )

    const validPosts = postsData.filter(Boolean) as Array<{ slug: string } & BlogFrontmatter>

    if (validPosts.length === 0 && mdxFiles.length > 0) {
      console.warn(
        `[MDXLib] MDX files were found in ${BLOG_PATH}, but no valid posts could be processed. Check _getPost errors above.`,
      )
    }

    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`[MDXLib] Failed to get all posts from "${BLOG_PATH}":`, error)
    return null
  }
}

export const getPost = _getPost
export const getAllPosts = _getAllPosts

/**
 * Prepares the raw HTML-like content from the .mdx file for rendering.
 * This function returns a React element that uses dangerouslySetInnerHTML
 * to render the HTML content from the post.
 */
export async function renderPost(slug: string) {
  const post = await getPost(slug) // This function relies on fs operations

  if (!post || typeof post.content !== "string") {
    console.error(`[MDXLib] Post "${slug}" not found or content is invalid for renderPost.`)
    throw new Error(`Post "${slug}" not found or content is invalid.`)
  }

  // The post.content is the string directly from the .mdx file (after frontmatter).
  // This string contains HTML tags with Tailwind classes.
  let cleanedContent = post.content
  
  // Remove import statements which are not valid in HTML
  cleanedContent = cleanedContent.replace(/^import\s+.*$/gm, '')
  
  // Clean up common inline styles and standardize elements
  // Convert class to className for React compatibility
  cleanedContent = cleanedContent.replace(/\sclass="/g, ' className="')
  
  // Remove inline text size classes from paragraphs (will be handled by prose-blog)
  cleanedContent = cleanedContent.replace(/<p\s+className="[^"]*text-lg[^"]*">/g, '<p>')
  cleanedContent = cleanedContent.replace(/<p\s+className="[^"]*leading-relaxed[^"]*">/g, '<p>')
  
  // Standardize heading elements (remove inline size classes)
  cleanedContent = cleanedContent.replace(/<h([1-6])\s+className="[^"]*text-\w+[^"]*">/g, '<h$1>')
  cleanedContent = cleanedContent.replace(/<h([1-6])\s+className="[^"]*font-\w+[^"]*">/g, '<h$1>')
  
  // Standardize list classes (remove inline spacing)
  cleanedContent = cleanedContent.replace(/<ul\s+className="[^"]*space-y-\d+[^"]*">/g, '<ul>')
  cleanedContent = cleanedContent.replace(/<ol\s+className="[^"]*space-y-\d+[^"]*">/g, '<ol>')
  cleanedContent = cleanedContent.replace(/<ul\s+className="[^"]*list-disc[^"]*">/g, '<ul>')
  cleanedContent = cleanedContent.replace(/<ol\s+className="[^"]*list-decimal[^"]*">/g, '<ol>')
  
  // Clean up common margin/padding utilities that conflict with prose styling
  cleanedContent = cleanedContent.replace(/\s(mt|mb|my|pt|pb|py)-\d+/g, '')
  
  // Preserve special components like CTAs and embedded content
  // These will keep their styling as they're intentionally designed

  // Convert <YouTubeVideoEmbed> tags to thumbnail-first iframe embeds
  cleanedContent = cleanedContent.replace(
    /<YouTubeVideoEmbed\s+videoId="([^"]+)"\s+title="([^"]+)"(?:\s+className="([^"]*)")?\s*\/>/g,
    (_match, videoId, title, className = "") => {
      const containerClass = `relative overflow-hidden rounded-xl shadow-md ${className}`.trim()
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      
      return `
        <div class="${containerClass}" style="padding-bottom:56.25%" data-youtube-embed="${videoId}">
          <div class="youtube-thumbnail absolute inset-0 cursor-pointer">
            <img 
              src="${thumbnailUrl}" 
              alt="${title} - Video thumbnail" 
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="rounded-full bg-red-600 bg-opacity-90 p-4 shadow-lg hover:scale-110 transition-transform">
                <svg class="h-8 w-8 text-white ml-1" fill="white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            const thumbnails = document.querySelectorAll('[data-youtube-embed] .youtube-thumbnail');
            thumbnails.forEach(function(thumbnail) {
              thumbnail.addEventListener('click', function() {
                const container = this.parentElement;
                const videoId = container.getAttribute('data-youtube-embed');
                const iframe = document.createElement('iframe');
                iframe.className = 'absolute top-0 left-0 w-full h-full border-0 rounded-xl';
                iframe.src = 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&autoplay=1';
                iframe.title = '${title}';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                container.innerHTML = '';
                container.appendChild(iframe);
              });
            });
          });
        </script>
      `.replace(/\s+/g, ' ').trim()
    }
  )
  
  // Remove trailing ``` if present
  if (cleanedContent.trimEnd().endsWith("```")) {
    cleanedContent = cleanedContent.substring(0, cleanedContent.lastIndexOf("```"))
  }
  
  // Trim any leading/trailing whitespace
  cleanedContent = cleanedContent.trim()
  
  return <div dangerouslySetInnerHTML={{ __html: cleanedContent }} />
}
