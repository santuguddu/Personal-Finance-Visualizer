import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "placeholder-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-500",
          "hover:border-blue-400",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
