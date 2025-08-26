import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // 1. Import MemoryRouter
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import Shop from "./Shop";

const getMockItems = () => [
  {
    id: "a1",
    title: "Classic T-Shirt",
    price: 25,
    image: "tshirt.jpg",
    orders: 1,
  },
  { id: "b2", title: "Denim Jeans", price: 70, image: "jeans.jpg", orders: 0 },
  { id: "c3", title: "Summer Hat", price: 15, image: null, orders: 2 },
];

describe("Shop Component", () => {
  // The `render` function from React Testing Library renders the component in a virtual DOM.

  beforeEach(() => {
    render(
      <MemoryRouter>
        <Shop items={getMockItems()} />
      </MemoryRouter>
    );
  });

  // Test case 1: Ensure the Shop renders the correct number of items.
  it("renders a card for each item in the props", () => {
    // `screen.getAllByRole` queries the virtual DOM for all elements with the role 'article'.
    // Our <Card> component uses an <article> tag as its root element.
    const cardElements = screen.getAllByRole("article");

    // `expect` is from Jest. We assert that the number of found articles
    // is the same as the length of our mock data array.
    expect(cardElements).toHaveLength(getMockItems().length);
  });

  // Test case 2: Ensure an individual card displays all its data correctly.
  it("renders item details correctly within a card", () => {
    // Check for the first item's details
    expect(screen.getByText("Classic T-Shirt")).toBeInTheDocument();
    expect(screen.getByText("$25")).toBeInTheDocument();

    // Check that the image is rendered with the correct src and alt text
    const tshirtImage = screen.getByAltText("Classic T-Shirt");
    expect(tshirtImage).toBeInTheDocument();
    expect(tshirtImage).toHaveAttribute("src", "tshirt.jpg");

    // Check that the input field has the correct default value
    // We query by the value to be specific.
    const inputs = screen.getAllByRole("spinbutton"); // input type="number"
    const tshirtInput = inputs.find((input) => input.defaultValue === "1");
    expect(tshirtInput).toBeInTheDocument();
  });

  // Test case 3: Check for the conditional "Loading..." text when an image is missing.
  it('renders "Loading..." text when an item has no image', () => {
    // The third item in our mock data has a null image.
    // We assert that the text "Loading..." is present in the document.
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // We can also assert that the image for this item does NOT exist.
    const hatImage = screen.queryByAltText("Summer Hat");
    expect(hatImage).not.toBeInTheDocument();
  });

  // Test case 4: Ensure all inputs are rendered.
  it("renders an input field for each item", () => {
    // `getAllByRole('spinbutton')` is a reliable way to find number inputs.
    const inputFields = screen.getAllByRole("spinbutton");
    expect(inputFields).toHaveLength(getMockItems().length);
  });
});

// describe("Testing Shop Input User Event", () => {
//   // State is now managed within the Shop component.
//   const [items, setItems] = useState([
//     {
//       id: "a1",
//       title: "Classic T-Shirt",
//       price: 25,
//       image: "tshirt.jpg",
//       orders: 1,
//     },
//     {
//       id: "b2",
//       title: "Denim Jeans",
//       price: 70,
//       image: "jeans.jpg",
//       orders: 0,
//     },
//     { id: "c3", title: "Summer Hat", price: 15, image: null, orders: 2 },
//   ]);

//   // This function updates the state when an order quantity changes.
//   const handleOrderChange = (itemId, newOrderCount) => {
//     setItems((currentItems) =>
//       currentItems.map((item) =>
//         item.id === itemId ? { ...item, orders: newOrderCount } : item
//       )
//     );
//   };
//   it("Input Number increase", async () => {
//     // It's good practice to set up userEvent before rendering.
//     const user = userEvent.setup();
//     render(<Shop items={items} onChangePrice={handleOrderChange} />);

//     // 1. Find the specific input field we want to interact with.
//     // Using getByLabelText is a great, accessible way to select form elements.
//     const jeansInput = screen.getByLabelText("Orders for Denim Jeans");

//     // 2. Verify its initial value.
//     expect(jeansInput).toHaveValue(0);

//     // 3. Simulate the user clearing the input and typing a new value.
//     // The `await` is important because user actions are asynchronous.
//     await user.clear(jeansInput);
//     await user.type(jeansInput, "5");

//     // 4. Assert that the input's value has been updated to what the user typed.
//     expect(jeansInput).toHaveValue(5);
//   });
// });
