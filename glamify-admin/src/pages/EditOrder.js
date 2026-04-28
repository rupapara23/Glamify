// import { useState, useEffect, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import AdminHeader from "../components/AdminHeader";

// const STATUS_COLORS = {
//   pending:    { bg: "#fff7ed", text: "#c2410c" },
//   processing: { bg: "#eff6ff", text: "#1d4ed8" },
//   shipped:    { bg: "#f0f9ff", text: "#0369a1" },
//   delivered:  { bg: "#f0fdf4", text: "#166534" },
//   cancelled:  { bg: "#fef2f2", text: "#b91c1c" },
// };

// const PAYMENT_COLORS = {
//   paid:   { bg: "#f0fdf4", text: "#16a34a" },
//   unpaid: { bg: "#fef2f2", text: "#dc2626" },
// };

// const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

// function EditOrder() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [orderStatus, setOrderStatus] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const fetchOrder = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setOrder(data);
//       setOrderStatus(data.orderStatus || "pending");
//     } catch {
//       console.error("Failed to fetch order");
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchOrder();
//   }, [fetchOrder]);

//   const handleSubmit = async () => {
//     if (!orderStatus) { setError("Please select a status"); return; }
//     setLoading(true);
//     setError("");
//     try {
//       const token = localStorage.getItem("adminToken");
//       await fetch(`http://localhost:5000/api/orders/${id}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ orderStatus }),
//       });
//       setSuccess(true);
//       setTimeout(() => navigate("/orders"), 1500);
//     } catch {
//       setError("Update failed. Please try again.");
//     }
//     setLoading(false);
//   };

//   if (!order) {
//     return (
//       <div style={{ minHeight: "100vh", backgroundColor: "#f4f6fb", fontFamily: "Segoe UI, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <AdminHeader />
//         <p style={{ color: "#9ca3af", fontSize: "15px" }}>Loading order...</p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f4f6fb", fontFamily: "Segoe UI, sans-serif" }}>
//       <AdminHeader />
//       <div style={{ maxWidth: "750px", margin: "0 auto", padding: "80px 20px 40px" }}>

//         {/* Header */}
//         <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
//           <button onClick={() => navigate("/orders")}
//             style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #dde1ea", background: "#fff", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
//             ‹
//           </button>
//           <div>
//             <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#1a1d23" }}>Edit Order</h2>
//             <p style={{ margin: 0, fontSize: "13px", color: "#8a8fa8" }}>Update order status</p>
//           </div>
//         </div>

//         {/* Success */}
//         {success && (
//           <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", fontSize: "14px" }}>
//             ✅ Order updated! Redirecting...
//           </div>
//         )}

//         {/* Order Info Card */}
//         <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e8ebf2", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
//           <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#9ca3af" }}>Order ID</p>
//           <p style={{ margin: "0 0 16px", fontSize: "13px", fontWeight: "600", color: "#374151", fontFamily: "monospace" }}>{order._id}</p>

//           <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
//             <span style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", background: STATUS_COLORS[order.orderStatus]?.bg, color: STATUS_COLORS[order.orderStatus]?.text }}>
//               {order.orderStatus}
//             </span>
//             <span style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", background: PAYMENT_COLORS[order.paymentStatus]?.bg, color: PAYMENT_COLORS[order.paymentStatus]?.text }}>
//               {order.paymentStatus}
//             </span>
//           </div>

//           {/* Customer */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
//             <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px" }}>
//               <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: "700", color: "#374151" }}>👤 Customer</p>
//               <p style={{ margin: "0 0 3px", fontSize: "13px", fontWeight: "600", color: "#1a1d23" }}>{order.shippingAddress?.name}</p>
//               <p style={{ margin: "0 0 3px", fontSize: "12px", color: "#6b7280" }}>{order.shippingAddress?.email}</p>
//               <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>{order.shippingAddress?.phone}</p>
//             </div>
//             <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px" }}>
//               <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: "700", color: "#374151" }}>📍 Address</p>
//               <p style={{ margin: "0 0 3px", fontSize: "13px", color: "#1a1d23" }}>{order.shippingAddress?.address}</p>
//               <p style={{ margin: "0 0 3px", fontSize: "12px", color: "#6b7280" }}>{order.shippingAddress?.city}</p>
//               <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>{order.shippingAddress?.pincode}</p>
//             </div>
//           </div>

//           {/* Items */}
//           <div style={{ marginBottom: "20px" }}>
//             <p style={{ margin: "0 0 10px", fontSize: "13px", fontWeight: "700", color: "#374151" }}>🛍️ Items ({order.items?.length})</p>
//             {order.items?.map((item, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "10px", background: "#f8fafc", marginBottom: "8px" }}>
//                 {item.image && <img src={item.image} alt={item.name} style={{ width: "44px", height: "44px", borderRadius: "8px", objectFit: "cover" }} />}
//                 <div style={{ flex: 1 }}>
//                   <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#1a1d23" }}>{item.name}</p>
//                   <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>Qty: {item.qty} × ₹{item.price?.toLocaleString("en-IN")}</p>
//                 </div>
//                 <p style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#4f46e5" }}>₹{(item.qty * item.price)?.toLocaleString("en-IN")}</p>
//               </div>
//             ))}
//           </div>

//           {/* Total */}
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", background: "#4f46e5", borderRadius: "10px" }}>
//             <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>Total Amount</span>
//             <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
//           </div>
//         </div>

//         {/* Edit Status Card */}
//         <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e8ebf2", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
//           <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: "700", color: "#1a1d23" }}>Update Order Status</h3>
//           <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#9ca3af" }}>Change the current status of this order</p>

//           {/* Status Buttons */}
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
//             {ORDER_STATUSES.map((s) => (
//               <button key={s} onClick={() => setOrderStatus(s)}
//                 style={{
//                   padding: "8px 18px", borderRadius: "10px", cursor: "pointer",
//                   fontSize: "13px", fontWeight: "600", transition: "all 0.15s",
//                   border: orderStatus === s ? "2px solid #4f46e5" : "2px solid #e2e6f0",
//                   background: orderStatus === s ? "#4f46e5" : "#f8fafc",
//                   color: orderStatus === s ? "#fff" : "#555",
//                 }}>
//                 {s.charAt(0).toUpperCase() + s.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Selected Status Preview */}
//           <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
//             <span style={{ fontSize: "13px", color: "#6b7280" }}>Selected Status:</span>
//             <span style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "700", background: STATUS_COLORS[orderStatus]?.bg, color: STATUS_COLORS[orderStatus]?.text }}>
//               {orderStatus}
//             </span>
//           </div>

//           {error && (
//             <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "16px" }}>{error}</p>
//           )}

//           {/* Buttons */}
//           <div style={{ display: "flex", gap: "12px" }}>
//             <button type="button" onClick={() => navigate("/orders")}
//               style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1.5px solid #e2e6f0", background: "#fff", fontSize: "14px", fontWeight: "600", color: "#555", cursor: "pointer" }}>
//               Cancel
//             </button>
//             <button onClick={handleSubmit} disabled={loading}
//               style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "none", background: loading ? "#a5b4fc" : "#4f46e5", fontSize: "14px", fontWeight: "700", color: "#fff", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 12px rgba(79,70,229,0.3)" }}>
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default EditOrder;