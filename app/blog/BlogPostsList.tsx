'use client'

import { useState, useMemo } from 'react'
import BlogPostCard from '@/components/blog-post-card'
import { AnimatedBlogGridWithObserver } from '@/components/animated-blog-grid'
import AnimatedFilterButtons from '@/components/animated-filter-buttons'
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
        {/* Enhanced animated filter buttons */}
        <AnimatedFilterButtons
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {filteredPosts.length > 0 ? (
          <AnimatedBlogGridWithObserver posts={filteredPosts}>
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
          </AnimatedBlogGridWithObserver>
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