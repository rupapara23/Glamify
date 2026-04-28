import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import AdminHeader from "../components/AdminHeader";

function Dashboard() {
  const { currentUser } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const name = currentUser?.name || "Admin";
  const [open, setOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const menuItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      sub: t("overview"),
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      id: "users",
      label: t("user_management"),
      sub: t("manage_users"),
      path: "/users",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      id: "products",
      label: "Products",
      sub: "Manage products",
      path: "/products",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Orders",
      sub: "View orders",
      path: "/orders",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="18"
          height="18"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
      setLoaded(true);
    } catch {
      console.error("Failed to fetch users");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/payment/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch {
      console.error("Failed to fetch orders");
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data);
    } catch {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);

  const handleMenu = (id) => {
    if (id === "users") window.location.href = "/users";
    else if (id === "orders") window.location.href = "/orders";
    else if (id === "products") window.location.href = "/products";
    else window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <AdminHeader />

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 bottom-0 bg-white border-r border-gray-100 shadow-sm flex flex-col transition-all duration-300 z-40 ${open ? "w-60" : "w-16"}`}
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 transition text-gray-500 self-end m-3"
          >
            {open ? (
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = item.id === "dashboard";
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200
                    ${isActive ? "bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}
                    ${!open ? "justify-center" : ""}`}
                >
                  <div
                    className={`flex-shrink-0 ${isActive ? "text-indigo-500" : "text-gray-400"}`}
                  >
                    {item.icon}
                  </div>
                  {open && (
                    <div>
                      <p
                        className={`text-sm font-semibold leading-none ${isActive ? "text-indigo-600" : "text-gray-700"}`}
                      >
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
              <p className="text-xs text-gray-300 text-center">
                Glamify Admin v1.0
              </p>
            </div>
          )}
        </aside>

        {/* Main Content - Only Stats */}
        <main
          className={`flex-1 transition-all duration-300 p-8 ${open ? "ml-60" : "ml-16"}`}
        >
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t("welcome_back")},{" "}
                  <span className="text-indigo-500">{name}</span> 👋
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {currentUser?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Users */}
            <div
              onClick={() => navigate("/users")}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-indigo-100 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
                <svg
                  fill="none"
                  stroke="#6366f1"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {loaded ? users.length : "..."}
              </p>
              <p className="text-xs text-gray-400 mt-1">{t("total_users")}</p>
            </div>

            {/* Total Products */}
            <div
              onClick={() => navigate("/products")}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-indigo-100 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
                <svg
                  fill="none"
                  stroke="#6366f1"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {products.length || "..."}
              </p>
              <p className="text-xs text-gray-400 mt-1">Total Products</p>
            </div>

            {/* Total Orders */}
            <div
              onClick={() => navigate("/orders")}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-orange-100 transition"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
                <svg
                  fill="none"
                  stroke="#f97316"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
              <p className="text-xs text-gray-400 mt-1">Total Orders</p>
            </div>

            {/* Total Revenue */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center mb-3">
                <svg
                  fill="none"
                  stroke="#8b5cf6"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ₹
                {orders
                  .reduce((acc, o) => acc + (o.totalAmount || 0), 0)
                  .toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-400 mt-1">Total Revenue</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
