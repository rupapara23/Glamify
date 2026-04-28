import { useContext, useEffect, useState } from "react";
import "./SunGlasses.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

const API_URL = "http://localhost:5000/api";

function SunGlass() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [sunGlasses, setSunGlasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSunGlasses = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products?category=Sunglasses`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.length > 0) {
          setSunGlasses(data);
        } else {
          setSunGlasses(dummySunGlasses);
        }
      } catch (err) {
        console.error(err);
        setSunGlasses(dummySunGlasses);
      } finally {
        setLoading(false);
      }
    };
    fetchSunGlasses();
  }, []);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="SunGlass-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/SunGlassess/sunbanner.jpg)" }}
      ></div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
          Loading...
        </div>
      ) : (
        <div className="SunGlass-container">
          {sunGlasses.map((glass) => (
            <div className="SunGlass-card" key={glass._id || glass.id}>
              <div className="SunGlass-img-box">
                <img
                  src={
                    glass.images?.[0]
                      ? glass.images[0].startsWith("http")
                        ? glass.images[0]
                        : `http://localhost:5000${glass.images[0]}`
                      : glass.image
                  }
                  alt={glass.name}
                />
                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(glass)}
                >
                  {isWishlisted(glass._id || glass.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="#aaa" />
                  )}
                </button>
              </div>

              <h3>{glass.name}</h3>
              <p className="price">₹{glass.price.toLocaleString("en-IN")}</p>

              <button
                className="cart-btn"
                onClick={() =>
                  addToCart({
                    id: glass._id || glass.id,
                    name: glass.name,
                    price: glass.price,
                    image: glass.images?.[0]
                      ? glass.images[0].startsWith("http")
                        ? glass.images[0]
                        : `http://localhost:5000${glass.images[0]}`
                      : glass.image,
                  })
                }
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Fallback dummy data
const dummySunGlasses = [
  {
    id: 7,
    name: "Mufasa Sunglasses",
    price: 1999,
    image: "/images/SunGlassess/sun14.jpg",
  },
  {
    id: 8,
    name: "Hustlr Dark Night",
    price: 1299,
    image: "/images/SunGlassess/sun3.jpg",
  },
  {
    id: 9,
    name: "Polarized Sunglasses",
    price: 1499,
    image: "/images/SunGlassess/sun6.jpg",
  },
  {
    id: 10,
    name: "Round Sunglasses",
    price: 1199,
    image: "/images/SunGlassess/sun8.jpg",
  },
  {
    id: 11,
    name: "Dark Night",
    price: 1399,
    image: "/images/SunGlassess/sun12.jpg",
  },
  {
    id: 12,
    name: "Luxury Sunglasses",
    price: 1999,
    image: "/images/SunGlassess/sun13.jpg",
  },
];

export default SunGlass;
