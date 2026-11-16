import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  it("usa radius input e border line", () => {
    const { container } = render(
      <Select>
        <option value="a">A</option>
      </Select>,
    );
    const el = container.querySelector("select")!;
    expect(el.className).toMatch(/rounded-input/);
    expect(el.className).toMatch(/border-line/);
  });
});