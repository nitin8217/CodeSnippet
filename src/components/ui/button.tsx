import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl active:shadow-md transform hover:scale-105 transition-all duration-150 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl active:shadow-md transform hover:scale-105 transition-all duration-150 active:scale-95",
        outline:
          "border border-gray-700 bg-gray-800/50 text-gray-100 shadow-md hover:bg-gray-700/70 hover:border-gray-600 hover:shadow-lg active:shadow-sm transform hover:scale-105 transition-all duration-150 active:scale-95 backdrop-blur-sm",
        secondary:
          "bg-gray-800 text-gray-100 shadow-md hover:bg-gray-700 hover:shadow-lg active:shadow-sm transform hover:scale-105 transition-all duration-150 active:scale-95",
        ghost:
          "text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-150 hover:shadow-md rounded-lg active:bg-gray-800/70 active:scale-95",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 transition-colors duration-150 active:text-blue-500",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
