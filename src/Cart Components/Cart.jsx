import { ItemContext } from "../ItemContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./cart.module.css";

export default function Cart() {
  const {
    items,
    increaseOrders,
    decreaseOrders,
    onChangeInput,
    removeOrders,
    clearOrders,
    totalPrice,
  } = useContext(ItemContext);

  if (!items) {
    return <div>Loading...</div>;
  }

  const itemsInCart = items.filter((item) => item.orders > 0);

  if (itemsInCart.length === 0) {
    return (
      <section className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <Link to="/shop">
          <button>Continue Shopping</button>
        </Link>
      </section>
    );
  }

  return (
    <main className={styles.body}>
      <h2>Your Cart</h2>
      <section className={styles.cart}>
        <h3 aria-label="Cart-Items">Cart Items {`(${itemsInCart.length})`}</h3>
        <hr />
        {itemsInCart.map((item) => (
          <>
            <Card
              item={item}
              key={item.id}
              increaseOrders={increaseOrders}
              decreaseOrders={decreaseOrders}
              onChangeInput={onChangeInput}
              removeOrders={removeOrders}
            />
            <hr />
          </>
        ))}
      </section>

      <section className={styles.summary}>
        <h3>Order Summary</h3>

        <div className={styles.summaryTotal}>
          <h4>Total </h4>
          <h4 aria-label="Total-Price">${totalPrice}</h4>
        </div>

        <div className={styles.summaryBtns}>
          <button onClick={clearOrders} aria-label="Clear-Cart">
            Clear Cart
          </button>
          <button>Checkout</button>
        </div>
        <Link to="/shop">Continue Shopping</Link>
      </section>
    </main>
  );
}

function Card({
  item,
  increaseOrders,
  decreaseOrders,
  onChangeInput,
  removeOrders,
}) {
  return (
    <article id={item.id}>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>${item.price}</p>
        <div className={styles.changeBtns}>
          <button
            onClick={() => decreaseOrders(item.id)}
            aria-label={`Reduce ${item.title} orders from cart`}
            className={styles.substractBtn}
          >
            -
          </button>
          <input
            type="number"
            name={item.title}
            value={item.orders}
            onChange={(e) => onChangeInput(e, item.id)}
            min={1}
            aria-label={`${item.title} input orders to cart`}
          />
          <button
            onClick={() => increaseOrders(item.id)}
            aria-label={`Add ${item.title} to cart`}
            className={styles.addBtn}
          >
            +
          </button>
          <button
            onClick={() => removeOrders(item.id)}
            aria-label={`Remove ${item.title} orders from cart`}
            className={styles.removeBtn}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
