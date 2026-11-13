import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("mostra o nome do produto", () => {
    render(<Logo nome="mazo-cobranca" />);
    expect(screen.getByText("mazo-cobranca")).toBeInTheDocument();
  });
  it("renderiza o simbolo mazotech (svg com os paths do hexagono)", () => {
    const { container } = render(<Logo nome="x" variant="symbol" />);
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
