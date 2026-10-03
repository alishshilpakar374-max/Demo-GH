// src/app/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../features/slices/bookingSlice";
import roomsReducer from "../features/slices/roomsSlice";
import toastReducer from "../features/slices/toastSlice";
import lightboxReducer from "../features/slices/lightBoxSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    rooms: roomsReducer,
    toast: toastReducer,
    lightbox: lightboxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
