import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 1. Import MemoryRouter

import App from "./App";

describe("App", () => {
  it("renders paragraph", () => {
    // 2. Wrap your component in the MemoryRouter
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /Chofor Forsakang/i })
    ).toBeInTheDocument();
  });
});
