'use client'

import { AnimatedBlogGridWithObserver } from '@/components/animated-blog-grid'
import BlogFilterNavigation from '@/components/blog-filter-navigation'
import BlogPostCard from '@/components/blog-post-card'
import MobileBlogGrid from '@/components/mobile-blog-grid'
import MobileBlogPostCard from '@/components/mobile-blog-post-card'
import { useMobile } from '@/hooks/use-mobile'
import type { BlogFrontmatter } from "@/lib/mdx"
import { useMemo, useState } from 'react'

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
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const isMobile = useMobile()

  return (
    <>
      {/* New Filter Navigation */}
      <BlogFilterNavigation
        categories={categories}
        posts={posts}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onFilteredPostsChange={setFilteredPosts}
      />

      {/* Blog Posts Section */}
      <section className="px-4 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          {filteredPosts.length > 0 ? (
            isMobile ? (
              <MobileBlogGrid posts={filteredPosts}>
                {filteredPosts.map((post) => (
                  <MobileBlogPostCard
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
              </MobileBlogGrid>
            ) : (
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
            )
          ) : (
            <div className={`text-center py-16 border border-dashed border-neutral-200 rounded-lg ${
              isMobile ? 'mx-4' : ''
            }`}>
              <h3 className="text-xl font-medium text-neutral-600 lowercase mb-2">no posts found</h3>
              <p className="text-neutral-500 lowercase">
                try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
} 