import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("default usa radius card e fundo claro", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass("rounded-card");
  });
  it("hero usa navy", () => {
    const { container } = render(<Card variant="hero">x</Card>);
    expect(container.firstChild).toHaveClass("bg-navy");
  });
});