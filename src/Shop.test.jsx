import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// 1. Import createMemoryRouter and RouterProvider instead of MemoryRouter
import { createMemoryRouter, RouterProvider } from "react-router-dom";
// 2. Import the actual routes from your app to ensure the test matches reality
import routes from "./routes";
import userEvent from "@testing-library/user-event";

// --- ARRANGE ---
// Mock the API call so our tests are fast and predictable
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
  // By removing the beforeEach hook and rendering inside the test,
  // we ensure the entire async lifecycle is handled within the test's scope,
  // which resolves the 'act' warning.
  it("Each Item should be rendered as an article", async () => {
    // ARRANGE: Set up the router and render the component for this specific test.
    // 3. Create a router that uses your app's routes configuration.
    // This more accurately simulates your application's behavior.
    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });
    // 4. Render the RouterProvider with the created router.
    // This will correctly match the "/shop" path and render your <App> component
    // with the right params.
    render(<RouterProvider router={router} />);

    // ACT & ASSERT: Wait for the final state to be rendered.
    // `findAllByRole` correctly waits for the async fetch and subsequent state updates.
    // Containing this within the `it` block ensures the test doesn't finish prematurely.
    const cardElements = await screen.findAllByRole("article");

    expect(cardElements).toHaveLength(mockItems.length);
  });
  it("increaseOrders: should increment cart total when add button is clicked", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/shop"], // Start the test at the /shop route
    });
    render(<RouterProvider router={router} />);

    // Find the add button for the backpack once items have loaded
    const addButton = await screen.findByRole("button", {
      name: /add test backpack to cart/i,
    });
    // Find the cart total display in the navbar
    const cartTotalSpan = screen.getByText("0"); // It starts at 0

    // --- ACT ---
    await user.click(addButton);

    // --- ASSERT ---
    // The total in the navbar should now be "1"
    expect(cartTotalSpan).toHaveTextContent("1");

    // You could also check the total price if it were displayed
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
});

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
