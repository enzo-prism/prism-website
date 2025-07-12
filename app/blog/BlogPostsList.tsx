'use client'

import { useState, useMemo } from 'react'
import BlogPostCard from '@/components/blog-post-card'
import type { BlogFrontmatter } from "@/lib/mdx"

interface BlogPost extends BlogFrontmatter {
  slug: string
  featured?: boolean
  compact?: boolean
}

export default function BlogPostsList({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(() => {
    const unique = new Set(posts.map(p => p.category))
    return ['All', ...Array.from(unique)]
  }, [posts])

  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory)

  return (
    <section className="px-4 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Filter buttons */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-neutral-900 text-white' 
                  : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                title={post.title}
                category={post.category}
                date={post.date}
                description={post.description}
                slug={post.slug}
                image={post.image}
                featured={post.featured}
                gradientClass={post.gradientClass}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-neutral-200 rounded-lg">
            <h3 className="text-xl font-medium text-neutral-600 lowercase mb-2">no posts found</h3>
            <p className="text-neutral-500 lowercase">
              there are no posts in this category yet. check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  )
} 