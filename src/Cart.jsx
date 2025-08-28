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
    totalPrice,
    clearOrders,
  } = useContext(ItemContext);
  if (!items) {
    return <div>Loading...</div>;
  }

  const itemsInCart = items.filter((item) => item.orders > 0);

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
        <h3>Cart Items {`(${itemsInCart.length})`}</h3>
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
          <h4>${totalPrice}</h4>
        </div>

        <div>
          <button onClick={clearOrders}>Clear Cart</button>
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
          id={item.id + "decrease"}
          onClick={decreaseOrders}
          aria-label={`Reduce ${item.title} orders from cart`}
        >
          -
        </button>
        <input
          type="number"
          name={item.title}
          id={item.id + "input"}
          value={item.orders}
          onChange={onChangeInput}
          min={1}
        />
        <button
          id={item.id + "increase"}
          onClick={increaseOrders}
          aria-label={`Add ${item.title} to cart`}
        >
          +
        </button>
        <button
          id={item.id + "remove"}
          onClick={removeOrders}
          aria-label={`Remove ${item.title} orders from cart`}
        >
          Remove
        </button>
      </div>
      <hr />
    </article>
  );
}
