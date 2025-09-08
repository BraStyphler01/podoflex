import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
        teal: "bg-teal text-white hover:bg-teal/90 shadow-soft",
        olive: "bg-olive text-white hover:bg-olive/90 shadow-soft",
        outline: "border-2 border-teal text-teal bg-transparent hover:bg-teal hover:text-white",
        ghost: "text-teal hover:bg-teal/10 hover:text-teal",
        link: "text-teal underline-offset-4 hover:underline hover:text-olive p-0 h-auto",
      },
      size: {
        default: "h-12 px-6 py-3 rounded-[var(--radius)]",
        sm: "h-10 px-4 py-2 rounded-[var(--radius-sm)]",
        lg: "h-14 px-8 py-4 rounded-[var(--radius)] text-base",
        icon: "h-12 w-12 rounded-[var(--radius)]",
      },
    },
    defaultVariants: {
      variant: "teal",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
