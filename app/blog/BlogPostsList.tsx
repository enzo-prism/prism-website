'use client'

import BlogFilterNavigation from '@/components/blog-filter-navigation'
import SimpleBlogGrid from '@/components/simple-blog-grid'
import SimpleBlogPostCard from '@/components/simple-blog-post-card'
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

  return (
    <>
      {/* Filter Navigation */}
      <BlogFilterNavigation
        categories={categories}
        posts={posts}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onFilteredPostsChange={setFilteredPosts}
      />

      {/* Blog Posts Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          {filteredPosts.length > 0 ? (
            <SimpleBlogGrid posts={filteredPosts}>
              {filteredPosts.map((post) => (
                <SimpleBlogPostCard
                  key={post.slug}
                  title={post.title}
                  category={post.category}
                  date={post.date}
                  description={post.description}
                  slug={post.slug}
                  image={post.image || '/blog/ai-digital-marketing.png'}
                  featured={post.featured}
                  gradientClass={post.gradientClass}
                />
              ))}
            </SimpleBlogGrid>
          ) : (
            <div className="text-center py-16 border border-dashed border-neutral-200 rounded-lg">
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