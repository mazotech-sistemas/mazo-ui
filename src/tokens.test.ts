import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

const BRAND = {
  "--color-navy": "#021D44",
  "--color-royal": "#0052FA",
  "--color-royal-m": "#0E5DFC",
  "--color-steel": "#4573A7",
  "--color-ice": "#EDEDED",
  "--color-mint": "#00DEB2",
  "--color-paper": "#FFFFFF",
  "--color-ink": "#052049",
  "--color-label": "#1C355E",
};

describe("tokens BRAND", () => {
  const css = readFileSync("src/theme.css", "utf8");
  for (const [k, v] of Object.entries(BRAND)) {
    it(`define ${k}: ${v}`, () => {
      expect(css).toMatch(new RegExp(`${k}:\\s*${v}`, "i"));
    });
  }
  it("radius card 20px", () => {
    expect(css).toMatch(/--radius-card:\s*20px/);
  });
  it("color-scheme light, sem dark total", () => {
    const tokens = readFileSync("src/tokens.css", "utf8");
    expect(tokens).toMatch(/color-scheme:\s*light/);
  });
});
