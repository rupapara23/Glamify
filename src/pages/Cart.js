import { useContext } from "react";
import { CartContext } from "../pages/CartContext";
import "./Cart.css";


function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="text-center mb-4">My Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="text-center">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h5>{item.name}</h5>
                <p>₹{item.price.toLocaleString('en-IN')}</p>

                <div className="qty-box">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="total">Total: ₹{total.toLocaleString('en-IN')}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;