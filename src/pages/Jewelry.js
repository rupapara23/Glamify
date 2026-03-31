import { useContext } from "react";
import "./Jewelry.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

function Jewelry() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const Jwelerys = [
    { id: 19, name: "Aesthetic necklace", price: 1900, image: "/images/Jwelery/j1.jpg" },
    { id: 20, name: "Lulu Ring", price: 2999, image: "/images/Jwelery/j3.jpg" },
    { id: 21, name: "Bracelet", price: 3999, image: "/images/Jwelery/j4.jpg" },
    { id: 22, name: "Knot Ring", price: 2499, image: "/images/Jwelery/j6.jpg" },
    { id: 23, name: "Layered Necklace", price: 2199, image: "/images/Jwelery/j5.jpg" },
    { id: 24, name: "Pendant Necklace", price: 4999, image: "/images/Jwelery/j7.webp" },
  ];

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <div className="Jewelry-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/Jwelery/jbanner.jpg)" }}
      ></div>

      <div className="Jewelry-container">
        {Jwelerys.map((item) => (
          <div className="Jewelry-card" key={item.id}>

            <div className="Jewelry-img-box">
              <img src={item.image} alt={item.name} />

              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(item)}
              >
                {
                  isWishlisted(item.id) ? (
                    <FaHeart color="red" /> 
                  ) : (
                    <FaRegHeart color="#aaa" />
                    
                  )
                }
              </button>
            </div>

            <h3>{item.name}</h3>
            <p className="price">₹{item.price.toLocaleString('en-IN')}</p>

            <button
              className="cart-btn"
              onClick={() => addToCart(item)}
            >
              ADD TO CART
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Jewelry;