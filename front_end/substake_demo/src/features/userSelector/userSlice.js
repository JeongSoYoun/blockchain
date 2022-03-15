import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUserStatus: (state, action) => {
      state.userStatus = action.payload;
    },
    setDefault: (state) => {
      state.userStatus = null;
    },
  },
});

export const { setUserStatus, setDefault } = userSlice.actions;
export const selectUser = (state) => state.user.userStatus;
export default userSlice.reducer;
