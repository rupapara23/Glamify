import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, clearError } from "./AuthSlice";
import "./Login.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

   if (!formData.password) {
  newErrors.password = "Please enter a password";
} else if (!validatePassword(formData.password)) {
  newErrors.password = "Password does not meet requirements";
}

if (!formData.confirmPassword) {
  newErrors.confirmPassword = "Please confirm your password";
} else if (formData.password !== formData.confirmPassword) {
  newErrors.confirmPassword = "Passwords do not match";
}

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-right">
          <div className="auth-form-wrap">
            <h2>Create Account</h2>

            {error && <div className="auth-error-box">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>

              <div className="auth-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={fieldErrors.name ? "input-error" : ""}
                />
                {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
              </div>

              <div className="auth-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={fieldErrors.email ? "input-error" : ""}
                />
                {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
              </div>

              <div className="auth-field">
                {/* ✅ FIX: "(numbers only)" hint hatavi didhi */}
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={fieldErrors.password ? "input-error" : ""}
                />
                {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
              </div>

              <div className="auth-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={fieldErrors.confirmPassword ? "input-error" : ""}
                />
                {fieldErrors.confirmPassword && (
                  <span className="field-error">{fieldErrors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loader">
                    <span className="spinner"></span> Creating account...
                  </span>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;