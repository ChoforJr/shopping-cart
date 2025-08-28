import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import userEvent from "@testing-library/user-event";

const mockItems = [
  {
    id: 1,
    title: "Test Backpack",
    price: 100,
    image: "backpack.png",
    orders: 4,
  },
  { id: 2, title: "Test T-Shirt", price: 25, image: "tshirt.png", orders: 6 },
  { id: 3, title: "Test Pants", price: 50, image: "pants.png", orders: 5 },
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

describe("Testing Cart page", () => {
  it("Rendered articles should match the number of items with more than 0 orders", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"], // Start the test at the /cart route
    });

    render(<RouterProvider router={router} />);
    const cardElements = await screen.findAllByRole("article");

    expect(cardElements).toHaveLength(mockItems.length - 1);
  });
  it("Check if image is displayed", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);
    const image = await screen.findByAltText(/pants/i);

    expect(image).toBeInTheDocument();
  });
  it("Check if title is displayed", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);
    const title = await screen.findByText(/Test Backpack/i);

    expect(title).toBeInTheDocument();
  });
  it("Check if Price is displayed", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);
    const price = await screen.findByText(/25/i);

    expect(price).toBeInTheDocument();
  });
  it("increaseOrders: should increment cart total when add(+) button is clicked", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    const addButton = await screen.findByRole("button", {
      name: /add test backpack to cart/i,
    });

    const cartTotalSpan = await screen.findByText("15");

    await user.click(addButton);

    expect(cartTotalSpan).toHaveTextContent("16");
  });
  it("decreaseOrders: should decrement cart total when reduce(-) button is clicked", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    const reduceButton = await screen.findByRole("button", {
      name: /Reduce Test T-Shirt orders from cart/i,
    });

    const cartTotalSpan = await screen.findByText("15");

    await user.click(reduceButton);

    expect(cartTotalSpan).toHaveTextContent("14");
  });
  it("Remove Item: should remove item from cart when remove button is clicked", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    const removeButton = await screen.findByRole("button", {
      name: /Remove Test Pants orders from cart/i,
    });

    const cartTotalSpan = await screen.findByText("15");

    await user.click(removeButton);

    expect(cartTotalSpan).toHaveTextContent("10");
  });
});
//Reduce ${item.title} orders from cart

//   it("Check if items is empty will the loading text show", () => {
//     const router = createMemoryRouter(routes, {
//       initialEntries: ["/cart"],
//     });
//     render(<RouterProvider router={router} />);
//     const loading = screen.getByText(/Loading/i);

//     expect(loading).toBeInTheDocument();
//   });

// it("decreaseOrders: should decrement cart total when subtract button is clicked", async () => {
//   const user = userEvent.setup();

//   const addButton = await screen.findByRole("button", { name: /add test backpack to cart/i });
//   const subtractButton = await screen.findByRole("button", { name: /remove one test backpack from cart/i }); // Assuming this button exists
//   const cartTotalSpan = screen.getByText('0');

//   // --- ACT ---
//   // Add two items first
//   await user.click(addButton);
//   await user.click(addButton);

//   // --- ASSERT (intermediate) ---
//   expect(cartTotalSpan).toHaveTextContent("2");

//   // --- ACT (again) ---
//   // Now remove one
//   await user.click(subtractButton);

//   // --- ASSERT (final) ---
//   expect(cartTotalSpan).toHaveTextContent("1");
// });
