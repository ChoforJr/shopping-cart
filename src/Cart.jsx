import { ItemContext } from "./ItemContext";
import { useContext } from "react";

export default function Cart() {
  const { items, addToCartBtn, removeFromCartBtn, onChangeInput } =
    useContext(ItemContext);
  return (
    <>
      {items.map(
        (item) =>
          item.orders > 0 && (
            <Card
              item={item}
              key={item.id}
              addToCartBtn={addToCartBtn}
              removeFromCartBtn={removeFromCartBtn}
              onChangeInput={onChangeInput}
            />
          )
      )}
    </>
  );
}

function Card({ item, addToCartBtn, removeFromCartBtn, onChangeInput }) {
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
        <button id={item.id + "decrease"} onClick={removeFromCartBtn}>
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
        <button id={item.id + "increase"} onClick={addToCartBtn}>
          +
        </button>
      </div>
    </article>
  );
}
