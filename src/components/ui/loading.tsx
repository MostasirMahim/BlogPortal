import type * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loading spinner
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "xl"

  /**
   * The variant of the loading spinner
   * @default "default"
   */
  variant?: "default" | "primary" | "secondary" | "ghost"

  /**
   * Whether to show the loading text
   * @default false
   */
  showText?: boolean

  /**
   * The text to display below the spinner
   * @default "Loading..."
   */
  text?: string

  /**
   * Whether to center the loading spinner in its container
   * @default false
   */
  center?: boolean

  /**
   * Whether to take up the full height of the parent container
   * @default false
   */
  fullHeight?: boolean
}

export function Loading({
  size = "default",
  variant = "default",
  showText = false,
  text = "Loading...",
  center = false,
  fullHeight = false,
  className,
  ...props
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    default: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  }

  const variantClasses = {
    default: "border-muted-foreground/20 border-t-muted-foreground/60",
    primary: "border-muted-foreground/20 border-t-primary",
    secondary: "border-muted-foreground/20 border-t-secondary",
    ghost: "border-background/20 border-t-background/80",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        center && "absolute inset-0 m-auto",
        fullHeight && "h-full",
        className,
      )}
      {...props}
    >
      <div className={cn("animate-spin rounded-full", sizeClasses[size], variantClasses[variant])} />
      {showText && (
        <p
          className={cn(
            "text-muted-foreground animate-pulse",
            size === "sm" && "text-xs",
            size === "default" && "text-sm",
            size === "lg" && "text-base",
            size === "xl" && "text-lg",
          )}
        >
          {text}
        </p>
      )}
    </div>
  )
}

export function LoadingPage({
  variant = "primary",
  text = "Loading...",
  className,
  ...props
}: Omit<LoadingProps, "center" | "fullHeight" | "size"> & {
  /**
   * Whether to show a backdrop
   * @default false
   */
  backdrop?: boolean
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        props.backdrop && "bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <Loading size="lg" variant={variant} showText={true} text={text} {...props} />
    </div>
  )
}

export function LoadingDots({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center space-x-1.5", className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}

export function LoadingCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 shadow-sm flex items-center justify-center min-h-[200px]",
        className,
      )}
      {...props}
    >
      <Loading size="default" variant="primary" showText={true} />
    </div>
  )
}

export function LoadingSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}
