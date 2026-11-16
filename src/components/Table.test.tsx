import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Table } from "./Table";

describe("Table", () => {
  it("renderiza cabecalho com label uppercase", () => {
    render(
      <Table headers={["PRODUTO", "VALOR"]}>
        <tr>
          <td>Kit</td>
          <td>R$ 197</td>
        </tr>
      </Table>,
    );
    expect(screen.getByText("PRODUTO")).toBeInTheDocument();
    expect(screen.getByText("VALOR")).toBeInTheDocument();
  });
});