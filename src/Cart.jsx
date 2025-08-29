import { ItemContext } from "./ItemContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    items,
    increaseOrders,
    decreaseOrders,
    onChangeInput,
    removeOrders,
    clearOrders,
  } = useContext(ItemContext);
  if (!items) {
    return <div>Loading...</div>;
  }

  const itemsInCart = items.filter((item) => item.orders > 0);

  const totalPrice = items.reduce((total, item) => {
    const product = item.price * item.orders;
    return total + product;
  }, 0);

  if (itemsInCart.length === 0) {
    return (
      <section>
        <h2>Your cart is empty</h2>
        <Link to="/shop">
          <button>Continue Shopping</button>
        </Link>
      </section>
    );
  }
  return (
    <>
      <h2>Your Cart</h2>
      <section>
        <h3 aria-label="Cart-Items">Cart Items {`(${itemsInCart.length})`}</h3>
        {itemsInCart.map((item) => (
          <Card
            item={item}
            key={item.id}
            increaseOrders={increaseOrders}
            decreaseOrders={decreaseOrders}
            onChangeInput={onChangeInput}
            removeOrders={removeOrders}
          />
        ))}
      </section>

      <section>
        <h3>Order Summary</h3>

        <div>
          <h4>Total </h4>
          <h4 aria-label="Total-Price">${totalPrice}</h4>
        </div>

        <div>
          <button onClick={clearOrders} aria-label="Clear-Cart">
            Clear Cart
          </button>
          <button>Checkout</button>
        </div>
        <Link to="/shop">Continue Shopping</Link>
      </section>
    </>
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
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <div>
        <button
          onClick={() => decreaseOrders(item.id)}
          aria-label={`Reduce ${item.title} orders from cart`}
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
        >
          +
        </button>
        <button
          onClick={() => removeOrders(item.id)}
          aria-label={`Remove ${item.title} orders from cart`}
        >
          Remove
        </button>
      </div>
      <hr />
    </article>
  );
}
