import { createSlice } from "@reduxjs/toolkit";
import tree from "./tree";

export const registrySlice = createSlice({
  name: "registry",
  initialState: {
    currentNode: tree,
    anchor: [0, 0],
  },
  reducers: {
    setCurrentNode: (state, action) => {
      state.currentNode = action.payload;
    },
    resetNode: (state) => {
      state.currentNode = tree;
    },
    setAnchor: (state, action) => {
      state.anchor = action.payload;
    },
  },
});

export const { setCurrentNode, resetNode, setAnchor } = registrySlice.actions;

export default registrySlice.reducer;
