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
          <AlertTriangle className="mx-auto mb-5 size-10 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="text-heading mb-3 text-foreground">
            {isMDXError ? 'Blog post failed to load' : 'Something went wrong'}
          </h2>
          <p className="text-pretty text-muted-foreground">
            {isMDXError 
              ? 'There was an error loading this blog post. Please try again or go back to the blog list.'
              : 'We encountered an unexpected error. Please try refreshing the page.'
            }
          </p>
        </div>
        
        <div className="space-y-3">
          <Button onClick={retry}>
            <RefreshCw />
            Try again
          </Button>
          
          <div>
            <Link
              href="/blog"
              className="inline-flex min-h-10 items-center rounded-full px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to blog
            </Link>
          </div>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-subtle hover:text-foreground">
              Error Details (Development)
            </summary>
            <pre className="mt-2 overflow-auto rounded-xl border border-white/[0.08] bg-card p-3 text-left font-mono text-xs text-muted-foreground">
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
        <div>
          <div className="my-8 rounded-2xl border border-destructive/30 bg-destructive/[0.06] p-6">
            <div className="flex items-start">
              <AlertTriangle className="mr-3 mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Failed to render blog content
                </h3>
                <p className="mb-4 text-muted-foreground">
                  There was an error processing the blog post content. This might be due to invalid 
                  formatting or a temporary issue.
                </p>
                <Button onClick={retry} variant="outline" size="sm">
                  <RefreshCw />
                  Retry loading
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
        <section className="py-8 md:py-12">
          <div className="prism-container">
            <div className="rounded-3xl border border-dashed border-white/15 bg-card py-16 text-center">
              <AlertTriangle className="mx-auto mb-4 size-10 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mb-2 text-xl font-medium text-foreground">
                Failed to load blog posts
              </h3>
              <p className="mb-6 text-muted-foreground">
                We couldn't load the blog posts right now. Please try again.
              </p>
              <Button onClick={retry} variant="outline">
                <RefreshCw />
                Retry loading
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
