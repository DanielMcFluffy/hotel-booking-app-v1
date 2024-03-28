import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./features/slices/listingSlice";

const store = configureStore({
  reducer: {
    listing: listingReducer,
  },
})

export default store;