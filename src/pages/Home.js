import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const banners = [
    "/images/Begs/1234.jpg",
    "/images/Jwelery/1.jpg",
    "/images/Watches/1.jpg",
    "/images/SunGlassess/BrowSunglasses.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // === Reviews State ===
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ name: "", review: "" });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review) {
      setReviews([formData, ...reviews]);
      setFormData({ name: "", review: "" });
    }
  };

  const removeReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  // === Services Modal ===
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", desc: "" });

  const services = [
    {
      icon: "bi-truck",
      title: "Fast Delivery",
      desc: "Get your products delivered quickly.",
    },
    {
      icon: "bi-arrow-counterclockwise",
      title: "Easy Returns",
      desc: "Hassle-free return policy.",
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      desc: "We are here to help you anytime.",
    },
    {
      icon: "bi-shield-lock",
      title: "Secure Payments",
      desc: "100% secure payment options.",
    },
  ];

  const handleServiceClick = (service) => {
    setModalContent(service);
    setShowModal(true);
  };

  const categories = [
    {
      name: "Bags",
      path: "/bags",
      img: "/images/Begs/beg10.jpg",
      button: "SHOP BAGS",
    },
    {
      name: "Sunglasses",
      path: "/sunglasses",
      img: "/images/SunGlassess/sun1.jpg",
      button: "SHOP SUNGLASSES",
    },
    {
      name: "Watches",
      path: "/watches",
      img: "/images/Watches/best.jpg",
      button: "SHOP WATCHES",
    },
    {
      name: "Jewelry",
      path: "/jewelry",
      img: "/images/Jwelery/swan_n.jpg",
      button: "SHOP JEWELRY",
    },
    
    
  ];

  return (
    // ✅ Remove default padding from the root div
    <div style={{ padding: 0, margin: 0 }}>
      {/* ✅ Hero Banner — no w-100, uses hero-banner class for full bleed */}
      <section
        className="hero-banner"
        style={{
          backgroundImage: `url(${banners[currentBanner]})`,
        }}
      ></section>

      {/* Categories */}
      <section className="container my-5 p-0">
        <div className="row g-4">
          <h2 className="text-center mb-4">Our Collections</h2>
          {categories.map((item) => (
            <div className="col-md-3" key={item.name}>
              <div
                className="category-card"
                onClick={() => navigate(item.path)}
              >
                <img src={item.img} alt={item.name} />
                <div className="overlay">
                  <h2>{item.name}</h2>
                  <button className="shop-btn">{item.button}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-light py-5 mb-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row text-center g-4">
            {services.map((service) => (
              <div className="col-md-3" key={service.title}>
                <div
                  className="p-3 shadow-sm card"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleServiceClick(service)}
                >
                  <i className={`bi ${service.icon} fs-1 mb-3`}></i>
                  <h5>{service.title}</h5>
                  <p>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{modalContent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent.desc}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>

      {/* Reviews */}
      <section className="container mb-5">
        <h2 className="text-center mb-4">Customer Reviews</h2>
        <div className="review-form-box">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Review"
                  value={formData.review}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: "#1a1919", color: "#fff" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="review-scroll mt-4">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r, idx) => (
            <div className="review-card" key={idx}>
              <span className="remove-review" onClick={() => removeReview(idx)}>
                ✖
              </span>
              <p>"{r.review}"</p>
              <h6>- {r.name}</h6>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
