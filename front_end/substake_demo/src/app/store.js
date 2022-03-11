import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menuSelector/menuSlice";
import windowReducer from "../features/windowSizer/windowSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    windowSize: windowReducer,
  },
});
