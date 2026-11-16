import { cn } from "../lib/cn";
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input do brand. Radius input (12px), border line, fundo paper.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "rounded-input border border-line bg-paper text-ink px-3 py-2 w-full",
          "placeholder:text-steel",
          "focus:outline-none focus:ring-2 focus:ring-royal",
          "disabled:bg-ice disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";