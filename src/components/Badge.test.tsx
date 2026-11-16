import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("tone go usa verde de status", () => {
    const { container } = render(<Badge tone="go">ABERTA</Badge>);
    expect(container.firstChild).toHaveClass("rounded-full");
  });
  it("tone ok usa mint", () => {
    const { container } = render(<Badge tone="ok">PAGO</Badge>);
    expect(container.firstChild?.className).toMatch(/mint/);
  });
});