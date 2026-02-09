import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-none border border-foreground/40 bg-background/70 px-2.5 py-1 text-[10px] font-semibold !uppercase text-foreground transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 font-pixel-accent tracking-[0.16em] shadow-[0_0_0_1px_rgba(34,197,94,0.12)]",
  {
    variants: {
      variant: {
        default:
          "border-primary/60 bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "border-secondary/60 bg-secondary/40 text-secondary-foreground hover:bg-secondary/60",
        destructive:
          "border-destructive/60 bg-destructive/10 text-destructive-foreground hover:bg-destructive/20",
        outline: "border-foreground/40 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
