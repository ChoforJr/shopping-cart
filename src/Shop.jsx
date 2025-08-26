import { ItemContext } from "./ItemContext";
import { useContext } from "react";

export default function Shop() {
  const { items, addToCartFromShop } = useContext(ItemContext);
  return (
    <>
      {items.map((item) => (
        <Card item={item} addToCartFromShop={addToCartFromShop} key={item.id} />
      ))}
    </>
  );
}

function Card({ item, addToCartFromShop }) {
  return (
    <article onClick={addToCartFromShop} id={item.id}>
      {item.image ? (
        <img src={item.image} alt={item.title} />
      ) : (
        <p>Loading...</p>
      )}
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <button>Add to Cart</button>
    </article>
  );
}
