import { useContext } from "react";
import "./Bags.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

function Bags() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const bags = [
    {
      id: 1,
      name: "Classic Leather Tote",
      price: 1999,
      image: "/images/Begs/bag1.jpg",
    },
    {
      id: 2,
      name: "Luxury Shoulder Bag",
      price: 2999,
      image: "/images/Begs/beg9.jpg",
    },
    {
      id: 3,
      name: "Premium Travel Bag",
      price: 2499,
      image: "/images/Begs/beg14.jpg",
    },
    {
      id: 4,
      name: "Elegant Office Bag",
      price: 3499,
      image: "/images/Begs/beg15.jpg",
    },
    {
      id: 5,
      name: "Casual Daily Backpack",
      price: 1899,
      image: "/images/Begs/beg10.jpg",
    },
    {
      id: 6,
      name: "Mini Party Handbag",
      price: 3999,
      image: "/images/Begs/beg20.jpg",
    },
  ];

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="bags-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/Begs/bannercollection.jpg)" }}
      ></div>

      {/* Products */}
      <div className="bags-container">
        {bags.map((bag) => (
          <div className="bag-card" key={bag.id}>
            <div className="bag-img-box">
              <img src={bag.image} alt={bag.name} />

              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(bag)}
              >
                {
                  isWishlisted(bag.id) ? (
                    <FaHeart color="red" /> 
                  ) : (
                    <FaRegHeart color="#aaa" />
                    
                  )
                }
              </button>
            </div>

            <h3>{bag.name}</h3>
            <p className="price">₹{bag.price.toLocaleString("en-IN")}</p>

            {/* ✅ ADD TO CART BUTTON */}
            <button className="cart-btn" onClick={() => addToCart(bag)}>
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bags;
