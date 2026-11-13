import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AppShell } from "./AppShell";
import { Sidebar } from "./Sidebar";
import { Logo } from "./Logo";

const sidebar = (
  <Sidebar produto="mazo-cobranca" logo={<Logo nome="mazo-cobranca" />}
           sections={[{ title: "GERAL", items: [{ href: "/", label: "Painel", icon: null }] }]}
           activeHref="/" />
);

describe("AppShell", () => {
  it("monta sidebar com a logo e o item de nav", () => {
    render(<AppShell sidebar={sidebar}>conteudo</AppShell>);
    expect(screen.getByText("mazo-cobranca")).toBeInTheDocument();
    expect(screen.getByText("Painel")).toBeInTheDocument();
    expect(screen.getByText("conteudo")).toBeInTheDocument();
  });
  it("sidebar com sections vazio ainda mostra a logo", () => {
    render(<Sidebar produto="x" logo={<Logo nome="x" />} sections={[]} />);
    expect(screen.getByText("x")).toBeInTheDocument();
  });
});
