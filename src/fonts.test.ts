import { existsSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { FONT_VARS } from "./fonts";

describe("fontes", () => {
  it("ttf presentes", () => {
    expect(existsSync("assets/fonts/Inter-Variable.ttf")).toBe(true);
    expect(existsSync("assets/fonts/JetBrainsMono-Variable.ttf")).toBe(true);
  });
  it("expoe as vars de fonte", () => {
    expect(FONT_VARS.inter).toBe("--font-inter");
    expect(FONT_VARS.mono).toBe("--font-jet");
  });
});
describe("fontes carregam de verdade no consumidor", () => {
  it("fonts.css declara @font-face das duas familias apontando para os ttf do pacote", async () => {
    const { readFileSync } = await import("node:fs");
    const css = readFileSync("src/fonts.css", "utf8");
    expect(css).toMatch(/@font-face[^}]*font-family:\s*"Inter Variable"[^}]*assets\/fonts\/Inter-Variable\.ttf/s);
    expect(css).toMatch(/@font-face[^}]*font-family:\s*"JetBrains Mono Variable"[^}]*assets\/fonts\/JetBrainsMono-Variable\.ttf/s);
  });
  it("fonts.css define --font-inter e --font-jet (sem isso font-display cai em fonte do sistema)", async () => {
    const { readFileSync } = await import("node:fs");
    const css = readFileSync("src/fonts.css", "utf8");
    expect(css).toMatch(/--font-inter:\s*"Inter Variable"/);
    expect(css).toMatch(/--font-jet:\s*"JetBrains Mono Variable"/);
  });
  it("tokens.css NAO define as vars de fonte (consumidor next/font define as dele)", async () => {
    const { readFileSync } = await import("node:fs");
    const css = readFileSync("src/tokens.css", "utf8");
    expect(css).not.toMatch(/--font-inter:/);
    expect(css).not.toMatch(/--font-jet:/);
  });
});
