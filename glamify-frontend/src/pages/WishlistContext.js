import { createContext, useState, useEffect, useContext } from "react";
import { CartContext } from "./CartContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useContext(CartContext); // ✅ CartContext use

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

 const toggleWishlist = (product) => {
  // Image URL fix
  const fixedImage = product.image
    ? product.image?.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`
    : product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : `http://localhost:5000${product.images?.[0]}`;

  const exists = wishlist.some((item) => item.id === (product._id || product.id));
  if (exists) {
    setWishlist(wishlist.filter((item) => item.id !== (product._id || product.id)));
  } else {
    setWishlist([...wishlist, { ...product, image: fixedImage }]);
  }
};

  const addFromWishlist = (id) => {
    const item = wishlist.find((item) => item.id === id);
    if (item) {
      addToCart(item);  
      setWishlist(wishlist.filter((i) => i.id !== id)); 
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, removeFromWishlist, addFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};