import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-card hover:shadow-elegant hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-card hover:shadow-elegant",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-card",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-card",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-primary text-white hover:shadow-elegant hover:scale-[1.02] shadow-card backdrop-blur-sm",
        glass: "bg-gradient-glass text-foreground border border-white/20 backdrop-blur-sm hover:bg-white/30 shadow-card hover:shadow-elegant",
        modern: "bg-gradient-warm text-white hover:shadow-glow hover:scale-[1.02] shadow-card",
        whatsapp: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-card hover:shadow-elegant hover:scale-[1.02]",
        filter: "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary/50 shadow-sm hover:shadow-card",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
