import { configureStore } from "@reduxjs/toolkit";
import { tscReducer } from "./Slices/userSlice";
import { tscServiceReducer } from "./Slices/serviceSlice";

export const store = configureStore({
  reducer: {
    tscStore: tscReducer,
    tscServiceStore: tscServiceReducer,
  },
});
