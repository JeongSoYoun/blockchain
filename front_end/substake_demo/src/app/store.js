import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../features/counter/menuSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});
