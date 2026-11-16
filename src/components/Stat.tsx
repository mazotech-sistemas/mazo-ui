import { cn } from "../lib/cn";

export interface StatProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  tone?: "brand" | "go" | "warn" | "danger";
}

const toneClass: Record<NonNullable<StatProps["tone"]>, string> = {
  brand: "text-royal",
  go: "text-go",
  warn: "text-alert",
  danger: "text-danger",
};

/**
 * Stat: label uppercase + numero hero em mono tabular (JetBrains), como no
 * mazo-missoes. `tone` pinta o numero; default = royal (brand).
 */
export function Stat({ label, value, icon, tone = "brand" }: StatProps) {
  return (
    <div className="flex items-center gap-3">
      {icon ? (
        <div className="flex h-9 w-9 items-center justify-center rounded-card bg-ice text-ink">
          {icon}
        </div>
      ) : null}
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wide text-steel">
          {label}
        </span>
        <span
          className={cn(
            "font-mono tabular-nums text-3xl font-black leading-none",
            toneClass[tone],
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}