import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stat } from "./Stat";

describe("Stat", () => {
  it("mostra label e value em mono tabular", () => {
    const { container } = render(<Stat label="RECEBIDO" value="R$ 5799,00" />);
    expect(screen.getByText("RECEBIDO")).toBeInTheDocument();
    expect(container.querySelector(".font-mono.tabular-nums")).toBeTruthy();
  });
});