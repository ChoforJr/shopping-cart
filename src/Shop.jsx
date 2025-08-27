import { ItemContext } from "./ItemContext";
import { useContext } from "react";

export default function Shop() {
  const { items, increaseOrders } = useContext(ItemContext);
  if (!items) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {items.map((item) => (
        <Card item={item} increaseOrders={increaseOrders} key={item.id} />
      ))}
    </>
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
      <button onClick={increaseOrders} id={+item.id + "increase"}>
        Add to Cart
      </button>
    </article>
  );
}
