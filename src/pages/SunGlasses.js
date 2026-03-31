import { useContext } from "react";
import "./SunGlasses.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

function SunGlass() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const sunGlasses = [
    { id: 7, name: "Mufasa Sunglasses", price: 1999, image: "/images/SunGlassess/sun14.jpg" },
    { id: 8, name: "Hustlr Dark Night", price: 1299, image: "/images/SunGlassess/sun3.jpg" },
    { id: 9, name: "Polarized Sunglasses", price: 1499, image: "/images/SunGlassess/sun6.jpg" },
    { id: 10, name: "Round Sunglasses", price: 1199, image: "/images/SunGlassess/sun8.jpg" },
    { id: 11, name: "Dark Night", price: 1399, image: "/images/SunGlassess/sun12.jpg" },
    { id: 12, name: "Luxury Sunglasses", price: 1999, image: "/images/SunGlassess/sun13.jpg" },
  ];

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <div className="SunGlass-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/SunGlassess/sunbanner.jpg)" }}
      ></div>

      <div className="SunGlass-container">
        {sunGlasses.map((glass) => (
          <div className="SunGlass-card" key={glass.id}>

            <div className="SunGlass-img-box">
              <img src={glass.image} alt={glass.name} />

             <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(glass)}
              >
                {
                  isWishlisted(glass.id) ? (
                    <FaHeart color="red" /> 
                  ) : (
                    <FaRegHeart color="#aaa" />
                    
                  )
                }
              </button>
            </div>

            <h3>{glass.name}</h3>
            <p className="price">₹{glass.price.toLocaleString('en-IN')}</p>

            <button
              className="cart-btn"
              onClick={() => addToCart(glass)}
            >
              ADD TO CART
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default SunGlass;