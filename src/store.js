import { configureStore } from "@reduxjs/toolkit";
import { tscReducer } from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    tscStore: tscReducer,
  },
});
