import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminHeader from "../components/AdminHeader";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const menuItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      sub: t("overview"),
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
      label: t("user_management"),
      sub: t("manage_users"),
      path: "/users",   // ✅ Fixed: was "/dashboard"
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
      path: "/orders",  // ✅ Fixed: was "/dashboard"
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/products/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== deleteId));
      setDeletePopup(false);
      setDeleteId(null);
    } catch {
      console.error("Delete failed");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()),
  );

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
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-400 mb-6">Are you sure you want to delete this product?</p>
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

      <div className="flex pt-16">
        {/* Sidebar */}
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
              const isActive = location.pathname === item.path; // ✅ useLocation use kare che
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

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 p-8 ${open ? "ml-60" : "ml-16"}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-sm text-gray-400 mt-1">Manage your product inventory</p>
            </div>
            <button onClick={() => navigate("/add-product")}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow hover:opacity-90 transition flex items-center gap-2">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" width="15" height="15">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search products..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-indigo-300 transition w-full" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              <p className="text-xs text-gray-400 mt-1">Total Products</p>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Image", "Name", "Category", "Price", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p, i) => (
                    <tr key={p._id} className={`border-b border-gray-50 hover:bg-gray-50 transition ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <td className="px-5 py-3.5">
                        {p.images?.[0] ? (
                          <img
                            src={p.images[0].startsWith("http") ? p.images[0] : `http://localhost:5000${p.images[0]}`}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-400 text-xs font-bold">
                            {p.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-gray-800">{p.name}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-gray-800">₹{p.price?.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <button onClick={() => navigate(`/edit-product/${p._id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold transition">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="13" height="13">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button onClick={() => confirmDelete(p._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold transition">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="13" height="13">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">No products found</div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;