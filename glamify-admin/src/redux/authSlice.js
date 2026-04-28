import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE = "http://localhost:5000/api";

// ── SIGNUP ──
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      localStorage.setItem("adminToken", data.token);
      return data;
    } catch {
      return rejectWithValue("Server error");
    }
  },
);

// ── LOGIN ──
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      localStorage.setItem("adminToken", data.token);
      return data;
    } catch {
      return rejectWithValue("Server error");
    }
  },
);

// ── UPDATE PROFILE ──
export const updateProfile = createAsyncThunk(
  "auth/update",
  async ({ name, email }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BASE}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch {
      return rejectWithValue("Server error");
    }
  },
);

// ── CHANGE PASSWORD ──
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BASE}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch {
      return rejectWithValue("Server error");
    }
  },
);

// ── GET ALL USERS (Admin) ──
export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BASE}/users`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch {
      return rejectWithValue("Server error");
    }
  },
);

// ── GET ALL ORDERS (Admin) ──
export const getAllOrders = createAsyncThunk(
  "auth/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BASE}/payment/my-orders`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch {
      return rejectWithValue("Server error");
    }
  },
);

// ── GET ALL PRODUCTS (Admin) ──
export const getAllProducts = createAsyncThunk(
  "auth/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE}/products`);
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);
      return data;
    } catch {
      return rejectWithValue("Server error");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    isLoggedIn: !!localStorage.getItem("currentUser"),
    loading: false,
    error: null,
    users: [],
    orders: [],
    products: [],
  },
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("adminToken");
    },
    clearError(state) {
      state.error = null;
    },
    googleLogin(state, action) {
      const googleUser = {
        id: action.payload.sub,
        name: action.payload.name,
        email: action.payload.email,
        picture: action.payload.picture,
        loginType: "google",
      };
      state.currentUser = googleUser;
      state.isLoggedIn = true;
      localStorage.setItem("currentUser", JSON.stringify(googleUser));
    },
  },
  extraReducers: (builder) => {
    // SIGNUP
    builder
      .addCase(signupUser.pending,    (state) => { state.loading = true; state.error = null; })
      .addCase(signupUser.fulfilled,  (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      })
      .addCase(signupUser.rejected,   (state, action) => { state.loading = false; state.error = action.payload; });

    // LOGIN
    builder
      .addCase(loginUser.pending,    (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled,  (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected,   (state, action) => { state.loading = false; state.error = action.payload; });

    // UPDATE PROFILE
    builder
      .addCase(updateProfile.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    // CHANGE PASSWORD
    builder
      .addCase(changePassword.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(changePassword.fulfilled, (state) => { state.loading = false; })
      .addCase(changePassword.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    // GET ALL USERS
    builder
      .addCase(getAllUsers.pending,   (state) => { state.loading = true; })
      .addCase(getAllUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(getAllUsers.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    // GET ALL ORDERS
    builder
      .addCase(getAllOrders.pending,   (state) => { state.loading = true; })
      .addCase(getAllOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(getAllOrders.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });

    // GET ALL PRODUCTS
    builder
      .addCase(getAllProducts.pending,   (state) => { state.loading = true; })
      .addCase(getAllProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(getAllProducts.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout, clearError, googleLogin } = authSlice.actions;
export default authSlice.reducer;