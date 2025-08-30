import { ItemContext } from "../ItemContext";
import { useContext } from "react";
import styles from "./shop.module.css";

export default function Shop() {
  const { items, increaseOrders } = useContext(ItemContext);
  if (!items) {
    return <div>Loading...</div>;
  }
  return (
    <main className={styles.body}>
      {items.map((item) => (
        <Card item={item} increaseOrders={increaseOrders} key={item.id} />
      ))}
    </main>
  );
}

function Card({ item, increaseOrders }) {
  return (
    <article id={item.id}>
      {item.image ? (
        <img src={item.image} alt={item.title} />
      ) : (
        <p>Loading...</p>
      )}
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <button
        onClick={() => increaseOrders(item.id)}
        aria-label={`Add ${item.title} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
}
