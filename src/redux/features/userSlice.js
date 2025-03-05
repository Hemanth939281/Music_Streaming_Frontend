import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

// Safely parse user data from localStorage
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    initialState.user = JSON.parse(storedUser);
  }
} catch (error) {
  // If parsing fails, remove the invalid data
  localStorage.removeItem("user");
  console.error("Error parsing user from localStorage:", error);
}

// Set access token from localStorage
initialState.accessToken = localStorage.getItem("accessToken") || null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;