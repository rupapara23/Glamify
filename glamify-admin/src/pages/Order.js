import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

const STATUS_COLORS = {
  pending:    { bg: "#fff7ed", text: "#c2410c" },
  processing: { bg: "#eff6ff", text: "#1d4ed8" },
  shipped:    { bg: "#f0f9ff", text: "#0369a1" },
  delivered:  { bg: "#f0fdf4", text: "#166534" },
  cancelled:  { bg: "#fef2f2", text: "#b91c1c" },
};

const PAYMENT_COLORS = {
  paid:   { bg: "#f0fdf4", text: "#16a34a" },
  unpaid: { bg: "#fef2f2", text: "#dc2626" },
};

function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      sub: "Overview",
      path: "/dashboard",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "users",
      label: "User Management",
      sub: "Manage users",
      path: "/users",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: "products",
      label: "Products",
      sub: "Manage products",
      path: "/products",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Orders",
      sub: "View orders",
      path: "/orders",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoaded(true);
    } catch {
      console.error("Failed to fetch orders");
      setLoaded(true);
    }
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      search.trim() === "" ||
      o._id?.toLowerCase().includes(q) ||
      o.shippingAddress?.name?.toLowerCase().includes(q) ||
      o.shippingAddress?.email?.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / perPage);
  const displayed = filteredOrders.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/orders/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((o) => o._id !== deleteId));
      setDeletePopup(false);
      setDeleteId(null);
    } catch {
      console.error("Delete failed");
    }
  };

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <AdminHeader />

      {/* Delete Popup */}
      {deletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg fill="none" stroke="#ef4444" viewBox="0 0 24 24" width="28" height="28">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Order?</h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => { setDeletePopup(false); setDeleteId(null); }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold shadow hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Order Popup */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
          <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
              <button onClick={() => setViewOrder(null)}
                className="bg-gray-100 rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-200 transition border-0 cursor-pointer">
                ✕ Close
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-400 mb-1">Order ID</p>
              <p className="text-xs font-semibold text-gray-600 font-mono mb-2">{viewOrder._id}</p>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold"
                  style={{ background: STATUS_COLORS[viewOrder.orderStatus]?.bg, color: STATUS_COLORS[viewOrder.orderStatus]?.text }}>
                  {viewOrder.orderStatus}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold"
                  style={{ background: PAYMENT_COLORS[viewOrder.paymentStatus]?.bg, color: PAYMENT_COLORS[viewOrder.paymentStatus]?.text }}>
                  {viewOrder.paymentStatus}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-bold text-gray-700 mb-2">📦 Shipping Address</p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 leading-7">
                <strong>{viewOrder.shippingAddress?.name}</strong><br />
                {viewOrder.shippingAddress?.email}<br />
                {viewOrder.shippingAddress?.phone}<br />
                {viewOrder.shippingAddress?.address}, {viewOrder.shippingAddress?.city} - {viewOrder.shippingAddress?.pincode}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-bold text-gray-700 mb-2">🛍️ Items</p>
              {viewOrder.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 mb-2">
                  {item.image && <img src={item.image} alt={item.name} className="w-11 h-11 rounded-lg object-cover" />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 m-0">{item.name}</p>
                    <p className="text-xs text-gray-400 m-0">Qty: {item.qty} × ₹{item.price?.toLocaleString("en-IN")}</p>
                  </div>
                  <p className="text-sm font-bold text-indigo-600 m-0">₹{(item.qty * item.price)?.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center p-4 bg-indigo-600 rounded-xl mb-3">
              <span className="text-sm font-bold text-white">Total Amount</span>
              <span className="text-lg font-extrabold text-white">₹{viewOrder.totalAmount?.toLocaleString("en-IN")}</span>
            </div>

            {viewOrder.paymentId && (
              <p className="text-xs text-gray-400 m-0">
                Payment ID: <span className="font-mono">{viewOrder.paymentId}</span>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex pt-16">
        {/* Sidebar - same as User/Dashboard/Products */}
        <aside className={`fixed top-16 left-0 bottom-0 bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 z-40 ${open ? "w-60" : "w-16"}`}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 transition text-gray-500 self-end m-3"
          >
            {open ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200
                    ${isActive ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}
                    ${!open ? "justify-center" : ""}`}
                >
                  <div className={`flex-shrink-0 ${isActive ? "text-indigo-500" : "text-gray-400"}`}>
                    {item.icon}
                  </div>
                  {open && (
                    <div>
                      <p className={`text-sm font-semibold leading-none ${isActive ? "text-indigo-600" : "text-gray-700"}`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                    </div>
                  )}
                  {isActive && open && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {open && (
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-300 text-center">Glamify Admin v1.0</p>
            </div>
          )}
        </aside>

        {/* Main */}
        <main className={`flex-1 transition-all duration-300 p-8 ${open ? "ml-60" : "ml-16"}`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              <p className="text-sm text-gray-400 mt-1">Manage all customer orders</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Orders",   value: loaded ? orders.length : "...", color: "#4f46e5", bg: "#eef2ff" },
              { label: "Pending",        value: orders.filter(o => o.orderStatus === "pending").length,   color: "#f97316", bg: "#fff7ed" },
              { label: "Delivered",      value: orders.filter(o => o.orderStatus === "delivered").length, color: "#16a34a", bg: "#f0fdf4" },
              { label: "Revenue (Paid)", value: `₹${totalRevenue.toLocaleString("en-IN")}`,               color: "#7c3aed", bg: "#f5f3ff" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-sm mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" width="15" height="15">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search by name, email, ID..." value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-indigo-300 transition w-full" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["#", "Customer", "Items", "Total", "Payment", "Order Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.map((order, i) => (
                  <tr key={order._id} className={`border-b border-gray-50 hover:bg-gray-50 transition ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="px-5 py-3.5 text-gray-400 text-xs">{(currentPage - 1) * perPage + i + 1}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-gray-800 m-0">{order.shippingAddress?.name || "—"}</p>
                      <p className="text-xs text-gray-400 mt-0.5 m-0">{order.shippingAddress?.email || "—"}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{order.items?.length} item{order.items?.length !== 1 ? "s" : ""}</td>
                    <td className="px-5 py-3.5 font-bold text-gray-800">₹{order.totalAmount?.toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                        style={{ background: PAYMENT_COLORS[order.paymentStatus]?.bg, color: PAYMENT_COLORS[order.paymentStatus]?.text }}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                        style={{ background: STATUS_COLORS[order.orderStatus]?.bg, color: STATUS_COLORS[order.orderStatus]?.text }}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setViewOrder(order)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition">
                          View
                        </button>
                        <button onClick={() => { setDeleteId(order._id); setDeletePopup(true); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {displayed.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">
                {loaded ? "No orders found" : "Loading..."}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filteredOrders.length)} of {filteredOrders.length}
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition">
                    ← Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition
                        ${currentPage === page ? "bg-indigo-500 text-white shadow" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      {page}
                    </button>
                  ))}
                  <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition">
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Orders;