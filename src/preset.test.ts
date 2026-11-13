import { describe, it, expect } from "vitest";
import preset from "./tailwind-preset";

describe("preset tailwind", () => {
  it("mapeia shadcn primary para royal e radius para card", () => {
    const vars = preset.shadcnVars;
    expect(vars["--primary"]).toBe("var(--color-royal)");
    expect(vars["--destructive"]).toBe("var(--color-danger)");
    expect(vars["--background"]).toBe("var(--color-paper)");
    expect(vars["--radius"]).toBe("20px");
  });
});
