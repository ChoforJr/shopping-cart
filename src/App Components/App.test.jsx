import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 1. Import MemoryRouter

import App from "./App";

describe("App component Testing", () => {
  beforeEach(() => {
    render(
      // 2. Wrap your component in the MemoryRouter
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  it("Navbar heading", () => {
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  it("Footer link", () => {
    expect(
      screen.getByRole("link", { name: /Chofor Forsakang/i })
    ).toBeInTheDocument();
  });
});
