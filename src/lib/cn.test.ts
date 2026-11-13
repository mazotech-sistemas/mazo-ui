import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("funde classes e resolve conflito tailwind", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-ink", false && "hidden", "font-bold")).toBe("text-ink font-bold");
  });
});
