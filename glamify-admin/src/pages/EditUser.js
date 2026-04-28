import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", email: "", role: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ useCallback use karya thi useEffect dependency warning nahi aavshe
  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json(); // ✅ 'res' ne 'response' karyu — no-undef fix
      if (user) {
        setForm({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "",
        });
      }
    } catch {
      console.error("Failed to fetch user");
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // ✅ fetchUser dependency add karyu

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.role) e.role = "Role is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setTimeout(() => navigate("/users"), 1500);
    } catch {
      console.error("Update failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f6fb", fontFamily: "Segoe UI, sans-serif" }}>
      <AdminHeader />
      <div style={{ maxWidth: "750px", margin: "0 auto", padding: "80px 20px 40px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <button
            onClick={() => navigate("/users")}
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              border: "1px solid #dde1ea", background: "#fff",
              cursor: "pointer", fontSize: "20px", display: "flex",
              alignItems: "center", justifyContent: "center", color: "#555",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}
          >
            ‹
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#1a1d23" }}>Edit User</h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#8a8fa8" }}>Update user details</p>
          </div>
        </div>

        {/* Success */}
        {success && (
          <div style={{
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            color: "#16a34a", borderRadius: "10px",
            padding: "12px 16px", marginBottom: "20px", fontSize: "14px"
          }}>
            ✅ User updated! Redirecting...
          </div>
        )}

        {/* Form Card */}
        <div style={{
          background: "#fff", borderRadius: "16px",
          border: "1px solid #e8ebf2", padding: "32px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)"
        }}>

          {/* Full Name */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#2d3142", marginBottom: "8px" }}>
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
              placeholder="Enter full name"
              style={{
                width: "100%", padding: "11px 14px", borderRadius: "10px",
                border: errors.name ? "1.5px solid #f87171" : "1.5px solid #e2e6f0",
                fontSize: "14px", outline: "none", boxSizing: "border-box",
                background: "#fafbfd", color: "#1a1d23"
              }}
            />
            {errors.name && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "5px" }}>{errors.name}</p>}
          </div>

         

          {/* Email */}
          <div style={{ marginBottom: "22px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#2d3142", marginBottom: "8px" }}>
              Email Address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={form.email}
              type="email"
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
              placeholder="Enter email address"
              style={{
                width: "100%", padding: "11px 14px", borderRadius: "10px",
                border: errors.email ? "1.5px solid #f87171" : "1.5px solid #e2e6f0",
                fontSize: "14px", outline: "none", boxSizing: "border-box",
                background: "#fafbfd", color: "#1a1d23"
              }}
            />
            {errors.email && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "5px" }}>{errors.email}</p>}
          </div>

          {/* Role */}
          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#2d3142", marginBottom: "8px" }}>
              Role <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={form.role}
              onChange={(e) => { setForm({ ...form, role: e.target.value }); setErrors({ ...errors, role: "" }); }}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: "10px",
                border: errors.role ? "1.5px solid #f87171" : "1.5px solid #e2e6f0",
                fontSize: "14px", outline: "none", boxSizing: "border-box",
                background: "#fafbfd", color: form.role ? "#1a1d23" : "#9ca3af",
                cursor: "pointer"
              }}
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "5px" }}>{errors.role}</p>}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              onClick={() => navigate("/users")}
              style={{
                flex: 1, padding: "12px", borderRadius: "10px",
                border: "1.5px solid #e2e6f0", background: "#fff",
                fontSize: "14px", fontWeight: "600", color: "#555",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                flex: 1, padding: "12px", borderRadius: "10px",
                border: "none", background: loading ? "#a5b4fc" : "#4f46e5",
                fontSize: "14px", fontWeight: "700", color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(79,70,229,0.3)"
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditUser;