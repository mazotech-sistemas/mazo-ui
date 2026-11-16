/**
 * Fontes do BRAND.md expostas como vars CSS.
 * Inter Variable (títulos ExtraBold 800, tracking -0.02em).
 * JetBrains Mono Variable (número herói tabular).
 *
 * O consumidor Next usa `next/font/local` apontando para estes TTF.
 * O tema Tailwind 4 declara `--font-inter` e `--font-jet` em theme.css.
 */
export const FONT_VARS = {
  inter: "--font-inter",
  mono: "--font-jet",
} as const;

export type FontVars = typeof FONT_VARS;