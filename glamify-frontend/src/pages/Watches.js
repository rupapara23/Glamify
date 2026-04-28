import { useContext, useEffect, useState } from "react";
import "./Watches.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

const API_URL = "http://localhost:5000/api";

function Watch() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products?category=Watches`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        if (data.length > 0) {
          setWatches(data);
        } else {
          setWatches(dummyWatches);
        }
      } catch (err) {
        console.error(err);
        setWatches(dummyWatches);
      } finally {
        setLoading(false);
      }
    };
    fetchWatches();
  }, []);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="watch-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/Watches/watchbanner.jpg)" }}
      ></div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
          Loading...
        </div>
      ) : (
        <div className="watch-container">
          {watches.map((watch) => (
            <div className="watch-card" key={watch._id || watch.id}>
              <div className="watch-img-box">
                <img
                  src={
                    watch.images?.[0]
                      ? watch.images[0].startsWith("http")
                        ? watch.images[0]
                        : `http://localhost:5000${watch.images[0]}`
                      : watch.image
                  }
                  alt={watch.name}
                />
                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(watch)}
                >
                  {isWishlisted(watch._id || watch.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="#aaa" />
                  )}
                </button>
              </div>

              <h3>{watch.name}</h3>
              <p className="price">₹{watch.price.toLocaleString("en-IN")}</p>

              <button
                className="cart-btn"
                onClick={() =>
                  addToCart({
                    id: watch._id || watch.id,
                    name: watch.name,
                    price: watch.price,
                    image: watch.images?.[0]
                      ? watch.images[0].startsWith("http")
                        ? watch.images[0]
                        : `http://localhost:5000${watch.images[0]}`
                      : watch.image,
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

const dummyWatches = [
  {
    id: 13,
    name: "Centrix Watch",
    price: 1999,
    image: "/images/Watches/r7-1.jpg",
  },
  {
    id: 14,
    name: "Captain Cook",
    price: 2999,
    image: "/images/Watches/c10-1.jpg",
  },
  { id: 15, name: "Florence", price: 3999, image: "/images/Watches/c8-1.jpg" },
  { id: 16, name: "MTP Watch", price: 2499, image: "/images/Watches/c8-3.jpg" },
  {
    id: 17,
    name: "Skeleton Watch",
    price: 2199,
    image: "/images/Watches/r4-1.jpg",
  },
  {
    id: 18,
    name: "Classic Watch",
    price: 4999,
    image: "/images/Watches/r8.jpg",
  },
];

export default Watch;
