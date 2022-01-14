import { createSlice } from "@reduxjs/toolkit";

export const avatarSlice = createSlice({
  name: "avatar",
  initialState: {
    avatarPosition: {},
  },
  reducers: {
    setAvatarPosition: (state, action) => {
      state.avatarPosition = action.payload;
    },
  },
});

export const { setAvatarPosition } = avatarSlice.actions;

export default avatarSlice.reducer;
