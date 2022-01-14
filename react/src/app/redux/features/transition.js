import { createSlice } from "@reduxjs/toolkit";

export const transitionSlice = createSlice({
  name: "transition",
  initialState: {
    transition: false,
  },
  reducers: {
    setTransition: (state, action) => {
      state.transition = action.payload;
    },
  },
});

export const { setTransition } = transitionSlice.actions;

export default transitionSlice.reducer;
