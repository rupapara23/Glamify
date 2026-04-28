import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api"; 

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", pincode: "",
  });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Step 1 — Backend thi Razorpay order banavo
      const res = await fetch(`${API_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: total }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Step 2 — Razorpay checkout kholo
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Glamify",
        description: "Purchase",
        order_id: data.orderId,
        handler: async function (response) {
  const verifyRes = await fetch(`${API_URL}/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      razorpay_order_id:   response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature:  response.razorpay_signature,
      items:           cart,        // Cart items
      shippingAddress: formData,    // Shipping details
      totalAmount:     total,       // Total amount
    }),
  });

  const verifyData = await verifyRes.json();

  if (verifyData.success) {
    clearCart();
    alert("🎉 Payment Successful!");
    navigate("/");
  } else {
    alert("Payment verification failed!");
  }
},
        prefill: {
          name:  formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#e91e8c" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2>Checkout</h2>

      {/* Order Summary */}
      <div style={{ background: "#f9f9f9", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
        <h5>Order Summary</h5>
        {cart.map((item) => (
          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>{item.name} x{item.qty}</span>
            <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <hr />
        <strong>Total: ₹{total.toLocaleString("en-IN")}</strong>
      </div>

      {/* Shipping Form */}
      <form onSubmit={handlePayment}>
        <div style={{ marginBottom: "12px" }}>
          <label>Full Name</label>
          <input
            type="text" name="name"
            value={formData.name} onChange={handleChange}
            required style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Email</label>
          <input
            type="email" name="email"
            value={formData.email} onChange={handleChange}
            required style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Phone</label>
          <input
            type="text" name="phone"
            value={formData.phone} onChange={handleChange}
            required style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Address</label>
          <input
            type="text" name="address"
            value={formData.address} onChange={handleChange}
            required style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          <div style={{ flex: 1 }}>
            <label>City</label>
            <input
              type="text" name="city"
              value={formData.city} onChange={handleChange}
              required style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>Pincode</label>
            <input
              type="text" name="pincode"
              value={formData.pincode} onChange={handleChange}
              required style={{ width: "100%", padding: "8px", marginTop: "4px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || cart.length === 0}
          style={{
            width: "100%", padding: "14px",
            background: "#e91e8c", color: "white",
            border: "none", borderRadius: "8px",
            fontSize: "16px", cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : `Pay ₹${total.toLocaleString("en-IN")}`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;