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
            orders: 0,
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
    if (items) {
      setTotalOrders(() => {
        const ordersArray = items.map((item) => {
          return item.orders;
        });
        const sum = ordersArray.reduce((sum, current) => sum + current, 0);
        return sum;
      });
    }
  }, [items]);

  function addOrRemove(id, change) {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        let newOrders;
        if (item.id == id) {
          if (change == "+") {
            newOrders = item.orders + 1;
          } else {
            newOrders = item.orders - 1;
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

  function addToCartBtn(event) {
    const { id } = event.target;
    const firstChar = id.charAt(0);
    addOrRemove(firstChar, "+");
  }

  function removeFromCartBtn(event) {
    const { id } = event.target;
    const firstChar = id.charAt(0);
    addOrRemove(firstChar, "-");
  }

  function onChangeInput(event) {
    const { id, value } = event.target;
    const firstChar = id.charAt(0);

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

  const value = {
    items,
    addToCartBtn,
    removeFromCartBtn,
    onChangeInput,
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
            <span>{totalOrders}</span>
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
