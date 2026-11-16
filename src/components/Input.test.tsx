import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("usa radius input e border line", () => {
    const { container } = render(<Input placeholder="Nome" />);
    const el = container.querySelector("input")!;
    expect(el.className).toMatch(/rounded-input/);
    expect(el.className).toMatch(/border-line/);
  });
});