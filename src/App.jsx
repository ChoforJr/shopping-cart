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

  // useEffect(() => {
  //   const allOrders = items.map((item) => {
  //     return item.orders;
  //   });
  //   let result = allOrders.reduce((sum, current) => sum + current, 0);

  //   setTotalOrders(result);
  // }, [items]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  function addToCart(id) {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            orders: item.orders + 1,
          };
        }
        return item;
      });
      return updatedItems;
    });

    setTotalOrders((prevTotal) => prevTotal + 1);
  }

  function removeFromCart(id) {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            orders: item.orders - 1,
          };
        }
        return item;
      });
      return updatedItems;
    });

    setTotalOrders((prevTotal) => prevTotal - 1);
  }

  function addToCartFromShop(event) {
    const { tagName } = event.target;
    const { id } = event.currentTarget;

    if (tagName !== "BUTTON") {
      return;
    }
    addToCart(id);
  }

  const value = {
    items,
    addToCartFromShop,
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
            <button>Cart</button>
            <span>{totalOrders}</span>
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
