import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: true,
};

export const windowSlice = createSlice({
  name: "windowSize",
  initialState,

  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export const { setIsMobile } = windowSlice.actions;

export const selectWindowSize = (state) => state.windowSize;

export default windowSlice.reducer;
