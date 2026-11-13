import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("assets de marca", () => {
  it("lockup tem os hex do BRAND e o viewBox correto", () => {
    const svg = readFileSync("assets/mazotech-lockup.svg", "utf8");
    expect(svg).toContain('viewBox="-9 -12 840 360"');
    for (const hex of ["#021D44", "#0E5DFC", "#052049", "#0052FA"]) {
      expect(svg).toContain(hex);
    }
  });
  it("symbol tem os dois paths do hexagono", () => {
    const svg = readFileSync("assets/mazotech-symbol.svg", "utf8");
    expect(svg).toContain('viewBox="-9 -12 276 332"');
    expect(svg).toContain("#021D44");
    expect(svg).toContain("#0E5DFC");
  });
});
