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
    totalOrders,
    totalPrice,
    clearOrders,
  } = useContext(ItemContext);
  if (!items) {
    return <div>Loading...</div>;
  }
  if (!totalOrders > 0) {
    return (
      <section>
        <p>Your cart is empty</p>
        <Link to="/shop">
          <button>Continue Shopping</button>
        </Link>
      </section>
    );
  }
  return (
    <>
      <section>
        <h2>Cart Items</h2>
        {items.map(
          (item) =>
            item.orders > 0 && (
              <Card
                item={item}
                key={item.id}
                increaseOrders={increaseOrders}
                decreaseOrders={decreaseOrders}
                onChangeInput={onChangeInput}
                removeOrders={removeOrders}
              />
            )
        )}
      </section>

      <section>
        <h3>Order Summary</h3>

        <div>
          <p>Total Price: ${totalPrice}</p>
          <p>Total Orders: {totalOrders}</p>
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
      {item.image ? (
        <img src={item.image} alt={item.title} />
      ) : (
        <p>Loading...</p>
      )}
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <div>
        <button id={item.id + "decrease"} onClick={decreaseOrders}>
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
        <button id={item.id + "increase"} onClick={increaseOrders}>
          +
        </button>
        <button id={item.id + "remove"} onClick={removeOrders}>
          Remove
        </button>
      </div>
      <hr />
    </article>
  );
}
