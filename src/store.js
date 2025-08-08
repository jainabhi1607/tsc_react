import { configureStore } from "@reduxjs/toolkit";
import { tscReducer } from "./Slices/userSlice";
import { tscServiceReducer } from "./Slices/serviceSlice";
import { tscSupportReducer } from "./Slices/supportSlice";

export const store = configureStore({
  reducer: {
    tscStore: tscReducer,
    tscServiceStore: tscServiceReducer,
    tscSupportStore: tscSupportReducer,
  },
});
