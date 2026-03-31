// import { createContext, useState, useEffect } from "react";

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   // Load from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(saved);
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   // Add / Remove toggle
//   const toggleWishlist = (product) => {
//     const exists = wishlist.some((item) => item.id === product.id);

//     if (exists) {
//       setWishlist(wishlist.filter((item) => item.id !== product.id));
//     } else {
//       setWishlist([...wishlist, product]);
//     }
//   };

//   const addFromWishlist = (id) => {
//     setWishlist(wishlist.filter((item) => item.id !== id));
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist(wishlist.filter((item) => item.id !== id));
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, toggleWishlist, removeFromWishlist, addFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };
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
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
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