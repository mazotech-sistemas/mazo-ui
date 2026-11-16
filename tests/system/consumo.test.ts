import { describe, it, expect } from "vitest";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const html = `<div class="bg-navy text-royal rounded-card bg-primary">x</div>`;

describe("consumo externo", () => {
  it("compila as utilitarias de marca e o remap shadcn", async () => {
    const css = `@import "tailwindcss"; @import "@mazotech/ui/theme.css";`;
    const out = await postcss([tailwind()]).process(css, { from: undefined });
    expect(out.css).toMatch(/#021D44/i); // navy resolvido
    expect(out.css).toMatch(/#0052FA/i); // royal resolvido
    expect(out.css).toMatch(/20px/);     // rounded-card
  });
});