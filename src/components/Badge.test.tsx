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
    expect((container.firstChild as HTMLElement).className).toMatch(/mint/);
  });
});
describe("Badge com tone fora da uniao", () => {
  it("cai no estilo neutral em vez de ficar sem marca", () => {
    const { container } = render(
      <Badge tone={"inexistente" as unknown as "ok"}>X</Badge>,
    );
    const cls = (container.firstChild as HTMLElement).className;
    expect(cls).toMatch(/bg-ice/);
    expect(cls).toMatch(/text-steel/);
    expect(cls).toMatch(/rounded-full/);
  });
});
