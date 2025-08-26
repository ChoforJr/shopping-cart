import { ItemContext } from "./ItemContext";
import { useContext } from "react";

export default function Shop() {
  const { items, addToCartBtn } = useContext(ItemContext);
  if (!items) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {items.map((item) => (
        <Card item={item} addToCartBtn={addToCartBtn} key={item.id} />
      ))}
    </>
  );
}

function Card({ item, addToCartBtn }) {
  return (
    <article id={item.id}>
      {item.image ? (
        <img src={item.image} alt={item.title} />
      ) : (
        <p>Loading...</p>
      )}
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <button onClick={addToCartBtn} id={+item.id + "increase"}>
        Add to Cart
      </button>
    </article>
  );
}
