import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-md border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-3 text-sm transition-all duration-200 flex gap-3 [&>svg]:flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:mt-1 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-l-md before:transition-colors before:duration-200",
  {
    variants: {
      variant: {
        default: "before:bg-border/40 text-foreground [&>svg]:text-muted-foreground",
        destructive:
          "before:bg-destructive/70 border-destructive/20 text-destructive dark:text-destructive [&>svg]:text-destructive",
        warning:
          "before:bg-warning/70 border-warning/20 text-foreground [&>svg]:text-warning",
        success:
          "before:bg-success/70 border-success/20 text-foreground [&>svg]:text-success",
        info: "before:bg-info/70 border-info/20 text-foreground [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("mb-0.5 font-semibold text-base leading-snug tracking-tight", className)} {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm leading-relaxed text-foreground/75", className)} {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
