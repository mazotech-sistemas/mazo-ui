import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/**
 * Botao do brand. Primary = pill royal (CTA unico por tela, BRAND.md).
 * Secondary = outline ice. Ghost = transparente.
 */
const button = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "rounded-full bg-royal text-paper px-5 py-2.5 hover:bg-[var(--color-royal-m)]",
        secondary: "rounded-input border border-line bg-paper text-ink px-4 py-2 hover:bg-ice",
        ghost: "rounded-input text-royal px-3 py-2 hover:bg-royal/5",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(button({ variant }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";