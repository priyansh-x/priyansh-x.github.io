import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";

describe("home", () => {
  it("says the line", () => {
    render(<Index />);
    expect(screen.getByRole("heading", { name: "I want to do hard things." })).toBeInTheDocument();
  });
});
