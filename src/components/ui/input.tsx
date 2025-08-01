import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-sm text-gray-100 placeholder:text-gray-400 backdrop-blur-sm transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-gray-800/70",
        "hover:border-gray-600 hover:bg-gray-800/70",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-900/50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-100",
        "transform focus:scale-[1.02] transition-transform duration-150",
        className
      )}
      {...props}
    />
  )
}

export { Input }
