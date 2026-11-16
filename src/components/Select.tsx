import { cn } from "../lib/cn";
import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

/**
 * Select do brand. Radius input (12px), border line, fundo paper.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "rounded-input border border-line bg-paper text-ink px-3 py-2",
          "focus:outline-none focus:ring-2 focus:ring-royal",
          "disabled:bg-ice disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";