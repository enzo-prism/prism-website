"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

type ToggleContextValue = Pick<VariantProps<typeof toggleVariants>, "variant" | "size">

const ToggleGroupContext = React.createContext<ToggleContextValue>({
  variant: "default",
  size: "default",
})

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  ToggleContextValue & {
    wrap?: boolean
  }

function ToggleGroup({ className, variant, size, children, wrap = true, ...props }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md",
        wrap && "flex-wrap",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>

function ToggleGroupItem({ className, variant, size, children, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)

  const resolvedVariant = context.variant ?? variant
  const resolvedSize = context.size ?? size

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        toggleVariants({
          variant: resolvedVariant,
          size: resolvedSize,
        }),
        "shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
