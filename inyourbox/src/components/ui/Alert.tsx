// src/components/ui/Alert.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, XCircle, Info, LucideIcon } from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 text-gray-900",
        destructive: "bg-red-50 border-red-200 text-red-900",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
        success: "bg-green-50 border-green-200 text-green-900",
        info: "bg-blue-50 border-blue-200 text-blue-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap: Record<string, LucideIcon> = {
  default: Info,
  destructive: XCircle,
  warning: AlertCircle,
  success: CheckCircle,
  info: Info,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, icon, children, ...props }, ref) => {
    const IconComponent = variant ? iconMap[variant] : Info;
    const DisplayIcon = icon || IconComponent;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start">
          {React.isValidElement(DisplayIcon) ? (
            DisplayIcon
          ) : (
            <IconComponent className="h-4 w-4 mt-0.5 mr-3 flex-shrink-0" />
          )}
          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-medium">{title}</h5>
            )}
            <div className="text-sm">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription };