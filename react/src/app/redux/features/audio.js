import { createSlice } from "@reduxjs/toolkit";
import audio from "../../assets/music/background_music.mp3";

export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    currentAudio: audio,
    interrupted: false,
  },
  reducers: {
    setAudio: (state, action) => {
      state.currentAudio = action.payload;
    },
    resetAudio: (state) => {
      state.currentAudio = audio;
    },
    interruptAudio: (state, action) => {
      state.interrupted = action.payload;
    },
  },
});

export const { setAudio, resetAudio, interruptAudio } = audioSlice.actions;

export default audioSlice.reducer;
