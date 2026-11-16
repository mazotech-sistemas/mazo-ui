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