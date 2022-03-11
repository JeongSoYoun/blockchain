import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuStatus: { main: "home", sub: "" },
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {
    setMenuStatus: (state, action) => {
      state.menuStatus = action.payload;
    },
  },
});

export const { setMenuStatus } = menuSlice.actions;
export const selectMenu = (state) => state.menu.menuStatus;
export default menuSlice.reducer;
