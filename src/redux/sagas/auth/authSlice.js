import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  currentUser: {},
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    setAuthProfile: (state, action) => {
      return { ...state, currentUser: action.payload };
    },
    logoutAuthToken: (state) => {
      return { ...initialState };
    },
  },
});

export const { setAuthToken, setAuthProfile, logoutAuthToken } =
  AuthSlice.actions;
export default AuthSlice.reducer;
