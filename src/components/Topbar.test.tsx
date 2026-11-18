import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Topbar } from "./Topbar";

describe("Topbar", () => {
  it("mostra o breadcrumb e a inicial do usuario no avatar", () => {
    render(<Topbar breadcrumb="Painel / Contratos" user={{ nome: "maria" }} />);
    expect(screen.getByText("Painel / Contratos")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "maria" })).toHaveTextContent("M");
  });

  it("avatar usa ? quando o nome vem vazio", () => {
    const { container } = render(<Topbar user={{ nome: "  " }} />);
    expect(container.querySelector("[aria-haspopup='menu']")).toHaveTextContent("?");
  });

  it("chama onSearch ao digitar na busca", () => {
    const onSearch = vi.fn();
    render(<Topbar user={{ nome: "a" }} onSearch={onSearch} />);
    fireEvent.change(screen.getByLabelText("Busca"), { target: { value: "joao" } });
    expect(onSearch).toHaveBeenCalledWith("joao");
  });

  it("badge de notificacoes so aparece com contagem maior que zero", () => {
    const { rerender } = render(<Topbar user={{ nome: "a" }} notifications={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    rerender(<Topbar user={{ nome: "a" }} notifications={0} />);
    expect(screen.queryByText("0")).toBeNull();
  });

  it("dropdown do usuario abre e fecha no clique do avatar", () => {
    render(<Topbar user={{ nome: "Ana" }} />);
    expect(screen.queryByRole("menu")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Ana" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Sair" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Ana" }));
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
