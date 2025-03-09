"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-semibold leading-none tracking-wide transition-colors duration-200",
  {
    variants: {
      variant: {
        default:
          "text-gray-800 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed dark:text-gray-200",
        subtle:
          "text-gray-600 dark:text-gray-400 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
        error: "text-red-600 dark:text-red-400",
        success: "text-green-600 dark:text-green-400",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants({ variant, size }),
      "peer-focus:text-blue-600 dark:peer-focus:text-blue-400", // Focus effect
      "hover:text-blue-500 dark:hover:text-blue-300", // Hover effect
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
