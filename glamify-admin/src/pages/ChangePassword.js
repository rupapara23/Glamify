import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../redux/authSlice";
import AdminHeader from "../components/AdminHeader";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = "Current password is required";
    if (!form.newPassword) e.newPassword = "New password is required";
    else if (form.newPassword.length < 6) e.newPassword = "Minimum 6 characters required";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm new password";
    else if (form.newPassword !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }

    const result = await dispatch(changePassword({
      id: currentUser.id,
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    }));

    if (changePassword.fulfilled.match(result)) {
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setServerError(result.payload);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <AdminHeader />
      <div className="pt-24 px-4 flex justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-lg shadow">
              🔒
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              <p className="text-xs text-gray-400">Update karega db.json mein bhi</p>
            </div>
          </div>

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">
              ✅ Password changed successfully! Redirecting...
            </div>
          )}

          {/* Server Error */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Current Password
              </label>
              <input
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                type="password"
                placeholder="Enter current password"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-indigo-300
                  ${errors.currentPassword ? "border-red-400" : "border-gray-200 focus:border-indigo-400"}`}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <input
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                type="password"
                placeholder="Min. 6 characters"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-indigo-300
                  ${errors.newPassword ? "border-red-400" : "border-gray-200 focus:border-indigo-400"}`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Re-enter new password"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:ring-2 focus:ring-indigo-300
                  ${errors.confirmPassword ? "border-red-400" : "border-gray-200 focus:border-indigo-400"}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold shadow hover:opacity-90 transition disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;