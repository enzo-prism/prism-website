import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border border-foreground/30 bg-background/70 text-xs font-semibold !uppercase leading-none text-foreground ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-pixel tracking-[0.14em] select-none shadow-[0_0_0_1px_rgba(34,197,94,0.12)] hover:bg-foreground/10 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary/60 bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(34,197,94,0.3)] hover:bg-primary/20 hover:text-primary-foreground",
        destructive:
          "border-destructive/60 bg-destructive/10 text-destructive-foreground hover:bg-destructive/20",
        outline:
          "border-foreground/40 bg-transparent text-foreground hover:bg-foreground/10 hover:text-foreground",
        inverted:
          "border-foreground bg-foreground text-background shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:bg-foreground/90",
        "outline-inverted":
          "border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white focus-visible:bg-white/20 focus-visible:text-white focus-visible:ring-white/60 active:bg-white/20 active:text-white",
        secondary:
          "border-secondary/60 bg-secondary/40 text-secondary-foreground hover:bg-secondary/60",
        ghost: "border-transparent hover:bg-foreground/10 hover:text-foreground",
        link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 px-2 text-[10px]",
        sm: "h-9 px-3",
        lg: "h-11 px-8 text-sm",
        icon: "h-10 w-10",
        "icon-xs": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
