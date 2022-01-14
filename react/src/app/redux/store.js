import { configureStore } from "@reduxjs/toolkit";
import map from "./features/map/map";
import avatar from "./features/map/avatar";
import general from "./features/general";
import transition from "./features/transition";
import registry from "./features/registry/registry";
import withdrawals from "./features/withdrawals/withdrawals";
import registryTime from "./features/registry/time";
import withdrawalsTime from "./features/withdrawals/time";
import video from "./features/video";
import audio from "./features/audio";
import user from "./features/user";

export default configureStore({
  reducer: {
    map,
    avatar,
    general,
    transition,
    registry,
    withdrawals,
    registryTime,
    withdrawalsTime,
    video,
    audio,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
