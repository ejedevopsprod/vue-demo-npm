import { createSlice } from "@reduxjs/toolkit";

export const registrySlice = createSlice({
  name: "registryTime",
  initialState: {
    timeCount: 0,
  },
  reducers: {
    addTime: (state, action) => {
      state.timeCount += action.payload;
    },
    resetTime: (state) => {
      state.timeCount = 0;
    },
  },
});

export const { addTime, resetTime } = registrySlice.actions;

export default registrySlice.reducer;
