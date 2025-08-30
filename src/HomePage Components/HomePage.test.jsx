import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 1. Import MemoryRouter

import HomePage from "./HomePage";

describe("HomePage Testing", () => {
  // 2. Wrap your component in the MemoryRouter

  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });
  it("renders Heading", () => {
    expect(screen.getByRole("heading").textContent).toMatch(
      /Welcome To Our E-Shop/i
    );
  });

  it("renders paragraph", () => {
    const paragraph = screen.getByText(
      /Discover a curated collection of high-quality electronics and accessories. From the latest gadgets to essential gear, we have everything you need./i
    );

    expect(paragraph).toHaveTextContent(
      "Discover a curated collection of high-quality electronics and accessories. From the latest gadgets to essential gear, we have everything you need."
    );
  });

  it("renders button", () => {
    expect(screen.getByRole("button").textContent).toMatch(/Start Shopping/i);
  });
});
