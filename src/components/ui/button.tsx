"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps 
  extends Omit<HTMLMotionProps<"button">, "whileHover" | "whileTap"> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "mobile";
  asChild?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const Comp = motion.button;
    
    const motionProps = {
      whileHover: { scale: 1.03 },
      whileTap: { scale: 0.98 }
    };
    
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 tracking-tight touch-manipulation",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg":
              variant === "default",
            "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "text-primary underline-offset-4 hover:underline":
              variant === "link",
            "h-10 px-4 py-2.5 text-base": size === "default",
            "h-9 rounded-md px-4 text-sm": size === "sm",
            "h-12 rounded-xl px-6 text-lg font-semibold min-w-[200px]": size === "lg",
            "h-12 rounded-xl px-6 py-4 text-base font-semibold w-full sm:w-auto sm:min-w-[200px]": size === "mobile",
            "h-10 w-10": size === "icon",
            // "w-full": fullWidth,
            "min-h-[44px] min-w-[44px]": size !== "icon", // Ensure touch-friendly size
          },
          className
        )}
        ref={ref}
        {...motionProps}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {props.children as React.ReactNode}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
