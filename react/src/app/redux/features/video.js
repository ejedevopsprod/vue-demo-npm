import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    video: { url: "", active: false, visible: false },
    played: false,
  },
  reducers: {
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setPlayed: (state, action) => {
      state.played = action.payload;
    },
  },
});

export const { setVideo, setPlayed } = videoSlice.actions;

export default videoSlice.reducer;
