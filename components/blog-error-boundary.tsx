"use client"

import React from "react"
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface BlogErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface BlogErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class BlogErrorBoundary extends React.Component<
  BlogErrorBoundaryProps,
  BlogErrorBoundaryState
> {
  constructor(props: BlogErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): BlogErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Log error for debugging
    console.error('Blog Error Boundary caught an error:', error, errorInfo)
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <this.props.fallback error={this.state.error!} retry={this.retry} />
      }

      return <BlogErrorFallback error={this.state.error!} retry={this.retry} />
    }

    return this.props.children
  }
}

// Default error fallback component
function BlogErrorFallback({ error, retry }: { error: Error; retry: () => void }) {
  const isMDXError = error.message.includes('MDX') || error.message.includes('blog post')
  
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 lowercase mb-2">
            {isMDXError ? 'blog post failed to load' : 'something went wrong'}
          </h2>
          <p className="text-neutral-600 lowercase">
            {isMDXError 
              ? 'there was an error loading this blog post. please try again or go back to the blog list.'
              : 'we encountered an unexpected error. please try refreshing the page.'
            }
          </p>
        </div>
        
        <div className="space-y-3">
          <Button onClick={retry} className="lowercase bg-neutral-900 text-white hover:bg-neutral-800">
            <RefreshCw />
            try again
          </Button>
          
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors lowercase"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              back to blog
            </Link>
          </div>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-3 bg-neutral-100 rounded text-xs overflow-auto text-left">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

// Specialized error boundary for blog post content
export function BlogPostErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <BlogErrorBoundary
      fallback={({ error, retry }) => (
        <div className="prose-blog">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 lowercase mb-2">
                  failed to render blog content
                </h3>
                <p className="text-red-700 lowercase mb-4">
                  there was an error processing the blog post content. this might be due to invalid 
                  formatting or a temporary issue.
                </p>
                <Button onClick={retry} variant="destructive" size="sm" className="lowercase">
                  <RefreshCw />
                  retry loading
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      onError={(error, errorInfo) => {
        // Track MDX rendering errors specifically
        console.error('Blog post content rendering failed:', {
          error: error.message,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString()
        })
      }}
    >
      {children}
    </BlogErrorBoundary>
  )
}

// Error boundary for blog post lists
export function BlogListErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <BlogErrorBoundary
      fallback={({ error, retry }) => (
        <section className="px-4 py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center py-16 border border-dashed border-red-200 rounded-lg bg-red-50">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-red-900 lowercase mb-2">
                failed to load blog posts
              </h3>
              <p className="text-red-700 lowercase mb-6">
                we couldn't load the blog posts right now. please try again.
              </p>
              <Button onClick={retry} variant="destructive" className="lowercase">
                <RefreshCw />
                retry loading
              </Button>
            </div>
          </div>
        </section>
      )}
    >
      {children}
    </BlogErrorBoundary>
  )
}
