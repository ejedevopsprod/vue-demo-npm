import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    section: "",
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
  },
});

export const { setSection } = generalSlice.actions;

export default generalSlice.reducer;
