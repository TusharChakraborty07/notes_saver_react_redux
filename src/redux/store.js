import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./slice/pasteSlice.jsx";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
