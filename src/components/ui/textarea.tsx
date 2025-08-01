import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[120px] w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-400 backdrop-blur-sm transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-gray-800/70",
        "hover:border-gray-600 hover:bg-gray-800/70",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-900/50",
        "resize-vertical",
        "transform focus:scale-[1.01] transition-transform duration-150",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
