import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";

export type BadgeTone =
  | "ok"
  | "go"
  | "warn"
  | "danger"
  | "neutral"
  | "info";

export interface BadgeProps {
  tone: BadgeTone;
  children: React.ReactNode;
  className?: string;
}

/**
 * Badge de status. Cada tom vira `bg-<token>` + `.soft` (fundo pastel do
 * mesmo tom), padrao mazo-missoes. Pill arredondado por default.
 */
const TONE_CLASS: Record<BadgeTone, string> = {
  ok: "bg-mint/15 text-ok",
  go: "bg-go/15 text-go",
  warn: "bg-alert/15 text-alert",
  danger: "bg-danger/15 text-danger",
  neutral: "bg-ice text-steel",
  info: "bg-royal/15 text-info",
};

/** Tom fora da uniao (consumidor forcou com `as`) cai no neutral, nunca fica sem estilo de marca. */
function toneClass(tone: string): string {
  return Object.hasOwn(TONE_CLASS, tone) ? TONE_CLASS[tone as BadgeTone] : TONE_CLASS.neutral;
}

const badge = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    tone: TONE_CLASS,
  },
});

export function Badge({ tone, children, className }: BadgeProps) {
  return (
    <span className={cn(badge({ tone: undefined }), toneClass(tone), className)}>
      {children}
    </span>
  );
}