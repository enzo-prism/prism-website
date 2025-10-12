import { cn } from "@/lib/utils"
import { FREE_AUDIT_CTA_TEXT } from "@/lib/constants"

export const MDXComponents = {
  // Typography components
  Lead: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={cn("text-lg leading-relaxed text-neutral-700 dark:text-neutral-300", className)}>
      {children}
    </p>
  ),
  
  // List components
  CheckList: ({ children }: { children: React.ReactNode }) => (
    <ul className="space-y-3 my-6">
      {children}
    </ul>
  ),
  
  CheckItem: ({ children }: { children: React.ReactNode }) => (
    <li className="flex gap-3">
      <span className="text-green-500 mt-0.5">✓</span>
      <span>{children}</span>
    </li>
  ),
  
  // Callout/highlight boxes
  Callout: ({ 
    children, 
    type = "info" 
  }: { 
    children: React.ReactNode; 
    type?: "info" | "warning" | "success" | "error" 
  }) => {
    const styles = {
      info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
      warning: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800",
      success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
      error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
    }
    
    return (
      <div className={cn("p-4 my-6 border rounded-lg", styles[type])}>
        {children}
      </div>
    )
  },
  
  // Section divider
  Divider: () => <hr className="my-12 border-neutral-200 dark:border-neutral-800" />,
  
  // CTA component
  BlogCTA: ({ 
    title, 
    description, 
    buttonText,
    href = "/get-started" 
  }: { 
    title: string; 
    description: string; 
    buttonText?: string;
    href?: string;
  }) => (
    <div className="my-12 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <h3 className="text-xl font-bold mb-2 lowercase">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 lowercase">{description}</p>
      <a 
        href={href}
        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900 lowercase"
      >
        {href?.startsWith("/get-started") ? FREE_AUDIT_CTA_TEXT : buttonText ?? FREE_AUDIT_CTA_TEXT}
      </a>
    </div>
  ),
  
  // Video embed component
  VideoEmbed: ({ 
    src, 
    title 
  }: { 
    src: string; 
    title: string;
  }) => (
    <div className="my-12">
      <div className="relative overflow-hidden rounded-xl shadow-md" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  ),
  
  // Grid layout for comparison or features
  Grid: ({ 
    children, 
    cols = 2 
  }: { 
    children: React.ReactNode; 
    cols?: 2 | 3 | 4;
  }) => (
    <div className={cn(
      "grid gap-4 my-6",
      cols === 2 && "md:grid-cols-2",
      cols === 3 && "md:grid-cols-3",
      cols === 4 && "md:grid-cols-4"
    )}>
      {children}
    </div>
  ),
  
  // Card component for grid items
  Card: ({ 
    title, 
    children 
  }: { 
    title?: string; 
    children: React.ReactNode;
  }) => (
    <div className="border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg">
      {title && <h4 className="font-semibold mb-2 lowercase">{title}</h4>}
      <div className="text-neutral-600 dark:text-neutral-400">{children}</div>
    </div>
  ),
}

export default MDXComponents
