import { cva } from "class-variance-authority";

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
const badge = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    tone: {
      ok: "bg-mint/15 text-ok",
      go: "bg-go/15 text-go",
      warn: "bg-alert/15 text-alert",
      danger: "bg-danger/15 text-danger",
      neutral: "bg-ice text-steel",
      info: "bg-royal/15 text-info",
    },
  },
});

export function Badge({ tone, children, className }: BadgeProps) {
  return (
    <span className={badge({ tone, className })}>
      {children}
    </span>
  );
}