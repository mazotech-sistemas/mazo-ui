import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("primary e pill royal", () => {
    const { container } = render(<Button>Criar contrato</Button>);
    const btn = container.querySelector("button")!;
    expect(btn.className).toMatch(/rounded-full/);
    expect(btn.className).toMatch(/royal|bg-\[var\(--accent\)\]/);
  });
  it("secondary nao e royal cheio", () => {
    const { container } = render(<Button variant="secondary">x</Button>);
    expect(container.querySelector("button")!.className).not.toMatch(/bg-royal\b/);
  });
});