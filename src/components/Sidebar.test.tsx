import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Sidebar } from "./Sidebar";
import { Logo } from "./Logo";

describe("Sidebar", () => {
  it("com sections vazio ainda mostra a logo e nao estoura", () => {
    const { container } = render(
      <Sidebar produto="x" logo={<Logo nome="x" />} sections={[]} />,
    );
    expect(container.querySelector("svg[aria-label='Mazotech']")).toBeTruthy();
    expect(screen.getByText("x")).toBeInTheDocument();
  });

  it("lista a nav por secoes com titulo", () => {
    render(
      <Sidebar
        produto="p"
        logo={<Logo nome="p" />}
        sections={[
          { title: "GERAL", items: [{ href: "/", label: "Painel" }] },
          { title: "CONTA", items: [{ href: "/perfil", label: "Perfil" }] },
        ]}
      />,
    );
    expect(screen.getByText("GERAL")).toBeInTheDocument();
    expect(screen.getByText("CONTA")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Perfil" })).toHaveAttribute("href", "/perfil");
  });

  it("marca o item ativo com aria-current e o acento royal", () => {
    render(
      <Sidebar
        produto="p"
        logo={<Logo nome="p" />}
        sections={[{ items: [{ href: "/a", label: "A" }, { href: "/b", label: "B" }] }]}
        activeHref="/b"
      />,
    );
    const ativo = screen.getByRole("link", { name: "B" });
    expect(ativo).toHaveAttribute("aria-current", "page");
    expect(ativo.className).toMatch(/text-royal/);
    expect(screen.getByRole("link", { name: "A" })).not.toHaveAttribute("aria-current");
  });

  it("renderiza o footer quando informado", () => {
    render(
      <Sidebar produto="p" logo={<Logo nome="p" />} sections={[]} footer={<span>rodape</span>} />,
    );
    expect(screen.getByText("rodape")).toBeInTheDocument();
  });
});
