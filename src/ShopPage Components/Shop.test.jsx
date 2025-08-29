import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";
import userEvent from "@testing-library/user-event";

const mockItems = [
  {
    id: 1,
    title: "Test Backpack",
    price: 100,
    image: "backpack.png",
    orders: 0,
  },
  { id: 2, title: "Test T-Shirt", price: 25, image: "tshirt.png", orders: 0 },
  { id: 3, title: "Test Pants", price: 50, image: "pants.png", orders: 0 },
  { id: 4, title: "Test Shoe", price: 30, image: "shoe.png", orders: 0 },
];

const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockItems),
  })
);

// Use the Vitest helper to mock 'fetch' on the global object
vi.stubGlobal("fetch", mockFetch);

describe("Testing Shop page", () => {
  it("Each Item should be rendered as an article", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });

    render(<RouterProvider router={router} />);

    const cardElements = await screen.findAllByRole("article");

    expect(cardElements).toHaveLength(mockItems.length);
  });
  it("increaseOrders: should increment cart total when add button is clicked", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });
    render(<RouterProvider router={router} />);

    const addButton = await screen.findByRole("button", {
      name: /add test backpack to cart/i,
    });
    const cartTotalSpan = screen.getByText("0"); // It starts at 0

    await user.click(addButton);

    expect(cartTotalSpan).toHaveTextContent("1");
  });
  it("Check if Price is displayed", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });
    render(<RouterProvider router={router} />);
    const price = await screen.findByText(/25/i);

    expect(price).toBeInTheDocument();
  });
  it("Check if title is displayed", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });
    render(<RouterProvider router={router} />);
    const title = await screen.findByText(/Test Shoe/i);

    expect(title).toBeInTheDocument();
  });
  it("Check if image is displayed", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });
    render(<RouterProvider router={router} />);
    const image = await screen.findByAltText(/pants/i);

    expect(image).toBeInTheDocument();
  });
  it("Check if items is empty will the loading text show", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });
    render(<RouterProvider router={router} />);
    const loading = screen.getByText(/Loading/i);

    expect(loading).toBeInTheDocument();
  });
});
