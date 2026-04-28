import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const API_URL = "http://localhost:5000/api";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getToken = () => localStorage.getItem("token");
  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch { return null; }
  };

  // App open thay tyare cart load karo
  useEffect(() => {
    const user = getUser();
    if (user) {
      fetchCart(); // Login hoy to API thi
    } else {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(saved); // Login na hoy to localStorage thi
    }
  }, []);

  // API thi cart fetch karo
  const fetchCart = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const res = await fetch(`${API_URL}/cart`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setCart(data.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(saved);
    }
  };

  // Cart save karo — login hoy to API, nahi to localStorage
  const saveCart = async (updatedCart) => {
    const user = getUser();
    if (user) {
      try {
        const token = getToken();
        await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ items: updatedCart })
        });
      } catch (err) {
        console.error("Cart save error:", err);
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Add to cart
const addToCart = (product) => {
  // Image URL fix
  const fixedImage = product.image?.startsWith("http")
    ? product.image
    : `http://localhost:5000${product.image}`;

  const exists = cart.find((item) => item.id === product.id);
  let updatedCart;
  if (exists) {
    updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    );
  } else {
    updatedCart = [...cart, { ...product, image: fixedImage, qty: 1 }];
  }
  setCart(updatedCart);
  saveCart(updatedCart);
};

  // Remove
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // Increase qty
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // Decrease qty
  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};