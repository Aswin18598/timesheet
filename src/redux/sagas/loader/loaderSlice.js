import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const LoaderSlice = createSlice({
  name: "LoaderSlice",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const { setLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
