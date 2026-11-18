import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { shadcnVars } from "./tailwind-preset";

describe("shadcn.css espelha o preset", () => {
  const css = readFileSync("src/shadcn.css", "utf8");
  for (const [k, v] of Object.entries(shadcnVars)) {
    it(`${k} = ${v}`, () => {
      const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      expect(css).toMatch(new RegExp(`${esc(k)}:\\s*${esc(v)}`));
    });
  }
  it("expoe utilitarias bg-primary e bg-destructive via @theme inline", () => {
    expect(css).toMatch(/@theme inline/);
    expect(css).toMatch(/--color-primary:\s*var\(--primary\)/);
    expect(css).toMatch(/--color-destructive:\s*var\(--destructive\)/);
  });
});
