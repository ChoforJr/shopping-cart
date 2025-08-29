import "./App.css";
import HomePage from "./HomePage";
import Shop from "./Shop";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import { ItemContext } from "./ItemContext";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { House, Store, ShoppingCart } from "lucide-react";

const App = () => {
  const { name } = useParams();
  const [items, setItems] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const neededItems = result.map((item) => {
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            orders: item.orders ? item.orders : 0,
          };
        });

        setItems(neededItems);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!items) return;
    setTotalOrders(() => {
      const sum = items.reduce((total, item) => {
        return total + item.orders;
      }, 0);
      return sum;
    });
    setTotalPrice(() => {
      const sum = items.reduce((total, item) => {
        const product = item.price * item.orders;
        return total + product;
      }, 0);
      return sum;
    });
  }, [items]);

  function increaseOrDecrease(id, change) {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        let newOrders;
        if (item.id == id) {
          if (change == "+") {
            newOrders = item.orders + 1;
          } else if (change == "-") {
            newOrders = item.orders - 1;
          } else {
            newOrders = 0;
          }
          return {
            ...item,
            orders: newOrders,
          };
        }
        return item;
      });
      return updatedItems;
    });
  }

  function increaseOrders(id) {
    const firstChar = parseInt(id, 10);
    increaseOrDecrease(firstChar, "+");
  }

  function decreaseOrders(id) {
    const firstChar = parseInt(id, 10);
    increaseOrDecrease(firstChar, "-");
  }

  function onChangeInput(event, id) {
    const { value } = event.target;
    const firstChar = parseInt(id, 10);

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id == firstChar) {
          return {
            ...item,
            orders: Number(value),
          };
        }
        return item;
      });
      return updatedItems;
    });
  }

  function removeOrders(id) {
    const firstChar = parseInt(id, 10);
    increaseOrDecrease(firstChar, "R");
  }

  function clearOrders() {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        return {
          ...item,
          orders: 0,
        };
      });
      return updatedItems;
    });
  }

  const value = {
    items,
    increaseOrders,
    decreaseOrders,
    onChangeInput,
    removeOrders,
    totalPrice,
    clearOrders,
  };

  return (
    <>
      <nav>
        <h1>
          <Link to="/">Shopping Cart</Link>
        </h1>
        <section>
          <Link to="/">
            <House size={40} />
            <button>Home</button>
          </Link>
          <Link to="/shop">
            <Store size={40} />
            <button>Shop</button>
          </Link>
          <Link to="/cart">
            <ShoppingCart size={40} />
            <span role="status" data-testid="cart-total">
              {totalOrders}
            </span>
            <button>Cart</button>
          </Link>
        </section>
      </nav>
      <main>
        <ItemContext.Provider value={value}>
          {name === "shop" ? (
            <Shop />
          ) : name === "cart" ? (
            <Cart />
          ) : (
            <HomePage />
          )}
        </ItemContext.Provider>
      </main>
      <footer>
        Made by{" "}
        <a href="https://github.com/ChoforJr/shopping-cart" target="_blank">
          Chofor Forsakang
        </a>
      </footer>
    </>
  );
};

export default App;
