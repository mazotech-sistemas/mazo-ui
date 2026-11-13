import { cn } from "../lib/cn";

export interface LogoProps {
  /** Nome do produto exibido ao lado do simbolo. Obrigatorio: a marca nunca aparece sem identificar o produto. */
  nome: string;
  /** `lockup` mostra simbolo + nome (padrao); `symbol` mostra so o simbolo da marca. */
  variant?: "lockup" | "symbol";
  className?: string;
}

/**
 * Simbolo Mazotech inline (os dois paths do BRAND: hexagono navy + M royal).
 * Os paths vem de assets/mazotech-symbol.svg; ficam embutidos para a marca nao
 * depender de fetch de asset e nunca sumir, mesmo com `nome=""`.
 */
function Simbolo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-9 -12 276 332"
      role="img"
      aria-label="Mazotech"
      className={cn("h-7 w-auto", className)}
    >
      <path
        fill="var(--color-navy, #021D44)"
        d="M132,16 L18,82 L43,96 L132,44 L220,96 L220,190 L244,206 L244,82 Z M14,105 L38,121 L38,208 L128,262 L198,222 L238,228 L128,292 L14,222 Z"
      />
      <path
        fill="var(--color-royal-m, #0E5DFC)"
        d="M59,146 L82,160 L82,214 L59,200 Z M18,82 L128,165 L175,138 L175,209 L198,224 L238,228 L199,197 L199,98 L128,139 L62,92 L54,103 Z"
      />
    </svg>
  );
}

/**
 * Logo da marca Mazotech com o nome do produto. `nome` e obrigatorio no tipo.
 * `variant="symbol"` renderiza apenas o simbolo; o padrao (`lockup`) acompanha
 * o nome do produto ao lado. O simbolo e renderizado mesmo quando `nome=""`,
 * porque a marca nunca some.
 */
export function Logo({ nome, variant = "lockup", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Simbolo />
      {variant === "lockup" && (
        <span className="font-display font-bold tracking-tight text-ink">{nome}</span>
      )}
    </span>
  );
}
