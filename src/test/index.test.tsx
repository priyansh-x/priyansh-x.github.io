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

  it("backs it up", () => {
    render(<Index />);
    expect(screen.getByText(/Everest Base Camp/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Samora" })).toHaveAttribute("href", "https://www.samora.ai/");
  });
});
