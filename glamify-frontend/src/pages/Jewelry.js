import { useContext, useEffect, useState } from "react";
import "./Jewelry.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

const API_URL = "http://localhost:5000/api";

function Jewelry() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [jwelerys, setJwelerys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products?category=Jewelry`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.length > 0) {
          setJwelerys(data);
        } else {
          setJwelerys(dummyJewelry);
        }
      } catch (err) {
        console.error(err);
        setJwelerys(dummyJewelry);
      } finally {
        setLoading(false);
      }
    };
    fetchJewelry();
  }, []);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="Jewelry-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/Jwelery/jbanner.jpg)" }}
      ></div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
          Loading...
        </div>
      ) : (
        <div className="Jewelry-container">
          {jwelerys.map((item) => (
            <div className="Jewelry-card" key={item._id || item.id}>
              <div className="Jewelry-img-box">
                <img
                  src={
                    item.images?.[0]
                      ? item.images[0].startsWith("http")
                        ? item.images[0]
                        : `http://localhost:5000${item.images[0]}`
                      : item.image
                  }
                  alt={item.name}
                />
                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(item)}
                >
                  {isWishlisted(item._id || item.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="#aaa" />
                  )}
                </button>
              </div>

              <h3>{item.name}</h3>
              <p className="price">₹{item.price.toLocaleString("en-IN")}</p>

              <button
                className="cart-btn"
                onClick={() =>
                  addToCart({
                    id: item._id || item.id,
                    name: item.name,
                    price: item.price,
                    image: item.images?.[0]
                      ? item.images[0].startsWith("http")
                        ? item.images[0]
                        : `http://localhost:5000${item.images[0]}`
                      : item.image,
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

const dummyJewelry = [
  {
    id: 19,
    name: "Aesthetic necklace",
    price: 1900,
    image: "/images/Jwelery/j1.jpg",
  },
  { id: 20, name: "Lulu Ring", price: 2999, image: "/images/Jwelery/j3.jpg" },
  { id: 21, name: "Bracelet", price: 3999, image: "/images/Jwelery/j4.jpg" },
  { id: 22, name: "Knot Ring", price: 2499, image: "/images/Jwelery/j6.jpg" },
  {
    id: 23,
    name: "Layered Necklace",
    price: 2199,
    image: "/images/Jwelery/j5.jpg",
  },
  {
    id: 24,
    name: "Pendant Necklace",
    price: 4999,
    image: "/images/Jwelery/j7.webp",
  },
];

export default Jewelry;
