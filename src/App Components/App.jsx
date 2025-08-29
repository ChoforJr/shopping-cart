import "./App.css";
import HomePage from "../HomePage Components/HomePage";
import Shop from "../ShopPage Components/Shop.jsx";
import Cart from "../Cart Components/Cart";
import { ItemContext } from "../ItemContext";
import { useAppLogic } from "./UseAppLogic";

import { Link } from "react-router-dom";

import { House, Store, ShoppingCart } from "lucide-react";

const App = () => {
  const {
    name,
    items,
    totalOrders,
    totalPrice,
    increaseOrders,
    decreaseOrders,
    onChangeInput,
    removeOrders,
    clearOrders,
  } = useAppLogic();

  const value = {
    items,
    totalPrice,
    increaseOrders,
    decreaseOrders,
    onChangeInput,
    removeOrders,
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
