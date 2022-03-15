import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/menuSelector/menuSlice";
import windowReducer from "../features/windowSizer/windowSlice";
import userReducer from "../features/userSelector/userSlice";
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    windowSize: windowReducer,
    user: userReducer,
  },
});
