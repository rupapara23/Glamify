import { useContext } from "react";
import "./Watches.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

function Watch() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const watches = [
    { id: 13, name: "Centrix Watch", price: 1999, image: "/images/Watches/r7-1.jpg" },
    { id: 14, name: "Captain Cook", price: 2999, image: "/images/Watches/c10-1.jpg" },
    { id: 15, name: "Florence", price: 3999, image: "/images/Watches/c8-1.jpg" },
    { id: 16, name: "MTP Watch", price: 2499, image: "/images/Watches/c8-3.jpg" },
    { id: 17, name: "Skeleton Watch", price: 2199, image: "/images/Watches/r4-1.jpg" },
    { id: 18, name: "Classic Watch", price: 4999, image: "/images/Watches/r8.jpg" },
  ];

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <div className="watch-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/Watches/watchbanner.jpg)" }}
      ></div>

      <div className="watch-container">
        {watches.map((watch) => (
          <div className="watch-card" key={watch.id}>

            <div className="watch-img-box">
              <img src={watch.image} alt={watch.name} />

              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(watch)}
              >
                {
                  isWishlisted(watch.id) ? (
                    <FaHeart color="red" /> 
                  ) : (
                    <FaRegHeart color="#aaa" />
                    
                  )
                }
              </button>
            </div>

            <h3>{watch.name}</h3>
            <p className="price">₹{watch.price.toLocaleString('en-IN')}</p>

            <button
              className="cart-btn"
              onClick={() => addToCart(watch)}
            >
              ADD TO CART
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Watch;