/**
 * Preset Tailwind 4 do @mazotech/ui.
 *
 * Remapeia as HSL vars default do shadcn/ui para os tokens do BRAND, de modo
 * que `bg-primary` renderiza royal, `bg-destructive` o vermelho de status,
 * `bg-background` o paper e o raio dos cards cai em 20px. Produtos que já usam
 * shadcn (mazo-nexus, mazo-fit) migram trocando o preset, sem reescrever
 * componente.
 *
 * O vermelho de status nao existe na paleta BRAND crua (theme.css so tem
 * royal, mint e verde do WhatsApp), entao o preset define `--color-danger`
 * aqui, no mesmo :root onde injeta o remap, e aponta `--destructive` para ele.
 */

/**
 * Remapeamento das vars shadcn para os tokens BRAND. Chave = var que o shadcn
 * consome; valor = token BRAND (de theme.css) ou valor literal.
 */
export const shadcnVars: Record<string, string> = {
  "--background": "var(--color-paper)",
  "--foreground": "var(--color-ink)",
  "--card": "var(--color-paper)",
  "--card-foreground": "var(--color-ink)",
  "--popover": "var(--color-paper)",
  "--popover-foreground": "var(--color-ink)",
  "--primary": "var(--color-royal)",
  "--primary-foreground": "var(--color-paper)",
  "--secondary": "var(--color-ice)",
  "--secondary-foreground": "var(--color-ink)",
  "--muted": "var(--color-ice)",
  "--muted-foreground": "var(--color-steel)",
  "--accent": "var(--color-royal)",
  "--accent-foreground": "var(--color-paper)",
  "--destructive": "var(--color-danger)",
  "--destructive-foreground": "var(--color-paper)",
  "--border": "var(--color-line)",
  "--input": "var(--color-line)",
  "--ring": "var(--color-royal)",
  "--radius": "20px",
};

/**
 * Vermelho de status do BRAND. Fica no preset porque theme.css nao declara um
 * `--color-*` vermelho; mant-lo aqui garante que `var(--color-danger)` do remap
 * resolve para uma cor real.
 */
const statusVars: Record<string, string> = {
  "--color-danger": "#E5484D",
};

function toCssBlock(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([k, v]) => `    ${k}: ${v};`)
    .join("\n");
}

/**
 * CSS que o preset injeta: declara o vermelho de status e aplica o remap das
 * vars shadcn em :root.
 */
export const baseLayer = `@layer base {
  :root {
${toCssBlock(statusVars)}
${toCssBlock(shadcnVars)}
  }
}
`;

/**
 * Preset Tailwind 4. Expoe o remap (`shadcnVars`) e o CSS de `@layer base` para
 * quem monta a camada shadcn por baixo dos componentes de marca.
 */
const preset = {
  shadcnVars,
  baseLayer,
};

export default preset;
