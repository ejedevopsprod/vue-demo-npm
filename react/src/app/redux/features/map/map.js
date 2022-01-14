import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    mapPosition: {},
    mapSize: {},
    isMapActive: false,
  },
  reducers: {
    setMapActive: (state, action) => {
      state.isMapActive = action.payload;
    },
    setMapSize: (state, action) => {
      state.mapSize = action.payload;
    },
    setMapPosition: (state, action) => {
      state.mapPosition = action.payload;
    },
    moveMap: (state, action) => {
      state.mapPosition = {
        x:
          state.mapPosition.x + action.payload.x >= 0
            ? (window.innerWidth / 2) * -0.01
            : Math.abs(
                state.mapPosition.x + action.payload.x - window.innerWidth
              ) >= state.mapSize.width
            ? -(state.mapSize.width - window.innerWidth) +
              (window.innerWidth / 2) * 0.01
            : state.mapPosition.x + action.payload.x,
        y:
          state.mapPosition.y + action.payload.y >= 0
            ? (window.innerHeight / 2) * -0.01
            : Math.abs(
                state.mapPosition.y + action.payload.y - window.innerHeight
              ) >= state.mapSize.height
            ? -(state.mapSize.height - window.innerHeight) +
              (window.innerHeight / 2) * 0.01
            : state.mapPosition.y + action.payload.y,
      };
    },
  },
});

export const { setMapSize, setMapPosition, moveMap, setMapActive } =
  mapSlice.actions;

export default mapSlice.reducer;
