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

    const cartTotalSpan = await screen.findByRole("status");

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

    const cartTotalSpan = await screen.findByRole("status");

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

    const cartTotalSpan = await screen.findByRole("status");

    await user.click(removeButton);

    expect(cartTotalSpan).toHaveTextContent("10");
  });
  it("change Order: should change value when user changes the value", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    const changeInput = await screen.findByRole("spinbutton", {
      name: /Test Backpack input orders to cart/i,
    });

    const cartTotalSpan = await screen.findByRole("status");

    // await user.clear(changeInput);
    // expect(cartTotalSpan).toHaveTextContent("11");

    await user.type(changeInput, "0");

    expect(cartTotalSpan).toHaveTextContent("51");
  });
  it("No Items Loaded Check", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);
    const loading = screen.getByText(/Loading/i);

    expect(loading).toBeInTheDocument();
  });
  it("Numbers of items In Cart", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    const cartItems = await screen.findByRole("heading", {
      name: /Cart-Items/i,
    });

    expect(cartItems).toHaveTextContent("Cart Items (3)");
  });
  it("Total price check", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    const totalPrice = await screen.findByRole("heading", {
      name: /Total-Price/i,
    });

    setTimeout(() => {
      expect(totalPrice).toHaveTextContent("$800");
    }, 2000);
  });
  it("Clear Card button check", async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);

    const clearCartBtn = await screen.findByRole("button", {
      name: /Clear-Cart/i,
    });

    const cartTotalSpan = await screen.findByRole("status");

    await user.click(clearCartBtn);

    expect(cartTotalSpan).toHaveTextContent("0");
  });
  it("No Items in cart Check", async () => {
    const mockItems = [
      {
        id: 1,
        title: "Test Backpack",
        price: 100,
        image: "backpack.png",
        orders: 0,
      },
      {
        id: 2,
        title: "Test T-Shirt",
        price: 25,
        image: "tshirt.png",
        orders: 0,
      },
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
    const router = createMemoryRouter(routes, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={router} />);
    const cartEmpty = await screen.findByText(/Your cart is empty/i);

    expect(cartEmpty).toBeInTheDocument();
  });
});
