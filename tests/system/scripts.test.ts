import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("camadas de teste", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  for (const s of ["test:unit", "test:bdd", "test:e2e", "test:system"]) {
    it(`define o script ${s}`, () => {
      expect(pkg.scripts[s]).toBeTruthy();
    });
  }
  it("tem cucumber e playwright nas devDeps", () => {
    expect(pkg.devDependencies["@cucumber/cucumber"]).toBeTruthy();
    expect(pkg.devDependencies["@playwright/test"]).toBeTruthy();
  });
});

describe("instalacao por git+hash", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  it("builda no install (dist e ignorado pelo git, sem prepare o consumidor recebe pacote vazio)", () => {
    expect(pkg.scripts.prepare).toBe("tsup");
  });
  it("exporta a entrada unica styles.css", () => {
    expect(pkg.exports["./styles.css"]).toBe("./dist/styles.css");
  });
});
