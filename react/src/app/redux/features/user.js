import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userWorlds: [],
    session: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload;
      state.session = true;
    },
    setWorldScore: (state, action) => {
      state.userWorlds[action.payload.index].score = action.payload.score;
      state.userWorlds[action.payload.index].time = action.payload.time;
    },
    setWorldStatus: (state, action) => {
      state.userWorlds[action.payload.index].active = action.payload.active;
    },
    setWorlds: (state, action) => {
      state.userWorlds = action.payload;
    },
  },
});

export const { setUser, setWorldScore, setWorldStatus, setWorlds } =
  userSlice.actions;

export default userSlice.reducer;
