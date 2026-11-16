import { cn } from "../lib/cn";

export interface CardProps {
  variant?: "default" | "hero";
  className?: string;
  children: React.ReactNode;
}

/**
 * Card do brand. Default = fundo claro (paper) com radius-card (20px).
 * Hero = bloco navy, texto paper (card heroi do BRAND.md).
 */
export function Card({ variant = "default", className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-paper p-5 text-ink shadow-sm",
        variant === "hero" && "bg-navy text-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}