import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMenu: "",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {
    setCurrentMenu: (state, action) => {
      state.currentMenu = action.payload;
    },
  },
});

export const { setCurrentMenu } = menuSlice.actions;

export const selectMenu = (state) => state.menu.currentMenu;

export default menuSlice.reducer;
