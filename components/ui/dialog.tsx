"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = DialogPrimitive.Overlay

const DialogContent = ({ className, ...props }: DialogPrimitive.DialogContentProps) => (
  <DialogPortal>
    <DialogOverlay className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-[12vh] z-50 flex w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl outline-hidden transition-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 sm:top-1/2 sm:max-h-[85vh] sm:-translate-y-1/2",
        "max-h-[80vh] flex-col overflow-hidden sm:w-full",
        className
      )}
      {...props}
    />
  </DialogPortal>
)

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-3 text-center sm:text-left", className)} {...props} />
)

DialogHeader.displayName = "DialogHeader"

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <DialogPrimitive.Title
    className={cn("text-xl font-medium tracking-tight text-neutral-900 sm:text-2xl", className)}
    {...props}
  />
)

DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-neutral-600", className)}
    {...props}
  />
)

DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
