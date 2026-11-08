import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Index from "@/pages/Index";

describe("home", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
  });

  it("says the line", () => {
    render(<Index />);
    expect(screen.getByRole("heading", { name: "I want to do hard things." })).toBeInTheDocument();
  });

  it("links out with labelled icons only", () => {
    render(<Index />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/priyansh-x");
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });
});
