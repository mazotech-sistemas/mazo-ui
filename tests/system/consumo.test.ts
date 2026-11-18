import { describe, it, expect } from "vitest";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";


describe("consumo externo", () => {
  it("compila as utilitarias de marca e o remap shadcn", async () => {
    const css = `@import "tailwindcss"; @import "@mazotech/ui/theme.css";`;
    const out = await postcss([tailwind()]).process(css, { from: undefined });
    expect(out.css).toMatch(/#021D44/i); // navy resolvido
    expect(out.css).toMatch(/#0052FA/i); // royal resolvido
    expect(out.css).toMatch(/20px/);     // rounded-card
  });
});
describe("consumo externo: utilitarias reais e remap shadcn", () => {
  it("bg-primary vira royal, bg-destructive vira o vermelho de status, bg-navy e rounded-card resolvem", async () => {
    const css = `
      @import "tailwindcss";
      @import "@mazotech/ui/theme.css";
      @import "@mazotech/ui/shadcn.css";
      @source inline("bg-primary bg-destructive bg-navy text-royal rounded-card bg-background");
    `;
    const out = (await postcss([tailwind()]).process(css, { from: undefined })).css;
    const regra = (cls: string) => {
      const m = out.match(new RegExp(`\\.${cls}\\s*\\{([^}]*)\\}`));
      return m ? m[1] : "";
    };
    expect(regra("bg-primary")).toMatch(/var\(--primary\)/);
    expect(out).toMatch(/--primary:\s*var\(--color-royal\)/);
    expect(out).toMatch(/--destructive:\s*var\(--color-danger\)/);
    expect(out).toMatch(/--color-danger:\s*#BE123C/i);
    expect(regra("bg-destructive")).toMatch(/var\(--destructive\)/);
    expect(regra("bg-navy")).toMatch(/var\(--color-navy\)/);
    expect(regra("rounded-card")).toMatch(/var\(--radius-card\)/);
  });
  it("fonts.css entra no build de um consumidor e declara as familias", async () => {
    const out = (await postcss([tailwind()]).process(`@import "@mazotech/ui/fonts.css";`, { from: undefined })).css;
    expect(out).toMatch(/font-family:\s*"Inter Variable"/);
    expect(out).toMatch(/font-family:\s*"JetBrains Mono Variable"/);
  });
});

describe("consumo externo: entrada unica styles.css", () => {
  it("num projeto isolado, um import gera as utilitarias das classes dos componentes do pacote", async () => {
    const { mkdtempSync, mkdirSync, symlinkSync, writeFileSync, rmSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join, resolve } = await import("node:path");
    const dir = mkdtempSync(join(tmpdir(), "mazo-ui-consumidor-"));
    try {
      mkdirSync(join(dir, "node_modules", "@mazotech"), { recursive: true });
      symlinkSync(resolve("."), join(dir, "node_modules", "@mazotech", "ui"), "dir");
      symlinkSync(resolve("node_modules/tailwindcss"), join(dir, "node_modules", "tailwindcss"), "dir");
      writeFileSync(join(dir, "app.html"), "<div>sem classes de marca aqui</div>");
      const entrada = join(dir, "app.css");
      const css = `@import "tailwindcss"; @import "@mazotech/ui/styles.css";`;
      writeFileSync(entrada, css);
      const out = (await postcss([tailwind({ base: dir })]).process(css, { from: entrada })).css;
      for (const cls of ["rounded-full", "bg-royal", "rounded-card", "bg-navy", "font-mono", "tabular-nums"]) {
        expect(out, `classe ${cls} ausente`).toContain(`.${cls}`);
      }
      expect(out).toMatch(/--primary:\s*var\(--color-royal\)/);
      expect(out).toMatch(/@font-face/);
      expect(out).toMatch(/--font-inter:/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
