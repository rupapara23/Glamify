import { useContext, useEffect, useState } from "react";
import "./Bags.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WishlistContext } from "../pages/WishlistContext";
import { CartContext } from "../pages/CartContext";

const API_URL = "http://localhost:5000/api";

function Bags() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBags = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products?category=Bags`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        // API thi data aave to use karo — nahi to dummy
        if (data.length > 0) {
          setBags(data);
        } else {
          setBags(dummyBags);
        }
      } catch (err) {
        console.error(err);
        setBags(dummyBags);
      } finally {
        setLoading(false);
      }
    };

    fetchBags();
  }, []);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="bags-page">
      <div
        className="bags-banner"
        style={{ backgroundImage: "url(/images/Begs/bannercollection.jpg)" }}
      ></div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", fontSize: "18px" }}>
          Loading...
        </div>
      ) : (
        <div className="bags-container">
          {bags.map((bag) => (
            <div className="bag-card" key={bag._id || bag.id}>
              <div className="bag-img-box">
                <img
                  src={
                    bag.images?.[0]
                      ? bag.images[0].startsWith("http")
                        ? bag.images[0]
                        : `http://localhost:5000${bag.images[0]}`
                      : bag.image
                  }
                  alt={bag.name}
                />
                <button
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(bag)}
                >
                  {isWishlisted(bag._id || bag.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart color="#aaa" />
                  )}
                </button>
              </div>

              <h3>{bag.name}</h3>
              <p className="price">₹{bag.price.toLocaleString("en-IN")}</p>

              <button
                className="cart-btn"
                onClick={() =>
                  addToCart({
                    id: bag._id || bag.id,
                    name: bag.name,
                    price: bag.price,
                    image: bag.images?.[0]
                      ? bag.images[0].startsWith("http")
                        ? bag.images[0]
                        : `http://localhost:5000${bag.images[0]}`
                      : bag.image,
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

// Fallback dummy data — API maa products na hoy tyare
const dummyBags = [
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

export default Bags;
