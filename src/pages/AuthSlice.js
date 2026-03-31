import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const DUMMY_USERS = [
  { id: 1, name: "Drashti",  email: "Drashti@gmail.com", password: "d@123" },
  { id: 2, name: "Priya", email: "priya@gmail.com", password: "p@1234" },
  { id: 3, name: "Princy",  email: "Princy@gmail.com",  password: "p@123" },
];

const fakeApiLogin = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = DUMMY_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const { password: _, ...safeUser } = user;
        resolve(safeUser);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 800);
  });

const fakeApiRegister = (name, email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = DUMMY_USERS.find((u) => u.email === email);
      if (exists) {
        reject(new Error("Email already registered"));
      } else {
        const newUser = { id: Date.now(), name, email };
        DUMMY_USERS.push({ ...newUser, password });
        resolve(newUser);
      }
    }, 800);
  });

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await fakeApiLogin(email, password);
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const user = await fakeApiRegister(name, email, password);
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromStorage(), 
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Login par save
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Register par pan save
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;