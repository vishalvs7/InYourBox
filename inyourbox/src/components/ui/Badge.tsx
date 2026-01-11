// src/components/ui/Badge.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      destructive: "bg-red-100 text-red-800 hover:bg-red-200",
      outline: "border border-gray-300 bg-transparent text-gray-700",
      success: "bg-green-100 text-green-800 hover:bg-green-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };