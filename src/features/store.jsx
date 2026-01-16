import { configureStore } from "@reduxjs/toolkit";
import weatherAPIReducer from "./weatherAPISlice";
export const store = configureStore({
   reducer: {
      globalState: weatherAPIReducer,
   },
});
